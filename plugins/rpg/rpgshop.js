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
import RPG, { RPG_ITEMS } from '../../lib/rpg.js'
import { formatCurrency, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { args, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const itemId = args[0]
  const count = parseInt(args[1], 10) || 1

  if (!itemId) {
    let caption = `╭━━━〔 ୨ৎ 🏪 *TOKO PERLENGKAPAN RPG* ୨ৎ 〕━━━╮\n┇\n`
    caption += `┇ 👤 *Pembeli* : ${user.name || m.pushName || 'Player'}\n`
    caption += `┇ 💰 *Saldo*   : ${formatCurrency(user.balance || 0)}\n┇\n`
    caption += `┇ 📦 *DAFTAR ITEM YANG DIJUAL:*\n`

    for (const [id, it] of Object.entries(RPG_ITEMS)) {
      if (!it.price) continue
      caption += `┇ [ID: ${id}] *${it.name}*\n`
      caption += `┇ ├ 💵 Harga : ${formatCurrency(it.price)}\n`
      caption += `┇ └ ℹ️ Efek  : ${it.desc}\n`
    }

    caption += `┇\n┇ 💡 *CARA MEMBELI:*\n`
    caption += `┇ Ketik: *${usedPrefix}rpgshop <id_item> <jumlah>*\n`
    caption += `┇ Contoh: *${usedPrefix}rpgshop potion_heal 3*\n`
    caption += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    return m.reply(caption.trim())
  }

  const buyRes = RPG.buyRpgItem(senderNumber, itemId, count)

  if (!buyRes.success) {
    if (buyRes.reason === 'item_not_buyable') {
      return m.reply(`❌ Item '${itemId}' tidak dijual di toko ini! Ketik *${usedPrefix}rpgshop* untuk melihat daftar item.`)
    }
    if (buyRes.reason === 'insufficient_balance') {
      return m.reply(`❌ Saldo tidak mencukupi!\nTotal harga: *${formatCurrency(buyRes.requiredPrice)}*\nSaldo kamu: *${formatCurrency(buyRes.currentBalance)}*`)
    }
    return m.reply('❌ Pembelian gagal diproses.')
  }

  const caption = `╭━━━〔 ୨ৎ 🛍️ *TRANSAKSI RPG SUKSES* ୨ৎ 〕━━━╮
┇
┇ 📦 *Item Dibeli*  : ${buyRes.quantity}x ${buyRes.item.name}
┇ 💵 *Total Biaya*  : ${formatCurrency(buyRes.totalPrice)}
┇ 💰 *Sisa Saldo*   : ${formatCurrency(buyRes.newBalance)}
┇
┇ _Item telah dimasukkan ke dalam tasmu. Cek dengan ${usedPrefix}inventory!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['rpgshop [id_item] [jumlah]']
handler.tags = ['rpg']
handler.command = ['rpgshop']

export default handler
