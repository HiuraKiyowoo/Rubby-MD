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
import FormData from 'form-data';

let handler = async (m, { usedPrefix, command, reply }) => {
	const quoted = m.quoted ? m.quoted : m;
	const mime = quoted.mimetype || quoted.msg?.mimetype || '';

	if (!/image/i.test(mime)) {
		return reply(
			`📝 *OPTICAL CHARACTER RECOGNITION (OCR)*\n\n` +
			`Format: Balas (reply) gambar teks dengan *${usedPrefix + command}*\n` +
			`_Mengekstrak teks yang terdapat di dalam gambar._`
		);
	}

	reply(global.mess?.wait || '⏳ Mengekstrak teks dari gambar...');

	try {
		const buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download();
		if (!buffer || !Buffer.isBuffer(buffer)) {
			return reply('❌ Gagal mengunduh gambar.');
		}

		const form = new FormData();
		form.append('file', buffer, { filename: 'ocr.jpg', contentType: 'image/jpeg' });

		const apiUrl = global.API('kyzz', '/api/tools/ocr', {}, 'apikey');
		const { data } = await axios.post(apiUrl, form, {
			headers: { ...form.getHeaders() },
			timeout: 45000
		});

		const textResult = data.text || data.result || data.data;
		if (!textResult || (typeof textResult === 'string' && !textResult.trim())) {
			return reply('❌ Tidak ada teks yang berhasil dibaca dari gambar.');
		}

		let out = `📝 *HASIL OCR TEKS*\n\n`;
		out += typeof textResult === 'string' ? textResult.trim() : JSON.stringify(textResult, null, 2);

		return reply(out);
	} catch (e) {
		console.error('[OCR ERROR]', e.message);
		return reply(`❌ Gagal mengekstrak teks: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['ocr [reply foto]'];
handler.tags = ['tools'];
handler.command = ['ocr', 'imagetotext'];
handler.limit = true;
handler.register = true;

export default handler;
