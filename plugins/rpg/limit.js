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
import { getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)
  const isPrem = databaseApi.isPremium(senderNumber)
  const currentLimit = user ? user.limit_count : 25

  const caption = `╭━━━〔 ୨ৎ 🎟️ *LIMIT PENGGUNA* ୨ৎ 〕━━━╮
┇
┇ 👤 *Nama*   : ${user?.name || m.pushName || 'Pengguna'}
┇ 💎 *Status* : ${isPrem ? '✨ Premium (Unlimited / Bebas Limit)' : '🌱 Free User'}
┇ 🎟️ *Sisa*   : ${isPrem ? 'Tak Terbatas' : `${currentLimit} Limit`}
┇
┇ 💡 *CARA MENDAPATKAN LIMIT:*
┇ ├ 1. Klaim harian dengan *${usedPrefix}daily* (+${global.settings?.limit?.dailyBonus ?? 15} Limit/hari)
┇ ├ 2. Beli paket limit menggunakan saldo: *${usedPrefix}shop* & *${usedPrefix}buylimit*
┇ ├ 3. Selesaikan misi petualangan: *${usedPrefix}quest*
┇ └ 4. Upgrade ke status *Premium* untuk akses tanpa batas
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['limit']
handler.tags = ['rpg']
handler.command = ['limit']

export default handler
