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

let handler = async (m, { text, usedPrefix, command, reply }) => {
	if (!text || !text.includes('|')) {
		return reply(
			`📱 *PERBANDINGAN SPESIFIKASI HP*\n\n` +
			`Format: *${usedPrefix + command} <HP 1> | <HP 2>*\n` +
			`Contoh: *${usedPrefix + command} Samsung Galaxy S24 | iPhone 15*`
		);
	}

	const [hp1, hp2] = text.split('|').map(v => v.trim());
	if (!hp1 || !hp2) {
		return reply(`❌ Masukkan nama kedua perangkat yang ingin dibandingkan dipisahkan dengan tanda '|'!`);
	}

	reply(global.mess?.wait || `⏳ Membandingkan spesifikasi ${hp1} vs ${hp2}...`);

	try {
		const apiUrl = global.API('kyzz', '/api/tools/compare-device', { hp1, hp2 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const p1 = data.phone1 || {};
		const p2 = data.phone2 || {};
		const sections = data.sections || [];

		if (!p1.title || !p2.title) {
			return reply('❌ Gagal menemukan data spesifikasi salah satu atau kedua perangkat.');
		}

		let out = `📱 *PERBANDINGAN GADGET*\n`;
		out += `1️⃣ *${p1.title}*\n`;
		out += `2️⃣ *${p2.title}*\n\n`;

		sections.slice(0, 8).forEach(sec => {
			out += `📌 *${(sec.section_title || 'Spesifikasi').toUpperCase()}*\n`;
			(sec.items || []).slice(0, 5).forEach(item => {
				out += `• *${item.name || item.title}*:\n`;
				out += `   1️⃣ ${item.val1 || item.phone1 || '-'}\n`;
				out += `   2️⃣ ${item.val2 || item.phone2 || '-'}\n`;
			});
			out += '\n';
		});

		return reply(out.trim());
	} catch (e) {
		console.error('[COMPARE DEVICE ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['comparehp <hp1> | <hp2>'];
handler.tags = ['tools'];
handler.command = ['comparehp', 'komparasi'];
handler.limit = true;
handler.register = true;

export default handler;
