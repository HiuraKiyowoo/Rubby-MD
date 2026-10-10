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

async function uploadUguu(buffer) {
  try {
    const fd = new FormData()
    fd.append('files[]', new Blob([buffer], { type: 'image/jpeg' }), 'image.jpg')
    const res = await fetch('https://uguu.se/upload', {
      method: 'POST',
      body: fd
    })
    const json = await res.json()
    return json?.files?.[0]?.url || null
  } catch {
    return null
  }
}

let handler = async (m, { conn, sock, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || ''

  if (!mime.startsWith('image/')) {
    return m.reply(`Kirim atau balas (reply) gambar dengan caption *${usedPrefix + command}*`)
  }

  await m.reply('Sedang memproses gambar dengan AI...')

  try {
    const buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
    if (!buffer) return m.reply('Gagal mengunduh gambar.')

    const imageUrl = await uploadUguu(buffer)
    if (!imageUrl) return m.reply('Gagal mengunggah gambar.')

    const apiUrl = `https://api-faa.my.id/faa/${command}?url=${encodeURIComponent(imageUrl)}`
    const res = await fetch(apiUrl)

    if (!res.ok) return m.reply(`API error: ${res.status} ${res.statusText}`)

    const resultBuffer = Buffer.from(await res.arrayBuffer())

    await client.sendMessage(
      m.chat,
      {
        image: resultBuffer,
        caption: `Berhasil mengubah ke *${command}* ✨`
      },
      { quoted: m.raw || (typeof sock.getFakeQuoted === 'function' ? sock.getFakeQuoted() : undefined) }
    )
  } catch (err) {
    return m.reply(`Terjadi kesalahan: ${err.message || err}`)
  }
}

handler.command = ['tofigurav2']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
