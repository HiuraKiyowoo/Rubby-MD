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
import { formatCurrency, getCleanNumber } from '../../lib/economy.js'
import { calculateEffectiveStats, RPG_CLASSES } from '../../lib/rpg.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk membuat profil dan klaim modal awal.`)
  }

  const stats = calculateEffectiveStats(user)
  const isPrem = databaseApi.isPremium(senderNumber)
  const regDate = user.reg_time ? new Date(user.reg_time).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tidak Diketahui'

  const jobKey = String(user.job || 'novice').toLowerCase()
  const classObj = RPG_CLASSES[jobKey] || RPG_CLASSES.novice

  const caption = `╭━━━〔 ୨ৎ 👤 *PROFIL PENGGUNA* ୨ৎ 〕━━━╮
┇
┇ 🌸 *INFORMASI PENGGUNA*
┇ ├ 🏷️ Nama       : ${user.name || m.pushName || 'Player'}
┇ ├ 📱 Nomor      : +${user.id}
┇ ├ 💎 Status     : ${isPrem ? '✨ Premium VIP' : '🌱 Free User'}
┇ ├ 📅 Terdaftar  : ${regDate}
┇ └ 🎖️ Gelar      : ${user.role || 'Beginner'}
┇
┇ 💰 *FINANSIAL & LIMIT*
┇ ├ 🎟️ Sisa Limit : ${user.limit_count} Limit
┇ ├ 💵 Saldo      : ${formatCurrency(user.balance)}
┇ ├ 📈 Total Cari : ${formatCurrency(user.total_earned)}
┇ └ 🔥 Streak     : ${user.daily_streak || 0} Hari
┇
┇ ⚔️ *STATUS RPG*
┇ ├ 🛡️ Kelas      : ${classObj.emoji} ${classObj.name}
┇ ├ 📊 Level      : Lv. ${user.level || 0} (${user.exp || 0} EXP)
┇ ├ ❤️ HP         : ${stats.currentHp}/${stats.maxHp}
┇ ├ ⚡ Stamina    : ${stats.currentStamina}/${stats.maxStamina}
┇ ├ 🗡️ Serangan   : ${stats.effectiveAtk} ATK
┇ ├ 🛡️ Pertahanan : ${stats.effectiveDef} DEF
┇ ├ 🏆 Kemenangan : ${user.rpg_wins || 0} Menang / ${user.rpg_losses || 0} Kalah
┇ └ 🐉 Boss Kills : ${user.boss_kills || 0} Naga Dikalahkan
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['profile', 'me']
handler.tags = ['rpg']
handler.command = ['profile', 'me']

export default handler
