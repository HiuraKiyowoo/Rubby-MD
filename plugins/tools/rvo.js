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

let handler = async (m, { sock, conn, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted

  if (!quoted) {
    return m.reply(`Balas (reply) pesan View Once (sekali lihat) dengan:\n${usedPrefix}${command}`)
  }

  let buffer
  try {
    buffer = typeof quoted.download === 'function' ? await quoted.download() : null
  } catch (e) {
    return m.reply(`Gagal mengunduh pesan View Once: ${e.message || e}`)
  }

  if (!buffer || !Buffer.isBuffer(buffer)) {
    return m.reply('Gagal membaca media View Once. Pastikan Anda membalas pesan View Once!')
  }

  const mime = quoted.mimetype || ''
  const caption = quoted.caption || quoted.text || ''

  try {
    if (/video/i.test(mime)) {
      return await client.sendMessage(
        m.chat,
        {
          video: buffer,
          caption: caption ? `[RVO]\n${caption}` : '[RVO]',
          mimetype: mime
        },
        { quoted: m.raw }
      )
    }

    if (/audio/i.test(mime)) {
      return await client.sendMessage(
        m.chat,
        {
          audio: buffer,
          mimetype: mime,
          ptt: false
        },
        { quoted: m.raw }
      )
    }

    return await client.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: caption ? `[RVO]\n${caption}` : '[RVO]',
        mimetype: mime || 'image/jpeg'
      },
      { quoted: m.raw }
    )
  } catch (e) {
    return m.reply(`Gagal mengirim kembali media: ${e.message || e}`)
  }
}

handler.command = ['rvo', 'readviewonce', 'readvo']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
