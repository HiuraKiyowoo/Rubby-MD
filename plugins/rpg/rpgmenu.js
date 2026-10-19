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

let handler = async (m, { usedPrefix }) => {
  const p = usedPrefix || '.'
  const caption = `╭━━━〔 ୨ৎ ⚔️ *RUBBY RPG & ECONOMY* ୨ৎ 〕━━━╮
┇
┇ 🌸 *SISTEM REGISTRASI & PROFIL*
┇ ├ ${p}daftar <nama> ─ Daftar akun & klaim bonus
┇ ├ ${p}profile / ${p}me ─ Lihat profil & statistik
┇ ├ ${p}unreg ─ Batalkan registrasi akun
┇ └ ${p}leaderboard ─ Peringkat pemain teratas
┇
┇ 💰 *EKONOMI & KEUANGAN*
┇ ├ ${p}balance / ${p}saldo ─ Cek saldo dompet
┇ ├ ${p}limit ─ Cek sisa limit penggunaan bot
┇ ├ ${p}daily ─ Klaim limit & uang harian (streak)
┇ ├ ${p}work ─ Bekerja untuk mendapatkan uang & exp
┇ ├ ${p}beg ─ Minta receh di jalanan
┇ ├ ${p}transfer <@user> <nominal> ─ Transfer saldo
┇ └ ${p}transactions ─ Riwayat transaksi terakhir
┇
┇ 🛒 *TOKO & BELANJA*
┇ ├ ${p}shop ─ Daftar paket limit bot
┇ ├ ${p}buylimit <id_paket> ─ Beli paket limit
┇ └ ${p}rpgshop ─ Toko ramuan, elixir & perlengkapan
┇
┇ ⚔️ *PETUALANGAN & PERTEMPURAN RPG*
┇ ├ ${p}selectjob <kelas> ─ Pilih kelas karakter
┇ ├ ${p}status ─ Status tempur & statistik lengkap
┇ ├ ${p}heal ─ Pulihkan HP & stamina
┇ ├ ${p}hunt ─ Berburu monster di rimba liar
┇ ├ ${p}adventure ─ Menjelajahi kuil & gua misterius
┇ ├ ${p}dungeon ─ Taklukkan lantai menara dungeon
┇ ├ ${p}boss ─ Bertarung melawan World Boss Naga
┇ ├ ${p}inventory / ${p}inv ─ Tas penyimpanan item
┇ ├ ${p}equip <id_item> ─ Pasang senjata atau zirah
┇ ├ ${p}craft <id_resep> ─ Tempa perlengkapan baru
┇ ├ ${p}quest ─ Daftar misi & klaim hadiah
┇ └ ${p}achievements ─ Daftar gelar & piala
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['rpg', 'rpgmenu']
handler.tags = ['rpg']
handler.command = ['rpg', 'rpgmenu']

export default handler
