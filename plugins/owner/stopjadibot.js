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

import { stopJadiBot, getCleanNumber, hasBot } from '../../lib/jadibot.js'

let handler = async (m, { args, usedPrefix, isOwner, isPremium, sock, command }) => {
  if (m.isJadiBot || sock?.isJadiBot) {
    return m.reply('❌ Fitur ini tidak dapat dijalankan di dalam sesi *JadiBot*!')
  }

  if (!isOwner && !isPremium) {
    return m.reply('💎 Fitur mematikan *JadiBot* ini khusus untuk *Pengguna Premium* / *Owner*!')
  }

  let rawNumber = args[0]
  if (!rawNumber && m.quoted?.sender) {
    rawNumber = m.quoted.sender
  } else if (!rawNumber && m.mentionedJid && m.mentionedJid.length > 0) {
    rawNumber = m.mentionedJid[0]
  }

  const number = getCleanNumber(rawNumber)

  if (!number) {
    return m.reply(`❌ Masukkan nomor JadiBot yang ingin dimatikan!\n\nPenggunaan:\n👉 *${usedPrefix}${command} <nomor>*\nContoh: *${usedPrefix}${command} 6281234567890*\n\nKetik *${usedPrefix}listjadibot* untuk melihat daftar nomor yang aktif.`)
  }

  if (!hasBot(number)) {
    return m.reply(`❌ Nomor *+${number}* tidak ditemukan dalam daftar JadiBot yang sedang aktif.`)
  }

  const stopRes = await stopJadiBot(number)
  if (!stopRes.success) {
    return m.reply(`❌ Gagal mematikan JadiBot untuk nomor *+${number}*.`)
  }

  await m.reply(`✅ *JADIBOT BERHASIL DIMATIKAN*\n\nNomor: *+${number}*\nStatus: *Disconnected & Session Cleared*\n\nSesi telah ditutup dan penyimpanan sesi telah dibersihkan secara aman.`)
}

handler.help = ['stopjadibot <nomor>', 'stopbot <nomor>']
handler.tags = ['owner']
handler.command = ['stopjadibot', 'stopbot', 'logoutjadibot']
handler.noJadiBot = true

export default handler
