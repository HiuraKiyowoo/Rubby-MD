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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const thumbPath = path.resolve(__dirname, '../../media/allmenu.jpg')
const fallbackThumbPath = path.resolve(__dirname, '../../media/thumb.jpg')

let cachedThumb = null

async function getProcessedThumb() {
  if (cachedThumb) return cachedThumb
  try {
    let raw = null
    if (fs.existsSync(thumbPath)) {
      raw = fs.readFileSync(thumbPath)
    } else if (fs.existsSync(fallbackThumbPath)) {
      raw = fs.readFileSync(fallbackThumbPath)
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

let handler = (m) => m

handler.before = async (m, { conn, sock }) => {
  const client = conn || sock
  if (!client?.user?.id) return

  const rawBotId = client.user.id
  const botNumber = rawBotId.split(':')[0].split('@')[0].replace(/[^0-9]/g, '')
  const botJid = botNumber ? `${botNumber}@s.whatsapp.net` : '0@s.whatsapp.net'

  const thumb = await getProcessedThumb()

  const buildQuoted = () => {
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
          thumbnail: thumb,
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

  if (typeof m.reply === 'function') {
    const originalReply = m.reply.bind(m)
    const wrappedReply = async (text, options = {}) => {
      let opt = typeof options === 'object' && options !== null ? { ...options } : {}
      if (!opt.quoted) {
        opt.quoted = buildQuoted()
      }
      return originalReply(text, opt)
    }

    try {
      Object.defineProperty(m, 'reply', {
        value: wrappedReply,
        writable: true,
        configurable: true,
        enumerable: false
      })
    } catch {}
  }

  if (!client.__quotedOrderSendPatched) {
    client.__quotedOrderSendPatched = true
    const originalSendMessage = client.sendMessage.bind(client)

    client.sendMessage = async (jid, content = {}, options = {}) => {
      try {
        if (!options.quoted) {
          options = { ...options, quoted: buildQuoted() }
        }
      } catch {}
      return originalSendMessage(jid, content, options)
    }
  }

  if (!client.__quotedOrderRelayPatched && typeof client.relayMessage === 'function') {
    client.__quotedOrderRelayPatched = true
    const originalRelayMessage = client.relayMessage.bind(client)

    client.relayMessage = async (jid, message = {}, options = {}) => {
      try {
        if (!options.quoted) {
          const messageKeys = Object.keys(message || {})
          const isExceeded = messageKeys.some(key =>
            ['orderMessage', 'pollCreationMessage', 'eventMessage'].includes(key)
          )

          if (!isExceeded) {
            options = { ...options, quoted: buildQuoted() }
          }
        }
      } catch {}
      return originalRelayMessage(jid, message, options)
    }
  }
}

handler.all = true
handler.hidden = true

export default handler
