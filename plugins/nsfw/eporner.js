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
import fs from 'node:fs'

function formatDuration(sec) {
	if (!sec || sec === '-') return '-'
	const num = parseInt(sec)
	if (isNaN(num)) return sec
	const m = Math.floor(num / 60)
	const s = num % 60
	return m > 0 ? `${m}m ${s}s` : `${s}s`
}

async function searchEporner(query) {
	try {
		const apiUrl = global.API('kyzz', '/api/nsfw/eporner/search', { query, page: 1 }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 15000 })
		if (data && data.status && Array.isArray(data.results)) {
			return data.results
		}
		if (data && Array.isArray(data.result)) {
			return data.result
		}
		if (data && Array.isArray(data.results || data.data)) {
			return data.results || data.data
		}
		return []
	} catch (err) {
		console.error('[Eporner API Search Error]', err.message)
		return []
	}
}

async function resolveDirectVideoUrl(url) {
	if (!url) return ''
	if (url.includes('cdn.eporner.com')) return url
	try {
		const res = await axios.head(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
				'Referer': 'https://www.eporner.com/'
			},
			maxRedirects: 5,
			timeout: 10000
		})
		return res.request?.res?.responseUrl || res.config?.url || url
	} catch (e) {
		return url
	}
}

async function downloadEporner(rawInputUrl) {
	try {
		let inputStr = (rawInputUrl || '').trim()

		const apiUrl = global.API('kyzz', '/api/nsfw/eporner/download', { url: inputStr }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 20000 })

		const res = data?.result || data
		if (!res) {
			throw new Error('Video tidak ditemukan atau gagal diproses oleh API.')
		}

		const downloads = res.downloads || res.mediaDefinitions || []
		let selectedDl = downloads.find(d => d.quality === '240p' || d.quality === '360p') ||
			downloads.find(d => (d.format === 'mp4' || d.quality) && (d.directUrl || d.url)) ||
			downloads[0]

		let rawVideoUrl = selectedDl?.directUrl || selectedDl?.url || res.videoUrl || res.url

		if (!rawVideoUrl) {
			throw new Error('Link unduhan MP4 tidak ditemukan dari API.')
		}

		let directUrl = await resolveDirectVideoUrl(rawVideoUrl)

		let buffer = null
		try {
			const videoRes = await axios.get(directUrl, {
				responseType: 'arraybuffer',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
					'Referer': 'https://www.eporner.com/'
				},
				maxRedirects: 5,
				timeout: 60000
			})
			const bufData = Buffer.from(videoRes.data)
			if (bufData.length > 5000) {
				buffer = bufData
			}
		} catch (bufErr) {
			console.error('[Eporner Buffer Download Failed]', bufErr.message)
		}

		return {
			title: res.title || 'Eporner Video',
			duration: res.duration ? formatDuration(res.duration) : '-',
			thumb: res.thumb || res.image || '',
			videoUrl: directUrl,
			directUrl: directUrl,
			buffer: buffer
		}
	} catch (err) {
		console.error('[Eporner API DL Error]', err.message)
		throw err
	}
}

