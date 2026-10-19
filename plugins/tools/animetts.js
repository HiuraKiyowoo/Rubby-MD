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
			`🎙️ *ANIME VOICE TTS GENERATOR* 🌸\n\n` +
			`Format: *${usedPrefix + command} <teks>*` +
			`\nContoh: *${usedPrefix + command} Konnichiwa, watashi wa Angela desu!*\n\n` +
			`_Bisa pilih karakter dengan format: ${usedPrefix + command} teks | karakter_`
		);
	}

	const parts = text.split('|');
	const promptText = parts[0].trim();
	const char = parts[1] ? parts[1].trim() : 'nahida';

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengubah teks menjadi suara anime...');

	try {
		const apiUrl = global.API('kyzz', '/api/audio/anime-tts', { text: promptText, character: char }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 45000 });

		const audioUrl = data.result?.url || data.url || data.audio;
		if (!audioUrl) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Gagal menghasilkan audio TTS Anime.');
		}

		await global.react?.(client, m, '✅').catch(() => {});
		return await client.sendMessage(m.chat, {
			audio: { url: audioUrl },
			mimetype: 'audio/mp4',
			ptt: true
		}, { quoted: m });
	} catch (e) {
		console.error('[ANIME TTS ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal Anime TTS: ${e.message}`);
	}
};

handler.help = ['animetts <teks>'];
handler.tags = ['tools'];
handler.command = ['animetts', 'ttsanime'];
handler.limit = true;
handler.register = true;

export default handler;
