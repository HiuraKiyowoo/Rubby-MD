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

const handler = async (m, { sock, conn, text, reply, usedPrefix, command }) => {
	const client = sock || conn || global.mainSock || global.conn;

	if (!text) {
		return reply(
			`🎵 *ᴀᴘᴘʟᴇ ᴍᴜsɪᴄ sᴇᴀʀᴄʜ*\n\n` +
			`• 📌 *Contoh:* \`${usedPrefix + command} a little piece of heaven\``
		);
	}

	await global.react(client, m, 'loading');

	try {
		const apiUrl = global.API(
			'kyzz',
			'/api/music/apple-search',
			{
				query: text
			},
			'apikey'
		);

		const { data } = await axios.get(apiUrl, {
			timeout: 30000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
			}
		});

		if (!data || !data.status || !Array.isArray(data.result) || data.result.length === 0) {
			await global.react(client, m, 'error');
			return reply(`❌ Lagu "${text}" tidak ditemukan di Apple Music.`);
		}

		const results = data.result;
		const first = results[0];

		let textOut = `🎵 *APPLE MUSIC SEARCH RESULTS* 🍏\n`;
		textOut += `🔍 *Query:* ${data.query || text}\n`;
		textOut += `📊 *Total Ditemukan:* ${results.length} lagu\n`;
		textOut += `────────────────────────────\n\n`;

		results.forEach((item, idx) => {
			textOut += `*${idx + 1}. ${item.title}*\n`;
			textOut += `   👤 *Artis:* ${item.artist || '-'}\n`;
			if (item.explicit) textOut += `   🔞 *Explicit:* Ya\n`;
			if (item.url) textOut += `   🔗 *Link:* ${item.url}\n\n`;
		});

		textOut += `꒰ © Rubby Multi Device • Apple Music ꒱`;

		if (first && first.cover) {
			await client.sendMessage(
				m.chat,
				{
					image: { url: first.cover },
					caption: textOut
				},
				{ quoted: m }
			);
		} else {
			await reply(textOut);
		}

		await global.react(client, m, 'success');
	} catch (e) {
		console.error('[APPLE MUSIC ERROR]:', e.response?.data || e);
		await global.react(client, m, 'error');
		return reply('❌ Gagal melakukan pencarian di Apple Music.');
	}
};

handler.help = ['applesearch <judul lagu>', 'applemusic <judul lagu>'];
handler.tags = ['search'];
handler.command = ['applesearch', 'applemusic', 'applesearchmusic'];
handler.limit = true;
handler.register = true;

export default handler;
