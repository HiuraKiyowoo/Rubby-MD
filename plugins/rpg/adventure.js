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
import RPG from '../../lib/rpg.js'
import { formatCurrency, formatDuration, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const advRes = RPG.adventure(senderNumber)

  if (!advRes.success) {
    if (advRes.reason === 'cooldown') {
      return m.reply(`⏳ Kamu masih dalam perjalanan ekspedisi!\nTunggu selama *${formatDuration(advRes.remainingMs)}* sebelum memulai petualangan baru.`)
    }
    if (advRes.reason === 'out_of_stamina') {
      return m.reply(`⚡ Stamina tidak mencukupi untuk berpetualang jauh (*${advRes.stats.currentStamina} Stamina*)!\nIstirahatlah terlebih dahulu dengan *${usedPrefix}heal*.`)
    }
    return m.reply('❌ Terjadi kesalahan saat berpetualang.')
  }

  const itemsText = advRes.collected && advRes.collected.length > 0
    ? advRes.collected.join(', ')
    : 'Tidak ada item tambahan'

  const caption = `╭━━━〔 ୨ৎ 🗺️ *PETUALANGAN SELESAI* ୨ৎ 〕━━━╮
┇
┇ 📍 *Lokasi*       : ${advRes.place}
┇ 📜 *Kisah*        : ${advRes.desc}
┇
┇ 🎁 *HASIL TEMUAN EKSPEDISI:*
┇ ├ 💵 Harta Karun  : +${formatCurrency(advRes.money)}
┇ ├ ✨ EXP Diperoleh : +${advRes.exp} EXP
┇ └ 🎒 Harta Bawaan  : ${itemsText}
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['adventure', 'petualang']
handler.tags = ['rpg']
handler.command = ['adventure', 'petualang']

export default handler
