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

import dns from 'node:dns'
import util from 'node:util'

dns.setDefaultResultOrder('ipv4first')

let handler = async (m, { sock, conn, text, usedPrefix, command }) => {
  const client = conn || sock
  const input = (text || '').trim()

  if (!input) {
    return m.reply(`Harap masukkan URL yang valid!\nContoh:\n${usedPrefix}${command} https://api.github.com/users/octocat`)
  }

  const urlMatch = input.match(/https?:\/\/[^\s]+/)
  if (!urlMatch) {
    return m.reply('Format URL tidak valid! Harus diawali dengan http:// atau https://')
  }

  const targetUrl = urlMatch[0]

  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1'
    }

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers,
      redirect: 'follow'
    })

    const contentType = res.headers.get('content-type') || ''

    if (/image/i.test(contentType)) {
      const buffer = Buffer.from(await res.arrayBuffer())
      return await client.sendMessage(m.chat, { image: buffer, caption: `✓ Fetch Image Sukses\n🔗 ${targetUrl}` }, { quoted: m.raw })
    }

    if (/video/i.test(contentType)) {
      const buffer = Buffer.from(await res.arrayBuffer())
      return await client.sendMessage(m.chat, { video: buffer, caption: `✓ Fetch Video Sukses\n🔗 ${targetUrl}` }, { quoted: m.raw })
    }

    if (/audio/i.test(contentType)) {
      const buffer = Buffer.from(await res.arrayBuffer())
      return await client.sendMessage(m.chat, { audio: buffer, mimetype: contentType }, { quoted: m.raw })
    }

    if (/json/i.test(contentType)) {
      const json = await res.json()
      const formatted = JSON.stringify(json, null, 2)
      if (formatted.length > 4000) {
        return await client.sendMessage(
          m.chat,
          {
            document: Buffer.from(formatted, 'utf-8'),
            mimetype: 'application/json',
            fileName: 'response.json',
            caption: `✓ JSON Response (${res.status} ${res.statusText})\n🔗 ${targetUrl}`
          },
          { quoted: m.raw }
        )
      }
      return m.reply(formatted)
    }

    const textData = await res.text()
    if (textData.length > 4000) {
      return await client.sendMessage(
        m.chat,
        {
          document: Buffer.from(textData, 'utf-8'),
          mimetype: 'text/plain',
          fileName: 'response.txt',
          caption: `✓ Text Response (${res.status} ${res.statusText})\n🔗 ${targetUrl}`
        },
        { quoted: m.raw }
      )
    }

    return m.reply(textData)
  } catch (e) {
    return m.reply(`Gagal mengambil data dari URL:\n${e.message || e}`)
  }
}

handler.command = ['get', 'fetch', 'curl']
handler.owner = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
