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

let handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
	const client = sock || conn;
	if (!text) {
		return reply(
			`🎥 *RECORD WEBPAGE (VIDEO REKAM WEB)*\n\n` +
			`Format: *${usedPrefix + command} <url_website>*\n` +
			`Contoh: *${usedPrefix + command} https://google.com*`
		);
	}

	let targetUrl = text.trim();
	if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

	reply(global.mess?.wait || '⏳ Merekam tampilan website (proses membutuhkan waktu 15-30 detik)...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/record', { url: targetUrl, scroll: true }, 'apikey');
		const res = await axios.get(apiUrl, {
			responseType: 'arraybuffer',
			timeout: 60000
		});

		const contentType = res.headers['content-type'] || '';
		if (contentType.includes('application/json')) {
			const json = JSON.parse(Buffer.from(res.data).toString('utf-8'));
			if (json.video_url || json.url || json.result) {
				return await client.sendMessage(m.chat, {
					video: { url: json.video_url || json.url || json.result },
					caption: `🎥 Rekaman website: ${targetUrl}`
				}, { quoted: m });
			}
			return reply(`❌ Gagal: ${json.message || 'Tidak dapat merekam website.'}`);
		}

		await client.sendMessage(m.chat, {
			video: Buffer.from(res.data),
			caption: `🎥 Rekaman website: ${targetUrl}`
		}, { quoted: m });

	} catch (e) {
		console.error('[RECORD WEB ERROR]', e.message);
		return reply(`❌ Gagal merekam web: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['recordweb <url>'];
handler.tags = ['tools'];
handler.command = ['recordweb', 'record'];
handler.limit = true;
handler.register = true;

export default handler;
