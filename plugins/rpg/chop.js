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
┇   › Feature  : CHOP
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
  if (user.rpg.lastChop && now - user.rpg.lastChop < cd) {
    const left = Math.ceil((cd - (now - user.rpg.lastChop)) / 1000)
    return m.reply(`⏳ Kapakmu tumpul dan kamu butuh istirahat! Tunggu ${left} detik lagi.`)
  }
  user.rpg.lastChop = now
  const kayu = Math.floor(Math.random() * 25) + 15
  user.rpg.inventory = user.rpg.inventory || {}
  user.rpg.inventory.kayu = (user.rpg.inventory.kayu || 0) + kayu
  user.exp = (user.exp || 0) + 35
  databaseApi.save()
  await m.reply(`🪓 *HASIL MENEBANG POHON*\n\n🪵 Kayu: *+${kayu} Balok*\n📈 Exp: *+35 EXP*`)
}
handler.help = ['chop']
handler.tags = ['rpg']
handler.command = ['chop', 'tebang']
handler.register = true
export default handler
