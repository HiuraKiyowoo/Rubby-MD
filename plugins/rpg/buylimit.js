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

let handler = async (m, { args, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk membuat akun terlebih dahulu.`)
  }

  const packageId = args[0]
  if (!packageId) {
    return m.reply(`❌ Masukkan ID paket yang ingin dibeli!\n\nLihat daftar paket dengan *${usedPrefix}shop*\nContoh: *${usedPrefix}buylimit 1*`)
  }

  const buyRes = Economy.buyLimit(senderNumber, packageId)

  if (!buyRes.success) {
    if (buyRes.reason === 'package_not_found') {
      return m.reply(`❌ Paket ID '${packageId}' tidak ditemukan! Ketik *${usedPrefix}shop* untuk melihat ID paket yang tersedia.`)
    }
    if (buyRes.reason === 'insufficient_balance') {
      return m.reply(`❌ Saldo tidak mencukupi untuk membeli *${buyRes.pkg.name}*!\n\nHarga: *${formatCurrency(buyRes.requiredPrice)}*\nSaldo kamu saat ini: *${formatCurrency(buyRes.currentBalance)}*\n\nBekerja dulu dengan *${usedPrefix}work* atau klaim *${usedPrefix}daily*.`)
    }
    return m.reply('❌ Pembelian limit gagal diproses.')
  }

  const caption = `╭━━━〔 ୨ৎ 🛍️ *PEMBELIAN BERHASIL* ୨ৎ 〕━━━╮
┇
┇ 📦 *Paket*       : ${buyRes.pkg.name}
┇ 🎟️ *Limit Masuk* : +${buyRes.pkg.amount} Limit
┇ 💵 *Total Biaya* : ${formatCurrency(buyRes.pkg.price)}
┇
┇ 🎟️ *Sisa Limit*  : ${buyRes.newLimit} Limit
┇ 💰 *Sisa Saldo*  : ${formatCurrency(buyRes.newBalance)}
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['buylimit <id_paket>', 'belilimit <id_paket>']
handler.tags = ['rpg']
handler.command = ['buylimit', 'belilimit']

export default handler
