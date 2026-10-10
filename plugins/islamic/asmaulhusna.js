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

	let num = parseInt(text?.trim());
	if (isNaN(num) || num < 1 || num > 99) {
		num = Math.floor(Math.random() * 99) + 1;
	}

	try {
		await global.react?.(client, m, '🕒').catch(() => {});

		const apiUrl = `https://api.kyzzz.xyz/api/islamic/asmaul-husna?nomor=${num}&apikey=kyuuimp`;
		const { data } = await axios.get(apiUrl, { timeout: 15000 });

		if (!data?.status || !data?.result) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Gagal mengambil data Asmaul Husna.');
		}

		const res = data.result;
		const caption = `✨ *ASMAUL HUSNA* (${res.index}/99)\n\n` +
			`📖 *Arab:* ${res.arabic}\n` +
			`🔤 *Latin:* ${res.latin}\n` +
			`🇮🇩 *Arti (ID):* ${res.translation_id}\n` +
			`🇬🇧 *Arti (EN):* ${res.translation_en}\n\n` +
			`💡 *Tips:* Ketik \`${usedPrefix}${command} 1\` - \`${usedPrefix}${command} 99\` untuk nomor tertentu.`;

		await reply(caption);
		await global.react?.(client, m, '✅').catch(() => {});

	} catch (err) {
		console.error('[ASMAUL HUSNA ERROR]', err);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply('❌ Terjadi kesalahan saat mengambil Asmaul Husna!');
	}
};

handler.help = ['asmaulhusna <nomor 1-99>'];
handler.tags = ['islamic'];
handler.command = ['asmaulhusna', 'asma'];
handler.limit = true;

handler.register = true;

export default handler;
