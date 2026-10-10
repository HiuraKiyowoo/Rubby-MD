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

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
	const client = conn || sock
	if (!text) {
		return reply(`*Spotify Track Search*\n\nContoh:\n${usedPrefix}${command} Heavy Is The Crown\n${usedPrefix}${command} Feast Peradaban`)
	}

	reply(`⏳ Mencari lagu di Spotify untuk *"${text}"*...`)

	try {
		const apiUrl = global.API('kyzz', '/api/search/spotify', { query: text }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 15000 }).catch(() => ({ data: null }))

		let tracks = []
		if (data && data.status && Array.isArray(data.result)) {
			tracks = data.result
		}

		if (tracks.length === 0) {
			return reply(`❌ Lagu *"${text}"* tidak ditemukan di Spotify.`)
		}

		const listRows = tracks.slice(0, 10).map((item, idx) => ({
			title: `${idx + 1}. ${(item.title || item.name || '').slice(0, 20)}`,
			description: `Artis: ${item.artist || item.artists || '-'} • Durasi: ${item.duration || '-'}`,
			id: `${usedPrefix}play ${item.title || item.name} ${item.artist || ''}`
		}))

		const listMessage = {
			title: '🎧 HASIL SPOTIFY SEARCH',
			sections: [{ title: `Pencarian: ${text}`, rows: listRows }]
		}

		if (client.relayMessage) {
			return await client.relayMessage(
				m.chat,
				{
					viewOnceMessage: {
						message: {
							interactiveMessage: {
								body: { text: `🎧 *SPOTIFY TRACK SEARCH*\n\nDitemukan *${tracks.length}* lagu untuk *"${text}"*.\nKlik tombol di bawah untuk memutar lagu:` },
								footer: { text: `© ${global.botName || 'Rubby Multi Device'} • Spotify` },
								nativeFlowMessage: {
									buttons: [{
										name: "single_select",
										buttonParamsJson: JSON.stringify(listMessage)
									}]
								}
							}
						}
					}
				},
				{ quoted: m }
			)
		} else {
			let caption = `🎧 *SPOTIFY TRACK SEARCH*\n\n`
			tracks.slice(0, 10).forEach((t, i) => {
				caption += `*${i + 1}. ${t.title || t.name}*\n   👤 Artis: ${t.artist || '-'}\n   🔗 Link: ${t.url || '-'}\n\n`
			})
			return reply(caption)
		}
	} catch (e) {
		console.error('[SPOTIFY SEARCH ERROR]', e)
		return reply('❌ Terjadi kesalahan saat mencari di Spotify.')
	}
}

handler.help = ['spotify <judul_lagu>', 'spotisearch <judul_lagu>']
handler.tags = ['search']
handler.command = ['spotify', 'spotisearch', 'spsearch']
handler.limit = true;
handler.register = true

export default handler
