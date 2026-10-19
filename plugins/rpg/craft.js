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
import RPG, { CRAFT_RECIPES, RPG_ITEMS } from '../../lib/rpg.js'
import { getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { args, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const recipeKey = (args[0] || '').toLowerCase()

  if (!recipeKey || !CRAFT_RECIPES[recipeKey]) {
    let caption = `╭━━━〔 ୨ৎ 🔨 *PANDAI BESI & CRAFTING* ୨ৎ 〕━━━╮\n┇\n`
    caption += `┇ 👤 *Penempa* : ${user.name || m.pushName || 'Player'}\n┇\n`
    caption += `┇ 📜 *DAFTAR RESEP TEMPAAN:*\n`

    for (const [key, r] of Object.entries(CRAFT_RECIPES)) {
      const it = RPG_ITEMS[r.resultId]
      const matReq = r.materials.map(m => `${m.count}x ${RPG_ITEMS[m.id]?.name || m.id}`).join(', ')
      caption += `┇ [ID: ${key}] *${it.name}*\n`
      caption += `┇ ├ 📦 Bahan : ${matReq}\n`
      caption += `┇ └ ⚔️ Efek  : ${it.desc}\n`
    }

    caption += `┇\n┇ 💡 *CARA MENEMPA:*\n`
    caption += `┇ Ketik: *${usedPrefix}craft <id_resep>*\n`
    caption += `┇ Contoh: *${usedPrefix}craft iron_blade*\n`
    caption += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    return m.reply(caption.trim())
  }

  const craftRes = RPG.craft(senderNumber, recipeKey)

  if (!craftRes.success) {
    if (craftRes.reason === 'insufficient_materials') {
      const matName = RPG_ITEMS[craftRes.missing]?.name || craftRes.missing
      return m.reply(`❌ Bahan tidak cukup untuk menempa perlengkapan ini!\n\nMembutuhkan: *${craftRes.required}x ${matName}*\nKamu memiliki: *${craftRes.available}x ${matName}*\n\nKumpulkan bahan dari *${usedPrefix}hunt*, *${usedPrefix}adventure*, atau *${usedPrefix}dungeon*.`)
    }
    return m.reply('❌ Gagal menempa perlengkapan.')
  }

  const caption = `╭━━━〔 ୨ৎ ✨ *TEMPAAN BERHASIL SELESAI* ୨ৎ 〕━━━╮
┇
┇ 🔨 Pandai besi berhasil menempa:
┇ *${craftRes.craftedItem.name}*
┇
┇ ℹ️ *Efek* : ${craftRes.craftedItem.desc}
┇ 🎒 *Status*: Sudah dimasukkan ke tasmu!
┇
┇ _Pasang perlengkapan barumu dengan ${usedPrefix}equip ${craftRes.craftedItem.id}!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['craft <id_resep>', 'tempa <id_resep>']
handler.tags = ['rpg']
handler.command = ['craft', 'tempa']

export default handler
