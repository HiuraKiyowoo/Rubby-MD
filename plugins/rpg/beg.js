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
import Economy, { formatCurrency, formatDuration, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const begRes = Economy.beg(senderNumber)

  if (!begRes.success) {
    if (begRes.reason === 'cooldown') {
      return m.reply(`⏳ Kamu baru saja meminta-minta di jalanan!\nTunggu selama *${formatDuration(begRes.remainingMs)}* lagi.`)
    }
    return m.reply('❌ Terjadi kesalahan saat meminta receh.')
  }

  if (begRes.isGotMoney) {
    await m.reply(`🥺 ${begRes.story}\n\n💵 Kamu mendapatkan: *+${formatCurrency(begRes.moneyGain)}*\n💰 Saldo sekarang: *${formatCurrency(begRes.newBalance)}*`)
  } else {
    await m.reply(`😅 ${begRes.story}\n\nKamu tidak mendapatkan uang sepeser pun!`)
  }
}

handler.help = ['beg', 'minta']
handler.tags = ['rpg']
handler.command = ['beg', 'minta']

export default handler
