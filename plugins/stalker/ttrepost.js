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
			`🔁 *TIKTOK REPOST VIEWER* 📱\n\n` +
			`Format: *${usedPrefix + command} <username tiktok>*` +
			`\nContoh: *${usedPrefix + command} khaby.lame*`
		);
	}

	const username = text.trim().replace(/^@/, '');
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengambil daftar repost TikTok...');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/tiktok-repost', { username, semua: false }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 30000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Tidak ada video repost ditemukan untuk @${username}.`);
		}

		let out = `🔁 *DAFTAR VIDEO REPOST @${username.toUpperCase()}* 📱\n\n`;
		list.slice(0, 6).forEach((v, idx) => {
			out += `*${idx + 1}. ${v.title || v.desc || 'Video Repost'}*\n`;
			if (v.author) out += `   👤 Asli: @${v.author}\n`;
			if (v.url || v.link) out += `   🔗 Link: ${v.url || v.link}\n\n`;
		});

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(out.trim());
	} catch (e) {
		console.error('[TIKTOK REPOST ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal mengambil repost TikTok: ${e.message}`);
	}
};

handler.help = ['ttrepost <username>'];
handler.tags = ['stalker'];
handler.command = ['ttrepost', 'tiktokrepost'];
handler.limit = true;
handler.register = true;

export default handler;
