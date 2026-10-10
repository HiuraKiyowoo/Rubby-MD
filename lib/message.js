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
import sharp from 'sharp'
import { jidNormalizedUser, isLidUser, isPnUser } from 'ruby-baileys'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let cachedThumb = null

async function getProcessedThumb() {
  if (cachedThumb) return cachedThumb
  try {
    const thumbPath = path.resolve(__dirname, '../media/allmenu.jpg')
    const fallbackPath = path.resolve(__dirname, '../media/thumb.jpg')
    let raw = null
    if (fs.existsSync(thumbPath)) {
      raw = fs.readFileSync(thumbPath)
    } else if (fs.existsSync(fallbackPath)) {
      raw = fs.readFileSync(fallbackPath)
    }

    if (raw) {
      cachedThumb = await sharp(raw)
        .resize(200, 200, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toBuffer()
      return cachedThumb
    }
  } catch {}
  cachedThumb = Buffer.alloc(0)
  return cachedThumb
}

export function getFakeQuoted(sock) {
  if (!cachedThumb) {
    getProcessedThumb()
  }

  const rawBotId = sock?.user?.id || ''
  const botNumber = rawBotId.split(':')[0].split('@')[0].replace(/[^0-9]/g, '')
  const botJid = botNumber ? `${botNumber}@s.whatsapp.net` : '0@s.whatsapp.net'

  return {
    key: {
      participant: '0@s.whatsapp.net',
      fromMe: false,
      id: 'StatusBiz',
      remoteJid: 'status@broadcast'
    },
    message: {
      orderMessage: {
        orderId: '44444444444444',
        thumbnail: cachedThumb || Buffer.alloc(0),
        itemCount: 12346,
        status: 1,
        surface: 1,
        message: global.botName || 'Rubby Multi Device',
        orderTitle: global.botCreator || 'Kyuu',
        sellerJid: botJid,
        token: 'RubbyMD',
        totalAmount1000: 3333333,
        totalCurrencyCode: 'IDR'
      }
    }
  }
}

export function bindMessageHelpers(sock) {
  if (!sock) return sock

  sock.getFakeQuoted = () => getFakeQuoted(sock)

  sock.decodeJid = async (jid) => {
    if (!jid || typeof jid !== 'string') return ''
    const clean = jidNormalizedUser(jid) || jid

    if (isPnUser(clean)) {
      return clean
    }

    if (isLidUser(clean) && sock?.signalRepository?.lidMapping) {
      try {
        const mapping = await sock.signalRepository.lidMapping.getPNsForLIDs([clean])
        if (mapping?.[0]?.pn) {
          return jidNormalizedUser(mapping[0].pn)
        }
      } catch {}
    }

    return clean
  }

  sock.sendText = async (jid, text, quoted = null, options = {}) => {
    const finalQuoted = getFakeQuoted(sock)
    return await sock.sendMessage(
      jid,
      {
        text: typeof text === 'string' ? text : String(text),
        ...options
      },
      {
        quoted: finalQuoted,
        ...options
      }
    )
  }

  sock.sendFile = async (jid, pathOrBuffer, filename = '', caption = '', quoted = null, ptt = false, options = {}) => {
    const finalQuoted = getFakeQuoted(sock)
    let buffer = Buffer.isBuffer(pathOrBuffer) ? pathOrBuffer : (typeof pathOrBuffer === 'string' && fs.existsSync(pathOrBuffer) ? fs.readFileSync(pathOrBuffer) : null)
    if (!buffer && typeof pathOrBuffer === 'string' && /^https?:\/\//i.test(pathOrBuffer)) {
      const res = await fetch(pathOrBuffer)
      buffer = Buffer.from(await res.arrayBuffer())
    }

    let mime = options.mimetype || ''
    if (!mime) {
      if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) mime = 'image/jpeg'
      else if (filename.endsWith('.mp4')) mime = 'video/mp4'
      else if (filename.endsWith('.mp3') || filename.endsWith('.vn') || ptt) mime = 'audio/mp4'
      else if (filename.endsWith('.webp')) mime = 'image/webp'
      else mime = 'application/octet-stream'
    }

    if (mime.startsWith('image/')) {
      return await sock.sendMessage(jid, { image: buffer, caption, ...options }, { quoted: finalQuoted })
    } else if (mime.startsWith('video/')) {
      return await sock.sendMessage(jid, { video: buffer, caption, ...options }, { quoted: finalQuoted })
    } else if (mime.startsWith('audio/')) {
      return await sock.sendMessage(jid, { audio: buffer, mimetype: ptt ? 'audio/ogg; codecs=opus' : mime, ptt, ...options }, { quoted: finalQuoted })
    } else {
      return await sock.sendMessage(jid, { document: buffer, mimetype: mime, fileName: filename, caption, ...options }, { quoted: finalQuoted })
    }
  }

  if (!sock.__fakeQuotedPatched) {
    sock.__fakeQuotedPatched = true
    const originalSendMessage = sock.sendMessage.bind(sock)

    sock.sendMessage = async (jid, content = {}, options = {}) => {
      try {
        if (!options.quoted || options.quoted?.key?.remoteJid !== 'status@broadcast') {
          options = { ...options, quoted: getFakeQuoted(sock) }
        }
      } catch (e) {
        console.error('[fakequote] Error in sendMessage patch:', e)
      }
      return originalSendMessage(jid, content, options)
    }

    if (typeof sock.relayMessage === 'function') {
      const originalRelayMessage = sock.relayMessage.bind(sock)
      sock.relayMessage = async (jid, message = {}, options = {}) => {
        try {
          if (!options.quoted || options.quoted?.key?.remoteJid !== 'status@broadcast') {
            const messageKeys = Object.keys(message || {})
            const isExceeded = messageKeys.some(key =>
              ['orderMessage', 'pollCreationMessage', 'eventMessage'].includes(key)
            )
            if (!isExceeded) {
              options = { ...options, quoted: getFakeQuoted(sock) }
            }
          }
        } catch (e) {
          console.error('[fakequote] Error in relayMessage patch:', e)
        }
        return originalRelayMessage(jid, message, options)
      }
    }
  }

  return sock
}

export default bindMessageHelpers
