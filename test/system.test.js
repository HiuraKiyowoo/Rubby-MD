import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

import { PluginRegistry } from '../lib/plugins.js'
import { initDatabase, databaseApi, flushPersist } from '../lib/database.js'
import {
  normalizeNumber,
  normalizeJid,
  isOwner,
  isPremium,
  levenshteinDistance,
  stringSimilarity,
  isValidUrl,
  isSafeUrl,
  safePath
} from '../lib/utils.js'
import { maskSensitive } from '../lib/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

test('1. Original Backup File Integrity & Entry Point Syntax', () => {
  const originalHash = '97a4a22375fddcab5e192ded1273e6d82989154073d593446f3980cb0e4741ee'
  const backupPath = path.join(rootDir, 'main.backup.js')
  const altBackupPath = path.join(rootDir, 'backup.main.js')

  assert.ok(fs.existsSync(backupPath), 'main.backup.js must exist')
  const hash1 = crypto.createHash('sha256').update(fs.readFileSync(backupPath)).digest('hex')
  assert.equal(hash1, originalHash, 'main.backup.js content must match original hash exactly')

  if (fs.existsSync(altBackupPath)) {
    const content = fs.readFileSync(altBackupPath, 'utf8')
    assert.ok(content.length > 0, 'backup.main.js must not be empty')
    assert.ok(content.includes('startJadiBot'), 'backup.main.js must integrate startJadiBot')
  }
})

test('2. Security Utilities: URL and Path Sanitization', () => {
  // SSRF Protection
  assert.equal(isValidUrl('https://google.com'), true)
  assert.equal(isValidUrl('http://example.com/api?test=1'), true)
  assert.equal(isValidUrl('ftp://example.com'), false)
  assert.equal(isValidUrl('not_a_url'), false)

  assert.equal(isSafeUrl('https://api.github.com'), true)
  assert.equal(isSafeUrl('http://127.0.0.1:8080/secret'), false)
  assert.equal(isSafeUrl('http://localhost:3000'), false)
  assert.equal(isSafeUrl('http://10.0.0.1/admin'), false)
  assert.equal(isSafeUrl('http://172.16.0.5/internal'), false)
  assert.equal(isSafeUrl('http://192.168.1.1/router'), false)
  assert.equal(isSafeUrl('http://169.254.169.254/latest/meta-data'), false)

  // Path Traversal Protection
  const base = path.resolve(rootDir, 'media')
  assert.ok(safePath(base, 'thumb.jpg'))
  assert.equal(safePath(base, '../../etc/passwd'), null)
  assert.equal(safePath(base, '../package.json'), null)
})

test('3. Logger Sensitive Data Redaction', () => {
  const ghpToken = 'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const patToken = 'github_pat_11AAAAAAA0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP'
  const apiKey = 'apikey=secret123456789'
  const bearer = 'Bearer mySecretToken123'

  const maskedGhp = maskSensitive(`Token: ${ghpToken}`)
  assert.ok(!maskedGhp.includes('1234567890'))
  assert.ok(maskedGhp.includes('ghp_***'))

  const maskedPat = maskSensitive(`PAT: ${patToken}`)
  assert.ok(!maskedPat.includes('abcdefgh'))

  const maskedApiKey = maskSensitive(`https://api.example.com?apikey=secret123456789`)
  assert.ok(!maskedApiKey.includes('secret123456789'))

  const maskedBearer = maskSensitive(`Headers: { Authorization: "${bearer}" }`)
  assert.ok(!maskedBearer.includes('mySecretToken123'))
})

test('4. String Similarity & Levenshtein Distance', () => {
  assert.equal(levenshteinDistance('ping', 'ping'), 0)
  assert.equal(levenshteinDistance('ping', 'pign'), 1) // 1 transposition (Damerau)
  assert.equal(levenshteinDistance('ping', 'pong'), 1) // 1 substitution
  assert.equal(stringSimilarity('ping', 'ping'), 1)
  assert.ok(stringSimilarity('menu', 'mennu') >= 0.75)
  assert.ok(stringSimilarity('help', 'hlp') >= 0.7)
  assert.ok(stringSimilarity('download', 'xyzrandom') < 0.3)
})

