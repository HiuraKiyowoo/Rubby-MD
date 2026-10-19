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
import { formatCurrency, formatDuration, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const huntRes = RPG.hunt(senderNumber)

  if (!huntRes.success) {
    if (huntRes.reason === 'cooldown') {
      return m.reply(`⏳ Kamu masih kelelahan sehabis berburu rimba!\nTunggu selama *${formatDuration(huntRes.remainingMs)}* lagi.`)
    }
    if (huntRes.reason === 'too_weak') {
      return m.reply(`⚠️ Darah (HP) karaktermu sekarat (*${huntRes.stats.currentHp} HP*)!\nPulihkan dirimu terlebih dahulu dengan *${usedPrefix}heal* sebelum bertarung.`)
    }
    if (huntRes.reason === 'out_of_stamina') {
      return m.reply(`⚡ Stamina kamu tidak mencukupi untuk berburu (*${huntRes.stats.currentStamina} Stamina*)!\nIstirahatlah dengan *${usedPrefix}heal* atau minum Potion Stamina.`)
    }
    return m.reply('❌ Terjadi kesalahan saat melakukan perburuan.')
  }

  const battleLogs = huntRes.battle.logs.slice(-4).join('\n┇ ')

  if (huntRes.isWin) {
    const dropsText = huntRes.droppedItems && huntRes.droppedItems.length > 0
      ? huntRes.droppedItems.join(', ')
      : 'Tidak ada material yang terjatuh'

    const caption = `╭━━━〔 ୨ৎ ⚔️ *HASIL PERBURUAN MENANG* ୨ৎ 〕━━━╮
┇
┇ 🌲 Menghadapi Monster: *${huntRes.monster}*
┇
┇ 📜 *CATATAN PERTEMPURAN:*
┇ ${battleLogs}
┇
┇ 🎁 *HADIAH PERBURUAN:*
┇ ├ 💵 Uang Hadiah : +${formatCurrency(huntRes.moneyGain)}
┇ ├ ✨ EXP Diperoleh: +${huntRes.expGain} EXP
┇ ├ 🎒 Item Drop   : ${dropsText}
┇ └ ❤️ Sisa HP     : ${huntRes.currentHp} HP
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    await m.reply(caption.trim())
  } else {
    const caption = `╭━━━〔 ୨ৎ 💀 *PERBURUAN GAGAL / KALAH* ୨ৎ 〕━━━╮
┇
┇ 🌲 Kamu diserang balik oleh: *${huntRes.monster}*!
┇
┇ 📜 *CATATAN PERTEMPURAN:*
┇ ${battleLogs}
┇
┇ ⚠️ Kamu terpaksa melarikan diri ke perkemahan terdekat.
┇ ❤️ Sisa HP: *${huntRes.currentHp} HP*
┇ _Segera pulihkan darahmu dengan ${usedPrefix}heal!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    await m.reply(caption.trim())
  }
}

handler.help = ['hunt', 'berburu']
handler.tags = ['rpg']
handler.command = ['hunt', 'berburu']

export default handler
