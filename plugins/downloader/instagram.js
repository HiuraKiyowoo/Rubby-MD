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

const handler = async (m, { sock, text, reply, usedPrefix, command }) => {
	const quotedText = m.quoted ? (m.quoted.text || m.quoted.caption || m.quoted.description || m.quoted.msg?.caption || m.quoted.msg?.text || '') : ''
	const rawInput = (text || quotedText || '').trim()
	const urlMatch = rawInput.match(/https?:\/\/(?:www\.)?(?:instagram\.com|instagr\.am)\/[^\s]+/i) || rawInput.match(/https?:\/\/[^\s]+/i)
	const targetUrl = urlMatch ? urlMatch[0] : rawInput

	if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
		return reply(`*Instagram Downloader*\n\nContoh:\n${usedPrefix}${command} https://www.instagram.com/p/Cxxxxxx/\nAtau reply pesan yang berisi link Instagram!`)
	}

	reply(global.mess.wait)

	try {
		let resultUrl = null
		let isVideo = true

		try {
			const apiUrl = global.API('kyzz', '/api/download/instagram', { url: targetUrl }, 'apikey')
			const { data } = await axios.get(apiUrl, { timeout: 20000 })
			if (data && data.status && data.result) {
				const res = data.result
				if (Array.isArray(res) && res.length > 0) {
					for (let item of res) {
						const url = typeof item === 'string' ? item : item.url
						if (url) {
							if (url.includes('.mp4')) {
								await sock.sendMessage(m.chat, { video: { url }, caption: '✅ Instagram Video' }, { quoted: m })
							} else {
								await sock.sendMessage(m.chat, { image: { url }, caption: '✅ Instagram Photo' }, { quoted: m })
							}
						}
					}
					return
				} else if (res.url) {
					resultUrl = res.url
				}
			}
		} catch (e) {}

		if (!resultUrl) {
			const { data } = await axios.get(`https://api.vreden.web.id/api/igdownload?url=${encodeURIComponent(targetUrl)}`, { timeout: 15000 }).catch(() => ({ data: null }))
			if (data && data.result && data.result.length > 0) {
				for (let item of data.result) {
					const url = item.url || item
					if (url.includes('.mp4')) {
						await sock.sendMessage(m.chat, { video: { url }, caption: '✅ Instagram Video' }, { quoted: m })
					} else {
						await sock.sendMessage(m.chat, { image: { url }, caption: '✅ Instagram Photo' }, { quoted: m })
					}
				}
				return
			}
		}

		return reply('❌ Gagal mengunduh media Instagram. Pastikan tautan publik!')
	} catch (e) {
		console.error('[INSTAGRAM ERROR]', e)
		return reply('❌ Terjadi kesalahan saat mengunduh dari Instagram.')
	}
}

handler.help = ['instagram <url>']
handler.tags = ['downloader']
handler.command = ['instagram','ig']
handler.limit = true;
handler.register = true

export default handler
