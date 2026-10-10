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
import { execSync } from 'child_process'

const handler = async (m, { sock, conn, reply }) => {
  const client = conn || sock
  const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const zipFileName = `Rubby_Backup_${dateStr}.zip`
  const zipFilePath = path.join('/tmp', zipFileName)

  await reply('⏳ Sedang memproses backup file script bot...')

  try {
    const cwd = process.cwd()
    const zipCmd = `zip -r "${zipFilePath}" . -x "node_modules/*" -x "tmp/*" -x ".git/*" -x ".npm/*" -x "*.zip" -x "*.log"`
    execSync(zipCmd, { cwd, stdio: 'pipe' })

    if (!fs.existsSync(zipFilePath)) {
      return reply('❌ Gagal membuat file zip backup.')
    }

    const zipBuffer = fs.readFileSync(zipFilePath)
    const stats = fs.statSync(zipFilePath)
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2)

    const ownerJid = Array.isArray(global.owner) && global.owner[0]
      ? `${String(global.owner[0]).replace(/[^0-9]/g, '')}@s.whatsapp.net`
      : m.sender

    const caption = `📦 *BACKUP SCRIPT BOT*\n\n` +
      `📁 *Nama File:* ${zipFileName}\n` +
      `⚖️ *Ukuran:* ${sizeMb} MB\n` +
      `📅 *Tanggal:* ${new Date().toLocaleString('id-ID')}\n\n` +
      `_Backup aman tanpa node_modules & temporary files._`

    await client.sendMessage(
      ownerJid,
      {
        document: zipBuffer,
        mimetype: 'application/zip',
        fileName: zipFileName,
        caption
      },
      { quoted: m }
    )

    if (m.chat !== ownerJid) {
      await reply(`✅ File backup (${sizeMb} MB) berhasil dikirimkan ke chat Owner.`)
    }
  } catch (err) {
    console.error('[BACKUP ERROR]', err)
    reply(`❌ Gagal melakukan backup: ${err.message || err}`)
  } finally {
    try {
      if (fs.existsSync(zipFilePath)) {
        fs.unlinkSync(zipFilePath)
      }
    } catch {}
  }
}

handler.help = ['backup']
handler.tags = ['owner']
handler.command = /^(backup|backupbot|bckp)$/i
handler.owner = true

export default handler
