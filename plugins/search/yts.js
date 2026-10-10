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

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
	const client = sock || conn;
	if (!text) {
		return reply(`🎬 *YOUTUBE SEARCH*\n\nPencarian video YouTube.\n\nContoh:\n${usedPrefix + command} <judul_video>`);
	}

	if (global.mess?.wait) reply(global.mess.wait);

	try {
		const apiUrl = global.API('kyzz', '/api/search/yts', { q: text }, 'apikey');
		const res = await axios.get(apiUrl, { timeout: 15000 });
		const data = res.data;

		if (!data?.status || !Array.isArray(data?.results) || data.results.length === 0) {
			return reply(`❌ Video *"${text}"* tidak ditemukan.`);
		}

		const first = data.results[0];
		const firstThumb = first?.thumbnails && first.thumbnails[0] ? first.thumbnails[0].url : (first?.thumbnail || '');
		const title = first.title;
		const duration = typeof first.duration === 'object' ? (first.duration?.text || '-') : String(first.duration || '-');
		const channel = typeof first.channel === 'object' ? (first.channel?.name || '-') : String(first.channel || '-');
		const views = first.view_count ? Number(first.view_count).toLocaleString() : (first.views || 'N/A');
		const url = first.url || `https://youtu.be/${first.id}`;

		const captionText = `🎬 *YOUTUBE SEARCH*\n\n📌 *Judul:* ${title}\n⏱️ *Durasi:* ${duration}\n👤 *Channel:* ${channel}\n👁️ *Views:* ${views}\n🔗 *Link:* ${url}`;

		const buttonContent = {
			type: 'location_buttons',
			thumbnail: firstThumb,
			text: captionText,
			footer: `${global.botName || 'Rubby Multi Device'} • YouTube Downloader`,
			buttons: [
				{ displayText: '🎵 Lagu', id: `${usedPrefix}play ${url}` },
				{ displayText: '🎥 Video', id: `${usedPrefix}ytmp4 ${url}` }
			]
		};

		if (client && typeof client.sendButtons === 'function') {
			await client.sendButtons(m.chat, buttonContent, { quoted: m });
		} else {
			await reply(`${captionText}\n\n🎵 *MP3:* ${usedPrefix}play ${url}\n🎥 *MP4:* ${usedPrefix}ytmp4 ${url}`);
		}
	} catch (e) {
		console.error('[YTS ERROR]', e);
		return reply('❌ Terjadi kesalahan saat mengakses pencarian YouTube.');
	}
};

handler.help = ['yts <query>', 'ytsearch <query>'];
handler.tags = ['search'];
handler.command = ['yts', 'ytsearch'];
handler.limit = true;
handler.register = true;

export default handler;
