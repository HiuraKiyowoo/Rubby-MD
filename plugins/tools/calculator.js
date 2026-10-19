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
┇   › Feature  : Smart Calculator
┇   › Category : Tools
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

const handler = async (m, { text }) => {
  if (!text) {
    return m.reply(
      `🧮 *KALKULATOR PINTAR RUBBY* 🎀\n\n` +
      `Contoh penggunaan:\n` +
      `• *.calc 50 * 20*\n` +
      `• *.calc 1000 / 4 + 150*\n` +
      `• *.kalkulator (25 + 75) * 5*`
    )
  }

  const clean = text.replace(/[^0-9+\-*/().\s]/g, '')
  if (!clean.trim()) return m.reply('❌ Format perhitungan matematika tidak valid!')

  try {
    const result = Function(`'use strict'; return (${clean})`)()
    await m.reply(
      `╭─── ୨୧ KALKULATOR ୨୧ ───╮\n` +
      `│ ૮₍˶ᵔ ᵕ ᵔ˶₎ა hasil hitung!\n` +
      `╰─────────────────────────╯\n\n` +
      `୨ৎ Soal  : *${clean.trim()}*\n` +
      `୨ৎ Hasil : *${result.toLocaleString('id-ID')}* ✨`
    )
  } catch {
    await m.reply('❌ Gagal menghitung ekspresi matematika tersebut!')
  }
}

handler.help = ['calc <ekspresi>', 'kalkulator <ekspresi>']
handler.tags = ['tools']
handler.command = ['calc', 'kalkulator']

export default handler
