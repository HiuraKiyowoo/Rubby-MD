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
import { formatDuration, getCleanNumber } from '../../lib/economy.js'

let handler = async (m, { usedPrefix }) => {
  const senderNumber = getCleanNumber(m.sender)
  const user = databaseApi.getUser(senderNumber)

  if (!user || user.registered !== 1) {
    return m.reply(`🌸 Kamu belum terdaftar!\nKetik *${usedPrefix}daftar <nama>* untuk mendaftar terlebih dahulu.`)
  }

  const healRes = RPG.heal(senderNumber)

  if (!healRes.success) {
    if (healRes.reason === 'already_full') {
      return m.reply('✨ Darah (HP) dan Stamina karaktermu sudah penuh!')
    }
    if (healRes.reason === 'cooldown') {
      return m.reply(`⏳ Kamu masih segar sehabis beristirahat!\nTunggu selama *${formatDuration(healRes.remainingMs)}* lagi untuk istirahat berikutnya, atau beli ramuan darah di *${usedPrefix}rpgshop*.`)
    }
    return m.reply('❌ Gagal melakukan pemulihan.')
  }

  if (healRes.method === 'potion') {
    await m.reply(`🧪 *MEMINUM POTION DARAH*\n\nKamu meminum 1x Potion Darah dari tasmu.\n❤️ HP bertambah: *+${healRes.healedAmount} HP*\n🩸 Kondisi HP saat ini: *${healRes.currentHp} / ${healRes.maxHp}*`)
  } else {
    await m.reply(`⛺ *BERISTIRAHAT DI KEMAH*\n\nKamu beristirahat sejenak di perkemahan yang nyaman.\n❤️ HP dipulihkan: *+${healRes.healedHp} HP*\n⚡ Stamina dipulihkan: *+${healRes.healedStamina} Stamina*\n\n🩸 HP: *${healRes.currentHp}* | ⚡ Stamina: *${healRes.currentStamina}*`)
  }
}

handler.help = ['heal', 'istirahat']
handler.tags = ['rpg']
handler.command = ['heal', 'istirahat']

export default handler
