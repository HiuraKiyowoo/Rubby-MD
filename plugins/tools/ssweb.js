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

const handler = async (m, { conn, sock, text, args, usedPrefix, command, reply }) => {
  const client = sock || conn || global.mainSock
  let inputUrl = args[0] || (m.quoted ? (m.quoted.text || '') : '')
  let device = 'desktop'

  if (args.length > 1) {
    const devInput = args[1].toLowerCase()
    if (['desktop', 'mobile', 'tablet'].includes(devInput)) {
      device = devInput
    }
  } else if (/--(mobile|tablet|desktop)/i.test(text)) {
    const match = text.match(/--(mobile|tablet|desktop)/i)
    device = match[1].toLowerCase()
    inputUrl = text.replace(/--(mobile|tablet|desktop)/gi, '').trim()
  }

  if (!inputUrl) {
    return reply(`🌐 *🌸 sᴄʀᴇᴇɴsʜᴏᴛ ᴛᴀᴍᴘɪʟᴀɴ ᴡᴇʙsɪᴛᴇ 🌸*\n\n✨ ᴋɪʀɪᴍ ʟɪɴᴋ ᴡᴇʙ ʏᴀɴɢ ᴍᴀᴜ ᴋᴀᴋᴀᴋ sᴄʀᴇᴇɴsʜᴏᴛ ʏᴀ ᴋᴀᴋ~ 🌐 🌐\n\n*ᴄᴏɴᴛᴏʜ:*\n${usedPrefix}${command} https://google.com desktop\n📱 *ᴘɪʟɪʜᴀɴ ᴅᴇᴠɪᴄᴇ:* *desktop*, *mobile*, *tablet*`)
  }

  const targetUrl = /^https?:\/\//i.test(text.trim()) ? text.trim() : `https://${text.trim()}`;

  reply(global.mess?.wait || '⏳ ᴍᴏʜᴏɴ ᴛᴜɴɢɢᴜ, sedang mengambil tangkapan layar website...')

  try {
    const apiUrl = global.API('kyzz', '/api/tools/ssweb', { url: targetUrl, device }, 'apikey')
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()
    if (!json.status || !json.result || !json.result.screenshot_url) {
      throw new Error(json.message || 'ɢᴀɢᴀʟ mengambil screenshot dari API.')
    }

    const screenshotUrl = json.result.screenshot_url
    const imgRes = await fetch(screenshotUrl)
    const imgBuffer = Buffer.from(await imgRes.arrayBuffer())

    const caption = `🌐 *🌸 sᴄʀᴇᴇɴsʜᴏᴛ ᴛᴀᴍᴘɪʟᴀɴ ᴡᴇʙsɪᴛᴇ 🌸*\n\n` +
      `🔗 *URL:* ${json.result.target_url || targetUrl}\n` +
      `📱 *Device:* ${json.result.device || device}\n` +
      `📦 *Size:* ${json.result.size || '-'}\n` +
      `📐 *Dimensions:* ${json.result.dimensions ? `${json.result.dimensions.width}x${json.result.dimensions.height}` : '-'}`

    await client.sendMessage(m.chat, {
      image: imgBuffer,
      caption
    }, { quoted: m })
  } catch (e) {
    console.error('[SSWEB ERROR]', e)
    return reply(`❌ ɢᴀɢᴀʟ mengambil tangkapan layar website: ${e.message}`)
  }
}

handler.help = ['ssweb <url> [device]']
handler.tags = ['tools']
handler.command = ['ssweb', 'sshp', 'sspc']
handler.limit = true
handler.register = true

export default handler
