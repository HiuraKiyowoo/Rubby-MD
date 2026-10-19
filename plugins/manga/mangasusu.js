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

import axios from 'axios';
import sharp from 'sharp';
import { getActiveThumbBuffer } from '../../src/lib/thumb.js';

async function getPosterBuffer(url) {
	if (url && typeof url === 'string' && url.startsWith('http')) {
		try {
			const res = await axios.get(url, {
				responseType: 'arraybuffer',
				timeout: 10000,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
					'Referer': 'https://mangasusu.cyou/'
				}
			});
			if (res.data && res.data.length > 0) {
				return await sharp(Buffer.from(res.data))
					.resize(300, 300, { fit: 'cover' })
					.jpeg({ quality: 80 })
					.toBuffer();
			}
		} catch (_) {}
	}
	try {
		return await getActiveThumbBuffer(300);
	} catch (_) {
		return Buffer.alloc(0);
	}
}

const handler = async (m, { sock, conn, text, args, usedPrefix, command, reply }) => {
	const client = sock || conn;
	const sub = (args[0] || '').toLowerCase();

	if (!text) {
		const helpText =
			`📖 *MANGASUSU — BACA MANGA SUB INDO* 🎀✨\n\n` +
			`Manga, Manhwa, & Manhua terjemahan Bahasa Indonesia terlengkap.\n\n` +
			`*Cara Penggunaan:*\n` +
			`• \`${usedPrefix + command} <judul manga>\` — Cari komik di Mangasusu\n` +
			`• \`${usedPrefix + command} latest\` — Update chapter komik terbaru\n` +
			`• \`${usedPrefix + command} detail <slug>\` — Info detail komik & daftar chapter\n` +
			`• \`${usedPrefix + command} read <slug_ch>\` — Baca chapter komik online`;

		if (client && typeof client.sendButtons === 'function') {
			try {
				const thumb = await getPosterBuffer().catch(() => Buffer.alloc(0));
				return await client.sendButtons(m.chat, {
					location: {
						degreesLatitude: 0,
						degreesLongitude: 0,
						name: 'Mangasusu Official Hub',
						address: 'Baca Manga Sub Indo Terlengkap',
						jpegThumbnail: thumb
					},
					text: '',
					footer: helpText,
					buttons: [
						{ displayText: '📖 Update Terbaru', id: `${usedPrefix + command} latest` },
						{ displayText: '🔍 Cari One Piece', id: `${usedPrefix + command} one piece` },
						{ displayText: '🔍 Cari Solo Leveling', id: `${usedPrefix + command} solo leveling` }
					]
				}, { quoted: m });
			} catch (_) {}
		}
		return reply(helpText);
	}

	await global.react?.(client, m, '⏳').catch(() => {});

	// ── 1. LATEST UPDATES (INTERACTIVE LIST) ───────────────────────────────────
	if (sub === 'latest' || sub === 'terbaru') {
		reply('⏳ *Mengambil update chapter manga terbaru di Mangasusu...*');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangasusu/latest', {}, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const list = data.result?.results || data.results || [];
			if (!list.length) return reply('❌ Gagal memuat update manga terbaru.');

			const rows = list.slice(0, 15).map(item => {
				const desc = item.latestChapter ? `Chapter: ${item.latestChapter}` : 'Klik untuk lihat detail & chapter';
				return {
					title: (item.title || item.name || 'Manga').slice(0, 24),
					description: desc.slice(0, 50),
					id: `${usedPrefix + command} detail ${item.slug}`
				};
			});

			const thumb = await getPosterBuffer(list[0]?.thumbnail).catch(() => Buffer.alloc(0));
			const caption = `📖 *MANGASUSU LATEST UPDATES* 🎀✨\n\nDitemukan *${list.length}* update komik terbaru.\nSilakan pilih komik pada menu tombol di bawah untuk melihat detail & daftar chapter:`;

			if (client && typeof client.sendButtons === 'function' && rows.length > 0) {
				try {
					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: 'Mangasusu Latest Releases',
							address: 'Update Komik Terbaru Hari Ini',
							jpegThumbnail: thumb
						},
						text: '',
						footer: caption,
						buttons: [
							{
								title: '📖 PILIH UPDATE TERBARU',
								sections: [
									{
										title: 'Update Terbaru Mangasusu',
										rows
									}
								]
							},
							{
								displayText: '🔍 Cari Komik Lain',
								id: `${usedPrefix + command}`
							}
						]
					}, { quoted: m });
				} catch (e) {
					console.warn('[MANGASUSU LATEST SEND_BUTTONS FAIL]', e.message);
				}
			}

			let out = `📖 *MANGASUSU LATEST UPDATES* 🎀✨\n\n`;
			list.slice(0, 10).forEach((item, idx) => {
				out += `*${idx + 1}. ${item.title || item.name}*\n`;
				out += `   🆔 Slug: \`${item.slug}\`\n\n`;
			});
			out += `_Ketik \`${usedPrefix + command} detail <slug>\` untuk melihat chapter._`;
			return reply(out.trim());
		} catch (e) {
			console.error('[MANGASUSU LATEST ERROR]:', e.message);
			return reply(`❌ Gagal mengambil komik terbaru: ${e.message}`);
		}
	}

	// ── 2. READ CHAPTER (BUTTON READER) ────────────────────────────────────────
	if (sub === 'read' || sub === 'baca') {
		const targetCh = args.slice(1).join(' ').trim();
		if (!targetCh) {
			return reply(`*Format:* \`${usedPrefix + command} read <slug_chapter>\`\n\nContoh:\n*${usedPrefix + command} read a-fluffy-thief-cat-one-piece-chapter-1*`);
		}

		reply('⏳ *Mengambil halaman gambar chapter komik...*');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangasusu/read', { chapter: targetCh }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 35000 });

			const res = data.result || data;
			const images = res.images || [];
			if (!images.length) {
				return reply('❌ Halaman gambar chapter tidak ditemukan.');
			}

			const totalPages = res.totalImages || images.length;
			const previewImg = images[0];
			const readUrl = res.url || `https://mangasusu.cyou/${targetCh}/`;

			const outText =
				`📖 *BACA MANGASUSU ONLINE* 🎀✨\n\n` +
				`• 📌 *Chapter:* \`${targetCh}\`\n` +
				`• 📄 *Total Halaman:* *${totalPages} Halaman*\n` +
				`• 🔗 *Baca di Web:* ${readUrl}\n\n` +
				`━━━━━━━━━━━━━━━━━━━━\n` +
				`💡 _Halaman preview pertama ditampilkan pada header card. Klik tombol di bawah untuk membaca full di web atau jelajahi update lainnya._`;

			if (client && typeof client.sendButtons === 'function') {
				try {
					const thumb = await getPosterBuffer(previewImg).catch(() => Buffer.alloc(0));
					const buttons = [
						{ displayText: '📖 Update Terbaru', id: `${usedPrefix + command} latest` },
						{ displayText: '🔍 Cari Komik Lain', id: `${usedPrefix + command}` }
					];

					if (readUrl && readUrl.startsWith('http')) {
						buttons.unshift({
							displayText: '🌐 Buka Chapter di Web',
							url: readUrl
						});
					}

					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: (res.title || targetCh).slice(0, 30),
							address: `Total ${totalPages} Halaman • Sub Indo`,
							jpegThumbnail: thumb
						},
						text: '',
						footer: outText,
						buttons
					}, { quoted: m });
				} catch (_) {}
			}

			if (previewImg && previewImg.startsWith('http')) {
				try {
					const imgRes = await axios.get(previewImg, {
						responseType: 'arraybuffer',
						timeout: 15000,
						headers: { 'Referer': 'https://mangasusu.cyou/' }
					});
					return await client.sendMessage(
						m.chat,
						{ image: Buffer.from(imgRes.data), caption: outText },
						{ quoted: m }
					);
				} catch (_) {}
			}

			return reply(outText);
		} catch (e) {
			console.error('[MANGASUSU READ ERROR]:', e.message);
			return reply(`❌ Gagal memuat chapter: ${e.message}`);
		}
	}

	// ── 3. DETAIL MANGA (BUTTON CHAPTER SELECTOR) ──────────────────────────────
	if (sub === 'detail' || sub === 'info') {
		const targetSlug = args.slice(1).join(' ').trim();
		if (!targetSlug) {
			return reply(`*Format:* \`${usedPrefix + command} detail <slug_manga>\`\n\nContoh:\n*${usedPrefix + command} detail a-fluffy-thief-cat-one-piece*`);
		}

		reply('⏳ *Mengambil data detail komik & daftar chapter...*');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangasusu/detail', { slug: targetSlug }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 35000 });

			const res = data.result || data;
			if (!res || !res.title) {
				return reply('❌ Detail komik tidak ditemukan. Periksa kembali slug manga.');
			}

			const thumb = await getPosterBuffer(res.thumbnail || res.cover || res.poster);
			const genres = Array.isArray(res.genres) ? res.genres.join(', ') : '-';
			const chapters = res.chapters || [];
			const totalCh = chapters.length;

			const sections = [];
			const chunkSize = 25;
			for (let i = 0; i < chapters.length; i += chunkSize) {
				const chunk = chapters.slice(i, i + chunkSize);
				const firstNum = i + 1;
				const lastNum = i + chunk.length;
				sections.push({
					title: `Chapter ${firstNum} - ${lastNum}`.slice(0, 24),
					rows: chunk.map(c => ({
						title: (c.title || `Chapter ${c.slug}`).slice(0, 24),
						description: 'Sub Indo • Klik untuk baca chapter',
						id: `${usedPrefix + command} read ${c.slug}`
					}))
				});
			}

			const caption =
				`📖 *${(res.title || targetSlug).toUpperCase()}* 🎀✨\n\n` +
				`• 🆔 *Slug:* \`${res.slug || targetSlug}\`\n` +
				`• 🎭 *Genre:* \`${genres}\`\n` +
				`• 📚 *Total Chapter:* *${totalCh} Chapter*\n` +
				(res.status ? `• 📌 *Status:* \`${res.status}\`\n` : '') +
				(res.author ? `• ✍️ *Author:* \`${res.author}\`\n` : '') +
				`\n📝 *Sinopsis:*\n_${(res.synopsis || res.description || '-').slice(0, 300)}..._\n\n` +
				`Pilih nomor chapter dari menu tombol di bawah untuk membaca komik:`;

			if (client && typeof client.sendButtons === 'function' && sections.length > 0) {
				try {
					const firstCh = chapters[0];
					const buttons = [
						{
							title: `📑 PILIH CHAPTER (1 - ${totalCh})`,
							sections
						}
					];
					if (firstCh) {
						buttons.unshift({
							displayText: `📖 Baca Chapter Terbaru`,
							id: `${usedPrefix + command} read ${firstCh.slug}`
						});
					}
					buttons.push({
						displayText: '📖 Update Terbaru',
						id: `${usedPrefix + command} latest`
					});

					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: (res.title || 'Mangasusu Detail').slice(0, 30),
							address: `Total ${totalCh} Chapter • Sub Indo`,
							jpegThumbnail: thumb
						},
						text: '',
						footer: caption,
						buttons
					}, { quoted: m });
				} catch (e) {
					console.warn('[MANGASUSU DETAIL SEND_BUTTONS FAIL]', e.message);
				}
			}

			let textFallback = `${caption}\n\n`;
			chapters.slice(0, 8).forEach(c => {
				textFallback += `• ${c.title || c.slug}:\n  \`${usedPrefix + command} read ${c.slug}\`\n`;
			});

			if (thumb && thumb.length > 0) {
				return await client.sendMessage(m.chat, { image: thumb, caption: textFallback }, { quoted: m });
			}
			return reply(textFallback);
		} catch (e) {
			console.error('[MANGASUSU DETAIL ERROR]:', e.message);
			return reply(`❌ Gagal mengambil detail komik: ${e.message}`);
		}
	}

	// ── 4. SEARCH MANGA (BUTTON LIST RESULTS) ──────────────────────────────────
	let query = text.trim();
	if (/^(search|serach|cari)\b/i.test(query)) {
		query = query.replace(/^(search|serach|cari)\s*/i, '').trim();
		if (!query) {
			return reply(`*Format:* \`${usedPrefix + command} search <judul komik>\`\n\nContoh:\n*${usedPrefix + command} search one piece*`);
		}
	}

	reply(`⏳ *Mencari komik "${query}" di Mangasusu...*`);
	try {
		const apiUrl = global.API('kyzz', '/api/manga/mangasusu/search', { q: query }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const results = data.result?.results || data.results || [];
		if (!results.length) {
			return reply(`❌ Tidak ditemukan komik dengan judul *"${query}"* di Mangasusu.`);
		}

		const rows = results.slice(0, 15).map(item => {
			const desc = item.latestChapter ? `Chapter: ${item.latestChapter}` : 'Klik untuk lihat detail & chapter';
			return {
				title: (item.title || item.name || 'Manga').slice(0, 24),
				description: desc.slice(0, 50),
				id: `${usedPrefix + command} detail ${item.slug}`
			};
		});

		const thumb = await getPosterBuffer(results[0]?.thumbnail).catch(() => Buffer.alloc(0));
		const caption = `📖 *HASIL PENCARIAN MANGASUSU* 🎀✨\n\nDitemukan *${results.length}* komik untuk *"${query}"*.\nSilakan pilih komik di bawah ini untuk melihat detail & daftar chapter:`;

		if (client && typeof client.sendButtons === 'function' && rows.length > 0) {
			try {
				return await client.sendButtons(m.chat, {
					location: {
						degreesLatitude: 0,
						degreesLongitude: 0,
						name: 'Mangasusu Search Results',
						address: `Pencarian: ${query}`,
						jpegThumbnail: thumb
					},
					text: '',
					footer: caption,
					buttons: [
						{
							title: '📖 PILIH KOMIK DARI HASIL',
							sections: [
								{
									title: `Hasil: ${query}`.slice(0, 24),
									rows
								}
							]
						},
						{
							displayText: '📖 Update Terbaru',
							id: `${usedPrefix + command} latest`
						}
					]
				}, { quoted: m });
			} catch (e) {
				console.warn('[MANGASUSU SEARCH SEND_BUTTONS FAIL]', e.message);
			}
		}

		let out = `📖 *HASIL PENCARIAN MANGASUSU* 🎀✨\n\n`;
		results.slice(0, 10).forEach((item, idx) => {
			out += `*${idx + 1}. ${item.title || item.name}*\n`;
			out += `   🆔 Slug: \`${item.slug}\`\n\n`;
		});
		out += `_Salin slug dan ketik \`${usedPrefix + command} detail <slug>\` untuk melihat info & chapter._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[MANGASUSU SEARCH ERROR]:', e.message);
		return reply(`❌ Terjadi kesalahan saat mencari komik: ${e.message}`);
	}
};

handler.help = ['mangasusu <judul/latest/detail/read>'];
handler.tags = ['manga'];
handler.category = 'manga';
handler.command = ['mangasusu'];
handler.limit = true;
handler.register = true;

export default handler;
