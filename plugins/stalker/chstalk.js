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

import axios from 'axios'

const handler = async (m, { conn, sock, text, usedPrefix, command, reply }) => {
	const client = conn || sock
	if (!text) {
		return reply(`*WhatsApp Channel Stalker (Kyzz API)*\n\nContoh:\n${usedPrefix}${command} https://whatsapp.com/channel/xxxxxx`)
	}

	reply(global.mess.wait)

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/wa-sl-stalk', { url: text.trim() }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 })

		if (!data.status || !data.result) return reply('❌ Channel WhatsApp tidak ditemukan / link tidak valid.')
		const res = data.result
		const stlkText = `📢 *WHATSAPP CHANNEL STALKER*\n\n` +
			`📌 *Nama Channel:* ${res.name || res.title || '-'}\n` +
			`📝 *Deskripsi:* ${res.desc || res.description || '-'}\n` +
			`🔗 *Link:* ${text}`

		if (res.image || res.img || res.avatar) {
			return await client.sendMessage(m.chat, {
				image: { url: res.image || res.img || res.avatar },
				caption: stlkText
			}, { quoted: m })
		}
		return reply(stlkText)
	} catch (e) {
		console.error('[CHSTALK ERROR]', e.response?.data || e.message)
		return reply('❌ Terjadi kesalahan saat melakukan stalk Channel WhatsApp.')
	}
}

handler.help = ['chstalk <url_channel>', 'channelstalk <url_channel>']
handler.tags = ['stalker']
handler.command = ['chstalk', 'channelstalk']
handler.limit = true;
handler.register = true

export default handler
