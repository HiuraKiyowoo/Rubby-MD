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

const handler = async (m, { text, usedPrefix, command, reply, sock, conn }) => {
	const client = sock || conn;
	if (!text) {
		return reply(
			`🔫 *BLOOD STRIKE PLAYER STALKER* 🎯\n\n` +
			`Format: *${usedPrefix + command} <User ID>*` +
			`\nContoh: *${usedPrefix + command} 123456789*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mencari profil Blood Strike...');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/bloodstrike', { id: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Player Blood Strike ID "*${text}*" tidak ditemukan.`);
		}

		let out = `🔫 *PROFIL BLOOD STRIKE PLAYER* 🎯\n\n`;
		out += `• 👤 *Nickname:* ${res.username || res.nickname || res.name || '-'}\n`;
		out += `• 🆔 *User ID:* ${res.id || text}\n`;
		if (res.level) out += `• ⭐ *Level:* ${res.level}\n`;
		if (res.rank) out += `• 🏆 *Rank:* ${res.rank}\n`;
		if (res.server) out += `• 🌐 *Server:* ${res.server}\n`;

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(out.trim());
	} catch (e) {
		console.error('[BLOOD STRIKE STALK ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal stalker Blood Strike: ${e.message}`);
	}
};

handler.help = ['bloodstrike <id>'];
handler.tags = ['stalker'];
handler.command = ['bloodstrike', 'stalkbloodstrike'];
handler.limit = true;
handler.register = true;

export default handler;
