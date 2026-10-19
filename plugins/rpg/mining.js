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
┇   › Feature  : MINING
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
  const now = Date.now()
  const cd = 3 * 60 * 1000
  if (user.rpg.lastMining && now - user.rpg.lastMining < cd) {
    const left = Math.ceil((cd - (now - user.rpg.lastMining)) / 1000)
    return m.reply(`⏳ Kamu masih lelah menambang! Istirahat ${left} detik lagi.`)
  }
  user.rpg.lastMining = now
  const batu = Math.floor(Math.random() * 20) + 10
  const besi = Math.floor(Math.random() * 8) + 2
  const emas = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0
  user.rpg.inventory = user.rpg.inventory || {}
  user.rpg.inventory.batu = (user.rpg.inventory.batu || 0) + batu
  user.rpg.inventory.besi = (user.rpg.inventory.besi || 0) + besi
  if (emas > 0) user.rpg.inventory.emas = (user.rpg.inventory.emas || 0) + emas
  user.exp = (user.exp || 0) + 50
  databaseApi.save()
  await m.reply(`⛏️ *HASIL TAMBANG GOA*\n\n🪨 Batu: *+${batu}*\n⚙️ Besi: *+${besi}*` + (emas > 0 ? `\n✨ Emas: *+${emas}*` : '') + `\n📈 Exp: *+50 EXP*`)
}
handler.help = ['mining']
handler.tags = ['rpg']
handler.command = ['mining', 'tambang']
handler.register = true
export default handler
