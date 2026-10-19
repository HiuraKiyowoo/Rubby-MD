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
			`🎬 *LOKLOK MOVIES & SERIES EXPLORER* 🍿\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul film/series>* — Cari film di Loklok\n` +
			`• *${usedPrefix + command} ep <id>* — Lihat daftar episode\n` +
			`• *${usedPrefix + command} stream <content_id> <vid>* — Dapatkan direct stream\n\n` +
			`Contoh:\n*${usedPrefix + command} one piece*`
		);
	}

	if (sub === 'ep' || sub === 'episodes') {
		const id = args[1];
		if (!id) return reply(`Format: *${usedPrefix + command} ep <content_id>*`);

		reply('⏳ Mengambil daftar episode Loklok...');
		try {
			const apiUrl = global.API('kyzz', '/api/streaming/loklok/episodes', { id }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const list = data.episodes || data.result || [];
			if (!Array.isArray(list) || list.length === 0) return reply('❌ Daftar episode tidak ditemukan.');

			let out = `📺 *DAFTAR EPISODE LOKLOK (ID: ${id})* 🍿\n\n`;
			list.slice(0, 10).forEach((ep, idx) => {
				out += `*${idx + 1}. ${ep.title || `Episode ${idx + 1}`}*\n   🆔 VID: \`\`\`${ep.vid || ep.id || '-'}\`\`\`\n\n`;
			});

			return reply(out.trim());
		} catch (e) {
			console.error('[LOKLOK EPISODES ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mencari di Loklok...');
	try {
		const apiUrl = global.API('kyzz', '/api/streaming/loklok/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.results || data.result || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Film/Series "*${text}*" tidak ditemukan di Loklok.`);
		}

		let out = `🎬 *HASIL PENCARIAN LOKLOK: ${text.toUpperCase()}* 🍿\n\n`;
		list.slice(0, 7).forEach((item, idx) => {
			out += `*${idx + 1}. ${item.title || item.name}*\n`;
			if (item.id) out += `   🆔 ID: \`\`\`${item.id}\`\`\`\n`;
			if (item.domainType) out += `   📁 Tipe: ${item.domainType}\n`;
			if (item.releaseDate) out += `   📅 Rilis: ${item.releaseDate}\n\n`;
		});

		out += `_Gunakan *${usedPrefix + command} ep <id>* untuk melihat episodenya._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[LOKLOK SEARCH ERROR]', e.message);
		return reply(`❌ Gagal mencari di Loklok: ${e.message}`);
	}
};

handler.help = ['loklok <query>'];
handler.tags = ['streaming'];
handler.category = 'streaming';
handler.command = ['loklok'];
handler.limit = true;
handler.register = true;

export default handler;
