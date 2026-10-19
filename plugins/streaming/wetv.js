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
			`📺 *WETV SERIES & DRAMA EXPLORER* 🍿\n\n` +
			`Format: *${usedPrefix + command} <judul drama>*` +
			`\nContoh: *${usedPrefix + command} layangan putus*`
		);
	}

	reply('⏳ Mencari konten di WeTV...');

	try {
		const apiUrl = global.API('kyzz', '/api/streaming/wetv/search', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			return reply(`❌ Konten "*${text}*" tidak ditemukan di WeTV.`);
		}

		let out = `📺 *HASIL PENCARIAN WETV: ${text.toUpperCase()}* 🍿\n\n`;
		list.slice(0, 7).forEach((item, idx) => {
			out += `*${idx + 1}. ${item.title || item.name}*\n`;
			if (item.cid || item.id) out += `   🆔 CID: \`\`\`${item.cid || item.id}\`\`\`\n`;
			if (item.desc) out += `   📝 ${item.desc.slice(0, 100)}...\n\n`;
		});

		return reply(out.trim());
	} catch (e) {
		console.error('[WETV SEARCH ERROR]', e.message);
		return reply(`❌ Gagal mencari di WeTV: ${e.message}`);
	}
};

handler.help = ['wetv <judul>'];
handler.tags = ['streaming'];
handler.category = 'streaming';
handler.command = ['wetv'];
handler.limit = true;
handler.register = true;

export default handler;
