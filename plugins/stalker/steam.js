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
			`🎮 *STEAM PROFILE STALKER* 🎀✨\n\n` +
			`Format: \`${usedPrefix + command} <customURL / vanityURL / steamID>\`\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} robinwalker*\n` +
			`• *${usedPrefix + command} gabelogannewell*`
		);
	}

	const cleanTarget = text.trim().replace(/^https?:\/\/steamcommunity\.com\/(id|profiles)\//i, '').replace(/\/$/, '');
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ *Sedang mencari data profil Steam...*');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/steam', { username: cleanTarget }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Profil Steam *${cleanTarget}* tidak ditemukan atau akun di-private.`);
		}

		const cleanSummary = data.summary
			? data.summary.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?[^>]+(>|$)/g, '').trim().slice(0, 300)
			: '-';

		const caption =
			`🎮 *STEAM PROFILE STALKER* 🎀✨\n\n` +
			`• 👤 *Steam Name:* \`${data.steamID || '-'}\`\n` +
			`• 🏷️ *Real Name:* \`${data.realname || '-'}\`\n` +
			`• 🆔 *SteamID64:* \`${data.steamID64 || '-'}\`\n` +
			`• 🌐 *Custom URL:* \`${data.customURL || '-'}\`\n` +
			`• 🟢 *Status:* *${data.onlineState || data.stateMessage || 'Offline'}*\n` +
			`• 🔒 *Privacy:* \`${data.privacyState || 'Public'}\`\n` +
			`• 📍 *Lokasi:* \`${data.location || '-'}\`\n` +
			`• 📅 *Bergabung:* \`${data.memberSince || '-'}\`\n` +
			`• 🛡️ *VAC Banned:* *${data.vacBanned ? '❌ Ya (BANNED)' : '✅ Bersih (No Ban)'}*\n` +
			`• 🤝 *Trade Ban:* \`${data.tradeBanState || 'None'}\`\n` +
			`• 🔗 *Profile Link:* ${data.profileUrl || `https://steamcommunity.com/profiles/${data.steamID64}`}\n\n` +
			`📝 *Bio / Summary:*\n_${cleanSummary}_`;

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
		console.error('[STEAM STALK ERROR]:', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		const msg = err.response?.data?.error || err.response?.data?.message || err.message;
		return reply(`❌ Gagal mengambil data profil Steam: ${msg}`);
	}
};

handler.help = ['steamstalk <username>', 'stalksteam <username>'];
handler.tags = ['stalker'];
handler.command = ['steamstalk', 'stalksteam', 'steamprofile'];
handler.limit = true;
handler.register = true;

export default handler;
