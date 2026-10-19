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
			`📺 *NONTONDRAMA ASIAN SERIES* 🌸\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul drama>* — Cari drama\n` +
			`• *${usedPrefix + command} detail <slug>* — Detail & daftar episode\n` +
			`• *${usedPrefix + command} stream <slug>* — Dapatkan player stream\n\n` +
			`Contoh:\n*${usedPrefix + command} hidden love*`
		);
	}

	if (sub === 'stream') {
		const slug = args[1];
		if (!slug) return reply(`Format: *${usedPrefix + command} stream <slug_episode>*`);

		reply('⏳ Mengambil video player NontonDrama...');
		try {
			const apiUrl = global.API('kyzz', '/api/streaming/nontondrama/stream', { slug }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			const streamUrl = res.stream || res.url || res.streamUrl || res.iframe;

			if (!streamUrl) return reply('❌ Gagal mengekstrak player streaming.');

			return reply(
				`🎬 *STREAMING NONTONDRAMA READY* 🍿\n\n` +
				`• 🔗 *Play URL:* ${streamUrl}\n\n` +
				`_Buka link di browser untuk menonton secara langsung!_`
			);
		} catch (e) {
			console.error('[NONTONDRAMA STREAM ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mencari di NontonDrama...');
	try {
		const apiUrl = global.API('kyzz', '/api/streaming/nontondrama/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Drama "*${text}*" tidak ditemukan di NontonDrama.`);
		}

		let out = `📺 *HASIL NONTONDRAMA: ${text.toUpperCase()}* 🌸\n\n`;
		list.slice(0, 7).forEach((d, idx) => {
			out += `*${idx + 1}. ${d.title || d.judul}*\n`;
			if (d.slug) out += `   🆔 Slug: \`\`\`${d.slug}\`\`\`\n`;
			if (d.episode) out += `   📺 Episode: ${d.episode}\n\n`;
		});

		out += `_Ketik *${usedPrefix + command} stream <slug>* untuk streaming episode._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[NONTONDRAMA SEARCH ERROR]', e.message);
		return reply(`❌ Gagal: ${e.message}`);
	}
};

handler.help = ['nontondrama <judul>'];
handler.tags = ['streaming'];
handler.category = 'streaming';
handler.command = ['nontondrama'];
handler.limit = true;
handler.register = true;

export default handler;
