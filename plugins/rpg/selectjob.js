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
import RPG, { RPG_CLASSES } from '../../lib/rpg.js'
import { getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { args, text, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const selectedKey = (args[0] || '').toLowerCase()

  if (!selectedKey || !RPG_CLASSES[selectedKey]) {
    let caption = `╭━━━〔 ୨ৎ 🛡️ *PILIHAN KELAS RPG* ୨ৎ 〕━━━╮\n┇\n`
    caption += `┇ 👤 *Pemain* : ${user.name || m.pushName || 'Player'}\n`
    caption += `┇ 🔰 *Kelas Saat Ini* : *${user.job || 'Novice'}*\n┇\n`
    caption += `┇ 📜 *DAFTAR KELAS TERSEDIA:*\n`

    for (const [key, cls] of Object.entries(RPG_CLASSES)) {
      if (key === 'novice') continue
      caption += `┇ ${cls.emoji} *${cls.name}* (${key})\n`
      caption += `┇ ├ ❤️ HP: ${cls.baseHp} | ⚡ Stamina: ${cls.baseStamina}\n`
      caption += `┇ ├ 🗡️ ATK: ${cls.baseAtk} | 🛡️ DEF: ${cls.baseDef}\n`
      caption += `┇ └ _${cls.description}_\n`
    }

    caption += `┇\n┇ 💡 *CARA MEMILIH:*\n`
    caption += `┇ Ketik: *${usedPrefix}selectjob <nama_kelas>*\n`
    caption += `┇ Contoh: *${usedPrefix}selectjob warrior*\n`
    caption += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

    return m.reply(caption.trim())
  }

  const result = RPG.selectJob(senderNumber, selectedKey)
  if (!result.success) {
    return m.reply('❌ Gagal mengubah kelas karakter.')
  }

  const { targetClass } = result
  const successCaption = `╭━━━〔 ୨ৎ 🎉 *KELAS BERHASIL DIPILIH* ୨ৎ 〕━━━╮
┇
┇ Selamat! Kamu resmi menjadi seorang:
┇ ${targetClass.emoji} *${targetClass.name.toUpperCase()}*
┇
┇ 📊 *STATISTIK DASAR BARU:*
┇ ├ ❤️ Max HP     : ${targetClass.baseHp}
┇ ├ ⚡ Max Stamina: ${targetClass.baseStamina}
┇ ├ 🗡️ Base ATK   : ${targetClass.baseAtk}
┇ └ 🛡️ Base DEF   : ${targetClass.baseDef}
┇
┇ _💡 Lengkapi senjata dan zirahmu dengan ${usedPrefix}craft & ${usedPrefix}equip!_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(successCaption.trim())
}

handler.help = ['selectjob <kelas>', 'job <kelas>']
handler.tags = ['rpg']
handler.command = ['selectjob', 'job']

export default handler
