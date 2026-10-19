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

const handler = async (m, { text, usedPrefix, command, reply }) => {
  if (!text) {
    return reply(`🏛️ *🌸 ᴘᴇɴᴄᴀʀɪᴀɴ ᴋᴏᴅᴇ ᴘᴏs 🌸*\n\n✨ ᴋᴇᴛɪᴋ ɴᴀᴍᴀ ᴋᴏᴛᴀ ᴀᴛᴀᴜ ᴋᴇᴄᴀᴍᴀᴛᴀɴɴʏᴀ ʏᴀ ᴋᴀᴋ~ 🌸 🌸\n\n*ᴄᴏɴᴛᴏʜ:*\n${usedPrefix}${command} Jakarta`)
  }

  reply(global.mess?.wait || '⏳ ᴍᴏʜᴏɴ ᴛᴜɴɢɢᴜ...')

  try {
    const apiUrl = global.API('kyzz', '/api/tools/kodepost', { kota: text.trim() }, 'apikey')
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.status || !json.result || json.result.length === 0) {
      return reply(`❌ Kode pos untuk "*${text}*" tidak ditemukan.`)
    }

    let caption = `📬 *HASIL 🌸 ᴘᴇɴᴄᴀʀɪᴀɴ ᴋᴏᴅᴇ ᴘᴏs 🌸*\n`
    caption += `📍 *Kota/🌐 *ᴡɪʟᴀʏᴀʜ:** ${json.kota || text}\n`
    caption += `🔢 *Total Result:* ${json.result.length}\n\n`

    json.result.slice(0, 20).forEach((item, index) => {
      caption += `*${index + 1}. ${item.desa || '-'}*\n`
      caption += ` ├ 📮 Kode Pos: *${item.kodepos || '-'}*\n`
      caption += ` ├ 🏙️ Kecamatan: ${item.kecamatan || '-'}\n`
      caption += ` ├ 🏢 Kota: ${item.kota || '-'}\n`
      caption += ` └ 🗺️ Provinsi: ${item.provinsi || '-'}\n\n`
    })

    if (json.result.length > 20) {
      caption += `_...dan ${json.result.length - 20} hasil lainnya._`
    }

    return reply(caption.trim())
  } catch (e) {
    console.error('[KODEPOS ERROR]', e)
    return reply(`❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺 saat mencari kode pos:\n${e.message}`)
  }
}

handler.help = ['kodepos <kota>', 'kodepost <kota>']
handler.tags = ['tools']
handler.command = ['kodepos', 'kodepost', 'carikodepos']
handler.limit = true
handler.register = true

export default handler
