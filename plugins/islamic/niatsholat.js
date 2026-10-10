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

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
	const client = sock || conn;
	let waktu = text?.trim().toLowerCase() || 'subuh';

	if (waktu === 'isya' || waktu === "isya'") waktu = 'isha';

	try {
		await global.react?.(client, m, '🕒').catch(() => {});

		const apiUrl = `global.API('kyzz', '/api/islamic/niat-sholat', { waktu: waktu }, 'apikey')`;
		const { data } = await axios.get(apiUrl, { timeout: 15000 });

		if (!data?.status || !data?.result) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Niat sholat untuk waktu *${waktu}* tidak ditemukan.\nPilihan waktu: subuh, dzuhur, ashar, maghrib, isha.`);
		}

		const res = data.result;
		const caption = `🕌 *NIAT SHOLAT ${res.waktu.toUpperCase()}*\n\n` +
			`📖 *Arab:*\n${res.arabic}\n\n` +
			`🔤 *Latin:*\n${res.latin}\n\n` +
			`🇮🇩 *Terjemahan:*\n${res.translation_id}\n\n` +
			`💡 *Pilihan Waktu:* subuh, dzuhur, ashar, maghrib, isha`;

		await reply(caption);
		await global.react?.(client, m, '✅').catch(() => {});

	} catch (err) {
		console.error('[NIAT SHOLAT ERROR]', err);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply('❌ Terjadi kesalahan saat mengambil Niat Sholat!');
	}
};

handler.help = ['niatsholat <waktu>'];
handler.tags = ['islamic'];
handler.command = ['niatsholat', 'niatsolat'];
handler.limit = true;

handler.register = true;

export default handler;
