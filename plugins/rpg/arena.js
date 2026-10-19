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
┇   › Feature  : ARENA PVP
┇   › Category : RPG
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import databaseApi from '../../lib/database.js'

const handler = async (m) => {
  const user = databaseApi.getUser(m.sender)
  user.rpg = user.rpg || {}
  const enemies = ['Gladiator Barbar', 'Ksatria Hitam', 'Pemanah Elit', 'Pendekar Bayangan']
  const enemy = enemies[Math.floor(Math.random() * enemies.length)]
  const win = Math.random() > 0.4
  if (win) {
    const reward = Math.floor(Math.random() * 10000) + 5000
    user.money = (user.money || 0) + reward
    user.exp = (user.exp || 0) + 80
    databaseApi.save()
    return m.reply(`⚔️ *ARENA COLISEUM*\n\nKamu menantang *${enemy}* dan berhasil MENANG! 🏆\n\n💰 Hadiah: *Rp ${reward.toLocaleString()}*\n📈 Exp: *+80 EXP*`)
  } else {
    user.rpg.hp = Math.max(10, (user.rpg.hp || 100) - 30)
    databaseApi.save()
    return m.reply(`⚔️ *ARENA COLISEUM*\n\nKamu kalah bertarung melawan *${enemy}*! HP berkurang 30. Pulihkan HP-mu dengan *.heal*.`)
  }
}
handler.help = ['arena']
handler.tags = ['rpg']
handler.command = ['arena', 'duel']
handler.register = true
export default handler
