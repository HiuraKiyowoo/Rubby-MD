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

import { unlinkSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'

let handler = async (m, { conn, sock, args, usedPrefix, command, reply }) => {
    const client = conn || sock
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mimetype || q.mediaType || (q.msg || q).mtype || q.mtype || ''
        if (q.mtype === 'audioMessage' || q.msg?.audioMessage || q.message?.audioMessage) {
            mime = mime || 'audio/mp4'
        }

        if (!/audio/.test(mime)) {
            return (reply || m.reply)(`Balas vn/audio yang ingin diubah dengan caption *${usedPrefix + command}*`)
        }

        if (!args[0] || !args[1]) {
            return (reply || m.reply)(`Contoh: ${usedPrefix + command} 00:00:30 00:00:30`)
        }

        let tmpDir = join(process.cwd(), 'tmp')
        if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true })

        let getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`
        let inputPath = join(tmpDir, getRandom('.mp3'))
        let outputPath = join(tmpDir, getRandom('.mp3'))

        let media = null
        if (typeof q.download === 'function') {
            media = await q.download().catch(() => null)
        }
        if (!media && typeof m.quoted?.download === 'function') {
            media = await m.quoted.download().catch(() => null)
        }
        if (!media && client?.downloadAndSaveMediaMessage) {
            media = await client.downloadAndSaveMediaMessage(q).catch(() => null)
        }
        if (!media && client?.downloadMediaMessage) {
            media = await client.downloadMediaMessage(q).catch(() => null)
        }

        if (typeof media === 'string') {
            inputPath = media
        } else if (Buffer.isBuffer(media)) {
            writeFileSync(inputPath, media)
        } else {
            return (reply || m.reply)('❌ Gagal mengunduh audio.')
        }

        exec(`ffmpeg -y -ss ${args[0]} -i "${inputPath}" -t ${args[1]} -c copy "${outputPath}"`, async (err) => {
            try {
                try { unlinkSync(inputPath) } catch {}
                if (err) return (reply || m.reply)(`_*Error!*_`)

                let buff = readFileSync(outputPath)
                await client.sendMessage(m.chat, {
                    audio: buff,
                    mimetype: 'audio/mpeg',
                    ptt: false
                }, { quoted: m })

                try { unlinkSync(outputPath) } catch {}
            } catch {
                (reply || m.reply)('Error processing file')
            }
        })

    } catch (e) {
        console.error(e)
        (reply || m.reply)('❌ Terjadi kesalahan saat memotong audio.')
    }
}

handler.help = ['cutaudio', 'potongaudio'];
handler.tags = ['audio'];
handler.command = ['cutaudio'];
handler.limit = true;

export default handler;
