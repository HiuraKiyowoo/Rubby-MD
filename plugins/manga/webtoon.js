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

	if (sub === 'jadwal' || sub === 'schedule') {
		const hari = (args[1] || 'senin').toLowerCase();
		reply(`⏳ Mengambil jadwal Webtoon hari ${hari}...`);
		try {
			const apiUrl = global.API('kyzz', '/api/manga/webtoon/jadwal', { hari }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const list = data.result || data.data || [];
			if (!Array.isArray(list) || list.length === 0) return reply('❌ Jadwal webtoon tidak ditemukan.');

			let out = `📅 *JADWAL LINE WEBTOON HARI ${hari.toUpperCase()}* 🟢\n\n`;
			list.slice(0, 8).forEach((w, idx) => {
				out += `*${idx + 1}. ${w.title || w.judul}*\n`;
				if (w.genre) out += `   🎭 Genre: ${w.genre}\n`;
				if (w.likes) out += `   ❤️ Likes: ${w.likes}\n\n`;
			});

			return reply(out.trim());
		} catch (e) {
			console.error('[WEBTOON JADWAL ERROR]', e.message);
			return reply(`❌ Gagal: ${e.message}`);
		}
	}

	reply('⏳ Mengambil komik Webtoon terpopuler...');
	try {
		const apiUrl = global.API('kyzz', '/api/manga/webtoon/home', {}, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) return reply('❌ Gagal memuat home Line Webtoon.');

		let out = `🟢 *LINE WEBTOON POPULER HARI INI* 📚\n\n`;
		list.slice(0, 8).forEach((w, idx) => {
			out += `*${idx + 1}. ${w.title || w.judul}*\n`;
			if (w.author) out += `   👤 Author: ${w.author}\n`;
			if (w.genre) out += `   🎭 Genre: ${w.genre}\n\n`;
		});

		out += `_Ketik *${usedPrefix + command} jadwal <hari>* untuk cek jadwal rilis._`;
		return reply(out.trim());
	} catch (e) {
		console.error('[WEBTOON ERROR]', e.message);
		return reply(`❌ Gagal: ${e.message}`);
	}
};

handler.help = ['webtoon', 'webtoon jadwal <hari>'];
handler.tags = ['manga'];
handler.category = 'manga';
handler.command = ['webtoon', 'linewebtoon'];
handler.limit = true;
handler.register = true;

export default handler;
