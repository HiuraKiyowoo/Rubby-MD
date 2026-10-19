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

  const dngRes = RPG.dungeon(senderNumber)

  if (!dngRes.success) {
    if (dngRes.reason === 'cooldown') {
      return m.reply(`⏳ Gerbang dungeon terkunci sihir!\nTunggu selama *${formatDuration(dngRes.remainingMs)}* sebelum masuk kembali.`)
    }
    if (dngRes.reason === 'too_weak') {
      return m.reply(`⚠️ Kondisi HP terlalu lemah untuk masuk dungeon (*${dngRes.stats.currentHp} HP*)!\nSembuhkan dirimu dengan *${usedPrefix}heal*.`)
    }
    if (dngRes.reason === 'out_of_stamina') {
      return m.reply(`⚡ Stamina tidak cukup untuk mendaki menara dungeon (*${dngRes.stats.currentStamina} Stamina*)!`)
    }
    return m.reply('❌ Terjadi kesalahan saat memasuki dungeon.')
  }

  const battleLogs = dngRes.battle.logs.slice(-4).join('\n┇ ')

  if (dngRes.isWin) {
    const lootText = dngRes.loot.join(', ')
    const caption = `╭━━━〔 ୨ৎ 🏰 *DUNGEON LANTAI ${dngRes.floor} DITAKLUKKAN* ୨ৎ 〕━━━╮
┇
┇ ⚔️ Kamu berhasil menumbangkan Penjaga Menara Lantai ${dngRes.floor}!
┇
┇ 📜 *CATATAN PERTARUNGAN:*
┇ ${battleLogs}
┇
┇ 🎁 *HADIAH LANTAI:*
┇ ├ 💵 Uang Hadiah : +${formatCurrency(dngRes.moneyGain)}
┇ ├ ✨ EXP Didapat  : +${dngRes.expGain} EXP
┇ ├ 💎 Harta Karun  : ${lootText}
┇ └ 🆙 Lantai Baru  : Lantai ke-${dngRes.nextFloor}
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    await m.reply(caption.trim())
  } else {
    const caption = `╭━━━〔 ୨ৎ 💀 *GAGAL MENEMBUS LANTAI ${dngRes.floor}* ୨ৎ 〕━━━╮
┇
┇ ⚠️ Kamu dipukul mundur oleh Penjaga Menara Lantai ${dngRes.floor}!
┇
┇ 📜 *CATATAN PERTARUNGAN:*
┇ ${battleLogs}
┇
┇ _💡 Tempa senjatamu di ${usedPrefix}craft dan naikkan level sebelum mencoba lagi!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    await m.reply(caption.trim())
  }
}

handler.help = ['dungeon']
handler.tags = ['rpg']
handler.command = ['dungeon']

export default handler