test('5. Plugin System: Load, Hot Reload & Rollback', async () => {
  const testPluginsDir = path.join(rootDir, 'tmp', `test_plugins_${Date.now()}`)
  fs.mkdirSync(testPluginsDir, { recursive: true })

  try {
    const registry = new PluginRegistry(testPluginsDir)
    const testPluginPath = path.join(testPluginsDir, 'test_cmd.js')

    let cleanedUp = false

    // Version 1: Working plugin with cleanup hook
    fs.writeFileSync(
      testPluginPath,
      `
      let handler = async (m) => { return 'v1'; }
      handler.command = ['testalpha', 'testalias']
      handler.cleanup = () => { global.__testPluginCleaned = true; }
      export default handler;
      `
    )

    const loaded1 = await registry.loadPlugin(testPluginPath)
    assert.equal(loaded1, true, 'Plugin v1 should load successfully')
    assert.ok(registry.getCommand('testalpha'), 'testalpha command should be registered')
    assert.ok(registry.getCommand('testalias'), 'testalias command should be registered')

    // Version 2: Broken update with syntax error
    fs.writeFileSync(testPluginPath, `export default broken syntax! {}`)
    const loaded2 = await registry.loadPlugin(testPluginPath)
    assert.equal(loaded2, false, 'Broken plugin should fail to load')

    // ROLLBACK CHECK: The previous working version should remain active!
    const retainedPlugin = registry.getCommand('testalpha')
    assert.ok(retainedPlugin, 'Rollback should retain previous working plugin version')
    assert.equal(await retainedPlugin.handler({}), 'v1')

    // Version 3: Valid update to v2 - triggers cleanup of v1
    fs.writeFileSync(
      testPluginPath,
      `
      let handler = async (m) => { return 'v2'; }
      handler.command = ['testbeta']
      export default handler;
      `
    )

    const loaded3 = await registry.loadPlugin(testPluginPath)
    assert.equal(loaded3, true, 'Valid update should succeed')
    assert.equal(global.__testPluginCleaned, true, 'Old plugin cleanup hook should have been called')
    assert.ok(registry.getCommand('testbeta'), 'testbeta should be registered')
    assert.equal(registry.getCommand('testalpha'), null, 'Old command testalpha should no longer be registered')

    // Did You Mean / Suggestion
    const suggestion = registry.findSimilar('testbta', 0.65)
    assert.equal(suggestion, 'testbeta', 'findSimilar should suggest testbeta for testbta')

    const noSuggestion = registry.findSimilar('completelydifferent123', 0.65)
    assert.equal(noSuggestion, null, 'findSimilar should not suggest for unrelated input')

    // Unload cleanup check
    registry.unloadPlugin(testPluginPath, false)
    assert.equal(registry.getCommand('testbeta'), null, 'Unload should completely remove command')
  } finally {
    try {
      fs.rmSync(testPluginsDir, { recursive: true, force: true })
    } catch {}
  }
})

test('6. Regex Command Matching & lastIndex Safety', () => {
  const registry = new PluginRegistry(path.join(rootDir, 'plugins'))

  const regexPlugin = {
    filePath: '/tmp/dummy_regex.js',
    handler: {
      command: /^(ping|pong|pongers)$/gi // regex with global flag to test lastIndex reset
    },
    commands: ['ping', 'pong', 'pongers'],
    allCommands: ['ping', 'pong', 'pongers']
  }

  registry.plugins.set(regexPlugin.filePath, regexPlugin)

  // Consecutive matches should always succeed despite global flag
  for (let i = 0; i < 5; i++) {
    const matchPing = registry.getCommand('ping')
    assert.ok(matchPing, `Match ${i + 1} for 'ping' must succeed`)
    const matchPong = registry.getCommand('pong')
    assert.ok(matchPong, `Match ${i + 1} for 'pong' must succeed`)
  }

  // Non-matching command should not match
  assert.equal(registry.getCommand('unknowncmd12345'), null)
})

test('7. Database: Atomic Persistence, Backup, Rotation & Recovery', async () => {
  await initDatabase()
  const db = databaseApi.getSql()
  assert.ok(db, 'Database should be initialized')

  const testNum = '62899' + Date.now().toString().slice(-7)

  // Test User operations
  const user = databaseApi.getUser(testNum)
  assert.ok(user, 'User should be retrieved')
  assert.equal(user.id, testNum)
  assert.equal(user.limit_count, 25)

  // Update User
  const updated = databaseApi.updateUser(testNum, { limit_count: 20, exp: 50 })
  assert.equal(updated, true)
  const userAfter = databaseApi.getUser(testNum)
  assert.equal(userAfter.limit_count, 20)
  assert.equal(userAfter.exp, 50)

  // Test Premium
  assert.equal(databaseApi.isPremium(testNum), false)
  databaseApi.addPremium(testNum, 60000)
  assert.equal(databaseApi.isPremium(testNum), true)
  databaseApi.delPremium(testNum)
  assert.equal(databaseApi.isPremium(testNum), false)

  // Test Groups
  const testGid = '123456789@g.us'
  databaseApi.setGroup(testGid, { welcome: true, welcomeText: 'Hello @user' })
  const groupData = databaseApi.getGroup(testGid)
  assert.equal(groupData.welcome, true)
  assert.equal(groupData.welcomeText, 'Hello @user')

  // Atomic Save and Backup
  flushPersist()
  const backupFile = databaseApi.backup()
  assert.ok(backupFile, 'Backup file should be created')
  assert.ok(fs.existsSync(backupFile), 'Backup file must exist on disk')

  // Test Backup Restoration
  const restoreSuccess = databaseApi.restore(backupFile)
  assert.equal(restoreSuccess, true, 'Database restore should succeed')
})
