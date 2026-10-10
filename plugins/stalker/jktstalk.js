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
		return reply(`*JKT48 Member Stalker (Kyzz API)*\n\nContoh:\n${usedPrefix}${command} freya`)
	}

	reply(global.mess.wait)

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/jkt', { username: text.trim() }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 })

		if (!data.status || !data.result) return reply(`❌ Member JKT48 *${text}* tidak ditemukan.`)
		const res = data.result
		const stlkText = `🌸 *JKT48 MEMBER STALKER*\n\n` +
			`👤 *Nama:* ${res.name || res.nama || '-'}\n` +
			`🎂 *Tanggal Lahir:* ${res.birthdate || res.ttl || '-'}\n` +
			`🩸 *Golongan Darah:* ${res.blood_type || '-'}\n` +
			`📏 *Tinggi Badan:* ${res.height || '-'}\n` +
			`🏷️ *Generasi:* ${res.generation || '-'}`

		if (res.image || res.avatar) {
			return await client.sendMessage(m.chat, {
				image: { url: res.image || res.avatar },
				caption: stlkText
			}, { quoted: m })
		}
		return reply(stlkText)
	} catch (e) {
		console.error('[JKT48 STALK ERROR]', e)
		return reply('❌ Terjadi kesalahan saat melakukan stalk JKT48.')
	}
}

handler.help = ['jktstalk <nama/username>', 'jkt48stalk <nama/username>']
handler.tags = ['stalker']
handler.command = ['jktstalk', 'jkt48stalk']
handler.limit = true;
handler.register = true

export default handler
