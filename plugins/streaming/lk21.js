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

const handler = async (m, { text, args, usedPrefix, command, reply }) => {
	const sub = (args[0] || '').toLowerCase();

	if (!text) {
		return reply(
			`🍿 *LAYARKACA21 (LK21) MOVIE STREAMING* 🎬\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul film>* — Cari film di LK21\n` +
			`• *${usedPrefix + command} detail <url>* — Cek detail film\n` +
			`• *${usedPrefix + command} stream <url>* — Dapatkan link streaming\n\n` +
			`Contoh:\n*${usedPrefix + command} avatar the way of water*`
		);
	}

	if (sub === 'detail' || (text.startsWith('http') && !sub.includes('stream'))) {
		const targetUrl = sub === 'detail' ? args.slice(1).join(' ').trim() : text.trim();
		reply('⏳ Mengambil detail film LK21...');
		try {
			const apiUrl = global.API('kyzz', '/api/streaming/lk21/detail', { url: targetUrl }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			let out = `🎬 *DETAIL FILM: ${(res.title || 'LK21 Film').toUpperCase()}* 🍿\n\n`;
			if (res.rating) out += `• ⭐ *Rating:* ${res.rating}\n`;
			if (res.duration) out += `• ⏱️ *Durasi:* ${res.duration}\n`;
			if (res.genre) out += `• 🎭 *Genre:* ${res.genre}\n`;
			if (res.synopsis || res.sinopsis) out += `• 📝 *Sinopsis:* ${(res.synopsis || res.sinopsis).slice(0, 300)}...\n\n`;
			out += `_Stream film ini dengan: ${usedPrefix + command} stream ${targetUrl}_`;

			return reply(out.trim());
		} catch (e) {
			console.error('[LK21 DETAIL ERROR]', e.message);
			return reply(`❌ Gagal memuat detail: ${e.message}`);
		}
	}

	if (sub === 'stream') {
		const targetUrl = args.slice(1).join(' ').trim();
		if (!targetUrl) return reply(`Format: *${usedPrefix + command} stream <url_film>*`);

		reply('⏳ Mengambil link streaming video...');
		try {
			const apiUrl = global.API('kyzz', '/api/streaming/lk21/stream', { url: targetUrl }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			const streamUrl = res.streamUrl || res.url || res.stream || res.directUrl;

			if (!streamUrl) return reply('❌ Gagal mengekstrak player streaming LK21.');

			return reply(
				`🍿 *LINK STREAMING LK21 READY* 🎬\n\n` +
				`• 🔗 *Play URL:* ${streamUrl}\n\n` +
				`_Buka link di browser untuk menonton secara langsung!_`
			);
		} catch (e) {
			console.error('[LK21 STREAM ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	// Default: Search Movies
	reply('⏳ Mencari film di LK21...');
	try {
		const apiUrl = global.API('kyzz', '/api/streaming/lk21/search', { query: text.trim(), page: 1 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.items || data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Film "*${text}*" tidak ditemukan di LK21.`);
		}

		let out = `🍿 *HASIL PENCARIAN LK21: ${text.toUpperCase()}* 🎬\n\n`;
		list.slice(0, 7).forEach((f, idx) => {
			out += `*${idx + 1}. ${f.title || f.judul}*\n`;
			if (f.rating) out += `   ⭐ Rating: ${f.rating}\n`;
			if (f.duration) out += `   ⏱️ Durasi: ${f.duration}\n`;
			if (f.url) out += `   🔗 Link: ${f.url}\n\n`;
		});

		out += `_Ketik *${usedPrefix + command} detail <link>* untuk melihat sinopsis._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[LK21 SEARCH ERROR]', e.message);
		return reply(`❌ Gagal mencari film: ${e.message}`);
	}
};

handler.help = ['lk21 <judul film>'];
handler.tags = ['streaming'];
handler.category = 'streaming';
handler.command = ['lk21', 'film21', 'layarkaca21'];
handler.limit = true;
handler.register = true;

export default handler;
