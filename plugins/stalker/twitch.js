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
			`🟣 *TWITCH STREAMER STALKER* 🎀✨\n\n` +
			`Format: \`${usedPrefix + command} <username Twitch>\`\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} ninja*\n` +
			`• *${usedPrefix + command} shroud*`
		);
	}

	const cleanTarget = text.trim().replace(/^https?:\/\/(www\.)?twitch\.tv\//i, '').replace(/^@/, '');
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ *Sedang mencari data streamer Twitch...*');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/twitch', { username: cleanTarget }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Streamer Twitch *${cleanTarget}* tidak ditemukan.`);
		}

		let liveInfo = '';
		if (data.isLive && data.liveStream) {
			liveInfo =
				`\n🔴 *SEDANG LIVE STREAMING!* 🎬\n` +
				`• *Judul Live:* ${data.liveStream.title || '-'}\n` +
				`• *Game:* ${data.liveStream.game || '-'}\n` +
				`• *Penonton:* ${(data.liveStream.viewers || 0).toLocaleString('id-ID')} viewers\n`;
		} else {
			liveInfo = `• ⚪ *Status Live:* Sedang Offline\n`;
		}

		const caption =
			`🟣 *TWITCH STREAMER STALKER* 🎀✨\n\n` +
			`• 👤 *Display Name:* *${data.displayName || cleanTarget}*\n` +
			`• 🔖 *Username:* \`@${data.username || cleanTarget}\`\n` +
			`• 🆔 *User ID:* \`${data.id || '-'}\`\n` +
			`• 👥 *Followers:* *${(data.followers || 0).toLocaleString('id-ID')}*\n` +
			liveInfo +
			`• 🔗 *Channel:* ${data.url || `https://twitch.tv/${cleanTarget}`}\n\n` +
			(data.description ? `📝 *Bio / Deskripsi:*\n_${data.description.slice(0, 300)}_\n\n` : '') +
			`━━━━━━━━━━━━━━━━━━━━\n` +
			`_© ${global.namaBot || 'Rubby Multi Device'} • Twitch Stalker_`;

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
		console.error('[TWITCH STALK ERROR]:', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		const msg = err.response?.data?.error || err.response?.data?.message || err.message;
		return reply(`❌ Gagal mengambil data Twitch: ${msg}`);
	}
};

handler.help = ['twitchstalk <username>', 'stalktwitch <username>'];
handler.tags = ['stalker'];
handler.command = ['twitchstalk', 'stalktwitch', 'twitchprofile'];
handler.limit = true;
handler.register = true;

export default handler;
