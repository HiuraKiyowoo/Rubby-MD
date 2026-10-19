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
			`🌐 *WHOIS DOMAIN LOOKUP*\n\n` +
			`Format: *${usedPrefix + command} <nama_domain>*\n` +
			`Contoh: *${usedPrefix + command} google.com*`
		);
	}

	const domain = text.trim().replace(/^https?:\/\//i, '').split('/')[0];
	reply(global.mess?.wait || '⏳ Mengambil informasi whois...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/whois', { domain }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const res = data.result || data.data || data;
		if (!res || !res.domain) {
			return reply('❌ Informasi domain tidak ditemukan.');
		}

		let out = `🌐 *WHOIS DOMAIN INFORMATION*\n\n`;
		out += `• *Domain* : ${res.domain || res.queried_domain}\n`;
		out += `• *Registrar* : ${res.registrar || '-'}\n`;
		out += `• *Tanggal Dibuat* : ${res.created || '-'}\n`;
		out += `• *Tanggal Kedaluwarsa* : ${res.expires || '-'}\n`;
		out += `• *Update Terakhir* : ${res.updated || '-'}\n`;
		out += `• *Status* : ${Array.isArray(res.status) ? res.status.slice(0, 2).join(', ') : (res.status || '-')}\n`;

		const ns = res.nameservers || res.name_servers;
		if (Array.isArray(ns) && ns.length > 0) {
			out += `• *Nameservers* :\n  ${ns.slice(0, 4).join('\n  ')}\n`;
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[WHOIS ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['whois <domain>'];
handler.tags = ['tools'];
handler.command = ['whois', 'whoislookup'];
handler.limit = true;
handler.register = true;

export default handler;
