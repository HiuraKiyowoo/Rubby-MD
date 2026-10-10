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

let handler = async (m, { conn, args, text }) => {
  let target = m.mentionedJid && m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : text
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : null

  if (!target || !target.includes('@s.whatsapp.net')) {
    return m.reply('Tag, reply pesan, atau masukkan nomor member yang ingin dikeluarkan!')
  }

  let botJid = conn.user?.id ? (await conn.decodeJid(conn.user.id)) : ''
  if (target === botJid) {
    return m.reply('Tidak bisa mengeluarkan bot sendiri.')
  }

  try {
    let res = await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    if (res && res[0]?.status === '200') {
      await m.reply(`Berhasil mengeluarkan @${target.split('@')[0]} dari grup.`, {
        mentions: [target]
      })
    } else {
      await m.reply(`Berhasil memproses pengeluaran @${target.split('@')[0]}.`, {
        mentions: [target]
      })
    }
  } catch (err) {
    await m.reply(`Gagal mengeluarkan member: ${err.message || err}`)
  }
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = /^(kick|tendang|dor)$/i
handler.group = true
handler.admin = true
handler.botadmin = true

export default handler
