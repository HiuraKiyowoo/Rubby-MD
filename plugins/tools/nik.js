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

let handler = async (m, { text, usedPrefix, command, reply }) => {
	const nik = (text || '').replace(/[^0-9]/g, '');

	if (nik.length !== 16) {
		return reply(
			`🇮🇩 *CEK INFORMASI NIK KTP*\n\n` +
			`Format: *${usedPrefix + command} <16_digit_nik>*\n` +
			`Contoh: *${usedPrefix + command} 3201010101900001*\n\n` +
			`_Fitur ini menguraikan kode wilayah, tanggal lahir, jenis kelamin, dan usia berdasarkan standar penomoran NIK Kemendagri._`
		);
	}

	reply(global.mess?.wait || '⏳ Menganalisis NIK...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/nik', { nik }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const res = data.result || data.data || data;
		if (!res) {
			return reply('❌ Gagal memproses NIK.');
		}

		let out = `🇮🇩 *INFORMASI NIK KTP*\n\n`;
		out += `• *NIK* : \`${res.nik || nik}\`\n`;
		out += `• *Jenis Kelamin* : ${res.gender || res.jenis_kelamin || '-'}\n`;
		out += `• *Tanggal Lahir* : ${res.birth_date || res.tgl_lahir || '-'}\n`;
		out += `• *Usia* : ${res.age || res.usia || '-'}\n`;
		out += `• *Zodiak* : ${res.zodiac || res.zodiak || '-'}\n\n`;

		out += `📍 *Wilayah Pendaftaran*:\n`;
		out += `• *Provinsi* : ${res.province || res.provinsi || '-'}\n`;
		out += `• *Kabupaten/Kota* : ${res.city || res.kabupaten || res.kota || '-'}\n`;
		out += `• *Kecamatan* : ${res.district || res.kecamatan || '-'}\n`;
		out += `• *Kode Pos* : ${res.postal_code || res.kodepos || '-'}`;

		return reply(out);
	} catch (e) {
		console.error('[NIK PARSER ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['ceknik <16_digit_nik>'];
handler.tags = ['tools'];
handler.command = ['ceknik', 'nik'];
handler.limit = true;
handler.register = true;

export default handler;
