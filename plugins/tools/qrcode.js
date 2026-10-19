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

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
  const client = sock || conn || global.mainSock
  let input = text || (m.quoted ? (m.quoted.text || m.quoted.caption) : '')

  if (!input) {
    return reply(`📱 *🌸 ǫʀᴄᴏᴅᴇ ɢᴇɴᴇʀᴀᴛᴏʀ 🌸*\n\n✨ ᴋɪʀɪᴍ ᴛᴇᴋs ᴀᴛᴀᴜ ʟɪɴᴋ ʏᴀɴɢ ᴍᴀᴜ ᴅɪʙɪᴋɪɴ ǫʀᴄᴏᴅᴇ ʏᴀ ᴋᴀᴋ~ ✨ ✨\n\n*ᴄᴏɴᴛᴏʜ:*\n${usedPrefix}${command} https://api.kyzzz.xyz`)
  }

  reply(global.mess?.wait || '⏳ ᴍᴏʜᴏɴ ᴛᴜɴɢɢᴜ...')

  try {
    const apiUrl = global.API('kyzz', '/api/tools/qrcode', { text: input.trim() }, 'apikey')
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const buffer = Buffer.from(await res.arrayBuffer())

    await client.sendMessage(m.chat, {
      image: buffer,
      caption: `📷 *QR CODE MAKER*\n\n📝 *Teks:* ${input.trim()}`
    }, { quoted: m })
  } catch (e) {
    console.error('[QRCODE ERROR]', e)
    return reply(`❌ ɢᴀɢᴀʟ membuat QR Code:\n${e.message}`)
  }
}

handler.help = ['qrcode <teks>', 'qr <teks>']
handler.tags = ['tools']
handler.command = ['qrcode', 'qr']
handler.limit = true
handler.register = true

export default handler
