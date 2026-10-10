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

import fs from 'node:fs'
import axios from 'axios'
import sharp from 'sharp'

function decodeHtmlEntities(str) {
	if (!str) return ''
	return str
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&ndash;/g, '–')
		.replace(/&mdash;/g, '—')
}

function formatDuration(sec) {
	if (!sec || sec === '-') return '-'
	const num = parseInt(sec)
	if (isNaN(num)) return sec
	const m = Math.floor(num / 60)
	const s = num % 60
	return m > 0 ? `${m}m ${s}s` : `${s}s`
}

async function getThumbImage(url) {
	if (url) {
		try {
			const res = await axios.get(url, {
				responseType: 'arraybuffer',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
					'Referer': 'https://www.xnxx.com/'
				},
				timeout: 10000
			})
			if (res.data && res.data.length > 0) {
				const jpegBuf = await sharp(Buffer.from(res.data))
					.resize(300, 300, { fit: 'cover' })
					.jpeg({ quality: 80 })
					.toBuffer()
				return jpegBuf
			}
		} catch (e) {
			console.warn('[FETCH XNXX THUMB ERROR]', e.message)
		}
	}
	try {
		if (fs.existsSync('media/thumb.jpg')) {
			return fs.readFileSync('media/thumb.jpg')
		}
	} catch {}
	return null
}

async function searchXNXX(query) {
	
	if (global.API) {
		try {
			const apiUrl = global.API('kyzz', '/api/nsfw/xnxx/search', { query, page: 1 }, 'apikey')
			const { data } = await axios.get(apiUrl, { timeout: 10000 })
			if (data && data.status && Array.isArray(data.results) && data.results.length > 0) {
				return data.results
			}
			if (data && Array.isArray(data.result) && data.result.length > 0) {
				return data.result
			}
		} catch (_) {}
	}

	try {
		const searchUrl = `https://www.xnxx.com/search/${encodeURIComponent(query)}`
		const { data: html } = await axios.get(searchUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
				'Accept-Language': 'en-US,en;q=0.9'
			},
			timeout: 15000
		})

		const results = []
		const blockRegex = /<div class="thumb-block\b[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g
		let blockMatch
		while ((blockMatch = blockRegex.exec(html)) !== null) {
			const blockHtml = blockMatch[1]
			const urlMatch = blockHtml.match(/href="(\/video-[^"]+)"/i)
			const titleMatch = blockHtml.match(/title="([^"]+)"/i) || blockHtml.match(/<a[^>]+href="\/video-[^"]+"[^>]*>([^<]+)<\/a>/i)
			const durationMatch = blockHtml.match(/<span class="duration">([^<]+)<\/span>/i) || blockHtml.match(/(\d+\s*min|\d+:\d+)/i)
			const thumbMatch = blockHtml.match(/data-src="([^"]+)"/i) || blockHtml.match(/src="([^"]+)"/i)

			if (urlMatch && titleMatch) {
				const fullUrl = `https://www.xnxx.com${urlMatch[1]}`
				if (!results.some(r => r.url === fullUrl)) {
					results.push({
						title: decodeHtmlEntities(titleMatch[1].trim()),
						url: fullUrl,
						duration: durationMatch ? durationMatch[1].trim() : '-',
						image: thumbMatch ? thumbMatch[1] : ''
					})
				}
			}
		}

		if (!results.length) {
			const simpleRegex = /<a\s+href="(\/video-[a-zA-Z0-9_\/]+)"\s+title="([^"]+)"/g
			let m
			while ((m = simpleRegex.exec(html)) !== null) {
				const fullUrl = `https://www.xnxx.com${m[1]}`
				if (!results.some(r => r.url === fullUrl)) {
					results.push({
						title: decodeHtmlEntities(m[2].trim()),
						url: fullUrl,
						duration: '-',
						image: ''
					})
				}
			}
		}

		return results
	} catch (err) {
		console.error('[XNXX Search Scraper Error]', err.message)
		return []
	}
}

