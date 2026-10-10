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
import sharp from 'sharp'

export async function imageToWebp(mediaBuffer) {
  return await sharp(mediaBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp({ quality: 80 })
    .toBuffer()
}

export async function videoToWebp(mediaBuffer) {
  const tmpIn = path.join(os.tmpdir(), `vid_in_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.mp4`)
  const tmpOut = path.join(os.tmpdir(), `vid_out_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.webp`)

  await fs.promises.writeFile(tmpIn, mediaBuffer)

  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-hide_banner',
      '-loglevel', 'error',
      '-y',
      '-i', tmpIn,
      '-vcodec', 'libwebp',
      '-filter:v', "fps=fps=15,scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1",
      '-lossless', '0',
      '-compression_level', '4',
      '-q:v', '50',
      '-loop', '0',
      '-preset', 'default',
      '-an',
      '-vsync', '0',
      '-s', '512:512',
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
          reject(new Error('Failed to convert video to webp'))
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

export async function writeExif(mediaWebpBuffer, metadata = {}) {
  const packName = metadata.packName || metadata.packname || global.packname || global.botName || 'Rubby Multi Device'
  const packPublish = metadata.packPublish || metadata.packAuthor || metadata.author || global.author || global.botCreator || 'Kyuu'
  const packId = metadata.packId || crypto.randomBytes(16).toString('hex')
  const emojis = Array.isArray(metadata.emojis) ? metadata.emojis : ['🤖']

  const json = {
    'sticker-pack-id': packId,
    'sticker-pack-name': packName,
    'sticker-pack-publisher': packPublish,
    'emojis': emojis
  }

  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x16, 0x00, 0x00, 0x00
  ])

  const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8')
  const exifPayload = Buffer.concat([exifAttr, jsonBuff])
  exifPayload.writeUIntLE(jsonBuff.length, 14, 4)

  const exifChunkHeader = Buffer.from('EXIF')
  const exifChunkSize = Buffer.alloc(4)
  exifChunkSize.writeUInt32LE(exifPayload.length, 0)
  const exifPadding = exifPayload.length % 2 !== 0 ? Buffer.from([0x00]) : Buffer.alloc(0)
  const exifChunk = Buffer.concat([exifChunkHeader, exifChunkSize, exifPayload, exifPadding])

  let body = mediaWebpBuffer.slice(12)
  let vp8xChunk = null
  let otherChunks = []
  let offset = 0

  while (offset < body.length) {
    const fourCC = body.slice(offset, offset + 4).toString('ascii')
    const size = body.readUInt32LE(offset + 4)
    const paddedSize = size + (size % 2 !== 0 ? 1 : 0)
    const chunkData = body.slice(offset, offset + 8 + paddedSize)

    if (fourCC === 'VP8X') {
      vp8xChunk = chunkData
    } else if (fourCC !== 'EXIF') {
      otherChunks.push(chunkData)
    }
    offset += 8 + paddedSize
  }

  if (vp8xChunk) {
    let flags = vp8xChunk.readUInt8(8)
    flags |= 0x08
    vp8xChunk.writeUInt8(flags, 8)
  } else {
    let meta = null
    try {
      meta = await sharp(mediaWebpBuffer, { animated: true }).metadata()
    } catch {}

    const width = ((meta?.width || 512) - 1)
    const height = ((meta?.height || 512) - 1)
    const flags = 0x08 | (meta?.hasAlpha ? 0x10 : 0x00) | ((meta?.pages && meta.pages > 1) ? 0x02 : 0x00)

    const vp8xPayload = Buffer.alloc(10)
    vp8xPayload.writeUInt8(flags, 0)
    vp8xPayload.writeUIntLE(width, 4, 3)
    vp8xPayload.writeUIntLE(height, 7, 3)

    const vp8xHeader = Buffer.from('VP8X')
    const vp8xSize = Buffer.alloc(4)
    vp8xSize.writeUInt32LE(10, 0)
    vp8xChunk = Buffer.concat([vp8xHeader, vp8xSize, vp8xPayload])
  }

  const finalBody = Buffer.concat([vp8xChunk, ...otherChunks, exifChunk])
  const finalRiffSize = Buffer.alloc(4)
  finalRiffSize.writeUInt32LE(finalBody.length + 4, 0)

  return Buffer.concat([
    Buffer.from('RIFF'),
    finalRiffSize,
    Buffer.from('WEBP'),
    finalBody
  ])
}

export async function createSticker(mediaBuffer, metadata = {}) {
  let webpBuffer
  const isVideo = metadata.isVideo || false
  if (isVideo) {
    webpBuffer = await videoToWebp(mediaBuffer)
  } else {
    webpBuffer = await imageToWebp(mediaBuffer)
  }
  return await writeExif(webpBuffer, metadata)
}

export default {
  imageToWebp,
  videoToWebp,
  writeExif,
  createSticker
}
