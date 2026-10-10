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

let handler = async (m, { text, usedPrefix, command, registry }) => {
  const query = (text || '').trim().toLowerCase()

  if (!query) {
    return m.reply(`Format salah!\nContoh:\n*${usedPrefix}${command} menu*\natau\n*${usedPrefix}${command} main/menu.js*`)
  }

  let targetFilePath = ''

  for (const [filePath, pluginData] of registry.plugins.entries()) {
    const rel = pluginData.relativePath.toLowerCase()
    const primary = pluginData.primaryCommand.toLowerCase()
    const allCmds = pluginData.allCommands.map(c => c.toLowerCase())

    if (
      rel === query ||
      rel === `${query}.js` ||
      path.basename(rel, '.js') === query ||
      primary === query ||
      allCmds.includes(query)
    ) {
      targetFilePath = filePath
      break
    }
  }

  if (!targetFilePath) {
    let candidate = query
    if (!candidate.endsWith('.js')) candidate += '.js'
    const directPath = path.resolve(pluginsDir, candidate)
    if (fs.existsSync(directPath)) {
      targetFilePath = directPath
    }
  }

  if (!targetFilePath || !fs.existsSync(targetFilePath)) {
    return m.reply(`Plugin *"${query}"* tidak ditemukan di direktori plugins.`)
  }

  const content = fs.readFileSync(targetFilePath, 'utf-8')
  const relPath = path.relative(pluginsDir, targetFilePath)

  if (content.length > 60000) {
    return await sock.sendMessage(
      m.chat,
      {
        document: Buffer.from(content, 'utf-8'),
        fileName: path.basename(targetFilePath),
        mimetype: 'application/javascript',
        caption: `📄 Plugin: \`plugins/${relPath}\``
      },
      { quoted: m.raw }
    )
  }

  return m.reply(content)
}

handler.command = ['getplugin', 'gp', 'gf', 'getfile']
handler.owner = true
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
