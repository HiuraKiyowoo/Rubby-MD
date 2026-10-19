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
			`🐙 *GITHUB USER STALKER* 💻\n\n` +
			`Format: *${usedPrefix + command} <username github>*` +
			`\nContoh: *${usedPrefix + command} torvalds*`
		);
	}

	const username = text.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '');
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengambil profil GitHub...');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/github', { username }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Akun GitHub "*${username}*" tidak ditemukan.`);
		}

		let out = `🐙 *GITHUB PROFILE: ${(res.login || username).toUpperCase()}* 💻\n\n`;
		out += `• 👤 *Nama:* ${res.name || '-'}\n`;
		out += `• 🏷️ *Bio:* ${res.bio || '-'}\n`;
		out += `• 🏢 *Perusahaan:* ${res.company || '-'}\n`;
		out += `• 📍 *Lokasi:* ${res.location || '-'}\n`;
		out += `• 📦 *Public Repos:* ${res.public_repos || res.repos || 0}\n`;
		out += `• 👥 *Followers:* ${res.followers || 0} | *Following:* ${res.following || 0}\n`;
		out += `• 📅 *Bergabung:* ${res.created_at || '-'}\n`;
		out += `• 🔗 *URL:* ${res.html_url || `https://github.com/${username}`}`;

		await global.react?.(client, m, '✅').catch(() => {});

		if (res.avatar_url) {
			return await client.sendMessage(m.chat, {
				image: { url: res.avatar_url },
				caption: out.trim()
			}, { quoted: m });
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[GITHUB STALK ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal stalker GitHub: ${e.message}`);
	}
};

handler.help = ['githubstalk <username>'];
handler.tags = ['stalker'];
handler.command = ['githubstalk', 'ghstalk'];
handler.limit = true;
handler.register = true;

export default handler;
