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

const handler = async (m, { sock, conn, text, reply, usedPrefix, command }) => {
	const client = sock || conn || global.mainSock || global.conn
	const quotedText = m.quoted ? (m.quoted.text || m.quoted.caption || m.quoted.description || m.quoted.msg?.caption || m.quoted.msg?.text || '') : ''
	const rawInput = (text || quotedText || '').trim()
	const urlMatch = rawInput.match(/https?:\/\/(?:www\.|mobile\.)?capcut\.(?:com|net)\/[^\s]+/i) || rawInput.match(/https?:\/\/[^\s]+/i)
	const targetUrl = urlMatch ? urlMatch[0] : rawInput

	if (!targetUrl || !targetUrl.includes('capcut.')) {
		return reply(`*CapCut Downloader*\n\nContoh:\n${usedPrefix}${command} https://www.capcut.com/tv2/ZSqMCQMES/\nAtau reply pesan yang berisi link CapCut!`)
	}

	await global.react?.(client, m, 'loading')
	await reply(global.mess?.wait || '⏳ Sedang mengunduh...')

	try {
		const apiUrl = global.API('kyzz', '/api/download/capcut', { url: targetUrl }, 'apikey')
		const { data } = await axios.get(apiUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
			},
			timeout: 30000
		})

		if (!data?.status || !data?.result?.data) {
			await global.react?.(client, m, 'error')
			return reply('❌ Gagal mendapatkan data CapCut. Pastikan link publik!')
		}

		const resData = data.result.data
		const title = resData.title || 'CapCut Video'
		const mediaUrls = resData.mediaUrls || []

		const selectedMedia = mediaUrls.find(m => m.quality === 'hd_no_watermark') ||
			mediaUrls.find(m => m.quality === 'no_watermark') ||
			mediaUrls.find(m => m.type === 'video' || m.format === 'mp4') ||
			mediaUrls[0]

		if (!selectedMedia?.url) {
			await global.react?.(client, m, 'error')
			return reply('❌ Video CapCut tidak ditemukan.')
		}

		const caption = `*CapCut Downloader*\n\n📌 *Judul:* ${title}`

		await client.sendMessage(
			m.chat,
			{
				video: { url: selectedMedia.url },
				caption: caption,
				mimetype: 'video/mp4'
			},
			{ quoted: m }
		)

		await global.react?.(client, m, 'success')
	} catch (e) {
		console.error('[CAPCUT DOWNLOAD ERROR]', e.response?.data || e)
		await global.react?.(client, m, 'error')
		return reply('❌ Terjadi kesalahan saat mengunduh CapCut.')
	}
}

handler.help = ['capcut <url>']
handler.tags = ['downloader']
handler.command = ['capcut', 'capcutdl', 'cc', 'ccdl']
handler.limit = true
handler.register = true

export default handler
