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
import { uploadPomf } from '../../src/lib/uploadImage.js';

const handler = async (m, { text, usedPrefix, command, reply, sock, conn }) => {
	const client = sock || conn;
	let mediaUrl = text?.trim();

	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || '';

	if (!mediaUrl && /image/.test(mime)) {
		reply('⏳ Mengunggah gambar untuk reverse search...');
		const buffer = await q.download?.();
		if (buffer) {
			mediaUrl = await uploadPomf(buffer).catch(() => null);
		}
	}

	if (!mediaUrl || !mediaUrl.startsWith('http')) {
		return reply(
			`🖼️ *REVERSE IMAGE SEARCH* 🔍\n\n` +
			`Kirim/balas foto dengan perintah: *${usedPrefix + command}*\n` +
			`Atau sertakan url: *${usedPrefix + command} <url_gambar>*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});

	try {
		const apiUrl = global.API('kyzz', '/api/search/reverse-image', { url: mediaUrl, page: 1 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Tidak ditemukan kecocokan gambar yang serupa.');
		}

		let out = `🔍 *HASIL REVERSE IMAGE SEARCH* 🖼️\n\n`;
		list.slice(0, 6).forEach((item, idx) => {
			out += `*${idx + 1}. ${item.title || 'Gambar Ditemukan'}*\n`;
			if (item.source || item.site) out += `   🌐 Sumber: ${item.source || item.site}\n`;
			if (item.url || item.link) out += `   🔗 Link: ${item.url || item.link}\n\n`;
		});

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(out.trim());
	} catch (e) {
		console.error('[REVERSE IMAGE ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal reverse search gambar: ${e.message}`);
	}
};

handler.help = ['reverseimage <url/reply foto>'];
handler.tags = ['search'];
handler.command = ['reverseimage', 'carigambar', 'imagesearch'];
handler.limit = true;
handler.register = true;

export default handler;
