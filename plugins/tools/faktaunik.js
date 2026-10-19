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
┇   › Feature  : Fakta Unik Dunia
┇   › Category : Tools
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

const facts = [
  'Madu murni adalah satu-satunya makanan yang tidak pernah basi, bahkan setelah ribuan tahun! 🍯',
  'Jantung paus biru berukuran sebesar mobil kecil dan detaknya terdengar hingga radius 3 kilometer. 🐋',
  'Kucing menghabiskan sekitar 70% dari hidupnya untuk tidur. ( ˘͈ ᵕ ˘͈ ) 🐱',
  'Semut tidak pernah tidur dan tidak memiliki paru-paru. 🐜',
  'Sidik jari koala sangat mirip dengan sidik jari manusia hingga sulit dibedakan di bawah mikroskop. 🐨',
  'Air panas akan membeku lebih cepat daripada air dingin (efek Mpemba). ❄️',
  'Gurita memiliki 3 jantung dan darah mereka berwarna biru. 🐙',
  'Satu sendok teh bintang neutron memiliki berat sekitar 6 miliar ton! 🌌',
  'Pisang secara botani tergolong sebagai buah beri, sedangkan stroberi bukan! 🍌',
  'Kupu-kupu merasakan makanan menggunakan kakinya. 🦋'
]

const handler = async (m) => {
  const item = facts[Math.floor(Math.random() * facts.length)]
  await m.reply(
    `╭─── ୨୧ FAKTA UNIK ୨୧ ───╮\n` +
    `│ ૮₍˶ᵔ ᵕ ᵔ˶₎ა tahukah kamu?\n` +
    `╰─────────────────────────╯\n\n` +
    `୨ৎ *Fakta Dunia:*\n${item}\n\n` +
    `꒰ა ♡ ໒꒱ wawasan baru bersama rubby!`
  )
}

handler.help = ['faktaunik', 'fakta']
handler.tags = ['tools']
handler.command = ['faktaunik', 'fakta']

export default handler
