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

const handler = async (m, { text, usedPrefix, command, reply }) => {
	reply(global.mess?.wait || '⏳ Mengambil jadwal film bioskop XXI...');

	try {
		const query = text ? text.trim() : 'jakarta';
		const apiUrl = global.API('kyzz', '/api/search/bioskop', { query, category: 'now-playing' }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Tidak ada film bioskop ditemukan untuk "*${query}*".`);
		}

		let out = `🎬 *JADWAL BIOSKOP CINEMA XXI: ${query.toUpperCase()}* 🍿\n\n`;
		list.slice(0, 8).forEach((f, idx) => {
			out += `*${idx + 1}. ${f.title || f.judul}*\n`;
			if (f.genre) out += `   🎭 Genre: ${f.genre}\n`;
			if (f.duration) out += `   ⏱️ Durasi: ${f.duration}\n`;
			if (f.rating) out += `   ⭐ Rating: ${f.rating}\n`;
			if (f.url) out += `   🔗 Link: ${f.url}\n\n`;
		});

		return reply(out.trim());
	} catch (e) {
		console.error('[BIOSKOP ERROR]', e.message);
		return reply(`❌ Gagal memuat jadwal bioskop: ${e.message}`);
	}
};

handler.help = ['bioskop [kota]'];
handler.tags = ['search'];
handler.command = ['bioskop', 'jadwalbioskop', 'cinema21', 'xxi'];
handler.limit = true;
handler.register = true;

export default handler;
