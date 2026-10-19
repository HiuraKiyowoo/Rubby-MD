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
import pdfkit from 'pdfkit'
import sharp from 'sharp'
import { getActiveThumbBuffer } from '../../src/lib/thumb.js'

const getApiKey = () => global.APIKeys?.['https://api.kyzzz.xyz'] || ''
const BASE_URL = 'https://api.kyzzz.xyz/api/manga/luvyaa'

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
	const client = conn || sock
	const cmd = command.toLowerCase()

	if (cmd === 'luvyaa') {
		if (!text) {
			const helpText = `*Luvyaa Manga Downloader*\n\n` +
				`• Search: \`${usedPrefix}luvyaa search <judul>\`\n` +
				`• Popular: \`${usedPrefix}luvyaa popular [halaman]\`\n` +
				`• Latest: \`${usedPrefix}luvyaa latest [halaman]\`\n` +
				`• Genre: \`${usedPrefix}luvyaa genre <nama_genre>\`\n` +
				`• Detail: \`${usedPrefix}luvyaa detail <slug/url>\`\n` +
				`• Download PDF: \`${usedPrefix}luvyaapdf <slug/url> <chapter>\`\n\n` +
				`*Contoh:* \`${usedPrefix}luvyaa wireless\`\n` +
				`*Contoh Download:* \`${usedPrefix}luvyaapdf wireless-onahole 1\``

			if (client && typeof client.sendButtons === 'function') {
				try {
					const thumb = await getThumbImage().catch(() => null)
					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: 'Luvyaa Manga',
							address: global.website || 'https://api.kyzzz.xyz',
							jpegThumbnail: thumb
						},
						text: '',
						footer: helpText,
						buttons: [
							{
								title: 'Daftar Menu Luvyaa',
								sections: [
									{
										title: 'Fitur Luvyaa',
										rows: [
											{
												title: '🔥 Manga Popular',
												description: 'Lihat daftar manga terpopuler',
												id: `${usedPrefix}luvyaa popular 1`
											},
											{
												title: '🆕 Manga Terbaru',
												description: 'Lihat rilis manga terbaru',
												id: `${usedPrefix}luvyaa latest 1`
											},
											{
												title: '🏷️ Genre Romance',
												description: 'Filter manga genre romance',
												id: `${usedPrefix}luvyaa genre romance`
											},
											{
												title: '🔍 Cari Manga Wireless',
												description: 'Contoh pencarian manga',
												id: `${usedPrefix}luvyaa search wireless`
											}
										]
									}
								]
							}
						]
					}, { quoted: m })
				} catch (e) {
					console.warn('[LUVYAA MENU BUTTON FAIL]', e.message)
				}
			}
			return reply(helpText)
		}

		const args = text.trim().split(/\s+/)
		const subCmd = args[0]?.toLowerCase()

		if (subCmd === 'popular' || subCmd === 'populer') {
			const page = parseInt(args[1]) || 1
			reply(global.mess?.wait || 'Memuat manga popular...')
			try {
				const { data } = await axios.get(`${BASE_URL}/popular`, {
					params: { page, apikey: getApiKey() },
					timeout: 15000
				})
				const results = data?.results || (Array.isArray(data?.result) ? data.result : [])
				if (!data?.status || results.length === 0) {
					return reply('Gagal mengambil daftar manga popular.')
				}
				return await renderMangaList(client, m, reply, usedPrefix, results, `Manga Popular (Page ${data.page || page})`, `Page ${data.page || page} dari total ${data.total || results.length}`)
			} catch (e) {
				console.error('[LUVYAA POPULAR ERROR]', e)
				return reply('Terjadi kesalahan saat mengambil data popular.')
			}
		}

		if (subCmd === 'latest' || subCmd === 'terbaru') {
			const page = parseInt(args[1]) || 1
			reply(global.mess?.wait || 'Memuat manga terbaru...')
			try {
				const { data } = await axios.get(`${BASE_URL}/latest`, {
					params: { page, apikey: getApiKey() },
					timeout: 15000
				})
				const results = data?.results || (Array.isArray(data?.result) ? data.result : [])
				if (!data?.status || results.length === 0) {
					return reply('Gagal mengambil daftar manga terbaru.')
				}
				return await renderMangaList(client, m, reply, usedPrefix, results, `Manga Terbaru (Page ${data.page || page})`, `Page ${data.page || page} dari total ${data.total || results.length}`)
			} catch (e) {
				console.error('[LUVYAA LATEST ERROR]', e)
				return reply('Terjadi kesalahan saat mengambil data terbaru.')
			}
		}

		if (subCmd === 'genre' || subCmd === 'genres') {
			const genreName = args[1]?.toLowerCase()
			if (!genreName) {
				return reply(`Masukkan nama genre!\nContoh: ${usedPrefix}luvyaa genre romance`)
			}
			const page = parseInt(args[2]) || 1
			reply(global.mess?.wait || `Memuat genre ${genreName}...`)
			try {
				const { data } = await axios.get(`${BASE_URL}/genres`, {
					params: { genre: genreName, page, apikey: getApiKey() },
					timeout: 15000
				})
				const results = data?.results || (Array.isArray(data?.result) ? data.result : [])
				if (!data?.status || results.length === 0) {
					return reply(`Gagal mengambil manga genre ${genreName}.`)
				}
				return await renderMangaList(client, m, reply, usedPrefix, results, `Genre: ${genreName.toUpperCase()} (Page ${data.page || page})`, `Total ${data.total || results.length} manga`)
			} catch (e) {
				console.error('[LUVYAA GENRE ERROR]', e)
				return reply('Terjadi kesalahan saat mengambil data genre.')
			}
		}

		if (subCmd === 'detail' || text.startsWith('http://') || text.startsWith('https://')) {
			let slugOrUrl = text.startsWith('http://') || text.startsWith('https://') ? text : text.replace(/^detail\s+/i, '').trim()
			return await getMangaDetail(client, m, reply, usedPrefix, slugOrUrl)
		}

		let searchQuery = text
		if (subCmd === 'search' || subCmd === 'cari') {
			searchQuery = text.replace(/^(search|cari)\s+/i, '').trim()
			if (!searchQuery) {
				return reply(`Masukkan kata kunci pencarian!\nContoh: ${usedPrefix}luvyaa search wireless`)
			}
		}

		reply(global.mess?.wait || `Mencari manga ${searchQuery}...`)
		try {
			const { data } = await axios.get(`${BASE_URL}/search`, {
				params: { query: searchQuery, page: 1, apikey: getApiKey() },
				timeout: 15000
			})
			const results = data?.results || (Array.isArray(data?.result) ? data.result : [])
			if (!data?.status || results.length === 0) {
				return reply(`Manga ${searchQuery} tidak ditemukan.`)
			}
			return await renderMangaList(client, m, reply, usedPrefix, results, `Hasil Pencarian: ${searchQuery}`, `Ditemukan ${results.length} manga`)
		} catch (e) {
			console.error('[LUVYAA SEARCH ERROR]', e)
			return reply('Terjadi kesalahan saat mencari manga.')
		}
	}

	if (cmd === 'luvyaapdf' || cmd === 'luvyaadl') {
		if (!text) {
			return reply(
				`Format salah!\n\n` +
				`Penggunaan: ${usedPrefix}${command} <slug/url> <chapter>\n` +
				`Contoh: ${usedPrefix}${command} wireless-onahole 1`
			)
		}

		const args = text.trim().split(/\s+/)
		const chapter = args.pop()
		const slugOrUrl = args.join(' ')

		if (!slugOrUrl || !chapter || isNaN(chapter)) {
			return reply(`Masukkan slug/url manga dan nomor chapter dengan benar!\nContoh: ${usedPrefix}${command} wireless-onahole 1`)
		}

		return await downloadChapterPdf(client, m, reply, slugOrUrl, chapter)
	}
}

