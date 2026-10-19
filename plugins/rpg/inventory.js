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
import { getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const items = databaseApi.getInventory(senderNumber)

  if (!items || items.length === 0) {
    return m.reply(`🎒 Tas ranselmu masih kosong!\n\nPergilah berburu dengan *${usedPrefix}hunt*, menjelajah di *${usedPrefix}adventure*, atau belanja di *${usedPrefix}rpgshop*.`)
  }

  const categories = {
    consumable: [],
    material: [],
    weapon: [],
    armor: []
  }

  for (const it of items) {
    const t = categories[it.type] ? it.type : 'material'
    categories[t].push(it)
  }

  let text = `╭━━━〔 ୨ৎ 🎒 *TAS PENYIMPANAN* ୨ৎ 〕━━━╮\n┇\n`
  text += `┇ 👤 *Pemilik* : ${user.name || m.pushName || 'Player'}\n┇\n`

  if (categories.consumable.length > 0) {
    text += `┇ 🧪 *RAMUAN & CONSUMABLE:*\n`
    for (const it of categories.consumable) {
      text += `┇ ├ [${it.item_id}] *${it.name}* (x${it.count})\n`
    }
  }

  if (categories.weapon.length > 0) {
    text += `┇ 🗡️ *SENJATA:*\n`
    for (const it of categories.weapon) {
      const isEq = user.equipped_weapon === it.item_id ? ' 🟢 [TERPASANG]' : ''
      text += `┇ ├ [${it.item_id}] *${it.name}* (x${it.count})${isEq}\n`
    }
  }

  if (categories.armor.length > 0) {
    text += `┇ 🛡️ *PELINDUNG & ZIRAH:*\n`
    for (const it of categories.armor) {
      const isEq = user.equipped_armor === it.item_id ? ' 🟢 [TERPASANG]' : ''
      text += `┇ ├ [${it.item_id}] *${it.name}* (x${it.count})${isEq}\n`
    }
  }

  if (categories.material.length > 0) {
    text += `┇ 🪵 *MATERIAL & BAHAN:*\n`
    for (const it of categories.material) {
      text += `┇ ├ [${it.item_id}] *${it.name}* (x${it.count})\n`
    }
  }

  text += `┇\n┇ 💡 *PETUNJUK:* Pasang senjata/zirah dengan *${usedPrefix}equip <id_item>*\n`
  text += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(text.trim())
}

handler.help = ['inventory', 'inv']
handler.tags = ['rpg']
handler.command = ['inventory', 'inv']

export default handler
