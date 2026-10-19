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
			`⛏️ *MINECRAFT PLAYER STALKER* 🎀✨\n\n` +
			`Format: \`${usedPrefix + command} <username pemain>\`\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} Notch*\n` +
			`• *${usedPrefix + command} Dream*`
		);
	}

	const cleanTarget = text.trim();
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ *Sedang mencari data player Minecraft...*');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/minecraft', { username: cleanTarget }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Player Minecraft *${cleanTarget}* tidak ditemukan. Pastikan akun original Java Edition.`);
		}

		const caption =
			`⛏️ *MINECRAFT PLAYER STALKER* 🎀✨\n\n` +
			`• 👤 *Username:* *${data.username || cleanTarget}*\n` +
			`• 🆔 *UUID:* \`${data.uuid || '-'}\`\n` +
			`• 🔢 *Raw ID:* \`${data.rawId || '-'}\`\n` +
			(data.skinTexture ? `• 👕 *Skin Texture:* ${data.skinTexture}\n` : '') +
			(data.capeTexture ? `• 🧣 *Cape Texture:* ${data.capeTexture}\n` : '') +
			`• 🌐 *NameMC:* https://namemc.com/profile/${data.uuid || cleanTarget}\n\n` +
			`━━━━━━━━━━━━━━━━━━━━\n` +
			`_© ${global.namaBot || 'Rubby Multi Device'} • Minecraft Stalker_`;

		const renderImg = data.body3d || data.head3d || data.avatar;
		if (renderImg && renderImg.startsWith('http')) {
			try {
				const imgRes = await axios.get(renderImg, { responseType: 'arraybuffer', timeout: 15000 });
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
		console.error('[MINECRAFT STALK ERROR]:', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		const msg = err.response?.data?.error || err.response?.data?.message || err.message;
		return reply(`❌ Gagal mengambil data player Minecraft: ${msg}`);
	}
};

handler.help = ['mcstalk <username>', 'minecraftstalk <username>'];
handler.tags = ['stalker'];
handler.command = ['mcstalk', 'minecraftstalk', 'stalkmc', 'mcskin'];
handler.limit = true;
handler.register = true;

export default handler;
