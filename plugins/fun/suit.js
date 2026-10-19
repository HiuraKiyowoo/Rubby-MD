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
┇   › Feature  : SUIT
┇   › Category : Fun
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

const handler = async (m, { text }) => {
  const choices = ['batu', 'gunting', 'kertas']
  if (!text || !choices.includes(text.toLowerCase().trim())) {
    return m.reply('૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა Pilih pilihanmu manis: *batu*, *gunting*, atau *kertas*!\nContoh: *.suit batu*')
  }
  const userChoice = text.toLowerCase().trim()
  const botChoice = choices[Math.floor(Math.random() * choices.length)]
  let result = ''
  if (userChoice === botChoice) result = 'Seri! Kita sehati ♡'
  else if (
    (userChoice === 'batu' && botChoice === 'gunting') ||
    (userChoice === 'gunting' && botChoice === 'kertas') ||
    (userChoice === 'kertas' && botChoice === 'batu')
  ) result = 'Kamu Menang! Hebat banget (˶ᵔ ᵕ ᵔ˶)'
  else result = 'Rubby Menang! Jangan nangis yaa ><'

  await m.reply(`╭─── ୨୧ SUIT PVP ୨୧ ───╮\n│ ૮₍˶ᵔ ᵕ ᵔ˶₎ა suit game!\n╰──────────────────────╯\n\n୨ৎ Pilihan Kamu : *${userChoice}*\n୨ৎ Pilihan Rubby: *${botChoice}*\n\n୨ৎ Hasil: *${result}*`)
}
handler.help = ['suit <batu/gunting/kertas>']
handler.tags = ['fun']
handler.command = ['suit']
export default handler
