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
	if (!text) {
		return reply(`*Mobile Legends Stalker (Kyzz API)*\n\nContoh:\n${usedPrefix}${command} 12345678|1234`)
	}

	const parts = text.split('|').map(s => s.trim())
	if (parts.length < 2) return reply(`❌ Masukkan format ID|ZoneId\nContoh: ${usedPrefix}${command} 12345678|1234`)

	reply(global.mess.wait)

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/ml', { id: parts[0], zone_id: parts[1] }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 })

		if (!data.status || !data.result) return reply('❌ Akun Mobile Legends tidak ditemukan / ID salah.')
		const res = data.result
		const caption = `🎮 *MOBILE LEGENDS STALKER*\n\n` +
			`👤 *Nickname:* ${res.username || res.nickname || '-'}\n` +
			`🆔 *User ID:* ${parts[0]}\n` +
			`🌐 *Zone ID:* ${parts[1]}`

		return reply(caption)
	} catch (e) {
		console.error('[ML STALK ERROR]', e)
		return reply('❌ Terjadi kesalahan saat melakukan stalk Mobile Legends.')
	}
}

handler.help = ['mlstalk <id>|<zone_id>', 'mlbbstalk <id>|<zone_id>']
handler.tags = ['stalker']
handler.command = ['mlstalk', 'mlbbstalk']
handler.limit = true;
handler.register = true

export default handler
