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

import { databaseApi } from '../../lib/database.js'

let handler = async (m, { text, args, usedPrefix, command }) => {
  const isEnable = command === 'on' || command === 'enable'
  const feature = (args[0] || text || '').toLowerCase().trim()

  const availableFeatures = ['welcome', 'goodbye', 'bye']

  if (!availableFeatures.includes(feature)) {
    return m.reply(
      `Pilihan fitur tidak valid!\n\n` +
      `*Penggunaan:*\n` +
      `• *${usedPrefix + command} welcome*\n` +
      `• *${usedPrefix + command} goodbye*\n\n` +
      `*Contoh:*\n` +
      `• *${usedPrefix}on welcome*\n` +
      `• *${usedPrefix}off welcome*`
    )
  }

  const targetKey = (feature === 'goodbye' || feature === 'bye') ? 'goodbye' : 'welcome'
  const dbInst = global.db || databaseApi
  const group = dbInst.getGroup(m.chat)

  if (group[targetKey] === isEnable) {
    return m.reply(`Fitur *${targetKey}* sudah *${isEnable ? 'AKTIF' : 'NONAKTIF'}* di grup ini sebelumnya.`)
  }

  dbInst.setGroup(m.chat, { [targetKey]: isEnable })

  return m.reply(`Fitur *${targetKey}* berhasil *${isEnable ? 'DIAKTIFKAN' : 'DINONAKTIFKAN'}* untuk grup ini.`)
}

handler.command = ['on', 'off', 'enable', 'disable']
handler.group = true
handler.admin = true
handler.owner = false
handler.premium = false
handler.private = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
