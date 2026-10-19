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
import { QUESTS_CONFIG } from '../../lib/rpg.js'
import { formatCurrency, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { args, usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const claimTargetId = (args[0] || '').toLowerCase()

  if (claimTargetId && claimTargetId !== 'list') {
    const qCfg = QUESTS_CONFIG.find(q => q.id === claimTargetId)
    if (!qCfg) {
      return m.reply(`❌ Misi ID '${claimTargetId}' tidak ditemukan! Ketik *${usedPrefix}quest* untuk melihat daftar misi.`)
    }

    const claimRes = databaseApi.claimQuest(senderNumber, claimTargetId)
    if (!claimRes) {
      return m.reply('❌ Misi belum selesai atau hadiah sudah pernah kamu klaim sebelumnya!')
    }

    databaseApi.addLimit(senderNumber, qCfg.rewardLimit, `Hadiah Misi: ${qCfg.title}`)
    databaseApi.addBalance(senderNumber, qCfg.rewardMoney, `Hadiah Misi: ${qCfg.title}`)

    return m.reply(`🎉 *HADIAH MISI BERHASIL DIKLAIM!*\n\nMisi: *${qCfg.title}*\n🎟️ Limit didapat : *+${qCfg.rewardLimit} Limit*\n💰 Uang didapat  : *+${formatCurrency(qCfg.rewardMoney)}*`)
  }

  const userQuests = databaseApi.getQuests(senderNumber)
  const questMap = {}
  for (const q of userQuests) {
    questMap[q.quest_id] = q
  }

  let text = `╭━━━〔 ୨ৎ 📜 *PAPAN MISI HARIAN* ୨ৎ 〕━━━╮\n┇\n`
  text += `┇ 👤 *Pemain* : ${user.name || m.pushName || 'Player'}\n┇\n`

  for (const q of QUESTS_CONFIG) {
    const cur = questMap[q.id] || { progress: 0, completed: 0, claimed: 0 }
    let statusIcon = '⏳ Belum Selesai'
    if (cur.claimed) {
      statusIcon = '✅ Sudah Diklaim'
    } else if (cur.completed) {
      statusIcon = '🎁 SIAP DIKLAIM!'
    }

    text += `┇ [ID: *${q.id}*] *${q.title}*\n`
    text += `┇ ├ 🎯 Target : ${cur.progress} / ${q.target}\n`
    text += `┇ ├ 🎁 Hadiah : +${q.rewardLimit} Limit & ${formatCurrency(q.rewardMoney)}\n`
    text += `┇ ├ 📝 Misi   : ${q.desc}\n`
    text += `┇ └ 📌 Status : ${statusIcon}\n`
  }

  text += `┇\n┇ 💡 *CARA KLAIM:* Ketik *${usedPrefix}quest <id_misi>*\n`
  text += `┇ Contoh: *${usedPrefix}quest daily_claim*\n`
  text += `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

  await m.reply(text.trim())
}

handler.help = ['quest [id_misi]', 'misi [id_misi]']
handler.tags = ['rpg']
handler.command = ['quest', 'misi']

export default handler
