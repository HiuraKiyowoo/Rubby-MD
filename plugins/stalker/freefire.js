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
			`🔥 *FREE FIRE PLAYER STALKER* 🎮\n\n` +
			`Format: *${usedPrefix + command} <Account ID FF>*` +
			`\nContoh: *${usedPrefix + command} 123456789*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengambil info akun Free Fire...');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/freefire', { id: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Akun Free Fire ID "*${text}*" tidak ditemukan.`);
		}

		let out = `🔥 *FREE FIRE PLAYER PROFILE* 🎮\n\n`;
		out += `• 👤 *Nickname:* ${res.nickname || res.username || res.name || '-'}\n`;
		out += `• 🆔 *Account ID:* ${res.id || text}\n`;
		if (res.level) out += `• ⭐ *Level:* ${res.level}\n`;
		if (res.like || res.likes) out += `• ❤️ *Likes:* ${res.like || res.likes}\n`;
		if (res.region) out += `• 🌐 *Region:* ${res.region}\n`;
		if (res.bio || res.signature) out += `• 📝 *Bio:* ${res.bio || res.signature}\n`;

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(out.trim());
	} catch (e) {
		console.error('[FF STALK ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal stalker Free Fire: ${e.message}`);
	}
};

handler.help = ['freefire <id>', 'ffstalk <id>'];
handler.tags = ['stalker'];
handler.command = ['freefire', 'ffstalk', 'stalkff'];
handler.limit = true;
handler.register = true;

export default handler;
