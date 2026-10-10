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

let handler = async (m, { conn, sock, text, usedPrefix, command }) => {
  const client = conn || sock
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || ''

  if (!mime.startsWith('image/')) {
    return m.reply(`Kirim atau balas (reply) pas foto dengan caption:\n*${usedPrefix + command} <nama | nik | ttl | alamat>*\n\nAtau kosongkan teks untuk data default.`)
  }

  const parts = (text || '').split('|').map(s => s.trim()).filter(Boolean)

  const provinsi = parts[0] || 'JAWA BARAT'
  const kota = parts[1] || 'BANDUNG'
  const nik = parts[2] || '3273010101010001'
  const nama = parts[3] || 'JOHN DOE'
  const ttl = parts[4] || 'BANDUNG, 01-01-2000'
  const jenis_kelamin = parts[5] || 'LAKI-LAKI'
  const golongan_darah = parts[6] || 'O'
  const alamat = parts[7] || 'JL. MERDEKA NO. 1'
  const rt_rw = parts[8] || '001/002'
  const kel_desa = parts[9] || 'CIBADUYUT'
  const kecamatan = parts[10] || 'BOJONGLOA KIDUL'
  const agama = parts[11] || 'ISLAM'
  const status = parts[12] || 'BELUM KAWIN'
  const pekerjaan = parts[13] || 'SWASTA'
  const kewarganegaraan = parts[14] || 'WNI'
  const masa_berlaku = parts[15] || 'SEUMUR HIDUP'
  const terbuat = parts[16] || 'BANDUNG, 01-01-2020'

  await m.reply('Sedang membuat fake KTP...')

  try {
    const buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download()
    if (!buffer) return m.reply('Gagal mengunduh pas foto.')

    const formData = new FormData()
    formData.append('pas_photo', new Blob([buffer], { type: 'image/jpeg' }), 'pas_photo.jpg')
    formData.append('provinsi', provinsi)
    formData.append('kota', kota)
    formData.append('nik', nik)
    formData.append('nama', nama)
    formData.append('ttl', ttl)
    formData.append('jenis_kelamin', jenis_kelamin)
    formData.append('golongan_darah', golongan_darah)
    formData.append('alamat', alamat)
    formData.append('rt_rw', rt_rw)
    formData.append('kel_desa', kel_desa)
    formData.append('kecamatan', kecamatan)
    formData.append('agama', agama)
    formData.append('status', status)
    formData.append('pekerjaan', pekerjaan)
    formData.append('kewarganegaraan', kewarganegaraan)
    formData.append('masa_berlaku', masa_berlaku)
    formData.append('terbuat', terbuat)

    const apiUrl = global.API('kyzz', '/api/canvas/fake-ktp', {}, 'apikey')
    const res = await fetch(apiUrl, { method: 'POST', body: formData })

    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)

    const resultBuffer = Buffer.from(await res.arrayBuffer())

    await client.sendMessage(
      m.chat,
      {
        image: resultBuffer,
        caption: `Fake KTP: *${nama}* (NIK: ${nik}) ✨`
      },
      { quoted: m.raw || (typeof sock.getFakeQuoted === 'function' ? sock.getFakeQuoted() : undefined) }
    )
  } catch (err) {
    return m.reply(`Gagal membuat fake KTP:\n${err.message || err}`)
  }
}

handler.command = ['fakektp', 'ktpfake']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
