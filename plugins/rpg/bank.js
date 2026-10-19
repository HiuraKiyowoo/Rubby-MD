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
┇   › Feature  : BANK SAVINGS
┇   › Category : RPG
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import databaseApi from '../../lib/database.js'

const handler = async (m, { text }) => {
  const user = databaseApi.getUser(m.sender)
  user.bank = user.bank || 0
  if (!text) {
    return m.reply(`🏛️ *BANK KERAJAAN RUBBY*\n\n💰 Saldo Dompet : *Rp ${(user.money || 0).toLocaleString()}*\n🏛️ Saldo di Bank : *Rp ${user.bank.toLocaleString()}*\n\nKetik *.bank tabung <jumlah>* untuk menabung\nKetik *.bank tarik <jumlah>* untuk menarik uang.`)
  }
  const args = text.trim().split(/\s+/)
  const action = args[0]?.toLowerCase()
  const amount = parseInt(args[1], 10)
  if (action === 'tabung') {
    if (!amount || amount <= 0 || amount > (user.money || 0)) return m.reply('Jumlah tabungan tidak valid atau uang tidak cukup!')
    user.money -= amount
    user.bank += amount
    databaseApi.save()
    return m.reply(`✓ Berhasil menabung *Rp ${amount.toLocaleString()}* ke Bank Kerajaan.`)
  }
  if (action === 'tarik') {
    if (!amount || amount <= 0 || amount > user.bank) return m.reply('Saldo bank tidak mencukupi!')
    user.bank -= amount
    user.money = (user.money || 0) + amount
    databaseApi.save()
    return m.reply(`✓ Berhasil menarik *Rp ${amount.toLocaleString()}* dari Bank.`)
  }
}
handler.help = ['bank [tabung/tarik <jumlah>]']
handler.tags = ['rpg']
handler.command = ['bank', 'deposito']
handler.register = true
export default handler
