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
			`📖 *FICTIONME NOVEL EXPLORER* ✍️\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul novel>* — Cari novel\n` +
			`• *${usedPrefix + command} detail <slug>* — Detail novel & bab\n\n` +
			`Contoh:\n*${usedPrefix + command} dragon*`
		);
	}

	if (sub === 'detail') {
		const slug = args[1];
		if (!slug) return reply(`Format: *${usedPrefix + command} detail <slug>*`);

		reply('⏳ Mengambil detail novel...');
		try {
			const apiUrl = global.API('kyzz', '/api/novel/fictionme/detail', { slug }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			let out = `📖 *DETAIL NOVEL: ${(res.title || slug).toUpperCase()}* ✍️\n\n`;
			if (res.author) out += `• 👤 *Author:* ${res.author}\n`;
			if (res.views) out += `• 👁️ *Views:* ${res.views}\n`;
			if (res.synopsis || res.description) out += `• 📝 *Sinopsis:* ${(res.synopsis || res.description).slice(0, 300)}...\n`;

			return reply(out.trim());
		} catch (e) {
			console.error('[FICTIONME DETAIL ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mencari novel di FictionMe...');
	try {
		const apiUrl = global.API('kyzz', '/api/novel/fictionme/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || data.books || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Novel "*${text}*" tidak ditemukan di FictionMe.`);
		}

		let out = `📖 *HASIL PENCARIAN FICTIONME: ${text.toUpperCase()}* ✍️\n\n`;
		list.slice(0, 7).forEach((n, idx) => {
			out += `*${idx + 1}. ${n.title || n.name}*\n`;
			if (n.slug) out += `   🆔 Slug: \`\`\`${n.slug}\`\`\`\n`;
			if (n.author) out += `   👤 Author: ${n.author}\n\n`;
		});

		out += `_Ketik *${usedPrefix + command} detail <slug>* untuk melihat detail novel._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[FICTIONME SEARCH ERROR]', e.message);
		return reply(`❌ Gagal: ${e.message}`);
	}
};

handler.help = ['fictionme <judul>'];
handler.tags = ['novel'];
handler.category = 'novel';
handler.command = ['fictionme', 'carinovel'];
handler.limit = true;
handler.register = true;

export default handler;
