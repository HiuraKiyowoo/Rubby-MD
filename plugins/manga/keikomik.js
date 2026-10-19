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
			`📚 *KEIKOMIK MANGA EXPLORER* 🇯🇵\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul manga>* — Cari komik\n` +
			`• *${usedPrefix + command} detail <slug>* — Detail komik & chapter\n\n` +
			`Contoh:\n*${usedPrefix + command} one piece*`
		);
	}

	if (sub === 'detail') {
		const slug = args[1];
		if (!slug) return reply(`Format: *${usedPrefix + command} detail <slug>*`);

		reply('⏳ Mengambil detail komik...');
		try {
			const apiUrl = global.API('kyzz', '/api/manga/keikomik/detail', { slug }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			let out = `📚 *DETAIL KEIKOMIK: ${(res.title || slug).toUpperCase()}* 🇯🇵\n\n`;
			if (res.author) out += `• 👤 *Author:* ${res.author}\n`;
			if (res.type) out += `• 📁 *Tipe:* ${res.type}\n`;
			if (res.status) out += `• 📌 *Status:* ${res.status}\n`;
			if (res.synopsis) out += `• 📝 *Sinopsis:* ${res.synopsis.slice(0, 250)}...\n`;

			return reply(out.trim());
		} catch (e) {
			console.error('[KEIKOMIK DETAIL ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mencari komik di KeiKomik...');
	try {
		const apiUrl = global.API('kyzz', '/api/manga/keikomik/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Komik "*${text}*" tidak ditemukan di KeiKomik.`);
		}

		let out = `📚 *HASIL PENCARIAN KEIKOMIK: ${text.toUpperCase()}* 🇯🇵\n\n`;
		list.slice(0, 7).forEach((c, idx) => {
			out += `*${idx + 1}. ${c.title || c.name}*\n`;
			if (c.slug) out += `   🆔 Slug: \`\`\`${c.slug}\`\`\`\n`;
			if (c.type) out += `   📁 Tipe: ${c.type}\n`;
			if (c.url) out += `   🔗 Link: ${c.url}\n\n`;
		});

		out += `_Ketik *${usedPrefix + command} detail <slug>* untuk melihat info komik._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[KEIKOMIK SEARCH ERROR]', e.message);
		return reply(`❌ Gagal: ${e.message}`);
	}
};

handler.help = ['keikomik <judul>'];
handler.tags = ['manga'];
handler.category = 'manga';
handler.command = ['keikomik'];
handler.limit = true;
handler.register = true;

export default handler;
