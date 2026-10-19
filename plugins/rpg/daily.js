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
import Economy, { formatCurrency, formatDuration, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const claimRes = Economy.claimDaily(senderNumber)

  if (!claimRes.success) {
    if (claimRes.reason === 'cooldown') {
      return m.reply(`⏳ Kamu sudah mengklaim hadiah harian hari ini!\nTunggu selama *${formatDuration(claimRes.remainingMs)}* lagi untuk klaim berikutnya.`)
    }
    return m.reply('❌ Gagal mengklaim hadiah harian.')
  }

  const caption = `╭━━━〔 ୨ৎ 🎁 *KLAIM HARIAN SUKSES* ୨ৎ 〕━━━╮
┇
┇ 🌟 *Pemain*     : ${user.name || m.pushName || 'Pengguna'}
┇ 🔥 *Streak*     : Hari ke-${claimRes.streak} ${claimRes.streak >= 7 ? '👑 (MAX STREAK!)' : ''}
┇
┇ 📦 *HADIAH YANG DIDAPATKAN:*
┇ ├ 🎟️ Limit Tambahan : +${claimRes.limitReward} Limit
┇ ├ 💰 Uang Tunai    : +${formatCurrency(claimRes.moneyReward)}
┇ └ ✨ EXP Karakter  : +${claimRes.expReward} EXP
┇
┇ 💵 *Total Saldo Sekarang* : ${formatCurrency(claimRes.newBalance)}
┇ 🎟️ *Total Limit Sekarang* : ${claimRes.newLimit} Limit
┇
┇ _💡 Pertahankan streak harianmu setiap hari untuk bonus lebih besar!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['daily', 'klaim']
handler.tags = ['rpg']
handler.command = ['daily', 'klaim']

export default handler
