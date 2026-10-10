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
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginsDir = path.resolve(__dirname, '..')

let handler = async (m, { text, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : null
  const quotedText = q ? (q.text || '') : ''

  if (!text && !quotedText) {
    return m.reply(
      `Penggunaan:\n` +
      `1. Balas (reply) pesan kode dengan:\n` +
      `   *${usedPrefix}${command} <kategori/nama.js>*\n\n` +
      `2. Atau tulis langsung kode setelah nama file:\n` +
      `   *${usedPrefix}${command} <kategori/nama.js> <code>*\n\n` +
      `Contoh:\n` +
      `*${usedPrefix}${command} tools/calc.js*`
    )
  }

  const parts = (text || '').trim().split(/\s+/)
  let targetPath = parts[0] || ''
  let codeContent = ''

  if (quotedText) {
    codeContent = quotedText
  } else {
    codeContent = parts.slice(1).join(' ')
  }

  if (!targetPath) {
    return m.reply(`Harap tentukan path file plugin!\nContoh: *${usedPrefix}${command} tools/calc.js*`)
  }

  if (!codeContent.trim()) {
    return m.reply('Harap sertakan isi kode plugin atau balas pesan kode!')
  }

  if (!targetPath.endsWith('.js')) {
    targetPath += '.js'
  }

  if (!targetPath.includes('/')) {
    targetPath = path.join('other', targetPath)
  }

  const destination = path.resolve(pluginsDir, targetPath)

  if (!destination.startsWith(pluginsDir)) {
    return m.reply('Path plugin tidak valid / di luar direktori plugins.')
  }

  const parentDir = path.dirname(destination)
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true })
  }

  const isOverwrite = fs.existsSync(destination)
  fs.writeFileSync(destination, codeContent.trim(), 'utf-8')

  return m.reply(
    `✓ Sukses ${isOverwrite ? 'menimpa (overwrite)' : 'menyimpan'} plugin!\n\n` +
    `📁 Path: \`plugins/${targetPath}\`\n` +
    `⚡ Status: Otomatis di-reload oleh watcher.`
  )
}

handler.command = ['saveplugin', 'addplugin', 'sp', 'sf', 'savefile']
handler.owner = true
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