async function getThumbImage(url) {
	if (url) {
		try {
			const res = await axios.get(url, {
				responseType: 'arraybuffer',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
					'Referer': 'https://v4.luvyaa.co/'
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
			console.warn('[FETCH LUVYAA THUMB ERROR]', e.message)
		}
	}
	try {
		return await getActiveThumbBuffer(300)
	} catch (e) {
		return null
	}
}

async function renderMangaList(client, m, reply, usedPrefix, results, headerTitle, subtitle) {
	const firstItem = results[0]
	const thumb = await getThumbImage(firstItem?.image)

	const rows = results.slice(0, 20).map((item, idx) => ({
		title: `${idx + 1}. ${(item.title || 'Manga').slice(0, 20)}`,
		description: `Rating: ${item.rating || '-'} | ${item.latestChapter || '-'}`,
		id: `${usedPrefix}luvyaa detail ${item.slug || item.url}`
	}))

	let textList = `${headerTitle}\n${subtitle}\n\n`
	results.slice(0, 20).forEach((item, idx) => {
		textList += `${idx + 1}. *${item.title}*\n`
		textList += `   • Rating: ${item.rating || '-'}\n`
		textList += `   • Chapter: ${item.latestChapter || '-'}\n`
		textList += `   • Detail: \`${usedPrefix}luvyaa detail ${item.slug || item.url}\`\n\n`
	})

	const captionText = `${headerTitle}\n${subtitle}\n\nPilih manga dari tombol di bawah:`

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
						title: 'Hasil Manga',
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
			console.warn('[LUVYAA LIST SEND_BUTTONS FAIL]', e.message)
		}
	}

	if (firstItem && firstItem.image) {
		return await client.sendMessage(m.chat, { image: { url: firstItem.image }, caption: textList }, { quoted: m })
	} else {
		return reply(textList)
	}
}

