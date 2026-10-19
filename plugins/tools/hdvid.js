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

let handler = async (m, { sock, conn, usedPrefix, command, reply }) => {
	const client = sock || conn;
	const quoted = m.quoted ? m.quoted : m;
	const mime = quoted.mimetype || quoted.msg?.mimetype || '';

	if (!/video/i.test(mime)) {
		return reply(
			`🎬 *HD VIDEO ENHANCER*\n\n` +
			`Format: Balas (reply) video dengan *${usedPrefix + command}*\n` +
			`_Meningkatkan resolusi dan ketajaman video._`
		);
	}

	reply(global.mess?.wait || '⏳ Sedang meningkatkan kualitas video (membutuhkan waktu beberapa saat)...');

	try {
		const buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download();
		if (!buffer || !Buffer.isBuffer(buffer)) {
			return reply('❌ Gagal mengunduh video.');
		}

		const form = new FormData();
		form.append('file', buffer, { filename: 'input.mp4', contentType: 'video/mp4' });

		const apiUrl = global.API('kyzz', '/api/tools/hdvid', {}, 'apikey');
		const res = await axios.post(apiUrl, form, {
			headers: { ...form.getHeaders() },
			responseType: 'arraybuffer',
			timeout: 120000
		});

		const contentType = res.headers['content-type'] || '';
		if (contentType.includes('application/json')) {
			const json = JSON.parse(Buffer.from(res.data).toString('utf-8'));
			if (json.video_url || json.url || json.result) {
				return await client.sendMessage(m.chat, {
					video: { url: json.video_url || json.url || json.result },
					caption: '✨ Video berhasil ditingkatkan ke kualitas HD!'
				}, { quoted: m });
			}
			return reply(`❌ Gagal: ${json.message || 'Tidak dapat meningkatkan video.'}`);
		}

		await client.sendMessage(m.chat, {
			video: Buffer.from(res.data),
			caption: '✨ Video berhasil ditingkatkan ke kualitas HD!'
		}, { quoted: m });

	} catch (e) {
		console.error('[HDVID ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['hdvid [reply video]'];
handler.tags = ['tools'];
handler.command = ['hdvid', 'enhancevid'];
handler.limit = true;
handler.register = true;

export default handler;
