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

import dns from 'node:dns'

dns.setDefaultResultOrder('ipv4first')

async function uploadUguu(buffer, filename = 'file.bin') {
  const blob = new Blob([buffer])
  const formData = new FormData()
  formData.append('files[]', blob, filename)

  const res = await fetch('https://uguu.se/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
  })

  if (!res.ok) {
    throw new Error(`Uguu upload failed with status ${res.status}`)
  }

  const json = await res.json()
  if (json.success && json.files?.[0]?.url) {
    return json.files[0].url
  }
  throw new Error('No URL returned from Uguu')
}

async function uploadQuax(buffer, filename = 'file.bin') {
  const blob = new Blob([buffer])
  const formData = new FormData()
  formData.append('files[]', blob, filename)

  const res = await fetch('https://qu.ax/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
  })

  if (!res.ok) {
    throw new Error(`Qu.ax upload failed with status ${res.status}`)
  }

  const json = await res.json()
  if (json.success && json.files?.[0]?.url) {
    return json.files[0].url
  }
  throw new Error('No URL returned from Qu.ax')
}

let handler = async (m, { usedPrefix, command }) => {
  const quoted = m.quoted || m
  const mime = quoted.mimetype || m.mimetype || ''

  if (!mime) {
    return m.reply(`Kirim atau balas (reply) media dengan command:\n${usedPrefix}${command}`)
  }

  let buffer
  try {
    buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
  } catch (e) {
    return m.reply(`Gagal mengunduh media: ${e.message || e}`)
  }

  if (!buffer || !Buffer.isBuffer(buffer)) {
    return m.reply('Media tidak valid atau gagal diunduh.')
  }

  let ext = 'bin'
  if (/image\/jpeg/i.test(mime)) ext = 'jpg'
  else if (/image\/png/i.test(mime)) ext = 'png'
  else if (/image\/webp/i.test(mime)) ext = 'webp'
  else if (/video\/mp4/i.test(mime)) ext = 'mp4'
  else if (/audio/i.test(mime)) ext = 'mp3'

  const filename = `media_${Date.now()}.${ext}`

  try {
    let url = ''
    try {
      url = await uploadUguu(buffer, filename)
    } catch (e1) {
      url = await uploadQuax(buffer, filename)
    }

    const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2)
    const replyText = `✓ *Upload Berhasil!*\n\n` +
      `🔗 *URL:* ${url}\n` +
      `📁 *Ukuran:* ${sizeMB} MB\n` +
      `📄 *Tipe:* ${mime}`

    return m.reply(replyText)
  } catch (e) {
    return m.reply(`Gagal mengupload media:\n${e.message || e}`)
  }
}

handler.command = ['tourl', 'upload', 'tolink']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
