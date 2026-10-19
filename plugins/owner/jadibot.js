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

import { startJadiBot, hasBot, getCleanNumber } from '../../lib/jadibot.js'

let handler = async (m, { args, usedPrefix, isOwner, isPremium, sock, registry }) => {
  if (m.isJadiBot || sock?.isJadiBot) {
    return m.reply('❌ Fitur ini tidak dapat dijalankan di dalam sesi *JadiBot*!')
  }

  if (!isOwner && !isPremium) {
    return m.reply('💎 Fitur *JadiBot* ini khusus untuk *Pengguna Premium* / *Owner*!\nSilakan hubungi owner untuk upgrade status akunmu.')
  }

  const rawNumber = args[0] || (m.sender ? m.sender.split('@')[0] : '')
  const number = getCleanNumber(rawNumber)

  if (!number || number.length < 8) {
    return m.reply(`❌ Masukkan nomor WhatsApp yang valid!\n\nPenggunaan:\n👉 *${usedPrefix}jadibot <nomor>*\nContoh: *${usedPrefix}jadibot 6281234567890*`)
  }

  if (hasBot(number)) {
    return m.reply(`⚠️ Sesi Jadibot untuk nomor *+${number}* sudah aktif!\nKetik *${usedPrefix}listjadibot* untuk melihat daftar atau *${usedPrefix}stopjadibot ${number}* untuk mematikan.`)
  }

  await m.reply(`🌸 Menyiapkan pairing code untuk *+${number}*...\n_Tunggu sebentar ya manis (˶ᵔ ᵕ ᵔ˶)_`)
  await startJadiBot(number, m, false, registry)
}

handler.help = ['jadibot <nomor>']
handler.tags = ['owner']
handler.command = ['jadibot']
handler.noJadiBot = true

export default handler
