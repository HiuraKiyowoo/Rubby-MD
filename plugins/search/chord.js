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
	if (!text) {
		return reply(
			`🎸 *CARI CHORD & KUNCI GITAR* 🎶\n\n` +
			`Format: *${usedPrefix + command} <judul lagu / artis>*` +
			`\nContoh: *${usedPrefix + command} Peterpan Menghapus Jejakmu*`
		);
	}

	reply(global.mess?.wait || '⏳ Mencari chord gitar...');

	try {
		const apiUrl = global.API('kyzz', '/api/search/chord', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			return reply(`❌ Chord untuk "*${text}*" tidak ditemukan.`);
		}

		let out = `🎸 *CHORD GITAR: ${(res.title || text).toUpperCase()}* 🎶\n\n`;
		if (res.chord || res.content) {
			out += res.chord || res.content;
		} else if (Array.isArray(res) && res.length > 0) {
			out += `Ditemukan ${res.length} chord:\n\n`;
			res.slice(0, 10).forEach((c, idx) => {
				out += `*${idx + 1}. ${c.title}*\n   🔗 ${c.url || '-'}\n\n`;
			});
		} else {
			out += typeof res === 'string' ? res : JSON.stringify(res, null, 2);
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[CHORD ERROR]', e.message);
		return reply(`❌ Gagal memuat chord: ${e.message}`);
	}
};

handler.help = ['chord <lagu>'];
handler.tags = ['search'];
handler.command = ['chord', 'kuncigitar', 'chordgitar'];
handler.limit = true;
handler.register = true;

export default handler;
