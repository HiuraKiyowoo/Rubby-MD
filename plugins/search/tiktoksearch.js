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
import { Carousel, Button } from '../../src/lib/helper-bails.js';

global.tiktokSearchCache = global.tiktokSearchCache || new Map();

const formatDuration = (val) => {
	if (!val) return '0s';
	if (typeof val === 'string' && val.endsWith('s')) return val;
	const sec = parseInt(val, 10);
	if (isNaN(sec)) return String(val);
	const min = Math.floor(sec / 60);
	const remSec = sec % 60;
	return min > 0 ? `${min}m ${remSec}s` : `${remSec}s`;
};

const handler = async (m, { sock, conn, text, args, usedPrefix, command, reply }) => {
	const client = sock || conn || global.mainSock || global.conn;

	if (command === 'ttget' || (args[0] && /^\d+$/.test(args[0]) && global.tiktokSearchCache.has(m.chat))) {
		const targetIndex = parseInt(args[0], 10);
		const cachedVideos = global.tiktokSearchCache.get(m.chat) || [];
		const selectedVideo = cachedVideos[targetIndex];

		if (!selectedVideo) {
			return reply(`*Aduh ayang...* video nomor *${targetIndex + 1}* udah nggak ada atau sesi pencariannya udah kadaluarsa nih~ 🥺💦\nCoba cari ulang pake \`${usedPrefix}tiktoksearch <query>\` ya cintaku!`);
		}

		await global.react?.(client, m, 'loading');
		await reply(`*Tunggu sebentar ya ayangku tersayang...* ⏳💕\nAngela lagi ambilin videonya spesial buat mas: *"${selectedVideo.title || 'TikTok Video'}"* 💋✨`);

		try {
			const videoRes = await axios.get(selectedVideo.play_url, {
				headers: {
					'User-Agent': 'okhttp/3.14.9',
					'Referer': 'https://www.tiktok.com/'
				},
				responseType: 'arraybuffer',
				timeout: 45000
			});

			const caption = `*─── [ TIKTOK PLAY / DOWNLOAD ] ───* 🎬✨\n\n` +
				`🎀 *Judul:* ${selectedVideo.title || '-'}\n` +
				`⏱️ *Durasi:* ${formatDuration(selectedVideo.duration)}\n` +
				`🔢 *Index:* ${selectedVideo.index || (targetIndex + 1)}\n\n` +
				`_Ini videonya udah Angela kirim ya mas gantengku... puas kan nontonnya bareng Angela?_ 💋🥵💦`;

			await client.sendMessage(m.chat, {
				video: Buffer.from(videoRes.data),
				caption: caption,
				mimetype: 'video/mp4'
			}, { quoted: m });

			await global.react?.(client, m, 'success');
			return;
		} catch (err) {
			console.error('[TIKTOK GET VIDEO ERROR]:', err.message);
			await global.react?.(client, m, 'error');
			return reply(`*Uhh maafin Angela ya ayang...* 🥺💦\nGagal mengunduh videonya secara langsung: ${err.message}\n\nAyang bisa tonton langsung lewat play url-nya ya sayang:\n${selectedVideo.play_url}`);
		}
	}

	if (!text) {
		return reply(
			`*Uhh sayangku tercinta...* masukin kata kunci TikTok yang mau dicari dong~ 🥺👉👈\n\n` +
			`*Contoh:* \`${usedPrefix + command} naruto\`\n` +
			`_Nanti Angela tampilin semua videonya dalam bentuk carousel mewah nan menggoda buat mas~_ 💋✨`
		);
	}

	await global.react?.(client, m, 'loading');
	await reply(global.mess?.wait || `*Sedang mencari video TikTok buat ayang...* ⏳💕\nTunggu sebentar ya mas gantengku, Angela cariin yang paling hot~`);

	try {
		const apiUrl = global.API('kyzz', '/api/search/tiktok', { query: text.trim() }, 'apikey');

		const { data } = await axios.get(apiUrl, {
			timeout: 30000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
			}
		});

		const videos = data?.videos;
		if (!data?.status || !Array.isArray(videos) || videos.length === 0) {
			await global.react?.(client, m, 'error');
			return reply(`*Aahh maaf ya ayang...* 🥺💦\nAngela cari-cari kesana kemari nggak nemu video TikTok dengan kata kunci \`"${text}"\`. Coba kata kunci lain ya cintaku? 💕`);
		}

		global.tiktokSearchCache.set(m.chat, videos);

		const cardPromises = videos.map(async (v, idx) => {
			try {
				const card = new Button(client);
				const titleText = (v.title && v.title.trim()) ? v.title.trim() : `TikTok Video #${idx + 1}`;
				const shortTitle = titleText.length > 50 ? titleText.substring(0, 47) + '...' : titleText;

				card.setTitle(`🎥 Video ${idx + 1}/${videos.length}`);
				card.setBody(
					`📌 *Judul:* ${shortTitle}\n` +
					`⏱️ *Durasi:* ${formatDuration(v.duration)}\n` +
					`📅 *Dibuat:* ${v.created_at ? new Date(v.created_at).toLocaleDateString('id-ID') : '-'}`
				);
				card.setFooter(`© ${global.namaBot || 'Rubby Multi Device'} • TikTok Search`);

				if (v.cover_url) {
					card.setImage(v.cover_url);
				}

				card.addReply('📥 Download Video', `${usedPrefix}ttget ${idx}`);

				if (v.play_url) {
					card.addUrl('▶️ Play URL', v.play_url);
				}

				return await card.toCard();
			} catch (errCard) {
				console.warn(`[TIKTOK SEARCH CARD ERROR ${idx}]:`, errCard.message);
				return null;
			}
		});

		const cards = (await Promise.all(cardPromises)).filter(Boolean);

		if (cards.length === 0) {
			await global.react?.(client, m, 'error');
			return reply('❌ Gagal merangkai kartu carousel video TikTok.');
		}

		const carousel = new Carousel(client)
			.setBody(
				`✨ *TIKTOK SEARCH CAROUSEL* ✨\n\n` +
				`Ditemukan *${videos.length} video* TikTok untuk pencarian: *"${text}"* 💕\n` +
				`Geser kartu ke samping untuk memilih video favoritmu ya sayang, terus klik tombol *Download Video* buat ambil videonya~ ⏩💋`
			)
			.setFooter(`© ${global.namaBot || 'Rubby Multi Device'} • Powered by Kyzz API`);

		carousel.addCard(cards);
		await carousel.send(m.chat, { quoted: m });
		await global.react?.(client, m, 'success');

	} catch (err) {
		console.error('[TIKTOK SEARCH ERROR]:', err.response?.data || err.message);
		await global.react?.(client, m, 'error');
		return reply(`*Aahh error ayang...* 🥵💦\nAda kendala saat mencari video TikTok: ${err.response?.data?.message || err.message}`);
	}
};

handler.help = ['tiktoksearch <query>', 'ttsearch <query>'];
handler.tags = ['search', 'downloader'];
handler.command = /^(tiktoksearch|ttsearch|tiktoks|ttget)$/i;
handler.limit = true;
handler.register = true;

export default handler;