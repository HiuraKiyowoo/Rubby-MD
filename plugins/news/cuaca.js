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
			`🌤️ *PRAKIRAAN CUACA BMKG* 🌦️\n\n` +
			`Format: *${usedPrefix + command} <nama kota>*` +
			`\nContoh: *${usedPrefix + command} Jakarta* atau *${usedPrefix + command} Bandung*`
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengecek prakiraan cuaca...');

	try {
		const apiUrl = global.API('kyzz', '/api/news/cuaca', { kota: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Cuaca untuk kota "*${text}*" tidak ditemukan.`);
		}

		let caption = `🌤️ *PRAKIRAAN CUACA: ${(data.kota || text).toUpperCase()}* 🌤️\n\n`;
		if (Array.isArray(res)) {
			res.slice(0, 5).forEach((c, idx) => {
				caption += `*${idx + 1}. ${c.jamCuaca || c.waktu || 'Waktu'}*\n`;
				caption += `   • Cuaca: ${c.cuaca || '-'}\n`;
				caption += `   • Suhu: ${c.temp || c.suhu || '-'}°C\n`;
				caption += `   • Kelembapan: ${c.humidity || c.kelembapan || '-'}%\n\n`;
			});
		} else if (typeof res === 'object') {
			caption += `• 🌡️ *Suhu:* ${res.temp || res.suhu || '-'}°C\n`;
			caption += `• ☁️ *Kondisi:* ${res.cuaca || res.weather || '-'}\n`;
			caption += `• 💧 *Kelembapan:* ${res.humidity || res.kelembapan || '-'}%\n`;
			caption += `• 💨 *Angin:* ${res.wind || res.angin || '-'}\n`;
		}

		await global.react?.(client, m, '✅').catch(() => {});
		return reply(caption.trim());
	} catch (e) {
		console.error('[CUACA ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal memuat data cuaca: ${e.message}`);
	}
};

handler.help = ['cuaca <kota>'];
handler.tags = ['news'];
handler.category = 'news';
handler.command = ['cuaca', 'infocuaca', 'weather'];
handler.limit = true;
handler.register = true;

export default handler;
