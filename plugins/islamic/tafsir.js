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
	const query = text?.trim();

	if (!query) {
		return reply(`Gunakan format:\n*${usedPrefix}${command} <kata kunci>*\n\nContoh:\n*${usedPrefix}${command} sabar*`);
	}

	try {
		await global.react?.(client, m, '🕒').catch(() => {});

		const apiUrl = `global.API('kyzz', '/api/islamic/tafsir', { query: query }, 'apikey')`;
		const { data } = await axios.get(apiUrl, { timeout: 15000 });

		if (!data?.status || !Array.isArray(data?.result) || data.result.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Tafsir dengan kata kunci *"${query}"* tidak ditemukan.`);
		}

		let txt = `📖 *TAFSIR AL-QUR'AN*\n🔍 *Kata Kunci:* ${query}\n📊 *Total:* ${data.count || data.result.length} hasil\n\n`;

		data.result.forEach((item, i) => {
			let t = item.tafsir || '';
			if (t.length > 700) {
				t = t.substring(0, 700) + '...';
			}
			txt += `*${i + 1}. Surah ${item.surah} (Ayat ${item.nomorAyat})*\n${t}\n\n───────────────────\n\n`;
		});

		await reply(txt.trim());
		await global.react?.(client, m, '✅').catch(() => {});

	} catch (err) {
		console.error('[TAFSIR ERROR]', err);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply('❌ Terjadi kesalahan saat mencari Tafsir!');
	}
};

handler.help = ['tafsir <kata kunci>'];
handler.tags = ['islamic'];
handler.command = ['tafsir'];
handler.limit = true;

handler.register = true;

export default handler;
