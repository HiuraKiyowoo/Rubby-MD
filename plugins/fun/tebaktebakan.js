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
┇   › Feature  : TEBAK-TEBAKAN
┇   › Category : Fun
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

const list = [
  { q: 'Gajah apa yang belalainya pendek?', a: 'Gajah pesek 🐘' },
  { q: 'Ayam apa yang berkokok tiap menit?', a: 'Ayam lagi live TikTok 🐔' },
  { q: 'Kenapa pohon di depan rumah harus ditebang?', a: 'Kalo dicabut berat lah! 🌳' },
  { q: 'Kera apa yang bikin heboh?', a: 'Keracunan makanan 🐒' },
  { q: 'Benda apa yang kalau dibalik jadi rusak?', a: 'Kasur (rusak kalo dibalik ngga enak) 🛌' }
]
const handler = async (m) => {
  const item = list[Math.floor(Math.random() * list.length)]
  await m.reply(`╭─── ୨୧ TEBAK-TEBAKAN ୨୧ ───╮\n│ ૮₍˶ᵔ ᵕ ᵔ˶₎ა tebak yuk!\n╰───────────────────────────╯\n\n୨ৎ Pertanyaan: *${item.q}*\n\n୨ৎ Jawaban: ||${item.a}||`)
}
handler.help = ['tebaktebakan']
handler.tags = ['fun']
handler.command = ['tebaktebakan']
export default handler
