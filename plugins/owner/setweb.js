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

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const settingPath = path.resolve(__dirname, '../../setting.js')

let handler = async (m, { text, usedPrefix, command }) => {
  const input = (text || '').trim()

  if (!input) {
    return m.reply(`Harap masukkan URL website baru!\nContoh:\n${usedPrefix}${command} https://api.kyzzz.xyz`)
  }

  if (!/^https?:\/\//i.test(input)) {
    return m.reply('Format URL tidak valid! Harus diawali dengan http:// atau https://')
  }

  try {
    let settingContent = fs.readFileSync(settingPath, 'utf-8')
    if (/global\.website\s*=\s*['"`].*?['"`]/.test(settingContent)) {
      settingContent = settingContent.replace(
        /global\.website\s*=\s*['"`].*?['"`]/,
        `global.website = '${input.replace(/'/g, "\\'")}'`
      )
    } else {
      settingContent += `\nglobal.website = '${input.replace(/'/g, "\\'")}'\n`
    }

    fs.writeFileSync(settingPath, settingContent, 'utf-8')
    global.website = input

    try {
      await import(`${pathToFileURL(settingPath).href}?update=${Date.now()}`)
    } catch {}

    return m.reply(`✓ Sukses mengubah URL Website Bot menjadi:\n*${input}*`)
  } catch (e) {
    return m.reply(`Gagal memperbarui setting.js:\n${e.message || e}`)
  }
}

handler.command = ['setweb', 'setwebsite', 'setwebbot']
handler.owner = true
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
