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
					'Referer': 'https://m.mangatown.com/'
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
			`📚 *MANGATOWN — READ MANGA (ENGLISH)* 🎀✨\n\n` +
			`Database komik manga, manhwa, dan manhua bahasa Inggris terlengkap.\n\n` +
			`*Cara Penggunaan:*\n` +
			`• \`${usedPrefix + command} <judul manga>\` — Cari komik di MangaTown\n` +
			`• \`${usedPrefix + command} latest\` — Update chapter terbaru hari ini\n` +
			`• \`${usedPrefix + command} detail <slug>\` — Detail manga & daftar chapter\n` +
			`• \`${usedPrefix + command} read <slug_ch>\` — Baca chapter komik online`;

		if (client && typeof client.sendButtons === 'function') {
			try {
				const thumb = await getPosterBuffer().catch(() => Buffer.alloc(0));
				return await client.sendButtons(m.chat, {
					location: {
						degreesLatitude: 0,
						degreesLongitude: 0,
						name: 'MangaTown Official Hub',
						address: 'Read English Manga Online',
						jpegThumbnail: thumb
					},
					text: '',
					footer: helpText,
					buttons: [
						{ displayText: '📚 Latest Manga', id: `${usedPrefix + command} latest` },
						{ displayText: '🔍 Cari Bleach', id: `${usedPrefix + command} bleach` },
						{ displayText: '🔍 Cari One Punch Man', id: `${usedPrefix + command} onepunch_man` }
					]
				}, { quoted: m });
			} catch (_) {}
		}
		return reply(helpText);
	}

	await global.react?.(client, m, '⏳').catch(() => {});

	// ── 1. LATEST UPDATES (INTERACTIVE LIST) ───────────────────────────────────
	if (sub === 'latest' || sub === 'terbaru') {
		reply('⏳ *Mengambil update manga terbaru di MangaTown...*');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangatown/latest', {}, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const list = data.result?.results || data.results || [];
			if (!list.length) return reply('❌ Gagal memuat update manga terbaru.');

			const rows = list.slice(0, 15).map(item => {
				const desc = item.latestChapter ? `Chapter: ${item.latestChapter}` : 'Click to view details & chapters';
				return {
					title: (item.title || item.name || 'Manga').slice(0, 24),
					description: desc.slice(0, 50),
					id: `${usedPrefix + command} detail ${item.slug}`
				};
			});

			const thumb = await getPosterBuffer(list[0]?.thumbnail).catch(() => Buffer.alloc(0));
			const caption = `📚 *MANGATOWN LATEST RELEASES* 🎀✨\n\nDitemukan *${list.length}* update komik terbaru hari ini.\nSilakan pilih manga pada menu tombol di bawah untuk melihat detail & daftar chapter:`;

			if (client && typeof client.sendButtons === 'function' && rows.length > 0) {
				try {
					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: 'MangaTown Latest Releases',
							address: 'Latest Manga Updates Today',
							jpegThumbnail: thumb
						},
						text: '',
						footer: caption,
						buttons: [
							{
								title: '📚 SELECT LATEST RELEASES',
								sections: [
									{
										title: 'MangaTown Latest Releases',
										rows
									}
								]
							},
							{
								displayText: '🔍 Search Manga',
								id: `${usedPrefix + command}`
							}
						]
					}, { quoted: m });
				} catch (e) {
					console.warn('[MANGATOWN LATEST SEND_BUTTONS FAIL]', e.message);
				}
			}

			let out = `📚 *MANGATOWN LATEST RELEASES* 🎀✨\n\n`;
			list.slice(0, 10).forEach((item, idx) => {
				out += `*${idx + 1}. ${item.title || item.name}*\n`;
				out += `   🆔 Slug: \`${item.slug}\`\n\n`;
			});
			out += `_Ketik \`${usedPrefix + command} detail <slug>\` untuk melihat chapter._`;
			return reply(out.trim());
		} catch (e) {
			console.error('[MANGATOWN LATEST ERROR]:', e.message);
			return reply(`❌ Gagal mengambil manga terbaru: ${e.message}`);
		}
	}

	// ── 2. READ CHAPTER (BUTTON READER) ────────────────────────────────────────
	if (sub === 'read' || sub === 'baca') {
		const targetCh = args.slice(1).join(' ').trim();
		if (!targetCh) {
			return reply(`*Format:* \`${usedPrefix + command} read <slug_chapter>\`\n\nContoh:\n*${usedPrefix + command} read bleach_dj_vs/c001*`);
		}

		reply('⏳ *Mengambil halaman gambar chapter MangaTown...*');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangatown/read', { chapter: targetCh }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 35000 });

			const res = data.result || data;
			const images = res.images || [];
			if (!images.length) {
				return reply('❌ Halaman gambar chapter tidak ditemukan.');
			}

			const totalPages = res.totalImages || images.length;
			const previewImg = images[0];
			const readUrl = res.url || `https://m.mangatown.com/manga/${targetCh}/`;

			const outText =
				`📚 *READ MANGATOWN ONLINE* 🎀✨\n\n` +
				`• 📌 *Chapter:* \`${targetCh}\`\n` +
				`• 📄 *Total Halaman:* *${totalPages} Halaman*\n` +
				`• 🔗 *Read on Web:* ${readUrl}\n\n` +
				`━━━━━━━━━━━━━━━━━━━━\n` +
				`💡 _Halaman preview pertama ditampilkan pada header card. Klik tombol di bawah untuk membaca full di web atau jelajahi update lainnya._`;

			if (client && typeof client.sendButtons === 'function') {
				try {
					const thumb = await getPosterBuffer(previewImg).catch(() => Buffer.alloc(0));
					const buttons = [
						{ displayText: '📚 Latest Manga', id: `${usedPrefix + command} latest` },
						{ displayText: '🔍 Search Manga', id: `${usedPrefix + command}` }
					];

					if (readUrl && readUrl.startsWith('http')) {
						buttons.unshift({
							displayText: '🌐 Read on Web (Full)',
							url: readUrl
						});
					}

					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: (res.title || targetCh).slice(0, 30),
							address: `Total ${totalPages} Pages • English`,
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
						headers: { 'Referer': 'https://m.mangatown.com/' }
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
			console.error('[MANGATOWN READ ERROR]:', e.message);
			return reply(`❌ Gagal memuat chapter: ${e.message}`);
		}
	}

	// ── 3. DETAIL MANGA (BUTTON CHAPTER SELECTOR) ──────────────────────────────
	if (sub === 'detail' || sub === 'info') {
		const targetSlug = args.slice(1).join(' ').trim();
		if (!targetSlug) {
			return reply(`*Format:* \`${usedPrefix + command} detail <slug_manga>\`\n\nContoh:\n*${usedPrefix + command} detail onepunch_man*`);
		}

		reply('⏳ *Mengambil data detail manga & daftar chapter...*');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangatown/detail', { slug: targetSlug }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 35000 });

			const res = data.result || data;
			if (!res || !res.title) {
				return reply('❌ Detail manga tidak ditemukan. Periksa kembali slug manga.');
			}

			const thumb = await getPosterBuffer(res.thumbnail || res.cover || res.poster);
			const chapters = res.chapters || [];
			const totalCh = res.totalChapters || chapters.length;

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
						description: 'English • Click to read chapter',
						id: `${usedPrefix + command} read ${c.slug}`
					}))
				});
			}

			const caption =
				`📚 *${(res.title || targetSlug).toUpperCase()}* 🎀✨\n\n` +
				`• 🆔 *Slug:* \`${res.slug || targetSlug}\`\n` +
				`• ⭐ *Score / Rating:* \`${res.score || '-'}\`\n` +
				`• 📚 *Total Chapter:* *${totalCh} Chapter*\n` +
				(res.status ? `• 📌 *Status:* \`${res.status}\`\n` : '') +
				(res.author ? `• ✍️ *Author:* \`${res.author}\`\n` : '') +
				`\n📝 *Summary:*\n_${(res.summary || '-').slice(0, 300)}..._\n\n` +
				`Pilih nomor chapter dari menu tombol di bawah untuk membaca manga:`;

			if (client && typeof client.sendButtons === 'function' && sections.length > 0) {
				try {
					const firstCh = chapters[0];
					const buttons = [
						{
							title: `📑 SELECT CHAPTER (1 - ${totalCh})`,
							sections
						}
					];
					if (firstCh) {
						buttons.unshift({
							displayText: `📖 Read Latest Chapter`,
							id: `${usedPrefix + command} read ${firstCh.slug}`
						});
					}
					buttons.push({
						displayText: '📚 Latest Manga',
						id: `${usedPrefix + command} latest`
					});

					return await client.sendButtons(m.chat, {
						location: {
							degreesLatitude: 0,
							degreesLongitude: 0,
							name: (res.title || 'MangaTown Detail').slice(0, 30),
							address: `Rating: ${res.score || '-'} • Total ${totalCh} Chapters`,
							jpegThumbnail: thumb
						},
						text: '',
						footer: caption,
						buttons
					}, { quoted: m });
				} catch (e) {
					console.warn('[MANGATOWN DETAIL SEND_BUTTONS FAIL]', e.message);
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
			console.error('[MANGATOWN DETAIL ERROR]:', e.message);
			return reply(`❌ Gagal mengambil detail manga: ${e.message}`);
		}
	}

	// ── 4. SEARCH MANGA (BUTTON LIST RESULTS) ──────────────────────────────────
	let query = text.trim();
	if (/^(search|serach|cari)\b/i.test(query)) {
		query = query.replace(/^(search|serach|cari)\s*/i, '').trim();
		if (!query) {
			return reply(`*Format:* \`${usedPrefix + command} search <judul manga>\`\n\nContoh:\n*${usedPrefix + command} search bleach*`);
		}
	}

	reply(`⏳ *Mencari manga "${query}" di MangaTown...*`);
	try {
		const apiUrl = global.API('kyzz', '/api/manga/mangatown/search', { q: query }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const results = data.result?.results || data.results || [];
		if (!results.length) {
			return reply(`❌ Tidak ditemukan manga dengan judul *"${query}"* di MangaTown.`);
		}

		const rows = results.slice(0, 15).map(item => {
			const desc = item.latestChapter ? `Chapter: ${item.latestChapter}` : 'Click to view details & chapters';
			return {
				title: (item.title || item.name || 'Manga').slice(0, 24),
				description: desc.slice(0, 50),
				id: `${usedPrefix + command} detail ${item.slug}`
			};
		});

		const thumb = await getPosterBuffer(results[0]?.thumbnail).catch(() => Buffer.alloc(0));
		const caption = `📚 *SEARCH RESULTS MANGATOWN* 🎀✨\n\nDitemukan *${results.length}* manga untuk *"${query}"*.\nSilakan pilih manga di bawah ini untuk melihat detail & daftar chapter:`;

		if (client && typeof client.sendButtons === 'function' && rows.length > 0) {
			try {
				return await client.sendButtons(m.chat, {
					location: {
						degreesLatitude: 0,
						degreesLongitude: 0,
						name: 'MangaTown Search Results',
						address: `Search: ${query}`,
						jpegThumbnail: thumb
					},
					text: '',
					footer: caption,
					buttons: [
						{
							title: '📚 SELECT MANGA FROM SEARCH',
							sections: [
								{
									title: `Results: ${query}`.slice(0, 24),
									rows
								}
							]
						},
						{
							displayText: '📚 Latest Manga',
							id: `${usedPrefix + command} latest`
						}
					]
				}, { quoted: m });
			} catch (e) {
				console.warn('[MANGATOWN SEARCH SEND_BUTTONS FAIL]', e.message);
			}
		}

		let out = `📚 *SEARCH RESULTS MANGATOWN* 🎀✨\n\n`;
		results.slice(0, 10).forEach((item, idx) => {
			out += `*${idx + 1}. ${item.title || item.name}*\n`;
			out += `   🆔 Slug: \`${item.slug}\`\n\n`;
		});
		out += `_Salin slug dan ketik \`${usedPrefix + command} detail <slug>\` untuk melihat info & chapter._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[MANGATOWN SEARCH ERROR]:', e.message);
		return reply(`❌ Terjadi kesalahan saat mencari manga: ${e.message}`);
	}
};

handler.help = ['mangatown <judul/latest/detail/read>'];
handler.tags = ['manga'];
handler.category = 'manga';
handler.command = ['mangatown'];
handler.limit = true;
handler.register = true;

export default handler;
