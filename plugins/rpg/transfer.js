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
import Economy, { formatCurrency, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { args, text, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const senderUser = databaseApi.getUser(senderNumber)

  if (!senderUser || senderUser.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk membuat dompet terlebih dahulu.`)
  }

  // Determine recipient from mentions, quoted message, or first argument
  let targetJid = ''
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    targetJid = m.mentionedJid[0]
  } else if (m.quoted && m.quoted.sender) {
    targetJid = m.quoted.sender
  } else if (args[0]) {
    targetJid = args[0]
  }

  const recipientNumber = getCleanNumber(targetJid)
  if (!recipientNumber) {
    return m.reply(`❌ Format salah!\n\nPenggunaan:\n👉 *${usedPrefix}transfer @user <nominal>*\n👉 *${usedPrefix}transfer <nomor> <nominal>*\nContoh: *${usedPrefix}transfer @628123456789 5000*`)
  }

  if (recipientNumber === senderNumber) {
    return m.reply('❌ Kamu tidak dapat mentransfer saldo ke dirimu sendiri!')
  }

  // Amount extraction
  const rawAmount = args.find(a => /^\d+$/.test(a.trim()) && a.trim() !== recipientNumber)
  const amount = parseInt(rawAmount, 10) || 0

  if (amount <= 0) {
    return m.reply(`❌ Masukkan nominal transfer yang valid (lebih dari 0)!\nContoh: *${usedPrefix}transfer @user 10000*`)
  }

  if ((senderUser.balance || 0) < amount) {
    return m.reply(`❌ Saldo tidak mencukupi!\nSaldo kamu saat ini: *${formatCurrency(senderUser.balance || 0)}*\nNominal transfer: *${formatCurrency(amount)}*`)
  }

  const recipientUser = databaseApi.getUser(recipientNumber)
  if (!recipientUser) {
    return m.reply('❌ Penerima tidak ditemukan dalam database bot.')
  }

  const result = Economy.transfer(senderNumber, recipientNumber, amount)

  if (!result.success) {
    if (result.reason === 'insufficient_balance') {
      return m.reply(`❌ Saldo tidak mencukupi! Sisa saldo: *${formatCurrency(result.currentBalance)}*`)
    }
    return m.reply(`❌ Transfer gagal diproses (${result.reason || 'error'}).`)
  }

  const caption = `╭━━━〔 ୨ৎ 💸 *TRANSFER BERHASIL* ୨ৎ 〕━━━╮
┇
┇ 📤 *Pengirim*       : @${senderNumber}
┇ 📥 *Penerima*       : @${recipientNumber}
┇
┇ 💵 *Nominal Kirim*  : ${formatCurrency(result.amount)}
┇ 🏦 *Pajak Biaya (5%)*: ${formatCurrency(result.tax)}
┇ 💰 *Diterima Bersih*: ${formatCurrency(result.netReceive)}
┇
┇ 💳 *Sisa Saldo Kamu*: ${formatCurrency(result.senderBalance)}
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim(), { mentions: [m.sender, `${recipientNumber}@s.whatsapp.net`] })
}

handler.help = ['transfer @user <jumlah>', 'pay @user <jumlah>']
handler.tags = ['rpg']
handler.command = ['transfer', 'pay']

export default handler
