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
import { calculateEffectiveStats, RPG_CLASSES, RPG_ITEMS } from '../../lib/rpg.js'
import { getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk membuat karakter terlebih dahulu.`)
  }

  const stats = calculateEffectiveStats(user)
  const jobKey = String(user.job || 'novice').toLowerCase()
  const classObj = RPG_CLASSES[jobKey] || RPG_CLASSES.novice

  const weaponObj = user.equipped_weapon ? RPG_ITEMS[user.equipped_weapon] : null
  const armorObj = user.equipped_armor ? RPG_ITEMS[user.equipped_armor] : null

  const weaponName = weaponObj ? `${weaponObj.name} (+${weaponObj.bonusAtk} ATK)` : 'Tidak Ada (Tangan Kosong)'
  const armorName = armorObj ? `${armorObj.name} (+${armorObj.bonusDef} DEF)` : 'Tidak Ada (Pakaian Biasa)'

  const totalBattles = (user.rpg_wins || 0) + (user.rpg_losses || 0)
  const winRate = totalBattles > 0 ? Math.round(((user.rpg_wins || 0) / totalBattles) * 100) : 0

  const caption = `╭━━━〔 ୨ৎ ⚔️ *STATUS KARAKTER RPG* ୨ৎ 〕━━━╮
┇
┇ 🏷️ *Nama*        : ${user.name || m.pushName || 'Player'}
┇ 🛡️ *Kelas*       : ${classObj.emoji} ${classObj.name}
┇ 📊 *Level*       : Lv. ${user.level || 0} (${user.exp || 0} EXP)
┇
┇ 🩸 *Darah (HP)*  : ${stats.currentHp} / ${stats.maxHp}
┇ ⚡ *Stamina*     : ${stats.currentStamina} / ${stats.maxStamina}
┇ 🗡️ *Total ATK*   : ${stats.effectiveAtk} (Dasar: ${classObj.baseAtk})
┇ 🛡️ *Total DEF*   : ${stats.effectiveDef} (Dasar: ${classObj.baseDef})
┇
┇ 🎒 *PERLENGKAPAN AKTIF:*
┇ ├ 🗡️ Senjata  : ${weaponName}
┇ └ 🛡️ Zirah    : ${armorName}
┇
┇ 🏆 *REKOR PETUALANGAN:*
┇ ├ 🏰 Dungeon  : Lantai ke-${user.dungeon_floor || 1}
┇ ├ ⚔️ Kemenangan: ${user.rpg_wins || 0} Win / ${user.rpg_losses || 0} Lose (${winRate}% Winrate)
┇ └ 🐉 Boss Raid: ${user.boss_kills || 0} Naga Dikalahkan
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(caption.trim())
}

handler.help = ['status', 'rpgstatus']
handler.tags = ['rpg']
handler.command = ['status', 'rpgstatus']

export default handler
