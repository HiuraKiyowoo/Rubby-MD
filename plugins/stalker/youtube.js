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
	if (!text) {
		return reply(
			`📺 *YOUTUBE CHANNEL STALKER* 🎀✨\n\n` +
			`Format: \`${usedPrefix + command} <username / handle / channel name>\`\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} mrbeast*\n` +
			`• *${usedPrefix + command} @windahbasudara*`
		);
	}

	const cleanTarget = text.trim().replace(/^https?:\/\/(www\.)?youtube\.com\//i, '').replace(/^@/, '');
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ *Sedang mencari data channel YouTube...*');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/youtube', { username: cleanTarget }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Channel YouTube *${cleanTarget}* tidak ditemukan.`);
		}

		const caption =
			`📺 *YOUTUBE CHANNEL STALKER* 🎀✨\n\n` +
			`• 🏷️ *Channel Title:* *${data.channelTitle || '-'}*\n` +
			`• 🔖 *Handle:* \`${data.handle || `@${cleanTarget}`}\`\n` +
			`• 👥 *Subscribers:* *${data.subscribers || '-'}*\n` +
			`• 🎬 *Total Video:* \`${data.videos || '-'}\`\n` +
			`• 🆔 *Channel ID:* \`${data.channelId || '-'}\`\n` +
			`• 🔗 *Channel Link:* https://www.youtube.com/${data.handle || cleanTarget}\n\n` +
			(data.description ? `📝 *Deskripsi:*\n_${data.description.slice(0, 300)}_\n\n` : '') +
			`━━━━━━━━━━━━━━━━━━━━\n` +
			`_© ${global.namaBot || 'Rubby Multi Device'} • Stalker Engine_`;

		const imgUrl = data.avatar || data.banner;
		if (imgUrl && imgUrl.startsWith('http')) {
			try {
				const imgRes = await axios.get(imgUrl, { responseType: 'arraybuffer', timeout: 15000 });
				await client.sendMessage(
					m.chat,
					{ image: Buffer.from(imgRes.data), caption },
					{ quoted: m }
				);
				await global.react?.(client, m, '✅').catch(() => {});
				return;
			} catch (_) {}
		}

		await reply(caption);
		await global.react?.(client, m, '✅').catch(() => {});
	} catch (err) {
		console.error('[YOUTUBE STALK ERROR]:', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		const msg = err.response?.data?.error || err.response?.data?.message || err.message;
		return reply(`❌ Gagal mengambil data channel YouTube: ${msg}`);
	}
};

handler.help = ['ytstalk <username>', 'youtubestalk <channel>'];
handler.tags = ['stalker'];
handler.command = ['ytstalk', 'youtubestalk', 'stalkyt', 'ytchannel'];
handler.limit = true;
handler.register = true;

export default handler;
