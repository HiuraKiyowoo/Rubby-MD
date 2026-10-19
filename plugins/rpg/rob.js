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
┇   › Feature  : ROB ADVENTURER
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
  const now = Date.now()
  const cd = 10 * 60 * 1000
  user.rpg = user.rpg || {}
  if (user.rpg.lastRob && now - user.rpg.lastRob < cd) {
    const left = Math.ceil((cd - (now - user.rpg.lastRob)) / 1000)
    return m.reply(`⏳ Polisi kerajaan masih berpatroli! Tunggu ${left} detik lagi sebelum merampok.`)
  }
  user.rpg.lastRob = now
  const success = Math.random() > 0.5
  if (success) {
    const loot = Math.floor(Math.random() * 15000) + 5000
    user.money = (user.money || 0) + loot
    databaseApi.save()
    return m.reply(`🦹 *PERAMPOKAN BERHASIL!*\n\nKamu berhasil merampok pedagang jalanan dan membawa kabur *Rp ${loot.toLocaleString()}*! 💰`)
  } else {
    const denda = 5000
    user.money = Math.max(0, (user.money || 0) - denda)
    databaseApi.save()
    return m.reply(`🚨 *TERTANGKAP BASAH!*\n\nKamu tertangkap oleh prajurit kerajaan dan didenda sebesar *Rp ${denda.toLocaleString()}*! 💸`)
  }
}
handler.help = ['rob']
handler.tags = ['rpg']
handler.command = ['rob', 'rampok']
handler.register = true
export default handler
