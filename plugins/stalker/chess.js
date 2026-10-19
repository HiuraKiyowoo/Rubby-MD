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
			`♟️ *CHESS.COM PLAYER STALKER* 🎀✨\n\n` +
			`Format: \`${usedPrefix + command} <username Chess.com>\`\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} hikaru*\n` +
			`• *${usedPrefix + command} magnuscarlsen*`
		);
	}

	const cleanTarget = text.trim();
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ *Sedang mencari data player Chess.com...*');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/chess', { username: cleanTarget }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || (!data.username && !data.name)) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Player Chess.com *${cleanTarget}* tidak ditemukan.`);
		}

		let ratingsBlock = '';
		if (data.ratings && typeof data.ratings === 'object') {
			ratingsBlock = `\n📊 *Rating & Elo:*\n`;
			for (const [mode, val] of Object.entries(data.ratings)) {
				const currentElo = val?.current || val?.rating || (typeof val === 'number' ? val : '-');
				const bestElo = val?.best?.rating ? ` (Best: ${val.best.rating})` : '';
				ratingsBlock += `• ${mode.toUpperCase()}: *${currentElo}*${bestElo}\n`;
			}
		}

		const caption =
			`♟️ *CHESS.COM PLAYER STALKER* 🎀✨\n\n` +
			`• 👤 *Username:* *${data.username || cleanTarget}*\n` +
			`• 🏷️ *Name:* \`${data.name || '-'}\`\n` +
			`• 🎖️ *Title:* *${data.title || 'None'}*\n` +
			`• 🏆 *League:* \`${data.league || '-'}\`\n` +
			`• 👥 *Followers:* \`${(data.followers || 0).toLocaleString('id-ID')}\`\n` +
			`• 📅 *Bergabung:* \`${data.joined || '-'}\`\n` +
			`• 🟢 *Last Online:* \`${data.lastOnline || '-'}\`\n` +
			`• 🔗 *Profile:* ${data.url || `https://www.chess.com/member/${cleanTarget}`}\n` +
			ratingsBlock +
			`\n━━━━━━━━━━━━━━━━━━━━\n` +
			`_© ${global.namaBot || 'Rubby Multi Device'} • Chess Stalker_`;

		if (data.avatar && data.avatar.startsWith('http')) {
			try {
				const imgRes = await axios.get(data.avatar, { responseType: 'arraybuffer', timeout: 15000 });
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
		console.error('[CHESS STALK ERROR]:', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		const msg = err.response?.data?.error || err.response?.data?.message || err.message;
		return reply(`❌ Gagal mengambil data player Chess.com: ${msg}`);
	}
};

handler.help = ['chessstalk <username>', 'stalkchess <username>'];
handler.tags = ['stalker'];
handler.command = ['chessstalk', 'stalkchess', 'chessprofile'];
handler.limit = true;
handler.register = true;

export default handler;
