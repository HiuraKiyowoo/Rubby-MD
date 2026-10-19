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
			`🎭 *DRACINEMA ASIAN DRAMA STREAMING* 🌸\n\n` +
			`*Commands yang tersedia:*\n` +
			`• *${usedPrefix + command} <judul drama>* — Cari drama di Dracinema\n` +
			`• *${usedPrefix + command} detail <url>* — Detail drama & episode\n` +
			`• *${usedPrefix + command} stream <url>* — Dapatkan direct stream link\n\n` +
			`Contoh:\n*${usedPrefix + command} lovely runner*`
		);
	}

	if (sub === 'stream') {
		const targetUrl = args.slice(1).join(' ').trim();
		if (!targetUrl) return reply(`Format: *${usedPrefix + command} stream <url>*`);

		reply('⏳ Mengambil link video stream...');
		try {
			const apiUrl = global.API('kyzz', '/api/streaming/dracinema/stream', { url: targetUrl }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const res = data.result || data.data || data;
			const streamUrl = res.stream || res.url || res.streamUrl;

			if (!streamUrl) return reply('❌ Gagal mengekstrak player streaming.');

			return reply(
				`🎬 *STREAMING DRACINEMA READY* 🍿\n\n` +
				`• 🔗 *Play URL:* ${streamUrl}\n\n` +
				`_Buka link di browser untuk menonton secara langsung!_`
			);
		} catch (e) {
			console.error('[DRACINEMA STREAM ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mencari drama di Dracinema...');
	try {
		const apiUrl = global.API('kyzz', '/api/streaming/dracinema/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Drama "*${text}*" tidak ditemukan di Dracinema.`);
		}

		let out = `🎭 *HASIL DRACINEMA: ${text.toUpperCase()}* 🌸\n\n`;
		list.slice(0, 7).forEach((d, idx) => {
			out += `*${idx + 1}. ${d.title || d.judul}*\n`;
			if (d.episode) out += `   📺 Episode: ${d.episode}\n`;
			if (d.url) out += `   🔗 Link: ${d.url}\n\n`;
		});

		out += `_Gunakan *${usedPrefix + command} stream <link>* untuk memutar video._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[DRACINEMA ERROR]', e.message);
		return reply(`❌ Gagal mencari drama: ${e.message}`);
	}
};

handler.help = ['dracinema <judul drama>'];
handler.tags = ['streaming'];
handler.category = 'streaming';
handler.command = ['dracinema', 'dramakorea'];
handler.limit = true;
handler.register = true;

export default handler;
