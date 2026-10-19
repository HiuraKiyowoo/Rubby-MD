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
			`🚂 *HONKAI STAR RAIL STALKER* 🎀✨\n\n` +
			`Format: \`${usedPrefix + command} <UID In-game>\`\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} 800345678*\n\n` +
			`💡 _UID terdiri dari 9 hingga 10 digit angka akun Honkai: Star Rail._`
		);
	}

	const uid = text.trim().replace(/[^0-9]/g, '');
	if (uid.length < 8 || uid.length > 11) {
		return reply('❌ Format UID tidak valid! Harap masukkan 9-10 digit angka.');
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(global.mess?.wait || '⏳ *Menghubungi Astral Express Database (Mihomo)...*');

	try {
		const apiUrl = global.API('kyzz', '/api/stalker/hsr', { uid }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Gagal: ${data?.error || data?.message || 'Data UID Honkai Star Rail tidak ditemukan.'}`);
		}

		const player = data.player || data.result?.player || data.result || data;
		const name = player.nickname || player.name || '-';
		const level = player.level || '-';
		const worldLevel = player.world_level || player.worldLevel || '-';
		const friendCount = player.friend_count || player.friends || '-';
		const signature = player.signature || '-';

		let charactersList = '';
		const chars = player.characters || player.avatar_detail_list || [];
		if (Array.isArray(chars) && chars.length > 0) {
			charactersList = `\n👥 *Support / Showcase Characters:*\n`;
			chars.slice(0, 4).forEach((c, idx) => {
				const cName = c.name || c.avatar_name || `Karakter ${idx + 1}`;
				const cLvl = c.level ? ` (Lv. ${c.level})` : '';
				charactersList += `• ${cName}${cLvl}\n`;
			});
		}

		const caption =
			`🚂 *HONKAI STAR RAIL STALKER* 🎀✨\n\n` +
			`• 👤 *Nickname:* *${name}*\n` +
			`• 🆔 *UID:* \`${uid}\`\n` +
			`• 🎖️ *Trailblaze Level:* *${level}*\n` +
			`• 🌍 *Equilibrium Level:* \`${worldLevel}\`\n` +
			`• 👥 *Friends:* \`${friendCount}\`\n` +
			`• 💬 *Signature:* _"${signature}"_\n` +
			charactersList +
			`\n━━━━━━━━━━━━━━━━━━━━\n` +
			`_© ${global.namaBot || 'Rubby Multi Device'} • HSR Astral Stalker_`;

		const avatarUrl = player.avatar?.icon || player.avatarUrl || player.icon;
		if (avatarUrl && avatarUrl.startsWith('http')) {
			try {
				const imgRes = await axios.get(avatarUrl, { responseType: 'arraybuffer', timeout: 15000 });
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
		console.error('[HSR STALK ERROR]:', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		const msg = err.response?.data?.error || err.response?.data?.message || err.message;
		return reply(`❌ Gagal mengambil data Honkai Star Rail: ${msg}`);
	}
};

handler.help = ['hsrstalk <uid>', 'stalkhsr <uid>'];
handler.tags = ['stalker'];
handler.command = ['hsrstalk', 'stalkhsr', 'hsrprofile'];
handler.limit = true;
handler.register = true;

export default handler;
