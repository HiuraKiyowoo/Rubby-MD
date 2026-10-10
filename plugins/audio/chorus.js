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

import { unlinkSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import { exec } from "child_process"

const handler = async (m, { conn, sock, usedPrefix, command, reply }) => {
  const client = conn || sock
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mimetype || q.mediaType || (q.msg || q).mtype || q.mtype || ""
    if (q.mtype === "audioMessage" || q.msg?.audioMessage || q.message?.audioMessage) {
      mime = mime || "audio/mp4"
    }

    if (!/audio/.test(mime)) {
      return (reply || m.reply)(`*[INFO] Reply audio atau VN dengan perintah ${usedPrefix + command}*`)
    }

    let tmpDir = join(process.cwd(), "tmp")
    if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true })

    let getRandom = (ext) => `${Math.floor(Math.random() * 100000)}_${Date.now()}${ext}`
    let inputPath = join(tmpDir, getRandom(".mp3"))
    let outputPath = join(tmpDir, getRandom(".mp3"))

    let media = null
    if (typeof q.download === "function") {
      media = await q.download().catch(() => null)
    }
    if (!media && typeof m.quoted?.download === "function") {
      media = await m.quoted.download().catch(() => null)
    }

    if (typeof media === "string") {
      inputPath = media
    } else if (Buffer.isBuffer(media)) {
      writeFileSync(inputPath, media)
    } else {
      return (reply || m.reply)("❌ Gagal mengunduh audio. Balas (reply) pesan audio atau VN!")
    }

    const ffmpegFilter = "-af chorus=0.7:0.9:55:0.4:0.25:2"
    exec(`ffmpeg -y -i "${inputPath}" ${ffmpegFilter} "${outputPath}"`, async (err) => {
      try {
        try { unlinkSync(inputPath) } catch {}
        if (err) return (reply || m.reply)("❌ Gagal memproses efek audio!")

        let buff = readFileSync(outputPath)
        await client.sendMessage(m.chat, {
          audio: buff,
          mimetype: "audio/mpeg",
          ptt: false
        }, { quoted: m })

        try { unlinkSync(outputPath) } catch {}
      } catch {
        (reply || m.reply)("Error processing audio file")
      }
    })
  } catch (e) {
    console.error(e)
    (reply || m.reply)("❌ Terjadi kesalahan pada fitur audio effect.")
  }
}

handler.help = ["chorus"]
handler.tags = ["audio"]
handler.command = ["chorus"]
handler.limit = true

export default handler
