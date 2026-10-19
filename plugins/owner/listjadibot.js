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

import { listJadiBots } from '../../lib/jadibot.js'

function formatSeconds(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const parts = []
  if (h > 0) parts.push(`${h}j`)
  if (m > 0) parts.push(`${m}m`)
  parts.push(`${s}d`)
  return parts.join(' ')
}

let handler = async (m, { usedPrefix }) => {
  const botsList = listJadiBots()

  if (botsList.length === 0) {
    return m.reply(`ℹ️ Saat ini belum ada sesi *JadiBot* yang aktif.\n\nKetik *${usedPrefix}jadibot <nomor>* untuk menautkan sesi baru!`)
  }

  let text = `╭━━━〔 ୨ৎ 🤖 *DAFTAR JADIBOT AKTIF* (${botsList.length}) ୨ৎ 〕━━━╮\n┇\n`
  const mentions = []

  botsList.forEach((b, idx) => {
    const jid = `${b.number}@s.whatsapp.net`
    mentions.push(jid)
    text += `┇ ${idx + 1}. 🟢 @${b.number} [Aktif: ${formatSeconds(b.uptime)}]\n`
  })

  text += `┇\n┇ 💡 Matikan sesi dengan: *${usedPrefix}stopjadibot <nomor>*\n`
  text += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(text.trim(), { mentions })
}

handler.help = ['listjadibot', 'listbot']
handler.tags = ['owner']
handler.command = ['listjadibot', 'listbot']

export default handler
