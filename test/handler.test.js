import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PluginRegistry } from '../lib/plugins.js'
import { messageHandler } from '../handler.js'
import { initDatabase, databaseApi } from '../lib/database.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

function createMockSock() {
  const sentMessages = []
  return {
    user: { id: '62811111111:1@s.whatsapp.net', name: 'Rubby Bot' },
    sentMessages,
    sendMessage: async (jid, content, options) => {
      sentMessages.push({ jid, content, options })
      return { key: { id: 'bot_msg_' + Date.now(), remoteJid: jid } }
    },
    groupMetadata: async (jid) => {
      return {
        id: jid,
        subject: 'Test Group',
        participants: [
          { id: '62811111111@s.whatsapp.net', admin: 'admin' },
          { id: '62822222222@s.whatsapp.net', admin: null }
        ]
      }
    }
  }
}

function createRawMessage({
  id = 'msg_' + Math.random().toString(36).substring(2, 8),
  remoteJid = 'user1@s.whatsapp.net',
  participant = null,
  text = '',
  fromMe = false,
  pushName = 'Tester'
}) {
  return {
    key: {
      id,
      remoteJid,
      fromMe,
      participant
    },
    messageTimestamp: Math.floor(Date.now() / 1000),
    pushName,
    message: {
      conversation: text
    }
  }
}

test('Handler: Full Command Flow, Permissions & Limits', async () => {
  await initDatabase()
  global.mode = 'public'
  global.owner = ['6289999999999']

  const registry = new PluginRegistry(path.join(rootDir, 'plugins'))

  let pingExecuted = false
  let ownerExecuted = false
  let limitExecuted = false
  let beforeHookRan = false
  let allHookRan = false

  // Register dummy test plugins
  const pingPlugin = {
    filePath: '/tmp/test_ping.js',
    relativePath: 'test_ping.js',
    category: 'test',
    primaryCommand: 'ping',
    commands: ['ping', 'p'],
    allCommands: ['ping', 'p'],
    owner: false,
    premium: false,
    group: false,
    private: false,
    admin: false,
    botadmin: false,
    noJadiBot: false,
    limit: false,
    register: false,
    handler: async (m, ctx) => {
      pingExecuted = true
      await m.reply('pong!')
    }
  }

  const ownerPlugin = {
    filePath: '/tmp/test_owner.js',
    relativePath: 'test_owner.js',
    category: 'test',
    primaryCommand: 'owneronly',
    commands: ['owneronly'],
    allCommands: ['owneronly'],
    owner: true,
    handler: async (m) => {
      ownerExecuted = true
      await m.reply('owner success')
    }
  }

  const limitPlugin = {
    filePath: '/tmp/test_limit.js',
    relativePath: 'test_limit.js',
    category: 'test',
    primaryCommand: 'limitcmd',
    commands: ['limitcmd'],
    allCommands: ['limitcmd'],
    limit: true,
    handler: async (m) => {
      limitExecuted = true
      await m.reply('limit success')
    }
  }

  const hooksPlugin = {
    filePath: '/tmp/test_hooks.js',
    relativePath: 'test_hooks.js',
    category: 'test',
    commands: [],
    allCommands: [],
    handler: {
      before: async () => { beforeHookRan = true },
      all: async () => { allHookRan = true }
    }
  }

  registry.plugins.set(pingPlugin.filePath, pingPlugin)
  registry.commands.set('ping', pingPlugin)
  registry.commands.set('p', pingPlugin)

  registry.plugins.set(ownerPlugin.filePath, ownerPlugin)
  registry.commands.set('owneronly', ownerPlugin)

  registry.plugins.set(limitPlugin.filePath, limitPlugin)
  registry.commands.set('limitcmd', limitPlugin)

  registry.plugins.set(hooksPlugin.filePath, hooksPlugin)

  const sock = createMockSock()

  // 1. Normal command execution with prefix
  const raw1 = createRawMessage({ text: '.ping' })
  await messageHandler(sock, { type: 'notify', messages: [raw1] }, registry)
  assert.equal(pingExecuted, true, '.ping should execute handler')
  assert.equal(beforeHookRan, true, 'before hook should run')
  assert.equal(allHookRan, true, 'all hook should run')
  assert.ok(sock.sentMessages.some(m => m.content.text === 'pong!'), 'Reply pong! sent')

  // 2. Command execution without prefix (noPrefix)
  pingExecuted = false
  const raw2 = createRawMessage({ text: 'ping' })
  await messageHandler(sock, { type: 'notify', messages: [raw2] }, registry)
  assert.equal(pingExecuted, true, 'noPrefix ping should execute handler')

  // 3. Similar command / "Did You Mean"
  sock.sentMessages.length = 0
  const raw3 = createRawMessage({ text: '.pign' })
  await messageHandler(sock, { type: 'notify', messages: [raw3] }, registry)
  const dymMsg = sock.sentMessages.find(m => m.content.text && m.content.text.includes('Mungkin maksud kamu'))
  assert.ok(dymMsg, 'Did you mean suggestion should be replied for .pign')
  assert.ok(dymMsg.content.text.includes('.ping'), 'Suggestion should suggest .ping')

  // 4. Owner permission check: non-owner blocked
  sock.sentMessages.length = 0
  const raw4 = createRawMessage({ remoteJid: '62822222222@s.whatsapp.net', text: '.owneronly' })
  await messageHandler(sock, { type: 'notify', messages: [raw4] }, registry)
  assert.equal(ownerExecuted, false, 'Non-owner must NOT execute owner command')
  const ownerBlocked = sock.sentMessages.find(m => m.content.text && m.content.text.includes('Owner Bot'))
  assert.ok(ownerBlocked, 'Blocked message should mention Owner Bot')

  // 5. Limit check and consumption
  const userNum = '628777777777'
  databaseApi.updateUser(userNum, { limit_count: 2 })
  sock.sentMessages.length = 0

  const raw5 = createRawMessage({ remoteJid: `${userNum}@s.whatsapp.net`, text: '.limitcmd' })
  await messageHandler(sock, { type: 'notify', messages: [raw5] }, registry)
  assert.equal(limitExecuted, true, 'limitcmd should execute')
  const userAfter1 = databaseApi.getUser(userNum)
  assert.equal(userAfter1.limit_count, 1, 'Limit should decrement by 1')

  // Decrement again to 0
  limitExecuted = false
  const raw6 = createRawMessage({ remoteJid: `${userNum}@s.whatsapp.net`, text: '.limitcmd' })
  await messageHandler(sock, { type: 'notify', messages: [raw6] }, registry)
  assert.equal(limitExecuted, true)
  const userAfter2 = databaseApi.getUser(userNum)
  assert.equal(userAfter2.limit_count, 0, 'Limit should now be 0')

  // Third time: should be blocked due to limit exhaustion
  limitExecuted = false
  sock.sentMessages.length = 0
  const raw7 = createRawMessage({ remoteJid: `${userNum}@s.whatsapp.net`, text: '.limitcmd' })
  await messageHandler(sock, { type: 'notify', messages: [raw7] }, registry)
  assert.equal(limitExecuted, false, 'limitcmd should be blocked when limit is 0')
  const limitBlocked = sock.sentMessages.find(m => m.content.text && m.content.text.includes('limit harian'))
  assert.ok(limitBlocked, 'Blocked message should warn about exhausted limit')
})
