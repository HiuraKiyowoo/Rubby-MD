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

let handler = async (m, { usedPrefix, command, reply }) => {
	const quoted = m.quoted ? m.quoted : m;
	const mime = quoted.mimetype || quoted.msg?.mimetype || '';

	if (!/image/i.test(mime)) {
		return reply(
			`🔞 *CHECK NSFW CONTENT*\n\n` +
			`Format: Balas (reply) gambar dengan *${usedPrefix + command}*\n` +
			`_Menganalisis probabilitas konten dewasa/NSFW pada gambar._`
		);
	}

	reply(global.mess?.wait || '⏳ Menganalisis konten gambar...');

	try {
		const buffer = typeof quoted.download === 'function' ? await quoted.download() : await m.download();
		if (!buffer || !Buffer.isBuffer(buffer)) {
			return reply('❌ Gagal mengunduh gambar.');
		}

		const form = new FormData();
		form.append('file', buffer, { filename: 'input.jpg', contentType: 'image/jpeg' });

		const apiUrl = global.API('kyzz', '/api/tools/cheknsfw', {}, 'apikey');
		const { data } = await axios.post(apiUrl, form, {
			headers: { ...form.getHeaders() },
			timeout: 35000
		});

		const res = data.result || data.data || data;
		let out = `🔞 *HASIL ANALISIS NSFW*\n\n`;
		out += `• *Status* : ${res.is_nsfw || res.nsfw ? '⚠️ Terindikasi NSFW / 18+' : '✅ Aman (SFW)'}\n`;
		if (res.scores || res.predictions) {
			const scores = res.scores || res.predictions;
			out += `\n📊 *Probabilitas Kategori*:\n`;
			for (const [k, v] of Object.entries(scores)) {
				const val = typeof v === 'number' ? `${(v * 100).toFixed(1)}%` : v;
				out += `  • ${k} : *${val}*\n`;
			}
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[CHECK NSFW ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['cheknsfw [reply foto]'];
handler.tags = ['tools'];
handler.command = ['cheknsfw', 'ceknsfw'];
handler.limit = true;
handler.register = true;

export default handler;
