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

  const bossRes = RPG.boss(senderNumber)

  if (!bossRes.success) {
    if (bossRes.reason === 'cooldown') {
      return m.reply(`⏳ Sarang Naga Purba masih tertutup kabut api!\nTunggu selama *${formatDuration(bossRes.remainingMs)}* lagi untuk menantang kembali.`)
    }
    if (bossRes.reason === 'too_weak') {
      return m.reply(`⚠️ Darahmu terlalu rendah (*${bossRes.stats.currentHp} HP*) untuk menghadapi World Boss!\nPulihkan dirimu dengan *${usedPrefix}heal* atau minum Elixir.`)
    }
    if (bossRes.reason === 'out_of_stamina') {
      return m.reply(`⚡ Stamina tidak cukup untuk raid boss (*${bossRes.stats.currentStamina} Stamina*)!`)
    }
    return m.reply('❌ Terjadi kesalahan saat menantang World Boss.')
  }

  const battleLogs = bossRes.battle.logs.slice(-5).join('\n┇ ')

  if (bossRes.isWin) {
    const lootText = bossRes.loot.join(', ')
    const caption = `╭━━━〔 ୨ৎ 🐉 *KEMENANGAN LEGENDA: WORLD BOSS TUMBANG* ୨ৎ 〕━━━╮
┇
┇ 🔥 Kamu berhasil menebas leher *${bossRes.boss}*!
┇
┇ 📜 *CATATAN PERTARUNGAN EPIK:*
┇ ${battleLogs}
┇
┇ 🎁 *JARAHAN LEGENDA:*
┇ ├ 💰 Harta Karun Naga : +${formatCurrency(bossRes.moneyGain)}
┇ ├ ✨ EXP Raja Naga    : +${bossRes.expGain} EXP
┇ ├ 🎒 Drop Langka      : ${lootText}
┇ └ 👑 Total Boss Kills : ${bossRes.totalKills} Naga
┇
┇ _Gunakan Sisik Naga ini untuk menempa Dragon Slayer Sword di ${usedPrefix}craft!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    await m.reply(caption.trim())
  } else {
    const caption = `╭━━━〔 ୨ৎ 💀 *DIBUMIHANGUSKAN OLEH WORLD BOSS* ୨ৎ 〕━━━╮
┇
┇ 🔥 Semburan api neraka dari *${bossRes.boss}* menghanguskan perisaimu!
┇
┇ 📜 *CATATAN PERTARUNGAN:*
┇ ${battleLogs}
┇
┇ ⚠️ Kamu terluka parah dan terlempar dari sarang naga!
┇ _Tingkatkan senjatamu dan kenakan zirah kuat sebelum mencoba lagi._
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    await m.reply(caption.trim())
  }
}

handler.help = ['boss', 'worldboss']
handler.tags = ['rpg']
handler.command = ['boss', 'worldboss']

export default handler
