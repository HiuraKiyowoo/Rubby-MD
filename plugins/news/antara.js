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

const handler = async (m, { text, args, usedPrefix, command, reply, sock, conn }) => {
	const client = sock || conn;
	const kategori = (args[0] || 'terkini').toLowerCase();
	await global.react?.(client, m, '⏳').catch(() => {});

	try {
		const apiUrl = global.API('kyzz', '/api/news/antara', { kategori, limit: 7 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Belum ada berita Antara terbaru yang ditemukan.');
		}

		let caption = `📰 *BERITA TERKINI — LKBN ANTARA NEWS* 🇮🇩\n`;
		caption += `Kategori: *${kategori.toUpperCase()}*\n\n`;

		list.slice(0, 7).forEach((item, idx) => {
			caption += `*${idx + 1}. ${item.title || item.judul}*\n`;
			if (item.waktu || item.date) caption += `   🕒 ${item.waktu || item.date}\n`;
			if (item.desc || item.description) caption += `   💬 ${(item.desc || item.description).slice(0, 150)}...\n`;
			if (item.url || item.link) caption += `   🔗 ${item.url || item.link}\n\n`;
		});

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(caption.trim());
	} catch (e) {
		console.error('[ANTARA NEWS ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal mengambil berita Antara: ${e.message}`);
	}
};

handler.help = ['antara [kategori]'];
handler.tags = ['news'];
handler.category = 'news';
handler.command = ['antara', 'antaranews', 'beritaantara'];
handler.limit = true;
handler.register = true;

export default handler;