async function getMangaDetail(client, m, reply, usedPrefix, slugOrUrl) {
	reply(global.mess?.wait || 'Memuat detail manga...')
	try {
		const { data } = await axios.get(`${BASE_URL}/detail`, {
			params: { slug: slugOrUrl, apikey: getApiKey() },
			timeout: 15000
		})

		if (!data?.status || !data?.result) {
			return reply('Gagal mengambil detail manga.')
		}

		const detail = data.result
		const mangaSlug = detail.slug || slugOrUrl
		const thumb = await getThumbImage(detail.image)

		const chapters = detail.chapters || []
		
		const allChapters = [...chapters].reverse()

		const sections = []
		const chunkSize = 25
		for (let i = 0; i < allChapters.length; i += chunkSize) {
			const chunk = allChapters.slice(i, i + chunkSize)
			const firstCh = chunk[0]?.title || ''
			const lastCh = chunk[chunk.length - 1]?.title || ''
			sections.push({
				title: `${firstCh} - ${lastCh}`.slice(0, 24),
				rows: chunk.map(ch => {
					const match = ch.title.match(/Chapter\s+([\d.]+)/i) || ch.title.match(/([\d.]+)/)
					const chNum = match ? match[1] : ch.title
					return {
						title: ch.title,
						description: ch.releaseDate ? `Rilis: ${ch.releaseDate}` : 'Download PDF',
						id: `${usedPrefix}luvyaapdf ${mangaSlug} ${chNum}`
					}
				})
			})
		}

		let caption = `${detail.title}\n` +
			(detail.alternativeTitle ? `Alt: ${detail.alternativeTitle}\n` : '') +
			(detail.rating ? `Rating: ${detail.rating}\n` : '') +
			(detail.status ? `Status: ${detail.status}\n` : '') +
			(detail.genres ? `Genres: ${Array.isArray(detail.genres) ? detail.genres.join(', ') : detail.genres}\n` : '') +
			`Total Chapter: ${detail.totalChapters || chapters.length}\n` +
			`Sinopsis: ${detail.synopsis || '-'}\n\n`

		if (client && typeof client.sendButtons === 'function' && sections.length > 0) {
			try {
				return await client.sendButtons(m.chat, {
					location: {
						degreesLatitude: 0,
						degreesLongitude: 0,
						name: detail.title,
						address: `Rating: ${detail.rating || '-'} • Total ${detail.totalChapters || chapters.length} Ch`,
						jpegThumbnail: thumb
					},
					text: '',
					footer: caption + `Pilih chapter di bawah (1 - ${detail.totalChapters || chapters.length}) untuk mendownload PDF:`,
					buttons: [
						{
							title: `Daftar Chapter (1-${detail.totalChapters || chapters.length})`,
							sections
						}
					]
				}, { quoted: m })
			} catch (e) {
				console.warn('[LUVYAA DETAIL SEND_BUTTONS FAIL]', e.message)
			}
		}

		caption += `*Daftar Chapter (1 - Terbaru):*\n`
		allChapters.forEach(ch => {
			const match = ch.title.match(/Chapter\s+([\d.]+)/i) || ch.title.match(/([\d.]+)/)
			const chNum = match ? match[1] : ch.title
			caption += `• ${ch.title} => \`${usedPrefix}luvyaapdf ${mangaSlug} ${chNum}\`\n`
		})

		if (detail.image) {
			return await client.sendMessage(m.chat, { image: { url: detail.image }, caption }, { quoted: m })
		} else {
			return reply(caption)
		}
	} catch (e) {
		console.error('[LUVYAA DETAIL ERROR]', e)
		return reply('Terjadi kesalahan saat mengambil detail manga.')
	}
}

