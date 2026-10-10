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

import { createSticker } from '../../lib/exif.js'

let handler = async (m, { sock, conn, text, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted || m
  const mime = quoted.mimetype || m.mimetype || ''

  const isImage = /image/i.test(mime)
  const isVideo = /video/i.test(mime)

  if (!isImage && !isVideo) {
    return m.reply(`Kirim atau balas (reply) gambar/video dengan command:\n${usedPrefix}${command} [packname|author]`)
  }

  let packName = global.packname || global.botName || 'Rubby Multi Device'
  let packPublish = global.author || global.botCreator || 'Kyuu'

  if (text) {
    const parts = text.split('|')
    if (parts[0]) packName = parts[0].trim()
    if (parts[1]) packPublish = parts[1].trim()
  }

  let buffer
  try {
    buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
  } catch (e) {
    return m.reply(`Gagal mengunduh media: ${e.message || e}`)
  }

  if (!buffer || !Buffer.isBuffer(buffer)) {
    return m.reply('Buffer media tidak valid.')
  }

  try {
    const stickerBuffer = await createSticker(buffer, {
      packName,
      packPublish,
      isVideo
    })

    return await client.sendMessage(
      m.chat,
      {
        sticker: stickerBuffer
      },
      { quoted: m.raw }
    )
  } catch (e) {
    return m.reply(`Gagal membuat stiker:\n${e.message || e}`)
  }
}

handler.command = ['sticker', 's', 'stiker', 'sgif']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
