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

const handler = async (m, { sock, conn, reply }) => {
	const client = sock || conn;
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ Mengambil info gempa terbaru dari BMKG...');

	try {
		const apiUrl = global.API('kyzz', '/api/news/gempa', {}, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !res.Tanggal) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Gagal mendapatkan data gempa BMKG.');
		}

		const caption =
			`🌍 *INFORMASI GEMPA BUMI TERKINI (BMKG)* 🚨\n\n` +
			`• 📅 *Waktu:* ${res.Tanggal} — ${res.Jam || '-'}\n` +
			`• 📊 *Magnitudo:* *${res.Magnitude || '-'}*\n` +
			`• 🌊 *Kedalaman:* ${res.Kedalaman || '-'}\n` +
			`• 📍 *Koordinat:* ${res.Coordinates || '-'}\n` +
			`• 🗺️ *Lokasi:* ${res.Wilayah || '-'}\n` +
			`• ⚠️ *Potensi:* *${res.Potensi || '-'}*\n` +
			(res.Dirasakan ? `• 👥 *Dirasakan:* ${res.Dirasakan}\n` : '') +
			`\n_Tetap waspada dan ikuti arahan resmi BMKG/BNPB._`;

		await global.react?.(client, m, '✅').catch(() => {});
		if (res.Shakemap) {
			return await client.sendMessage(m.chat, {
				image: { url: res.Shakemap },
				caption
			}, { quoted: m });
		}

		return reply(caption);
	} catch (e) {
		console.error('[GEMPA BMKG ERROR]', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal memuat info gempa: ${e.message}`);
	}
};

handler.help = ['gempa', 'infogempa'];
handler.tags = ['news'];
handler.category = 'news';
handler.command = ['gempa', 'infogempa', 'gempabmkg'];
handler.limit = true;
handler.register = true;

export default handler;
