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

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
  const client = sock || conn || global.mainSock
  if (!text) {
    return reply(`✈️ *TELEGRAM USER STALKER*\n\nMasukkan username Telegram!\n\nContoh:\n${usedPrefix}${command} @kyuumasihcwo`)
  }

  const cleanUsername = text.trim().startsWith('@') ? text.trim() : `@${text.trim()}`
  reply(global.mess?.wait || '⏳ Mohon tunggu, sedang mencari data user Telegram...')

  try {
    const url = global.API('kyzz', '/api/stalker/telegram-user', { username: cleanUsername }, 'apikey')
    const res = await fetch(url)
    const json = await res.json()

    if (!json.status || !json.id) {
      return reply(`❌ User Telegram *${cleanUsername}* tidak ditemukan.`)
    }

    const caption = `✈️ *TELEGRAM USER STALKER*\n\n` +
      `👤 *Name:* ${json.fullName || json.firstName || '-'}\n` +
      `🆔 *ID:* ${json.id || '-'}\n` +
      `🏷️ *Username:* ${json.username || cleanUsername}\n` +
      `📝 *Bio:* ${json.bio || '-'}\n` +
      `🤖 *Is Bot:* ${json.isBot ? 'Yes' : 'No'}\n` +
      `✅ *Verified:* ${json.isVerified ? 'Yes' : 'No'}\n` +
      `⭐ *Premium:* ${json.isPremium ? 'Yes' : 'No'}\n` +
      `⚠️ *Scam:* ${json.isScam ? 'Yes' : 'No'}\n` +
      `🖼️ *Total Photos:* ${json.photosCount || (json.photos ? json.photos.length : 0)}\n` +
      `🔗 *Link:* ${json.link || `https://t.me/${user}`}`

    const photos = Array.isArray(json.photos) && json.photos.length > 0
      ? json.photos
      : (json.photoUrl ? [json.photoUrl] : [])

    if (photos.length > 1) {
      try {
        const albumMsg = await client.sendMessage(m.chat, {
          album: {
            expectedImageCount: photos.length,
            expectedVideoCount: 0
          }
        }, { quoted: m })

        for (let i = 0; i < photos.length; i++) {
          await client.sendMessage(m.chat, {
            image: { url: photos[i] },
            caption: i === 0 ? caption : undefined,
            albumParentKey: albumMsg?.key
          })
        }
      } catch (e) {
        console.warn('[TGUSER ALBUM FALLBACK]', e)
        for (let i = 0; i < photos.length; i++) {
          await client.sendMessage(m.chat, {
            image: { url: photos[i] },
            caption: i === 0 ? caption : undefined
          }, { quoted: m })
        }
      }
    } else if (photos.length === 1) {
      await client.sendMessage(m.chat, {
        image: { url: photos[0] },
        caption
      }, { quoted: m })
    } else {
      await reply(caption)
    }

  } catch (e) {
    console.error('[TGUSER ERROR]', e)
    return reply(`❌ Terjadi kesalahan saat stalk user Telegram:\n${e.message}`)
  }
}

handler.help = ['tguser <username>', 'telegramuser <username>']
handler.tags = ['stalker']
handler.command = ['tguser', 'telegramuser', 'tguserstalk']
handler.limit = true
handler.register = true

export default handler
