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

import axios from "axios"

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
  const client = conn || sock
  if (!text) {
    return reply(`🔍 *APKMODY SEARCH*\n\nPencarian aplikasi & game mod APKMody.\n\nContoh:\n${usedPrefix}${command} GTA\n${usedPrefix}${command} Minecraft`)
  }

  await m.react("⏳")

  try {
    const apiUrl = global.API("kyzz", "/api/search/apkmody", { query: text, page: 1 }, "apikey")
    const { data } = await axios.get(apiUrl, { timeout: 15000 }).catch(() => ({ data: null }))

    let items = []
    if (data && data.status && data.result && Array.isArray(data.result.items)) {
      items = data.result.items
    }

    if (items.length === 0) {
      await m.react("✖️")
      return reply(`❌ Aplikasi *"${text}"* tidak ditemukan di APKMody.`)
    }

    await m.react("✅")

    let caption = `📦 *APKMODY SEARCH RESULTS*\n\nDitemukan *${items.length}* hasil untuk *"${text}"*.\n\n`
    items.slice(0, 10).forEach((item, idx) => {
      caption += `*${idx + 1}. ${item.title}*\n`
      caption += `   ℹ️ Version: ${item.version || "-"}\n`
      caption += `   🔗 Link: ${item.url || "-"}\n\n`
    })
    return reply(caption)
  } catch (e) {
    console.error("[APKMODY SEARCH ERROR]", e)
    await m.react("❌")
    return reply("❌ Terjadi kesalahan saat mengakses API APKMody.")
  }
}

handler.help = ["apkmody <query>", "apkmodysearch <query>"]
handler.tags = ["search"]
handler.command = ["apkmody", "apkmodysearch"]
handler.limit = true;
handler.register = true

export default handler
