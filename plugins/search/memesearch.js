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

const handler = async (m, { conn, sock, text, usedPrefix, command, reply }) => {
	const client = conn || sock || global.mainSock;
	if (!text) {
		return reply(`Masukkan kata kunci pencarian meme!\n\nContoh:\n${usedPrefix + command} Naruto\n${usedPrefix + command} Cat`);
	}

	reply('⏳ Sedang mencari meme...');

	try {
		const apiUrl = global.API('kyzz', '/api/search/meme-search', { q: text.trim(), limit: 5 }, 'apikey');
		const { data: res } = await axios.get(apiUrl, { timeout: 30000 });

		if (!res || !res.status || !Array.isArray(res.result) || res.result.length === 0) {
			return reply(`❌ Meme untuk *"${text}"* tidak ditemukan.`);
		}

		const videos = res.result.filter(item => item && item.video);
		if (videos.length === 0) {
			return reply(`❌ Tidak ada video meme yang ditemukan.`);
		}

		const album = await client.sendMessage(m.chat, {
			album: {
				expectedImageCount: 0,
				expectedVideoCount: videos.length
			}
		}, { quoted: m });

		for (const item of videos) {
			await client.sendMessage(m.chat, {
				video: { url: item.video },
				caption: `🎬 *${item.title || 'Meme'}*` + (item.duration ? `\n⏱️ Durasi: ${item.duration}s` : ''),
				albumParentKey: album.key
			});
		}
	} catch (e) {
		console.error('[MEMESEARCH ERROR]', e.message);
		reply(`❌ Terjadi kesalahan: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['memesearch <query>', 'carimeme <query>'];
handler.tags = ['search'];
handler.command = ['memesearch', 'carimeme', 'meme'];
handler.limit = true;
handler.register = true;

export default handler;
