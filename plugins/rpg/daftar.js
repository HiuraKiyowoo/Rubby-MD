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

let handler = async (m, { text, usedPrefix, command }) => {
  const senderNumber = getCleanNumber(m.sender)
  if (!senderNumber) {
    return m.reply('❌ Gagal mengidentifikasi nomor pengirim.')
  }

  const existing = databaseApi.getUser(senderNumber)
  if (existing && existing.registered === 1) {
    return m.reply(`🌸 Kamu sudah terdaftar sebelumnya sebagai *${existing.name || m.pushName || 'Pengguna'}*!\n\nKetik *${usedPrefix}profile* untuk melihat statistik akunmu.`)
  }

  const name = (text || m.pushName || 'Player').trim().slice(0, 35)
  const regResult = databaseApi.registerUser(senderNumber, name)

  if (!regResult.success) {
    if (regResult.reason === 'already_registered') {
      return m.reply(`🌸 Akunmu sudah terdaftar! Ketik *${usedPrefix}profile* untuk melihat profil.`)
    }
    return m.reply('❌ Gagal melakukan registrasi akun.')
  }

  const { bonuses, user } = regResult
  const replyMsg = `╭━━━〔 ୨ৎ 🌸 *REGISTRASI BERHASIL* ୨ৎ 〕━━━╮
┇
┇ Selamat datang di Rubby Multi Device, *${user.name}*!
┇ Akunmu telah berhasil diverifikasi dan terdaftar.
┇
┇ 🎁 *BONUS PENGGUNA BARU:*
┇ ├ 🎟️ Limit Awal  : +${bonuses.limit} Limit
┇ ├ 💰 Saldo Awal  : ${formatCurrency(bonuses.balance)}
┇ └ 🌟 EXP Awal    : +${bonuses.exp} EXP
┇
┇ 📌 *LANGKAH SELANJUTNYA:*
┇ ├ Ketik *${usedPrefix}profile* untuk melihat kartu identitasmu
┇ ├ Ketik *${usedPrefix}rpg* untuk melihat menu game lengkap
┇ └ Ketik *${usedPrefix}selectjob* untuk memilih kelas karaktermu
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(replyMsg)
}

handler.help = ['daftar <nama>', 'register <nama>']
handler.tags = ['rpg']
handler.command = ['daftar', 'register']

export default handler
