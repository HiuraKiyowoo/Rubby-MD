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
import os from 'node:os'
import crypto from 'node:crypto'
import { spawn } from 'node:child_process'

async function convertAudioToVn(audioBuffer) {
  const tmpIn = path.join(os.tmpdir(), `tovn_in_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.tmp`)
  const tmpOut = path.join(os.tmpdir(), `tovn_out_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.opus`)

  await fs.promises.writeFile(tmpIn, audioBuffer)

  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-hide_banner',
      '-loglevel', 'error',
      '-y',
      '-i', tmpIn,
      '-vn',
      '-c:a', 'libopus',
      '-b:a', '128k',
      '-vbr', 'on',
      '-compression_level', '10',
      tmpOut
    ], { stdio: ['ignore', 'ignore', 'ignore'] })

    ff.on('close', async () => {
      try {
        if (fs.existsSync(tmpIn)) await fs.promises.unlink(tmpIn).catch(() => {})
        if (fs.existsSync(tmpOut)) {
          const res = await fs.promises.readFile(tmpOut)
          await fs.promises.unlink(tmpOut).catch(() => {})
          resolve(res)
        } else {
          reject(new Error('Failed to convert audio to vn'))
        }
      } catch (err) {
        reject(err)
      }
    })

    ff.on('error', async (err) => {
      if (fs.existsSync(tmpIn)) await fs.promises.unlink(tmpIn).catch(() => {})
      if (fs.existsSync(tmpOut)) await fs.promises.unlink(tmpOut).catch(() => {})
      reject(err)
    })
  })
}

let handler = async (m, { sock, conn, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted || m
  const mime = quoted.mimetype || m.mimetype || ''

  if (!mime || (!/audio/i.test(mime) && !/video/i.test(mime))) {
    return m.reply(`Kirim atau balas (reply) audio/video dengan command:\n${usedPrefix}${command}`)
  }

  let buffer
  try {
    buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
  } catch (e) {
    return m.reply(`Gagal mengunduh audio: ${e.message || e}`)
  }

  if (!buffer || !Buffer.isBuffer(buffer)) {
    return m.reply('Buffer audio tidak valid.')
  }

  try {
    const vnBuffer = await convertAudioToVn(buffer)
    return await client.sendMessage(
      m.chat,
      {
        audio: vnBuffer,
        mimetype: 'audio/ogg; codecs=opus',
        ptt: true
      },
      { quoted: m.raw }
    )
  } catch (e) {
    return m.reply(`Gagal mengonversi ke Voice Note:\n${e.message || e}`)
  }
}

handler.command = ['tovn', 'toptt', 'tovoice']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
