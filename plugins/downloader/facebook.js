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
	const urlMatch = rawInput.match(/https?:\/\/(?:www\.|web\.|m\.)?(?:facebook\.com|fb\.watch|fb\.com)\/[^\s]+/i) || rawInput.match(/https?:\/\/[^\s]+/i)
	const targetUrl = urlMatch ? urlMatch[0] : rawInput

	if (!targetUrl || (!targetUrl.includes('facebook.com') && !targetUrl.includes('fb.watch') && !targetUrl.includes('fb.com'))) {
		return reply(`*Facebook Downloader*\n\nContoh:\n${usedPrefix}${command} https://www.facebook.com/reel/769350766988277/\nAtau reply pesan yang berisi link Facebook!`)
	}

	reply(global.mess.wait)

	try {
		const apiUrl = global.API('kyzz', '/api/download/facebook', { url: targetUrl }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 25000 })

		if (!data.status || !data.downloads || !Array.isArray(data.downloads.links) || data.downloads.links.length === 0) {
			return reply('❌ Gagal mengunduh video Facebook. Pastikan tautan publik!')
		}

		const metadata = data.metadata || {}
		const links = data.downloads.links

		let videoObj = links.find(l => l.type === 'HD' || l.quality === '720p' || l.quality === '1080p')
		if (!videoObj) {
			videoObj = links.find(l => l.type === 'SD' || l.quality === '360p' || l.quality === '480p')
		}
		if (!videoObj) {
			videoObj = links.find(l => l.type !== 'Audio')
		}

		const audioObj = links.find(l => l.type === 'Audio' || l.quality === 'Mp3')

		const caption = `🎥 *FACEBOOK DOWNLOADER*\n\n` +
			`📌 *Judul:* ${metadata.title || '-'}\n` +
			`👤 *Author:* ${metadata.author || '-'}\n` +
			`⏱️ *Durasi:* ${metadata.duration || '-'}\n` +
			`👁️ *Views:* ${metadata.view_count || '-'}\n` +
			`📺 *Kualitas:* ${videoObj?.quality || videoObj?.type || 'SD'}`

		if (videoObj && videoObj.url) {
			await sock.sendMessage(m.chat, {
				video: { url: videoObj.url },
				caption: caption,
				mimetype: 'video/mp4'
			}, { quoted: m })
		} else {
			reply('❌ Video resolusi tidak ditemukan.')
		}

		if (audioObj && audioObj.url) {
			await sock.sendMessage(m.chat, {
				audio: { url: audioObj.url },
				mimetype: 'audio/mpeg',
				fileName: `${metadata.title || 'facebook_audio'}.mp3`
			}, { quoted: m })
		}

	} catch (e) {
		console.error('[FACEBOOK DOWNLOAD ERROR]', e.response?.data || e)
		return reply('❌ Terjadi kesalahan saat mengunduh media Facebook.')
	}
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = ['facebook','fb']
handler.limit = true;

handler.register = true

export default handler
