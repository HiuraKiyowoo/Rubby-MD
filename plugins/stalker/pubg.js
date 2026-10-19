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
			`🪖 *PUBG MOBILE PLAYER STALKER* 🍗\n\n` +
			`Format: *${usedPrefix + command} <Player ID>*` +
			`\nContoh: *${usedPrefix + command} 5123456789*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengambil profil PUBG Mobile...');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/pubg', { id: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Akun PUBG ID "*${text}*" tidak ditemukan.`);
		}

		let out = `🪖 *PUBG MOBILE PLAYER PROFILE* 🍗\n\n`;
		out += `• 👤 *Nickname:* ${res.nickname || res.username || res.name || '-'}\n`;
		out += `• 🆔 *Player ID:* ${res.id || text}\n`;
		if (res.level) out += `• ⭐ *Level:* ${res.level}\n`;
		if (res.tier || res.rank) out += `• 🏆 *Tier/Rank:* ${res.tier || res.rank}\n`;

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(out.trim());
	} catch (e) {
		console.error('[PUBG STALK ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal stalker PUBG: ${e.message}`);
	}
};

handler.help = ['pubg <id>'];
handler.tags = ['stalker'];
handler.command = ['pubg', 'pubgstalk', 'stalkpubg'];
handler.limit = true;
handler.register = true;

export default handler;
