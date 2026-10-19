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

let handler = async (m, { args, usedPrefix, command }) => {
  let target = ''
  if (m.quoted?.sender) {
    target = getCleanNumber(m.quoted.sender)
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = getCleanNumber(m.mentionedJid[0])
  } else if (args[0] && /^\d+$/.test(args[0]) && args[0].length >= 5) {
    target = getCleanNumber(args[0])
  }

  const rawVal = args.find(a => /^\d+$/.test(a.trim()) && a.trim() !== target)
  const val = parseInt(rawVal, 10)

  if (!target || isNaN(val) || val <= 0) {
    return m.reply(`❌ Format salah!\n\nPenggunaan:\n👉 *${usedPrefix}${command} @user <nominal>*\nContoh: *${usedPrefix}${command} @user 50000*`)
  }

  const user = databaseApi.getUser(target)
  if (!user) {
    return m.reply('❌ Pengguna tidak ditemukan dalam database bot.')
  }

  const newBal = databaseApi.addBalance(target, val, 'Ditambahkan oleh Owner')
  await m.reply(`✅ Berhasil menambahkan *+${formatCurrency(val)}* ke @${target}.\n💰 Total saldo sekarang: *${formatCurrency(newBal)}*`, {
    mentions: [`${target}@s.whatsapp.net`]
  })
}

handler.help = ['addmoney @user <jumlah>']
handler.tags = ['owner']
handler.command = ['addmoney', 'addsaldo']
handler.owner = true

export default handler
