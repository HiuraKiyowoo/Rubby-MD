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
		return reply(`Masukkan kata kunci pencarian prompt AI!\n\nContoh:\n${usedPrefix + command} Naruto\n${usedPrefix + command} Cyberpunk`);
	}

	reply('⏳ Sedang mencari prompt AI...');

	try {
		const apiUrl = global.API('kyzz', '/api/search/prompt-search', { q: text.trim() }, 'apikey');
		const { data: res } = await axios.get(apiUrl, { timeout: 30000 });

		if (!res || !res.status || !Array.isArray(res.hasil) || res.hasil.length === 0) {
			return reply(`❌ Prompt untuk *"${text}"* tidak ditemukan.`);
		}

		const list = res.hasil.slice(0, 5);
		let caption = `🔍 *HASIL PENCARIAN PROMPT AI: ${text}*\n\n`;

		list.forEach((item, index) => {
			caption += `*${index + 1}. ${item.judul || 'AI Prompt'}*\n`;
			caption += ` ├ 🤖 *Model:* ${item.model || '-'} (${item.versi || '-'})\n`;
			caption += ` ├ 🏷️ *Kategori:* ${item.kategori || '-'}\n`;
			caption += ` ├ 📝 *Prompt:*\n\`\`\`${item.prompt}\`\`\`\n\n`;
		});

		caption += `© ${global.botName || 'Rubby Multi Device'}`;

		const firstImage = list.find(i => i.gambar)?.gambar;
		if (firstImage) {
			await client.sendMessage(m.chat, {
				image: { url: firstImage },
				caption: caption.trim()
			}, { quoted: m });
		} else {
			await reply(caption.trim());
		}
	} catch (e) {
		console.error('[PROMPT SEARCH ERROR]', e.message);
		reply(`❌ Terjadi kesalahan: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['promptsearch <query>', 'cariprompt <query>'];
handler.tags = ['search'];
handler.command = ['promptsearch', 'cariprompt', 'searchprompt'];
handler.limit = true;
handler.register = true;

export default handler;
