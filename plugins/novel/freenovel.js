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

const handler = async (m, { text, usedPrefix, command, reply }) => {
	if (!text) {
		return reply(
			`📚 *FREENOVEL ONLINE EXPLORER* 📖\n\n` +
			`Format: *${usedPrefix + command} <judul novel>*` +
			`\nContoh: *${usedPrefix + command} martial peak*`
		);
	}

	reply('⏳ Mencari di FreeNovel...');

	try {
		const apiUrl = global.API('kyzz', '/api/novel/freenovel/search', { query: text.trim(), page: 1, limit: 7 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || data.novels || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Novel "*${text}*" tidak ditemukan di FreeNovel.`);
		}

		let out = `📚 *HASIL FREENOVEL: ${text.toUpperCase()}* 📖\n\n`;
		list.slice(0, 7).forEach((n, idx) => {
			out += `*${idx + 1}. ${n.title || n.name}*\n`;
			if (n.book_id || n.id) out += `   🆔 ID: \`\`\`${n.book_id || n.id}\`\`\`\n`;
			if (n.author) out += `   👤 Author: ${n.author}\n\n`;
		});

		return reply(out.trim());
	} catch (e) {
		console.error('[FREENOVEL ERROR]', e.message);
		return reply(`❌ Gagal: ${e.message}`);
	}
};

handler.help = ['freenovel <judul>'];
handler.tags = ['novel'];
handler.category = 'novel';
handler.command = ['freenovel'];
handler.limit = true;
handler.register = true;

export default handler;
