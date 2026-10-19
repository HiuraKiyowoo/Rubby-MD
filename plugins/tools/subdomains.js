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
	if (!text) {
		return reply(
			`🔍 *SUBDOMAIN FINDER*\n\n` +
			`Format: *${usedPrefix + command} <domain>*\n` +
			`Contoh: *${usedPrefix + command} github.com*`
		);
	}

	const domain = text.trim().replace(/^https?:\/\//i, '').split('/')[0];
	reply(global.mess?.wait || '⏳ Mencari subdomain...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/subdomains', { domain }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const list = data.subdomains || data.result || [];
		if (!list.length) {
			return reply(`❌ Tidak ditemukan subdomain untuk domain *${domain}*.`);
		}

		let out = `🔍 *SUBDOMAINS FOR ${domain.toUpperCase()}*\n`;
		out += `Total ditemukan: *${data.total || list.length} subdomain*\n\n`;

		list.slice(0, 40).forEach((sub, idx) => {
			out += `${idx + 1}. \`${sub}\`\n`;
		});

		if (list.length > 40) {
			out += `\n_...dan ${list.length - 40} subdomain lainnya._`;
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[SUBDOMAINS ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['subdomains <domain>'];
handler.tags = ['tools'];
handler.command = ['subdomain', 'subdomains'];
handler.limit = true;
handler.register = true;

export default handler;
