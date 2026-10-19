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
import RPG from '../../lib/rpg.js'
import { getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { args, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const itemId = args[0]
  if (!itemId) {
    return m.reply(`❌ Masukkan ID item perlengkapan yang ingin dipasang!\n\nLihat isi tasmu dengan *${usedPrefix}inventory*\nContoh: *${usedPrefix}equip iron_blade* atau *${usedPrefix}equip iron_armor*`)
  }

  const equipRes = RPG.equip(senderNumber, itemId)

  if (!equipRes.success) {
    if (equipRes.reason === 'not_equippable') {
      return m.reply('❌ Item tersebut bukan senjata atau armor yang dapat dipasang!')
    }
    if (equipRes.reason === 'item_not_owned') {
      return m.reply(`❌ Kamu tidak memiliki item '${itemId}' di dalam tasmu!\nTempa terlebih dahulu dengan *${usedPrefix}craft*.`)
    }
    return m.reply('❌ Gagal memasang perlengkapan.')
  }

  const slotName = equipRes.equippedSlot === 'weapon' ? '🗡️ Senjata' : '🛡️ Zirah/Armor'
  await m.reply(`✅ *PERLENGKAPAN BERHASIL DIPASANG!*\n\n${slotName}: *${equipRes.item.name}*\nEfek: *${equipRes.item.desc}*\n\nKetik *${usedPrefix}status* untuk melihat statistik tempur terbarumu.`)
}

handler.help = ['equip <id_item>', 'pakai <id_item>']
handler.tags = ['rpg']
handler.command = ['equip', 'pakai']

export default handler
