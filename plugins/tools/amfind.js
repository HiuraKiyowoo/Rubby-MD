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
			`🎬 *ALIGHT MOTION PRESET FINDER*\n\n` +
			`Format: *${usedPrefix + command} <url_alight_motion>*\n` +
			`Contoh: *${usedPrefix + command} http://alight.link/...*`
		);
	}

	const url = text.trim();
	reply(global.mess?.wait || '⏳ Mengambil detail preset Alight Motion...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/amfind', { url }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const res = data.result || data.data || data;
		if (!res) {
			return reply('❌ Gagal mendapatkan detail preset Alight Motion.');
		}

		let out = `🎬 *ALIGHT MOTION PRESET DETAILS*\n\n`;
		out += `• *Judul* : ${res.title || res.name || '-'}\n`;
		out += `• *Author* : ${res.author || res.creator || '-'}\n`;
		out += `• *Ukuran* : ${res.size || '-'}\n`;
		if (res.download_url || res.url) out += `• *Link Unduh* : ${res.download_url || res.url}\n`;

		return reply(out);
	} catch (e) {
		console.error('[AMFIND ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['amfind <url_alight_link>'];
handler.tags = ['tools'];
handler.command = ['amfind', 'findam'];
handler.limit = true;
handler.register = true;

export default handler;
