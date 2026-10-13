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
┇   › Feature  : Honor of Kings Character Info
┇   › Scraper  : scrape/hok.js
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import scrapeHokCharacter from '../../scrape/hok.js'

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
  const client = conn || sock

  if (!text) {
    return reply(`⚔️ *HONOR OF KINGS CHARACTER*\n\nMencari informasi lengkap karakter Honor of Kings.\n\nContoh:\n${usedPrefix}${command} Luban No.7\n${usedPrefix}${command} Wukong\n${usedPrefix}${command} Angela`)
  }

  await m.react('⏳')

  try {
    const data = await scrapeHokCharacter(text.trim())

    let caption = `⚔️ *HONOR OF KINGS — ${data.title.toUpperCase()}*\n\n`

    if (data.profile && Object.keys(data.profile).length > 0) {
      caption += `📋 *PROFIL KARAKTER:*\n`
      for (const [key, val] of Object.entries(data.profile)) {
        caption += `• *${key}:* ${val}\n`
      }
      caption += `\n`
    }

    if (data.skills && data.skills.length > 0) {
      caption += `⚡ *SKILLS:*\n`
      data.skills.forEach((skill) => {
        caption += `• ${skill}\n`
      })
      caption += `\n`
    }

    if (data.bio) {
      caption += `📖 *BIO:*\n${data.bio}\n\n`
    }

    if (data.lore) {
      const loreText = data.lore.length > 600 ? data.lore.slice(0, 600) + '...' : data.lore
      caption += `📜 *LORE / BACKGROUND:*\n${loreText}\n\n`
    }

    caption += `🔗 *Wiki:* ${data.url}`

    await m.react('✅')

    if (data.image) {
      return await client.sendMessage(
        m.chat,
        {
          image: { url: data.image },
          caption: caption.trim()
        },
        { quoted: m }
      )
    }

    return reply(caption.trim())
  } catch (e) {
    await m.react('❌')
    return reply(`❌ ${e.message || 'Terjadi kesalahan saat mencari karakter.'}`)
  }
}

handler.help = ['hokchar <nama>', 'hok <nama>']
handler.tags = ['search']
handler.command = /^(hokchar|hok|hokhero|herohok)$/i
handler.limit = true
handler.register = true

export default handler
