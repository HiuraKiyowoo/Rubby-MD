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
			`🔊 *MYINSTANTS SOUND EFFECT SEARCH* 🎵\n\n` +
			`Format: *${usedPrefix + command} <nama sound>*` +
			`\nContoh: *${usedPrefix + command} bruh* atau *${usedPrefix + command} fbi open up*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});

	try {
		const apiUrl = global.API('kyzz', '/api/search/myinstants', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const list = data.result || data.data || [];
		if (!Array.isArray(list) || list.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Sound "*${text}*" tidak ditemukan di Myinstants.`);
		}

		const first = list[0];
		if (first.mp3 || first.audio || first.sound) {
			const audioUrl = first.mp3 || first.audio || first.sound;
			await client.sendMessage(m.chat, {
				audio: { url: audioUrl },
				mimetype: 'audio/mp4',
				ptt: true
			}, { quoted: m });
			await global.react?.(client, m, '✅').catch(() => {});
			return;
		}

		let out = `🔊 *HASIL SOUND MYINSTANTS (${text.toUpperCase()})* 🎵\n\n`;
		list.slice(0, 10).forEach((s, idx) => {
			out += `*${idx + 1}. ${s.title || s.name}*\n   🔗 ${s.url || s.link}\n\n`;
		});

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(out.trim());
	} catch (e) {
		console.error('[MYINSTANTS ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal mencari sound: ${e.message}`);
	}
};

handler.help = ['myinstants <sound>'];
handler.tags = ['search'];
handler.command = ['myinstants', 'soundinstant'];
handler.limit = true;
handler.register = true;

export default handler;