async function downloadChapterPdf(client, m, reply, slugOrUrl, chapter) {
	reply(global.mess?.wait || 'Mengunduh gambar & membuat PDF...')

	try {
		const { data } = await axios.get(`${BASE_URL}/read`, {
			params: { slug: slugOrUrl, chapter, apikey: getApiKey() },
			timeout: 15000
		})

		if (!data?.status || !data?.result || !data.result.images || data.result.images.length === 0) {
			return reply('Gagal mengambil gambar chapter.')
		}

		const chData = data.result
		const title = chData.title || `Chapter ${chapter}`
		const images = chData.images

		const jpegBuffers = []
		for (let i = 0; i < images.length; i++) {
			try {
				const res = await axios.get(images[i], {
					responseType: 'arraybuffer',
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
						'Referer': 'https://v4.luvyaa.co/'
					},
					timeout: 15000
				})
				const jpegBuf = await sharp(Buffer.from(res.data))
					.jpeg({ quality: 90 })
					.toBuffer()
				jpegBuffers.push(jpegBuf)
			} catch (e) {
				console.warn(`[LUVYAA IMAGE FETCH WARN ${i}]`, e.message)
			}
		}

		if (jpegBuffers.length === 0) {
			return reply('Gagal mengunduh gambar komik.')
		}

		const doc = new pdfkit({ autoFirstPage: false })
		const pdfChunks = []

		doc.on('data', chunk => chunk && pdfChunks.push(chunk))
		for (let buf of jpegBuffers) {
			try {
				const img = doc.openImage(buf)
				doc.addPage({ size: [img.width, img.height] })
				doc.image(img, 0, 0)
			} catch (e) {
				console.warn('[LUVYAA PDF PAGE ERROR]', e.message)
			}
		}
		doc.end()

		await new Promise(resolve => doc.on('end', resolve))
		const pdfBuffer = Buffer.concat(pdfChunks)

		const fileName = `${title.replace(/[^a-zA-Z0-9\-_]/g, '_')}.pdf`

		await client.sendMessage(m.chat, {
			document: pdfBuffer,
			mimetype: 'application/pdf',
			fileName: fileName,
			caption: `${title}\n\nBerhasil mengunduh ${jpegBuffers.length} Halaman PDF!`
		}, { quoted: m })

	} catch (e) {
		console.error('[LUVYAA PDF GENERATE ERROR]', e)
		return reply('Terjadi kesalahan membuat PDF Chapter.')
	}
}

handler.help = ['luvyaa <query/search/popular/latest/genre/detail>', 'luvyaapdf <slug> <chapter>']
handler.tags = ['manga'];
handler.category = 'manga';
handler.command = ['luvyaa', 'luvyaapdf', 'luvyaadl']
handler.limit = true;
handler.register = true

export default handler
