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
┇   › Feature  : Google Search / News
┇   › Scraper  : scrape/google.js
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import { GoogleSearch } from '../../scrape/google.js'

const handler = async (m, { text, reply, usedPrefix, command }) => {
  if (!text) {
    return reply(`🔍 *GOOGLE SEARCH*\n\nPencarian informasi & berita Google.\n\nContoh:\n${usedPrefix}${command} Berita teknologi terbaru\n${usedPrefix}${command} AI Gemini`)
  }

  await m.react('⏳')

  try {
    const res = await GoogleSearch(text.trim())

    if (!res.status || !res.results || res.results.length === 0) {
      await m.react('✖️')
      return reply(`❌ Tidak ditemukan hasil untuk *"${text}"*.`)
    }

    await m.react('✅')

    const items = res.results.slice(0, 10)
    let caption = `🌐 *GOOGLE SEARCH RESULTS*\n\n`
    caption += `🔎 *Query:* ${text}\n`
    caption += `📊 *Ditemukan:* ${res.results.length} hasil\n\n`
    caption += `──────────────────\n\n`

    items.forEach((item, idx) => {
      caption += `*${idx + 1}. ${item.resource_title}*\n`
      if (item.origin_node) caption += `   🏢 Sumber: *${item.origin_node}*\n`
      if (item.temporal_stamp) caption += `   🕒 Waktu: ${item.temporal_stamp}\n`
      caption += `   🔗 Link: ${item.resolved_endpoint}\n\n`
    })

    return reply(caption.trim())
  } catch (e) {
    await m.react('❌')
    return reply(`❌ Terjadi kesalahan: ${e.message || String(e)}`)
  }
}

handler.help = ['google <query>', 'googlesearch <query>', 'gnews <query>']
handler.tags = ['search']
handler.command = /^(google|googlesearch|gsearch|gnews)$/i
handler.limit = true
handler.register = true

export default handler
