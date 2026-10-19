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
┇   › Feature  : GAMBLE TAVERN
┇   › Category : RPG
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import databaseApi from '../../lib/database.js'

const handler = async (m, { text }) => {
  const user = databaseApi.getUser(m.sender)
  const bet = parseInt(text, 10)
  if (!bet || bet < 1000 || bet > (user.money || 0)) {
    return m.reply(`🎲 *KEDAI TARUHAN TAVERNA*\n\nMinimal taruhan adalah Rp 1.000 dan tidak boleh melebihi saldo dompetmu!\nContoh: *.gamble 5000*`)
  }
  const userRoll = Math.floor(Math.random() * 6) + 1
  const botRoll = Math.floor(Math.random() * 6) + 1
  if (userRoll > botRoll) {
    user.money += bet
    databaseApi.save()
    return m.reply(`🎲 Hasil: Kamu (${userRoll}) vs Tavern (${botRoll})\n\n🎉 *KAMU MENANG!* Hadiah: *+Rp ${bet.toLocaleString()}*`)
  } else if (userRoll < botRoll) {
    user.money -= bet
    databaseApi.save()
    return m.reply(`🎲 Hasil: Kamu (${userRoll}) vs Tavern (${botRoll})\n\n💀 *KAMU KALAH!* Uangmu berkurang *-Rp ${bet.toLocaleString()}*`)
  } else {
    return m.reply(`🎲 Hasil: Kamu (${userRoll}) vs Tavern (${botRoll})\n\n🤝 *SERI!* Taruhan dikembalikan.`)
  }
}
handler.help = ['gamble <jumlah>']
handler.tags = ['rpg']
handler.command = ['gamble', 'judi']
handler.register = true
export default handler
