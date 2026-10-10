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
	const urlMatch = rawInput.match(/https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^\s]+/i) || rawInput.match(/https?:\/\/[^\s]+/i)
	const targetUrl = urlMatch ? urlMatch[0] : rawInput

	if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
		return reply(`*Twitter / X Downloader*\n\nContoh:\n${usedPrefix}${command} https://x.com/user/status/123456789\nAtau reply pesan yang berisi link Twitter/X!`)
	}

	reply(global.mess.wait)

	try {
		const apiUrl = global.API('kyzz', '/api/download/twitter', { url: targetUrl }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 }).catch(() => ({ data: null }))

		if (data && data.status && data.result) {
			const res = data.result
			const mediaUrl = res.url || res.video || res.HD || res.SD
			if (mediaUrl) {
				if (mediaUrl.includes('.mp4')) {
					return await sock.sendMessage(m.chat, { video: { url: mediaUrl }, caption: `🐦 *Twitter/X Media*\n\n${res.caption || ''}` }, { quoted: m })
				} else {
					return await sock.sendMessage(m.chat, { image: { url: mediaUrl }, caption: `🐦 *Twitter/X Media*\n\n${res.caption || ''}` }, { quoted: m })
				}
			}
		}

		return reply('❌ Gagal mengambil media dari Twitter/X.')
	} catch (e) {
		console.error('[TWITTER ERROR]', e)
		return reply('❌ Terjadi kesalahan saat mengunduh dari Twitter/X.')
	}
}

handler.help = ['twitter <url>']
handler.tags = ['downloader']
handler.command = ['twitter','twit']
handler.limit = true;
handler.register = true

export default handler
