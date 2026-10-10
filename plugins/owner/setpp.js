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

import sharp from 'sharp'

async function generateProfilePictureFull(mediaBuffer) {
  const meta = await sharp(mediaBuffer).metadata()
  const max = Math.max(meta.width || 720, meta.height || 720)
  const min = Math.min(meta.width || 720, meta.height || 720)

  const img = await sharp(mediaBuffer)
    .resize(max, max, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .jpeg({ quality: 90 })
    .toBuffer()

  const preview = await sharp(mediaBuffer)
    .resize(min, min, {
      fit: 'cover'
    })
    .jpeg({ quality: 75 })
    .toBuffer()

  return { img, preview }
}

let handler = async (m, { sock, conn, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted || m
  const mime = quoted.mimetype || m.mimetype || ''
  const isImage = /image/i.test(mime)

  if (!isImage) {
    return m.reply(`Kirim atau balas (reply) foto dengan command:\n${usedPrefix}${command}`)
  }

  let buffer
  try {
    buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
  } catch (e) {
    return m.reply(`Gagal mengunduh gambar: ${e.message || e}`)
  }

  if (!buffer || !Buffer.isBuffer(buffer)) {
    return m.reply('Buffer gambar tidak valid.')
  }

  try {
    const { img, preview } = await generateProfilePictureFull(buffer)
    const botJid = client.user?.id || client.authState?.creds?.me?.id

    await client.query({
      tag: 'iq',
      attrs: {
        to: '@s.whatsapp.net',
        type: 'set',
        xmlns: 'w:profile:picture'
      },
      content: [
        {
          tag: 'picture',
          attrs: { type: 'image' },
          content: img
        }
      ]
    })

    return m.reply('✓ Sukses memperbarui Foto Profil Bot (Full Size / Panjang)!')
  } catch (e) {
    try {
      await client.updateProfilePicture(client.user?.id, buffer)
      return m.reply('✓ Sukses memperbarui Foto Profil Bot!')
    } catch (err) {
      return m.reply(`Gagal memperbarui Foto Profil Bot:\n${err.message || err}`)
    }
  }
}

handler.command = ['setpp', 'setppbot', 'setppfull', 'setpppanjang']
handler.owner = true
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
