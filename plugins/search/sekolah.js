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
			`🏫 *CARI DATA SEKOLAH KEMDIKBUD* 🇮🇩\n\n` +
			`Format: *${usedPrefix + command} <nama sekolah / wilayah>*` +
			`\nContoh: *${usedPrefix + command} SMAN 1 Surakarta*`
		);
	}

	reply(global.mess?.wait || '⏳ Mencari data sekolah...');

	try {
		const apiUrl = global.API('kyzz', '/api/search/sekolah', { q: text.trim(), limit: 7 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Sekolah "*${text}*" tidak ditemukan.`);
		}

		let out = `🏫 *HASIL PENCARIAN SEKOLAH (${text.toUpperCase()})* 🇮🇩\n\n`;
		list.slice(0, 7).forEach((s, idx) => {
			out += `*${idx + 1}. ${s.sekolah || s.nama || s.name}*\n`;
			if (s.npsn) out += `   🆔 NPSN: ${s.npsn}\n`;
			if (s.bentuk) out += `   🏢 Jenjang: ${s.bentuk}\n`;
			if (s.status) out += `   📌 Status: ${s.status}\n`;
			if (s.alamat) out += `   📍 Alamat: ${s.alamat}\n`;
			if (s.kabupaten_kota) out += `   🏙️ Kota: ${s.kabupaten_kota}\n\n`;
		});

		return reply(out.trim());
	} catch (e) {
		console.error('[SEKOLAH SEARCH ERROR]', e.message);
		return reply(`❌ Gagal mencari sekolah: ${e.message}`);
	}
};

handler.help = ['sekolah <nama sekolah>'];
handler.tags = ['search'];
handler.command = ['sekolah', 'datasekolah'];
handler.limit = true;
handler.register = true;

export default handler;
