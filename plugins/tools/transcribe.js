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
import FormData from 'form-data';

const handler = async (m, { usedPrefix, command, reply, sock, conn }) => {
	const client = sock || conn;
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || '';

	if (!/audio|video/.test(mime)) {
		return reply(
			`🎙️ *TRANSCRIBE AUDIO / SUARA KE TEKS* 📝\n\n` +
			`Kirim VN / Audio atau balas audio dengan perintah: *${usedPrefix + command}*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Menerjemahkan rekaman suara ke teks...');

	try {
		const buffer = await q.download?.();
		if (!buffer) return reply('❌ Gagal mengunduh audio.');

		const form = new FormData();
		form.append('audio', buffer, { filename: 'audio.mp3', contentType: mime });

		const apiUrl = `https://api.kyzzz.xyz/api/tools/transcribe?apikey=kyuuimp`;
		const { data } = await axios.post(apiUrl, form, {
			headers: form.getHeaders(),
			timeout: 60000
		});

		const res = data.result || data.text || data.data || data;
		const transcriptText = typeof res === 'string' ? res : (res.text || res.transcript || JSON.stringify(res));

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(`📝 *HASIL TRANSKRIP SUARA:*\n\n"${transcriptText}"`);
	} catch (e) {
		console.error('[TRANSCRIBE ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal mentranskrip audio: ${e.message}`);
	}
};

handler.help = ['transcribe (reply audio)'];
handler.tags = ['tools'];
handler.command = ['transcribe', 'voicetotext', 'suaraketeks'];
handler.limit = true;
handler.register = true;

export default handler;
