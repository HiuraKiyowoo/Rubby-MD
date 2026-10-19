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
┇   › Feature  : CEK TOLOL
┇   › Category : Fun
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

function getTarget(m, text) {
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    const jid = m.mentionedJid[0]
    const num = jid.replace(/[^0-9]/g, '')
    return { name: `@${num}`, jid, mentions: [jid] }
  }
  if (m.quoted && m.quoted.sender) {
    const jid = m.quoted.sender
    const num = jid.replace(/[^0-9]/g, '')
    return { name: `@${num}`, jid, mentions: [jid] }
  }
  if (text && text.trim()) {
    return { name: text.trim(), jid: null, mentions: [] }
  }
  const selfNum = (m.sender || '').replace(/[^0-9]/g, '')
  return { name: `@${selfNum}`, jid: m.sender, mentions: [m.sender] }
}

const handler = async (m, { text }) => {
  const target = getTarget(m, text)
  const score = Math.floor(Math.random() * 101)
  await m.reply(`╭─── ୨୧ CEK TOLOL ୨୧ ───╮\n│ ૮₍˶ᵔ ᵕ ᵔ˶₎ა radar ketololan!\n╰───────────────────────╯\n\n୨ৎ Target: ${target.name}\n୨ৎ Tingkat Tolol: *${score}%* 🤡`, null, { mentions: target.mentions })
}
handler.help = ['cektolol [@tag/nama]']
handler.tags = ['fun']
handler.command = ['cektolol']
export default handler