async function downloadXNXX(rawInputUrl) {
	let inputStr = (rawInputUrl || '').trim()
	const urlMatch = inputStr.match(/https?:\/\/(www\.)?xnxx\.[a-z.]+\/video-[^\s"']+/i) ||
		inputStr.match(/\/video-[^\s"']+/i) ||
		inputStr.match(/video-[^\s"']+/i)

	if (urlMatch) {
		inputStr = urlMatch[0]
	}

	let cleanUrl = inputStr
	if (!cleanUrl.startsWith('http')) {
		cleanUrl = `https://www.xnxx.com${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`
	}

	if (global.API) {
		try {
			const apiUrl = global.API('kyzz', '/api/nsfw/xnxx/download', { url: cleanUrl }, 'apikey')
			const { data } = await axios.get(apiUrl, { timeout: 15000 })
			if (data && data.status && data.result) {
				const res = data.result
				const downloads = res.downloads || []
				let selectedDl = downloads.find(d => d.format === 'mp4' && d.quality && d.quality.toLowerCase().includes('high')) ||
					downloads.find(d => d.format === 'mp4') ||
					downloads.find(d => d.url && d.url.includes('.mp4')) ||
					downloads[0]

				if (selectedDl && selectedDl.url) {
					let buffer = null
					try {
						const videoRes = await axios.get(selectedDl.url, {
							responseType: 'arraybuffer',
							headers: {
								'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
								'Referer': 'https://www.xnxx.com/'
							},
							timeout: 60000
						})
						buffer = Buffer.from(videoRes.data)
					} catch (_) {}

					return {
						title: decodeHtmlEntities(res.title || 'XNXX Video'),
						duration: res.duration ? formatDuration(res.duration) : '-',
						thumb: res.thumb || '',
						videoUrl: selectedDl.url,
						buffer
					}
				}
			}
		} catch (_) {}
	}

	try {
		const { data: html } = await axios.get(cleanUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
				'Accept-Language': 'en-US,en;q=0.9',
				'Referer': 'https://www.xnxx.com/'
			},
			timeout: 20000
		})

		const titleMatch = html.match(/html5player\.setVideoTitle\('([^']+)'\)/) || html.match(/<title>([^<]+)<\/title>/i)
		const highMatch = html.match(/html5player\.setVideoUrlHigh\('([^']+)'\)/)
		const lowMatch = html.match(/html5player\.setVideoUrlLow\('([^']+)'\)/)
		const thumbMatch = html.match(/html5player\.setThumbUrl\('([^']+)'\)/)
		const durationMatch = html.match(/<span class="duration">([^<]+)<\/span>/i)

		const rawTitle = titleMatch ? titleMatch[1] : 'XNXX Video'
		const title = decodeHtmlEntities(rawTitle.replace('- XNXX.COM', '').trim())
		const videoUrl = (highMatch && highMatch[1]) || (lowMatch && lowMatch[1])

		if (!videoUrl) {
			throw new Error('Link video MP4 tidak ditemukan dari halaman ini.')
		}

		let buffer = null
		try {
			const videoRes = await axios.get(videoUrl, {
				responseType: 'arraybuffer',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
					'Referer': 'https://www.xnxx.com/'
				},
				timeout: 60000
			})
			buffer = Buffer.from(videoRes.data)
		} catch (_) {}

		return {
			title,
			duration: durationMatch ? durationMatch[1].trim() : '-',
			thumb: thumbMatch ? thumbMatch[1] : '',
			videoUrl,
			buffer
		}
	} catch (err) {
		console.error('[XNXX DL Scraper Error]', err.message)
		throw err
	}
}

async function renderVideoList(client, m, reply, usedPrefix, results, headerTitle, subtitle) {
	const firstItem = results[0]
	const thumb = await getThumbImage(firstItem?.image)

	const rows = results.slice(0, 20).map((item, idx) => ({
		title: `${idx + 1}. ${(item.title || 'Video').slice(0, 20)}`,
		description: `Durasi: ${item.duration || '-'}`,
		id: `${usedPrefix}xnxxdl ${item.url}`
	}))

	let textList = `*${headerTitle}*\n${subtitle}\n\n`
	results.slice(0, 20).forEach((item, idx) => {
		textList += `${idx + 1}. *${item.title}*\n`
		textList += `   • Durasi: ${item.duration || '-'}\n`
		textList += `   • Unduh: \`${usedPrefix}xnxxdl ${item.url}\`\n\n`
	})

	const captionText = `*${headerTitle}*\n${subtitle}\n\nPilih video dari tombol di bawah untuk mengunduh:`

	if (client && typeof client.sendButtons === 'function') {
		try {
			return await client.sendButtons(m.chat, {
				location: {
					degreesLatitude: 0,
					degreesLongitude: 0,
					name: headerTitle,
					address: subtitle,
					jpegThumbnail: thumb
				},
				text: '',
				footer: captionText,
				buttons: [
					{
						title: 'Hasil Video XNXX',
						sections: [
							{
								title: subtitle.slice(0, 24),
								rows
							}
						]
					}
				]
			}, { quoted: m })
		} catch (e) {
			console.warn('[XNXX LIST SEND_BUTTONS FAIL]', e.message)
		}
	}

	if (firstItem && firstItem.image) {
		return await client.sendMessage(m.chat, { image: { url: firstItem.image }, caption: textList }, { quoted: m })
	} else {
		return reply(textList)
	}
}

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
	const client = conn || sock
	const cmd = command.toLowerCase()

	if (cmd === 'xnxx' || cmd === 'xnxxsearch') {
		if (!text) {
			const helpText = `*XNXX Video Downloader*\n\n` +
				`• Search: \`${usedPrefix}xnxx search <judul>\`\n` +
				`• Trending: \`${usedPrefix}xnxx trending\`\n` +
				`• Category: \`${usedPrefix}xnxx category <nama_kategori>\`\n` +
				`• Download: \`${usedPrefix}xnxxdl <url_video>\`\n\n` +
				`*Contoh:* \`${usedPrefix}xnxx japanese\`\n` +
				`*Contoh Download:* \`${usedPrefix}xnxxdl https://www.xnxx.com/video-1gwajd0f/xxx\``

			if (client && typeof client.sendButtons === 'function') {
				try {
					const thumb = await getThumbImage().catch(() => null)
					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: 'XNXX Video Downloader',
							address: global.website || 'https://api.kyzzz.xyz',
							jpegThumbnail: thumb
						},
						text: '',
						footer: helpText,
						buttons: [
							{
								title: 'Daftar Menu XNXX',
								sections: [
									{
										title: 'Fitur & Kategori XNXX',
										rows: [
											{
												title: '🌟 Video Trending',
												description: 'Lihat video XNXX trending',
												id: `${usedPrefix}xnxx trending`
											},
											{
												title: '🇯🇵 Japanese',
												description: 'Kategori video Japanese',
												id: `${usedPrefix}xnxx category japanese`
											},
											{
												title: '👩 Step Mom',
												description: 'Kategori video Step Mom',
												id: `${usedPrefix}xnxx category step mom`
											},
											{
												title: '👠 Milf',
												description: 'Kategori video Milf',
												id: `${usedPrefix}xnxx category milf`
											},
											{
												title: '🌏 Asian',
												description: 'Kategori video Asian',
												id: `${usedPrefix}xnxx category asian`
											},
											{
												title: '💃 Latina',
												description: 'Kategori video Latina',
												id: `${usedPrefix}xnxx category latina`
											},
											{
												title: '🎓 Student',
												description: 'Kategori video Student',
												id: `${usedPrefix}xnxx category student`
											},
											{
												title: '🌸 Cosplay',
												description: 'Kategori video Cosplay',
												id: `${usedPrefix}xnxx category cosplay`
											}
										]
									}
								]
							}
						]
					}, { quoted: m })
				} catch (e) {
					console.warn('[XNXX MENU BUTTON FAIL]', e.message)
				}
			}
			return reply(helpText)
		}

		const args = text.trim().split(/\s+/)
		const subCmd = args[0]?.toLowerCase()

		if (subCmd === 'trending' || subCmd === 'popular' || subCmd === 'populer') {
			reply(global.mess?.wait || 'Memuat video trending...')
			try {
				const results = await searchXNXX('trending')
				if (!results.length) {
					return reply('Gagal mengambil daftar video trending.')
				}
				return await renderVideoList(client, m, reply, usedPrefix, results, 'Video Trending', `Ditemukan ${results.length} video`)
			} catch (e) {
				console.error('[XNXX TRENDING ERROR]', e)
				return reply('Terjadi kesalahan saat mengambil data trending.')
			}
		}

		if (subCmd === 'category' || subCmd === 'kategori' || subCmd === 'genre') {
			const catName = args.slice(1).join(' ').trim()
			if (!catName) {
				return reply(`Masukkan nama kategori!\nContoh: \`${usedPrefix}xnxx category japanese\``)
			}
			reply(global.mess?.wait || `Memuat kategori ${catName}...`)
			try {
				const results = await searchXNXX(catName)
				if (!results.length) {
					return reply(`Gagal mengambil video kategori ${catName}.`)
				}
				return await renderVideoList(client, m, reply, usedPrefix, results, `Kategori: ${catName.toUpperCase()}`, `Total ${results.length} video`)
			} catch (e) {
				console.error('[XNXX CATEGORY ERROR]', e)
				return reply('Terjadi kesalahan saat mengambil data kategori.')
			}
		}

		const isUrl = text.includes('xnxx.com/video-') || text.startsWith('http') || text.startsWith('/video-') || text.includes('/video-')
		if (subCmd === 'dl' || subCmd === 'download' || isUrl) {
			let targetUrl = text.replace(/^(dl|download)\s+/i, '').trim()
			return await downloadAndSendVideo(client, m, reply, targetUrl)
		}

		let searchQuery = text
		if (subCmd === 'search' || subCmd === 'cari') {
			searchQuery = text.replace(/^(search|cari)\s+/i, '').trim()
			if (!searchQuery) {
				return reply(`Masukkan kata kunci pencarian!\nContoh: \`${usedPrefix}xnxx search japanese\``)
			}
		}

		reply(global.mess?.wait || `Mencari video ${searchQuery}...`)
		try {
			const results = await searchXNXX(searchQuery)
			if (!results.length) {
				return reply(`Video *${searchQuery}* tidak ditemukan.`)
			}
			return await renderVideoList(client, m, reply, usedPrefix, results, `Hasil Pencarian: ${searchQuery}`, `Ditemukan ${results.length} video`)
		} catch (e) {
			console.error('[XNXX SEARCH ERROR]', e)
			return reply('Terjadi kesalahan saat mencari video.')
		}
	}

	if (cmd === 'xnxxdl') {
		if (!text) {
			return reply(
				`Format salah!\n\n` +
				`Penggunaan: \`${usedPrefix}${command} <url_video>\`\n` +
				`Contoh: \`${usedPrefix}${command} https://www.xnxx.com/video-1gwajd0f/xxx\``
			)
		}
		return await downloadAndSendVideo(client, m, reply, text.trim())
	}
}

