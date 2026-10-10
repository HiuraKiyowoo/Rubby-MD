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
		return reply(`*Discord Stalker (Kyzz API)*\n\nContoh:\n${usedPrefix}${command} 123456789012345678`)
	}

	reply(global.mess.wait)

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/discord', { id: text.trim() }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 })

		if (!data.status || !data.result) return reply(`❌ User ID Discord *${text}* tidak ditemukan.`)
		const res = data.result
		const stlkText = `🎮 *DISCORD STALKER*\n\n` +
			`👤 *Global Name:* ${res.global_name || res.username || '-'}\n` +
			`🆔 *Username:* ${res.username || '-'}\n` +
			`🔢 *ID:* \`${res.id}\`\n` +
			`🎨 *Accent Color:* ${res.accent_color || '-'}\n` +
			`🖼️ *Avatar URL:* ${res.avatar || '-'}`

		if ($1) {
			return await client.sendButtons(m.chat, {
				location: {
					degreesLatitude: 0,
					degreesLongitude: 0,
					address: (global.botName || 'Rubby Multi Device'),
					jpegThumbnail: await (await fetch($1)).arrayBuffer()
				},
				text: '',
				footer: stlkText,
				buttons: [
					{
						displayText: `👑 ${global.namaOwner || 'Owner'}`,
						url: global.website || 'https://api.kyzzz.xyz'
					}
				]
			}, { quoted: m })
		}
		return reply(stlkText)
	} catch (e) {
		console.error('[DISCORD STALK ERROR]', e)
		return reply('❌ Terjadi kesalahan saat melakukan stalk Discord.')
	}
}

handler.help = ['discordstalk <user_id>', 'dcstalk <user_id>']
handler.tags = ['stalker']
handler.command = ['discordstalk', 'dcstalk']
handler.limit = true;
handler.register = true

export default handler
