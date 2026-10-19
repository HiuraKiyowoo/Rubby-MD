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

let handler = async (m, { args, usedPrefix, command }) => {
  let target = ''
  if (m.quoted?.sender) {
    target = getCleanNumber(m.quoted.sender)
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = getCleanNumber(m.mentionedJid[0])
  } else if (args[0] && /^\d+$/.test(args[0]) && args[0].length >= 5) {
    target = getCleanNumber(args[0])
  }

  if (!target) {
    return m.reply(`❌ Format salah!\n\nPenggunaan:\n👉 *${usedPrefix}${command} @user*\n👉 *${usedPrefix}${command} <nomor>*\nContoh: *${usedPrefix}${command} @user*`)
  }

  const user = databaseApi.getUser(target)
  if (!user) {
    return m.reply('❌ Pengguna tidak ditemukan dalam database bot.')
  }

  databaseApi.updateUser(target, { last_daily: 0 })
  await m.reply(`✅ Cooldown daily untuk @${target} berhasil di-reset.\nPengguna dapat mengklaim bonus harian kembali sekarang!`, {
    mentions: [`${target}@s.whatsapp.net`]
  })
}

handler.help = ['resetdaily @user']
handler.tags = ['owner']
handler.command = ['resetdaily']
handler.owner = true

export default handler
