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

const formatNumber = (num) => {
	if (!num && num !== 0) return '0'
	if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
	if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
	return num.toLocaleString('id-ID')
}

const handler = async (m, { sock, text, reply, usedPrefix, command }) => {
	const quotedText = m.quoted ? (m.quoted.text || m.quoted.caption || m.quoted.description || m.quoted.msg?.caption || m.quoted.msg?.text || '') : ''
	const rawInput = (text || quotedText || '').trim()
	const urlMatch = rawInput.match(/https?:\/\/(?:[a-zA-Z0-9_-]+\.)?(?:tiktok\.com|vt\.tiktok\.com|douyin\.com)\/[^\s]+/i) || rawInput.match(/https?:\/\/[^\s]+/i)
	const targetUrl = urlMatch ? urlMatch[0] : rawInput

	if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
		return reply(`*TikTok Downloader*\n\nContoh:\n${usedPrefix}${command} https://vt.tiktok.com/ZS67d26A7/\nAtau reply pesan yang berisi tautan TikTok!`)
	}

	reply(global.mess?.wait || '⏳ Sedang mengunduh media TikTok...')

	try {
		const apiUrl = global.API('kyzz', '/api/download/tiktok', { url: targetUrl }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 })

		if (!data?.status || !data?.result) {
			return reply('❌ Gagal mendapatkan data dari Kyzz API. Pastikan link TikTok valid!')
		}

		const res = data.result
		const isPhoto = res.type === 'photo'
		const photos = res.media?.photos || []
		const videoData = res.media?.video
		const videoUrl = videoData?.directStreamUrl || videoData?.downloadUrl
		const videoHeaders = videoData?.headers || {}

		const authorNick = res.author?.nickname || 'Creator'
		const stats = res.stats || {}
		const title = (res.description || res.title || '').trim()

		const topComment = (Array.isArray(res.topComments) && res.topComments[0])
			? `💬 "${res.topComments[0].text.replace(/\r?\n/g, ' ')}"`
			: ''

				if (isPhoto && photos.length > 0) {
			reply(`📸 *TikTok Slide*: Mengirim ${photos.length} foto...`)
			for (let i = 0; i < photos.length; i++) {
				const photoRes = await axios.get(photos[i], {
					headers: videoHeaders,
					responseType: "arraybuffer",
					timeout: 20000
				})
				await sock.sendMessage(m.chat, {
					image: Buffer.from(photoRes.data),
					caption: i === 0 ? `📝 ${title}
👤 ${authorNick} • ❤️ ${formatNumber(stats.likes)}` : `[ Foto ${i + 1}/${photos.length} ]`
				}, { quoted: m })
			}
		} else if (videoUrl) {
			const videoRes = await axios.get(videoUrl, {
				headers: videoHeaders,
				responseType: 'arraybuffer',
				timeout: 30000
			})
			const videoCaption = [
				`✨ *TIKTOK VIDEO*`,
				title ? `📝 ${title}` : '',
				`👤 ${authorNick}  •  👁️ ${formatNumber(stats.plays)}  •  ❤️ ${formatNumber(stats.likes)}  •  💬 ${formatNumber(stats.comments)}`,
				topComment
			].filter(Boolean).join('\n\n')

			await sock.sendMessage(m.chat, {
				video: Buffer.from(videoRes.data),
				caption: videoCaption,
				fileName: `${res.id || Date.now()}.mp4`,
				mimetype: 'video/mp4'
			}, { quoted: m })
		} else {
			return reply('❌ Tidak ditemukan media video atau foto pada tautan TikTok tersebut.')
		}

		if (isPhoto && res.music?.playUrl) {
			try {
				const audioRes = await axios.get(res.music.playUrl, {
					headers: videoHeaders,
					responseType: 'arraybuffer',
					timeout: 20000
				})
				await sock.sendMessage(m.chat, {
					audio: Buffer.from(audioRes.data),
					mimetype: 'audio/mpeg',
					fileName: `${res.music.title || res.id || 'audio'}.mp3`
				}, { quoted: m })
			} catch (errAudio) {
				console.warn('[TIKTOK AUDIO SEND WARN]:', errAudio.message)
			}
		}

	} catch (e) {
		console.error('[TIKTOK KYZZ API ERROR]:', e.response?.data || e)
		return reply(`❌ Terjadi kesalahan saat mengunduh TikTok: ${e.message}`)
	}
}

handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = ['tiktok', 'tt', 'ttdl', 'tiktokdl']
handler.limit = true;

handler.register = true

export default handler
