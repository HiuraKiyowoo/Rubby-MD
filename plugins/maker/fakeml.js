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
    const res = await fetch('https://uguu.se/upload', { method: 'POST', body: fd })
    const json = await res.json()
    return json?.files?.[0]?.url || null
  } catch {
    return null
  }
}

let handler = async (m, { conn, sock, text, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || ''

  const parts = (text || '').split('|').map(s => s.trim()).filter(Boolean)
  const username = parts[0] || m.pushName || 'Kyuu'
  const rank = (parts[1] || 'epic').toLowerCase()
  const border = parts[2] || '0'

  const validRanks = ['epic', 'glory', 'gm', 'honor', 'imo', 'legend', 'mawi']
  const finalRank = validRanks.includes(rank) ? rank : 'epic'

  let avatarUrl = 'https://raw.githubusercontent.com/Ditzzx-vibecoder/Assets/main/Image/artworks-gWLRE6HyPH3DgVMG-ZFFxtg-t500x500.jpg'

  if (mime.startsWith('image/')) {
    try {
      const buf = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
      if (buf) {
        const up = await uploadUguu(buf)
        if (up) avatarUrl = up
      }
    } catch {}
  } else {
    try {
      const ppUrl = await client.profilePictureUrl(m.sender, 'image')
      if (ppUrl) avatarUrl = ppUrl
    } catch {}
  }

  await m.reply('Sedang membuat fake ML banner...')

  try {
    const apiUrl = global.API('kyzz', '/api/canvas/fake-ml', {
      avatar: avatarUrl,
      username,
      rank: finalRank,
      border
    }, 'apikey')

    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)

    const buffer = Buffer.from(await res.arrayBuffer())

    await client.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `Fake ML Profile: *${username}* (Rank: ${finalRank.toUpperCase()}) ✨`
      },
      { quoted: m.raw || (typeof sock.getFakeQuoted === 'function' ? sock.getFakeQuoted() : undefined) }
    )
  } catch (err) {
    return m.reply(`Gagal membuat fake ML:\n${err.message || err}`)
  }
}

handler.command = ['fakeml', 'mlfake']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
