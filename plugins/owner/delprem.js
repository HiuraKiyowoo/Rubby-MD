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

import { getPremiumUsers, savePremiumUsers, normalizeNumber } from '../../lib/utils.js'

let handler = async (m, { text, args, usedPrefix, command }) => {
  let target = ''
  if (m.quoted?.sender) {
    target = normalizeNumber(m.quoted.sender)
  } else if (m.mentionedJid && m.mentionedJid.length > 0) {
    target = normalizeNumber(m.mentionedJid[0])
  } else if (args[0]) {
    target = normalizeNumber(args[0])
  }

  if (!target) {
    await m.reply(`Tag, balas pesan pengguna, atau masukkan nomor yang ingin dihapus dari premium.\nContoh: *${usedPrefix}${command} 6281234567890*`)
    return
  }

  const list = getPremiumUsers()
  if (!list.includes(target)) {
    await m.reply(`Nomor *@${target}* tidak ditemukan di daftar pengguna premium.`)
    return
  }

  const updatedList = list.filter(num => num !== target)
  savePremiumUsers(updatedList)

  await m.reply(`Berhasil menghapus *@${target}* dari daftar pengguna premium.`)
}

handler.command = ['delprem', 'delpremium']
handler.owner = true
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
