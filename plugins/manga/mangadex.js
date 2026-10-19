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
			`🌍 *MANGADEX GLOBAL MANGA EXPLORER* 📚\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul manga>* — Cari di MangaDex\n` +
			`• *${usedPrefix + command} detail <manga_id>* — Info detail manga\n\n` +
			`Contoh:\n*${usedPrefix + command} chainsaw man*`
		);
	}

	if (sub === 'detail') {
		const id = args[1];
		if (!id) return reply(`Format: *${usedPrefix + command} detail <manga_id>*`);

		reply('⏳ Mengambil detail MangaDex...');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/mangadex/detail', { id }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			let out = `🌍 *MANGADEX DETAIL: ${(res.title || id).toUpperCase()}* 📚\n\n`;
			if (res.author) out += `• 👤 *Author:* ${res.author}\n`;
			if (res.status) out += `• 📌 *Status:* ${res.status}\n`;
			if (res.description) out += `• 📝 *Deskripsi:* ${res.description.slice(0, 300)}...\n`;

			return reply(out.trim());
		} catch (e) {
			console.error('[MANGADEX DETAIL ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mencari manga di MangaDex...');
	try {
		const apiUrl = global.API('kyzz', '/api/manga/mangadex/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Manga "*${text}*" tidak ditemukan di MangaDex.`);
		}

		let out = `🌍 *HASIL MANGADEX: ${text.toUpperCase()}* 📚\n\n`;
		list.slice(0, 7).forEach((mItem, idx) => {
			out += `*${idx + 1}. ${mItem.title || mItem.name}*\n`;
			if (mItem.id) out += `   🆔 ID: \`\`\`${mItem.id}\`\`\`\n`;
			if (mItem.status) out += `   📌 Status: ${mItem.status}\n\n`;
		});

		out += `_Ketik *${usedPrefix + command} detail <id>* untuk melihat detail manga._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[MANGADEX SEARCH ERROR]', e.message);
		return reply(`❌ Gagal: ${e.message}`);
	}
};

handler.help = ['mangadex <judul>'];
handler.tags = ['manga'];
handler.category = 'manga';
handler.command = ['mangadex'];
handler.limit = true;
handler.register = true;

export default handler;
