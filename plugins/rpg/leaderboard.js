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

import databaseApi from '../../lib/database.js'
import { formatCurrency } from '../../lib/economy.js'

let handler = async (m, { args, usedPrefix }) => {
  const category = (args[0] || 'balance').toLowerCase()
  const validCategories = {
    balance: 'Saldo Terkaya',
    money: 'Saldo Terkaya',
    limit: 'Limit Terbanyak',
    level: 'Level Tertinggi',
    wins: 'Kemenangan RPG',
    boss: 'Pembunuh Boss Naga'
  }

  const title = validCategories[category] || 'Saldo Terkaya'
  const filterCat = category === 'boss' ? 'boss_kills' : category
  const leaders = databaseApi.getLeaderboard(filterCat, 10)

  if (!leaders || leaders.length === 0) {
    return m.reply('🏆 Belum ada data pemain terdaftar dalam papan peringkat.')
  }

  const medalEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
  let caption = `╭━━━〔 ୨ৎ 🏆 *PAPAN PERINGKAT: ${title.toUpperCase()}* ୨ৎ 〕━━━╮\n┇\n`

  leaders.forEach((u, idx) => {
    const medal = medalEmojis[idx] || `${idx + 1}.`
    let valStr = ''
    if (category === 'limit') {
      valStr = `${u.limit_count} Limit`
    } else if (category === 'level') {
      valStr = `Lv. ${u.level} (${u.exp} EXP)`
    } else if (category === 'wins') {
      valStr = `${u.rpg_wins} Menang`
    } else if (category === 'boss') {
      valStr = `${u.boss_kills} Kills`
    } else {
      valStr = formatCurrency(u.balance)
    }

    const name = u.name || `User @${u.id}`
    caption += `┇ ${medal} *${name}* [${valStr}]\n`
  })

  caption += `┇\n┇ 💡 *KATEGORI LAIN:* ${usedPrefix}leaderboard <balance | limit | level | wins | boss>\n`
  caption += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['leaderboard [kategori]', 'top [kategori]']
handler.tags = ['rpg']
handler.command = ['leaderboard', 'top']

export default handler
