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
	if (!text) {
		return reply(
			`🔐 *HASH GENERATOR*\n\n` +
			`Format:\n` +
			`• *${usedPrefix + command} <teks>*\n` +
			`• *${usedPrefix + command} <algoritma> | <teks>*\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} halo dunia*\n` +
			`• *${usedPrefix + command} sha256 | halo dunia*\n\n` +
			`_Algoritma tersedia: md5, sha1, sha256, sha512, ripemd160_`
		);
	}

	let algorithm = 'md5';
	let stringText = text.trim();

	if (text.includes('|')) {
		const parts = text.split('|').map(v => v.trim());
		if (parts.length >= 2) {
			algorithm = parts[0].toLowerCase();
			stringText = parts.slice(1).join(' ');
		}
	}

	reply(global.mess?.wait || '⏳ Mengenerate hash...');
	try {
		const apiUrl = global.API('kyzz', '/api/tools/hash', {}, 'apikey');
		const { data } = await axios.post(apiUrl, {
			text: stringText,
			algorithm
		}, { timeout: 30000 });

		if (!data.status) {
			return reply(`❌ Gagal: ${data.message || 'Terjadi kesalahan saat membuat hash.'}`);
		}

		let out = `🔐 *HASH GENERATOR*\n\n`;
		out += `• *Teks* : ${stringText}\n`;
		out += `• *Algoritma* : ${data.algorithm || algorithm}\n`;
		out += `• *Hasil Hash* : \`${data.hash || data.result}\``;

		return reply(out);
	} catch (e) {
		console.error('[HASH ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['hash <teks>', 'hash <algo> | <teks>'];
handler.tags = ['tools'];
handler.command = ['hash', 'hasher'];
handler.limit = true;
handler.register = true;

export default handler;
