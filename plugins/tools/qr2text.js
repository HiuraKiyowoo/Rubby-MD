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
import { uploadMedia, pomf } from '../../src/lib/Uploader.js';

let handler = async (m, { text, usedPrefix, command, reply }) => {
	let qrUrl = text ? text.trim() : '';

	const quoted = m.quoted ? m.quoted : m;
	const mime = quoted.mimetype || quoted.msg?.mimetype || '';

	if (!qrUrl && /image/i.test(mime)) {
		reply(global.mess?.wait || '⏳ Mengunggah gambar QR...');
		try {
			const buf = typeof quoted.download === 'function' ? await quoted.download() : await m.download();
			if (buf) {
				qrUrl = await uploadMedia(buf).catch(() => pomf(buf));
			}
		} catch (err) {
			console.error('[QR2TEXT UPLOAD ERROR]', err);
		}
	}

	if (!qrUrl) {
		return reply(
			`📷 *QR CODE TO TEXT*\n\n` +
			`Format:\n` +
			`• Reply gambar QR Code dengan *${usedPrefix + command}*\n` +
			`• *${usedPrefix + command} <url_gambar_qr>*\n\n` +
			`Contoh: *${usedPrefix + command} https://example.com/qr.png*`
		);
	}

	reply(global.mess?.wait || '⏳ Membaca QR code...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/qr2text', { url: qrUrl }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const resultText = data.text || data.result;
		if (!resultText) {
			return reply('❌ Tidak ada teks / QR code yang terdeteksi pada gambar.');
		}

		let out = `📷 *HASIL BACA QR CODE*\n\n`;
		out += `\`\`\`${resultText}\`\`\``;

		return reply(out);
	} catch (e) {
		console.error('[QR2TEXT ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['qr2text [reply foto / url]'];
handler.tags = ['tools'];
handler.command = ['qr2text', 'readqr'];
handler.limit = true;
handler.register = true;

export default handler;