const handler = async (m, { sock, conn, text, reply, usedPrefix, command }) => {
	const client = sock || conn
	const quotedText = m.quoted ? (m.quoted.text || m.quoted.caption || m.quoted.description || m.quoted.msg?.caption || m.quoted.msg?.text || '') : ''
	const rawInput = (text || quotedText || '').trim()
	const urlMatch = rawInput.match(/https?:\/\/(?:www\.)?eporner\.com\/[^\s]+/i)
	let inputStr = urlMatch ? urlMatch[0] : rawInput

	const isDlCmd = command.toLowerCase() === 'epornerdl' || inputStr.toLowerCase().startsWith('dl ')
	const isUrl = inputStr.includes('eporner.com/') || inputStr.startsWith('http')

	if (isDlCmd || isUrl) {
		let targetUrl = inputStr.replace(/^dl\s*/i, '').trim()
		if (!targetUrl) return reply(`❌ Masukkan URL video Eporner!\nContoh: *${usedPrefix}epornerdl https://www.eporner.com/video-xxx/xxx*\nAtau reply pesan yang berisi link Eporner!`)

		try {
			if (global.mess?.wait) reply(global.mess.wait)
			const result = await downloadEporner(targetUrl)

			const caption = `🔞 *EPORNER DOWNLOADER*\n\n` +
				`📌 *Judul*: ${result.title}\n` +
				`⏱️ *Durasi*: ${result.duration}\n\n` +
				`© ${global.namaBot || 'Hirara AI'}`

			if (result.buffer && result.buffer.length > 10000) {
				return await client.sendMessage(m.chat, {
					video: result.buffer,
					caption: caption,
					mimetype: 'video/mp4',
					fileName: `${result.title}.mp4`
				}, { quoted: m })
			} else {
				return await client.sendMessage(m.chat, {
					video: { url: result.directUrl },
					caption: caption,
					mimetype: 'video/mp4',
					fileName: `${result.title}.mp4`
				}, { quoted: m })
			}

		} catch (e) {
			console.error('[EPORNER DL ERROR]', e.message)
			return reply(`❌ Gagal mengunduh video Eporner: ${e.message}`)
		}
	} else {
		let searchQuery = inputStr.replace(/^search\s*/i, '').trim()

		if (!searchQuery) {
			const categoryList = [
				{ title: '🇯🇵 Japanese', description: 'Cari video Eporner Japanese', query: 'japanese' },
				{ title: '👩 Step Mom', description: 'Cari video Eporner Step Mom', query: 'step mom' },
				{ title: '👠 Milf', description: 'Cari video Eporner Milf', query: 'milf' },
				{ title: '🌏 Asian', description: 'Cari video Eporner Asian', query: 'asian' },
				{ title: '💃 Latina', description: 'Cari video Eporner Latina', query: 'latina' },
				{ title: '🎓 Student', description: 'Cari video Eporner Student', query: 'student' },
				{ title: '👩‍🏫 Teacher', description: 'Cari video Eporner Teacher', query: 'teacher' },
				{ title: '📹 Amateur', description: 'Cari video Eporner Amateur', query: 'amateur' },
				{ title: '🌟 Trending', description: 'Cari video Eporner Trending', query: 'trending' },
				{ title: '🌸 Cosplay', description: 'Cari video Eporner Cosplay', query: 'cosplay' }
			]

			const rows = categoryList.map(cat => ({
				title: cat.title,
				description: cat.description,
				id: `${usedPrefix}epornersearch ${cat.query}`
			}))

			const buttonContent = {
				type: 'location_buttons',
				thumbnail: fs.existsSync('./media/menu.jpg') ? fs.readFileSync('./media/menu.jpg') : '',
				text: `🔞 *EPORNER CATEGORY MENU*\n\nPilih kategori di bawah atau ketik:\n*${usedPrefix}epornersearch <kata kunci>*\n\nContoh:\n*${usedPrefix}epornersearch japanese*`,
				footer: `${global.namaBot || 'Hirara AI'} • Eporner Search`,
				buttons: [
					{
						title: '🔞 PILIH KATEGORI EPORNER',
						sections: [{
							title: 'Daftar Kategori Eporner',
							rows: rows
						}]
					}
				]
			}

			if (client && typeof client.sendButtons === 'function') {
				return await client.sendButtons(m.chat, buttonContent, { quoted: m })
			} else {
				return reply(
					`🔞 *Eporner Downloader & Search*\n\n` +
					`• *${usedPrefix}epornersearch <query>* : Cari video Eporner\n` +
					`• *${usedPrefix}epornerdl <url>* : Unduh video Eporner\n\n` +
					`Contoh:\n` +
					`${usedPrefix}epornersearch japanese\n` +
					`${usedPrefix}epornerdl https://www.eporner.com/video-xxx/xxx`
				)
			}
		}

		try {
			if (global.mess?.wait) reply(global.mess.wait)
			const items = await searchEporner(searchQuery)

			if (!items.length) {
				return reply(`❌ Tidak ada hasil ditemukan untuk *${searchQuery}*.`)
			}

			const first = items[0]
			const firstThumb = first?.image || first?.thumb || ''
			const title = first.title || 'Eporner Video'
			const duration = formatDuration(first.duration)

			const captionText = `🔞 *EPORNER SEARCH RESULTS*\n\n` +
				`Kata Kunci: *${searchQuery}*\n` +
				`Ditemukan: *${items.length}* Video.\n\n` +
				`📌 *1. ${title}*\n` +
				`⏱️ *Durasi:* ${duration}`

			const rows = items.slice(0, 10).map((item, idx) => ({
				title: `${idx + 1}. ${(item.title || 'Video').slice(0, 24)}`,
				description: `Durasi: ${formatDuration(item.duration)}`,
				id: `${usedPrefix}epornerdl ${item.url}`
			}))

			const buttonContent = {
				type: 'location_buttons',
				thumbnail: firstThumb,
				text: captionText,
				footer: `${global.namaBot || 'Hirara AI'} • Eporner Search`,
				buttons: [
					{
						title: '🔞 PILIH VIDEO EPORNER',
						sections: [{
							title: `Hasil Search: ${searchQuery}`,
							rows: rows
						}]
					}
				]
			}

			if (client && typeof client.sendButtons === 'function') {
				await client.sendButtons(m.chat, buttonContent, { quoted: m })
			} else {
				await reply(`${captionText}\n\n🎥 *Unduh:* ${usedPrefix}epornerdl ${first.url}`)
			}

		} catch (e) {
			console.error('[EPORNER SEARCH ERROR]', e.message)
			return reply('❌ Gagal melakukan pencarian di Eporner.')
		}
	}
}

handler.help = ['eporner <query>', 'epornersearch <query>', 'epornerdl <url>']
handler.tags = ['downloader', 'nsfw']
handler.command = ['eporner', 'epornersearch', 'epornerdl']
handler.limit = true;

handler.register = true
handler.premium = true

export default handler
