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

const handler = async (m, { text, args, usedPrefix, command, reply }) => {
  let lang = 'id'
  let query = text

  if (m.quoted && m.quoted.text) {
    if (args[0] && args[0].length <= 5) {
      lang = args[0].toLowerCase()
      query = text.slice(args[0].length).trim() || m.quoted.text
    } else {
      query = m.quoted.text
    }
  } else if (text) {
    const split = text.split('|')
    if (split.length > 1) {
      lang = split[0].trim().toLowerCase()
      query = split.slice(1).join('|').trim()
    } else if (args.length > 1 && args[0].length <= 5) {
      lang = args[0].toLowerCase()
      query = args.slice(1).join(' ')
    }
  }

  if (!query) {
    return reply(`🌐 *ᴛʀᴀɴsʟᴀᴛᴇ / ᴘᴇɴᴇʀᴊᴇᴍᴀʜ*\n\n✨ *ᴄᴀʀᴀ ᴘᴀᴋᴀɪ:*\n• ${usedPrefix + command} <target_lang> <teks>\n• ${usedPrefix + command} <target_lang> | <teks>\n• Reply pesan lalu ketik: ${usedPrefix + command} <target_lang>\n\n*ᴄᴏɴᴛᴏʜ:*\n• ${usedPrefix + command} en selamat pagi\n• ${usedPrefix + command} zh | gw cinta kamu\n• ${usedPrefix + command} ja halo sayang`)
  }

  reply(global.mess?.wait || '⏳ ᴍᴏʜᴏɴ ᴛᴜɴɢɢᴜ...')

  try {
    const apiUrl = global.API('kyzz', '/api/tools/translate', {
      text: query,
      source: 'auto',
      target: lang
    }, 'apikey')

    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()
    if (!json.status || !json.result) {
      throw new Error(json.message || 'Gagal menerjemahkan teks.')
    }

    const caption = `🌐 *ᴛʀᴀɴsʟᴀᴛᴇ sᴜᴄᴄᴇss*\n\n` +
      `🔤 *Source:* ${json.source || 'Auto'}\n` +
      `🎯 *Target:* ${json.target || lang}\n` +
      `📝 *Original:*\n${json.text || query}\n\n` +
      `✨ *Result:*\n${json.result}`

    reply(caption)
  } catch (e) {
    reply(`❌ Error: ${e.message}`)
  }
}

handler.help = ['translate <lang> <teks>', 'tr <lang> <teks>']
handler.tags = ['tools']
handler.command = ['translate', 'tr']
handler.limit = true
handler.register = true

export default handler