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

const handler = async (m, { conn, sock, text, usedPrefix, command, reply }) => {
	const client = conn || sock || global.mainSock;
	if (!text) {
		return reply(`🔎 *🌸 ɪᴘ ʟᴏᴏᴋᴜᴘ / ᴡʜᴏɪs ɪᴘ 🌸*\n\n✨ ᴋᴇᴛɪᴋ ᴀʟᴀᴍᴀᴛ ɪᴘ ʏᴀɴɢ ᴍᴀᴜ ᴋᴀᴋᴀᴋ ᴄᴇᴋ ʏᴀᴀ~ ✨ ✨\n\n*ᴄᴏɴᴛᴏʜ:*\n*${usedPrefix + command} 1.1.1.1*\n*${usedPrefix + command} 8.8.8.8*`);
	}

	const ip = text.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');

	await global.react(client, m, 'loading');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/ip-lookup', { ip }, 'apikey');
		const { data: res } = await axios.get(apiUrl, { timeout: 20000 });

		if (!res || !res.status || !res.result) {
			await global.react(client, m, 'error');
			return reply(`❌ Informasi IP *"${ip}"* tidak ditemukan.`);
		}

		const data = res.result;

		let caption = `🌐 *✨ ʜᴀsɪʟ ɪᴘ ʟᴏᴏᴋᴜᴘ ✨*\n\n`;
		caption += `📌 *📌 *ɪᴘ ᴀᴅᴅʀᴇss:** ${data.ip || ip}\n`;
		caption += `🏳️ *🏳️ *ɴᴇɢᴀʀᴀ:** ${data.country || '-'} (${data.country_code || '-'})\n`;
		caption += `🏙️ *Wilayah/Provinsi:* ${data.region || '-'}\n`;
		caption += `🏢 *Kota:* ${data.city || '-'}\n`;
		caption += `📮 *Kode Pos:* ${data.zip || '-'}\n`;
		caption += `🧭 *🧭 *ᴋᴏᴏʀᴅɪɴᴀᴛ:** Lat ${data.latitude ?? '-'}, Lon ${data.longitude ?? '-'}\n`;
		caption += `⏰ *Zona Waktu:* ${data.timezone || '-'}\n`;
		caption += `📡 *🏢 *ɪsᴘ:** ${data.isp || '-'}\n`;
		caption += `🏢 *🌐 *ᴏʀɢᴀɴɪsᴀsɪ:** ${data.org || '-'}\n`;
		caption += `🔢 *AS:* ${data.as || '-'}\n\n`;
		caption += `꒰ © Rubby Multi Device ꒱`;

		await reply(caption.trim());
		await global.react(client, m, 'success');
	} catch (e) {
		console.error('[IP LOOKUP ERROR]', e.message);
		await global.react(client, m, 'error');
		return reply(`❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺 saat memeriksa IP: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['iplookup <ip>', 'cekip <ip>', 'ipinfo <ip>'];
handler.tags = ['tools'];
handler.command = ['iplookup', 'cekip', 'ipinfo', 'whoisip'];
handler.limit = true;
handler.register = true;

export default handler;