async function downloadAndSendVideo(client, m, reply, targetUrl) {
	if (!targetUrl) {
		return reply('❌ Masukkan URL video XNXX yang valid!')
	}

	reply(global.mess?.wait || 'Mengunduh video...')
	try {
		const result = await downloadXNXX(targetUrl)

		const caption = `🔞 *XNXX DOWNLOADER*\n\n` +
			`📌 *Judul*: ${result.title}\n` +
			`⏱️ *Durasi*: ${result.duration}\n\n` +
			`© ${global.namaBot || 'Hirara AI'}`

		if (result.buffer) {
			return await client.sendMessage(m.chat, {
				video: result.buffer,
				caption: caption,
				mimetype: 'video/mp4',
				fileName: `${result.title}.mp4`
			}, { quoted: m })
		} else {
			return await client.sendMessage(m.chat, {
				video: { url: result.videoUrl },
				caption: caption,
				mimetype: 'video/mp4',
				fileName: `${result.title}.mp4`
			}, { quoted: m })
		}
	} catch (e) {
		console.error('[XNXX DL ERROR]', e)
		return reply(`❌ Gagal mengunduh video XNXX: ${e.message}`)
	}
}

handler.help = ['xnxx <query/search/trending/category/dl>', 'xnxxdl <url>']
handler.tags = ['nsfw']
handler.command = ['xnxx', 'xnxxsearch', 'xnxxdl']
handler.limit = true;
handler.register = true
handler.premium = true

export default handler
