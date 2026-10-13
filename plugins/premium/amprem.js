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
┇   › Feature  : Alight Motion Premium Account
┇   › Endpoint : https://am.kyzzz.xyz
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import axios from 'axios'

const BASE_URL = 'https://am.kyzzz.xyz'

const handler = async (m, { text, reply, usedPrefix, command }) => {
  const cmd = command.toLowerCase()

  if (cmd === 'amprem') {
    const email = (text || '').trim()

    if (!email) {
      return reply(`✨ *ALIGHT MOTION PREMIUM — SEND LINK*\n\nKirim link verifikasi ke email Alight Motion kamu.\n\nContoh:\n${usedPrefix}${command} akunanda@gmail.com`)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return reply(`⚠️ Format email tidak valid. Masukkan alamat email yang benar!\n\nContoh:\n${usedPrefix}${command} akunanda@gmail.com`)
    }

    await m.react('⏳')

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/send-link`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 20000
        }
      )

      await m.react('✅')

      let caption = `📬 *LINK VERIFIKASI BERHASIL DIKIRIM!*\n\n`
      caption += `• *Email:* ${email}\n`
      if (data.message) caption += `• *Status:* ${data.message}\n`
      caption += `\nSilakan cek inbox/spam email kamu, lalu salin link verifikasinya dan verifikasi dengan perintah:\n`
      caption += `\`${usedPrefix}amprem-verif ${email}|<link_dari_email>\``

      return reply(caption)
    } catch (err) {
      await m.react('❌')
      const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Gagal mengirim link verifikasi.'
      return reply(`❌ *Gagal Mengirim Link:*\n${errMsg}`)
    }
  }

  if (cmd === 'amprem-verif' || cmd === 'ampremverif') {
    if (!text || !text.includes('|')) {
      return reply(`🔐 *ALIGHT MOTION PREMIUM — VERIFIKASI*\n\nVerifikasi akun Alight Motion menggunakan email dan link dari pesan masuk.\n\nContoh:\n${usedPrefix}${command} akunanda@gmail.com|https://alightcreative.com?link=...oobCode=...`)
    }

    const [rawEmail, ...restLink] = text.split('|')
    const email = rawEmail.trim()
    const link = restLink.join('|').trim()

    if (!email || !link) {
      return reply(`⚠️ Format tidak lengkap!\n\nContoh:\n${usedPrefix}${command} akunanda@gmail.com|https://alightcreative.com?link=...oobCode=...`)
    }

    await m.react('⏳')

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/verify`,
        { email, link },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 25000
        }
      )

      await m.react('✅')

      let caption = `🎉 *VERIFIKASI ALIGHT MOTION SUKSES!*\n\n`
      caption += `• *Email:* ${email}\n`
      if (data.message) caption += `• *Status:* ${data.message}\n`
      if (data.data && typeof data.data === 'object') {
        for (const [k, v] of Object.entries(data.data)) {
          caption += `• *${k}:* ${v}\n`
        }
      }

      return reply(caption.trim())
    } catch (err) {
      await m.react('❌')
      const errMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Gagal memverifikasi akun.'
      return reply(`❌ *Gagal Verifikasi:*\n${errMsg}`)
    }
  }
}

handler.help = ['amprem <email>', 'amprem-verif <email|link>']
handler.tags = ['premium']
handler.command = /^(amprem|amprem-verif|ampremverif)$/i
handler.limit = true
handler.premium = true
handler.register = true

export default handler
