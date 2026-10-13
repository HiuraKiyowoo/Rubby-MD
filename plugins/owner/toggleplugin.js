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

import { databaseApi } from '../../lib/database.js'

function getDisabledDb() {
  if (global.db?.getDisabledPlugins) {
    return global.db.getDisabledPlugins()
  }
  return databaseApi.getDisabledPlugins()
}

function saveDisabledDb(data) {
  if (global.db?.setDisabledPlugins) {
    return global.db.setDisabledPlugins(data)
  }
  return databaseApi.setDisabledPlugins(data)
}

let handler = async (m, { text, args, usedPrefix, command, registry }) => {
  const query = (args[0] || text || '').toLowerCase().trim()

  if (!query) {
    const disabled = getDisabledDb()
    return m.reply(
      `Format penggunaan:\n` +
      `• *${usedPrefix + command} <nama_perintah/plugin>*\n\n` +
      `*Daftar Plugin Nonaktif:*\n` +
      (disabled.length ? disabled.map(p => `• ${p}`).join('\n') : 'Tidak ada plugin yang dinonaktifkan.')
    )
  }

  const plugin = registry.getCommand(query)
  const targetName = plugin ? plugin.primaryCommand : query
  let disabledList = getDisabledDb()

  const isDisable = command.includes('off') || command.includes('disable')
  const isEnable = command.includes('on') || command.includes('enable')

  if (isDisable) {
    if (disabledList.includes(targetName)) {
      return m.reply(`Plugin *${targetName}* sudah dalam keadaan nonaktif.`)
    }
    disabledList.push(targetName)
    saveDisabledDb(disabledList)
    return m.reply(`Berhasil menonaktifkan plugin/fitur *${targetName}*.`)
  }

  if (isEnable) {
    if (!disabledList.includes(targetName)) {
      return m.reply(`Plugin *${targetName}* sudah dalam keadaan aktif.`)
    }
    disabledList = disabledList.filter(p => p !== targetName)
    saveDisabledDb(disabledList)
    return m.reply(`Berhasil mengaktifkan kembali plugin/fitur *${targetName}*.`)
  }

  if (disabledList.includes(targetName)) {
    disabledList = disabledList.filter(p => p !== targetName)
    saveDisabledDb(disabledList)
    return m.reply(`Berhasil mengaktifkan plugin/fitur *${targetName}*.`)
  } else {
    disabledList.push(targetName)
    saveDisabledDb(disabledList)
    return m.reply(`Berhasil menonaktifkan plugin/fitur *${targetName}*.`)
  }
}

handler.command = ['pluginoff', 'pluginon', 'disableplugin', 'enableplugin', 'toggleplugin']
handler.owner = true
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.premium = false
handler.noJadiBot = false

export default handler
