/**
╭━━━〔 ୨ৎ RUBBY MULTI DEVICE ୨ৎ 〕━━━╮
┇
┇       ✦ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗥𝗨𝗕𝗕𝗬 ✦
┇          ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა ♡
┇
┇      ░▒▓█ 𝗥 𝗨 𝗕 𝗕 𝗬 █▓▒░
┇          MULTI DEVICE SYSTEM
┇
┇  ──────── ୨୧ ────────
┇        ♡ 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 𝗜𝗡𝗙𝗢 ♡
┇  ──────── ୨୧ ────────
┇   ↳ Creator  : Kyuu
┇   ↳ GitHub   : github.com/KyuuX444
┇   ↳ YouTube  : MommyKyuu
┇   ↳ Website  : https://api.kyzzz.xyz
┇
┇  ════════ ◇ ════════
┇        📡 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
┇  ════════ ◇ ════════
┇   ↳ Updates & Announcements
┇   ↳ https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13
┇
┇  ┌─────── ⟡ ───────┐
┇          ⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢
┇  └─────── ⟡ ───────┘
┇   • Runtime  : Node.js
┇   • Engine   : Ruby-Baileys
┇   • Platform : Linux
┇   • Mode     : WhatsApp Multi Device
┇
┇  ──────── ♡ ────────
┇          🌷 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦
┇  ──────── ♡ ────────
┇   › Modular ESM Plugins
┇   › Pairing Code Authentication
┇   › Automatic Plugin Loader
┇   › Lightweight & Fast
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { serialize } from './lib/serializer.js'
import logger from './lib/logger.js'
import { normalizeJid, normalizeNumber } from './lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const disabledDbFile = path.resolve(__dirname, 'database/disabled_plugins.json')

const groupCache = new Map()
async function getGroupName(sock, jid) {
  if (!jid || !jid.endsWith('@g.us')) return ''
  const cached = groupCache.get(jid)
  if (cached && (Date.now() - cached.time < 300000)) return cached.subject
  try {
    const meta = await sock.groupMetadata(jid)
    if (meta?.subject) {
      groupCache.set(jid, { subject: meta.subject, time: Date.now() })
      return meta.subject
    }
  } catch {}
  return 'WhatsApp Group'
}

function getDisabledPlugins() {
  try {
    if (fs.existsSync(disabledDbFile)) {
      const data = JSON.parse(fs.readFileSync(disabledDbFile, 'utf-8'))
      return Array.isArray(data) ? data : []
    }
  } catch {}
  return []
}

const prefixes = ['.', '#', '!', '/', '?', '%', '&', '$', '+', '~']
const processedMessages = new Set()
const MAX_PROCESSED_CACHE = 1000

function cleanupDeduplicationCache() {
  if (processedMessages.size > MAX_PROCESSED_CACHE) {
    const arr = Array.from(processedMessages)
    const toDelete = arr.slice(0, arr.length - 500)
    for (const id of toDelete) {
      processedMessages.delete(id)
    }
  }
}

function parseCommand(rawText, registry) {
  if (!rawText || typeof rawText !== 'string') {
    return { isCommand: false, usedPrefix: '', command: '', args: [], text: '' }
  }

  const trimmed = rawText.trim()
  let matchedPrefix = ''
  for (const p of prefixes) {
    if (trimmed.startsWith(p)) {
      matchedPrefix = p
      break
    }
  }

  if (matchedPrefix) {
    const withoutPrefix = trimmed.slice(matchedPrefix.length).trim()
    const parts = withoutPrefix.split(/\s+/)
    const command = (parts[0] || '').toLowerCase()
    const args = parts.slice(1)
    const text = args.join(' ')

    return {
      isCommand: Boolean(command),
      usedPrefix: matchedPrefix,
      command,
      args,
      text
    }
  }

  if (registry) {
    const parts = trimmed.split(/\s+/)
    const command = (parts[0] || '').toLowerCase()
    if (registry.getCommand(command)) {
      const args = parts.slice(1)
      const text = args.join(' ')
      return {
        isCommand: true,
        usedPrefix: '.',
        command,
        args,
        text
      }
    }
  }

  return { isCommand: false, usedPrefix: '', command: '', args: [], text: '' }
}

export async function messageHandler(sock, chatUpdate, registry) {
  if (!chatUpdate?.messages?.length) return

  for (const rawMessage of chatUpdate.messages) {
    if (!rawMessage?.message) continue

    const remoteJid = rawMessage.key?.remoteJid || ''
    if (remoteJid.endsWith('@newsletter') || remoteJid === 'status@broadcast') continue

    const messageId = rawMessage.key?.id
    if (!messageId) continue

    if (processedMessages.has(messageId)) continue
    processedMessages.add(messageId)
    cleanupDeduplicationCache()

    const startTime = Date.now()

    const m = await serialize(sock, rawMessage)
    if (!m) continue
    if (m.chat.endsWith('@newsletter') || m.chat === 'status@broadcast') continue

    if (registry?.plugins) {
      for (const pluginData of registry.plugins.values()) {
        if (typeof pluginData.handler?.before === 'function') {
          try {
            const stop = await pluginData.handler.before(m, { sock, conn: sock, registry })
            if (stop) break
          } catch (err) {
            logger.error('Error in plugin before hook:', err)
          }
        }
      }
    }

    if (!m?.text) continue

    if (m.isOwner) {
      const rawTrimmed = (m.text || '').trim()
      if (rawTrimmed.startsWith('=>') || rawTrimmed.startsWith('>') || rawTrimmed.startsWith('$')) {
        const evalPlugin = registry.getCommand('eval')
        if (evalPlugin) {
          let op = '>'
          let code = ''
          if (rawTrimmed.startsWith('=>')) {
            op = '=>'
            code = rawTrimmed.slice(2).trim()
          } else if (rawTrimmed.startsWith('>')) {
            op = '>'
            code = rawTrimmed.slice(1).trim()
          } else if (rawTrimmed.startsWith('$')) {
            op = '$'
            code = rawTrimmed.slice(1).trim()
          }

          const pluginContext = {
            sock,
            conn: sock,
            args: code ? code.split(/\s+/) : [],
            text: code,
            command: op,
            usedPrefix: op,
            prefix: op,
            registry
          }

          try {
            await evalPlugin.handler(m, pluginContext)
            const responseTime = Date.now() - startTime
            const groupName = m.isGroup ? await getGroupName(sock, m.chat) : ''
            logger.chat({
              isGroup: m.isGroup,
              groupName,
              sender: m.pushName || 'Owner',
              number: normalizeNumber(m.sender),
              message: rawTrimmed,
              command: op,
              responseTime,
              status: 'success ✓'
            })
          } catch (err) {
            const responseTime = Date.now() - startTime
            const groupName = m.isGroup ? await getGroupName(sock, m.chat) : ''
            logger.chat({
              isGroup: m.isGroup,
              groupName,
              sender: m.pushName || 'Owner',
              number: normalizeNumber(m.sender),
              message: rawTrimmed,
              command: op,
              responseTime,
              status: 'error ✗'
            })
            await m.reply(String(err))
          }
          continue
        }
      }
    }

    const parsed = parseCommand(m.text, registry)
    if (!parsed.isCommand || !parsed.command) {
      const groupName = m.isGroup ? await getGroupName(sock, m.chat) : ''
      logger.chat({
        isGroup: m.isGroup,
        groupName,
        sender: m.pushName || (m.isOwner ? 'Owner' : 'User'),
        number: normalizeNumber(m.sender),
        message: m.text,
        command: '-',
        responseTime: Date.now() - startTime,
        status: 'message'
      })
      continue
    }

    const { command, args, text, usedPrefix } = parsed
    const plugin = registry.getCommand(command)

    if (!plugin) {
      const groupName = m.isGroup ? await getGroupName(sock, m.chat) : ''
      logger.chat({
        isGroup: m.isGroup,
        groupName,
        sender: m.pushName || (m.isOwner ? 'Owner' : 'User'),
        number: normalizeNumber(m.sender),
        message: m.text,
        command: `${usedPrefix}${command}`,
        responseTime: Date.now() - startTime,
        status: 'unhandled'
      })
      continue
    }

    const isSelfMode = (global.mode || 'public').toLowerCase() === 'self'
    if (isSelfMode && !m.isOwner) continue

    const senderJid = m.sender
    const senderNumber = normalizeNumber(senderJid)
    const botJid = sock.user?.id ? normalizeJid(sock.user.id) : ''
    const botNumber = normalizeNumber(botJid)

    if (!m.isOwner) {
      const disabledList = getDisabledPlugins()
      if (disabledList.includes(command) || disabledList.includes(plugin.primaryCommand)) {
        await m.reply('Perintah ini sedang dinonaktifkan oleh owner.')
        continue
      }
    }

    if (plugin.owner && !m.isOwner) {
      await m.reply('Perintah ini hanya dapat digunakan oleh *Owner Bot*.')
      continue
    }

    if (plugin.premium && !m.isPremium) {
      await m.reply('Perintah ini khusus untuk *Pengguna Premium*.')
      continue
    }

    if (plugin.group && !m.isGroup) {
      await m.reply('Perintah ini hanya dapat digunakan di dalam *Grup*.')
      continue
    }

    if (plugin.private && m.isGroup) {
      await m.reply('Perintah ini hanya dapat digunakan di *Chat Pribadi*.')
      continue
    }

    if (m.isGroup && (plugin.admin || plugin.botadmin)) {
      try {
        const groupMetadata = await sock.groupMetadata(m.chat)
        const participants = groupMetadata?.participants || []

        const userAdmin = participants.find(p => normalizeNumber(p.id) === senderNumber)?.admin
        const isUserAdmin = Boolean(userAdmin === 'admin' || userAdmin === 'superadmin' || m.isOwner)

        const botAdmin = participants.find(p => normalizeNumber(p.id) === botNumber)?.admin
        const isBotAdmin = Boolean(botAdmin === 'admin' || botAdmin === 'superadmin')

        if (plugin.admin && !isUserAdmin) {
          await m.reply('Perintah ini hanya dapat digunakan oleh *Admin Grup*.')
          continue
        }

        if (plugin.botadmin && !isBotAdmin) {
          await m.reply('Bot harus menjadi *Admin Grup* untuk menjalankan perintah ini.')
          continue
        }
      } catch (err) {
        logger.error('Failed to fetch group metadata for permission check', err)
        await m.reply('Gagal memverifikasi status admin grup.')
        continue
      }
    }

    if (plugin.noJadiBot && sock.isJadiBot) {
      await m.reply('Perintah ini tidak dapat dijalankan pada sesi JadiBot.')
      continue
    }

    try {
      const pluginContext = {
        sock,
        conn: sock,
        args,
        text,
        command,
        usedPrefix,
        prefix: usedPrefix,
        registry,
        reply: (text, opt) => m.reply(text, opt)
      }

      await plugin.handler(m, pluginContext)
      const responseTime = Date.now() - startTime
      const groupName = m.isGroup ? await getGroupName(sock, m.chat) : ''
      logger.chat({
        isGroup: m.isGroup,
        groupName,
        sender: m.pushName || (m.isOwner ? 'Owner' : 'User'),
        number: senderNumber,
        message: m.text,
        command: `${usedPrefix}${command}`,
        responseTime,
        status: 'success ✓'
      })
    } catch (err) {
      const responseTime = Date.now() - startTime
      const groupName = m.isGroup ? await getGroupName(sock, m.chat) : ''
      logger.chat({
        isGroup: m.isGroup,
        groupName,
        sender: m.pushName || (m.isOwner ? 'Owner' : 'User'),
        number: senderNumber,
        message: m.text,
        command: `${usedPrefix}${command}`,
        responseTime,
        status: 'error ✗'
      })
      logger.error(`Plugin execution failed for command '${usedPrefix}${command}'`, err)
      try {
        await m.reply(`Terjadi kesalahan saat mengeksekusi perintah *${usedPrefix}${command}*:\n\`\`\`${err?.message || err}\`\`\``)
      } catch {}
    }
  }
}

export default messageHandler
