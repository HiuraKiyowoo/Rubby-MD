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
		return reply(`🌍 *🌸 ɪɴғᴏʀᴍᴀsɪ ɴᴇɢᴀʀᴀ 🌸*\n\n✨ ᴋᴇᴛɪᴋ ɴᴀᴍᴀ ɴᴇɢᴀʀᴀ ʏᴀɴɢ ᴍᴀᴜ ᴋᴀᴋᴀᴋ ᴄᴀʀɪ ʏᴀᴀ~ 🌸 🌸\n\n*ᴄᴏɴᴛᴏʜ:*\n*${usedPrefix + command} Indonesia*\n*${usedPrefix + command} Japan*`);
	}

	await global.react(client, m, 'loading');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/info-negara', { country: text.trim() }, 'apikey');
		const { data: res } = await axios.get(apiUrl, { timeout: 20000 });

		if (!res || !res.status || !res.result || !res.result.data) {
			await global.react(client, m, 'error');
			return reply(`❌ Data negara *"${text}"* tidak ditemukan.`);
		}

		const data = res.result.data;

		let caption = `🌐 *🌸 ɪɴғᴏʀᴍᴀsɪ ɴᴇɢᴀʀᴀ 🌸: ${data.name?.toUpperCase() || text.toUpperCase()}*\n\n`;
		caption += `🏛️ *🏛️ *ɪʙᴜ ᴋᴏᴛᴀ:** ${data.capital || '-'}\n`;
		caption += `🌏 *Benua:* ${data.continent?.name || '-'} ${data.continent?.emoji || ''}\n`;
		caption += `📞 *Kode Telepon:* ${data.phoneCode || '-'}\n`;
		caption += `💰 *💰 *ᴍᴀᴛᴀ ᴜᴀɴɢ:** ${data.currency || '-'}\n`;
		caption += `🗣️ *🗣️ *ʙᴀʜᴀsᴀ:** ${Array.isArray(data.languages?.native) ? data.languages.native.join(', ') : '-'}\n`;
		caption += `🏛️ *Bentuk Pemerintahan:* ${data.constitutionalForm || '-'}\n`;
		caption += `📐 *Luas 🌐 *ᴡɪʟᴀʏᴀʜ:** ${data.area?.squareKilometers ? data.area.squareKilometers.toLocaleString('id-ID') : '-'} km² (${data.area?.squareMiles ? data.area.squareMiles.toLocaleString('id-ID') : '-'} sq mi)\n`;
		caption += `🧭 *🧭 *ᴋᴏᴏʀᴅɪɴᴀᴛ:** Lat ${data.coordinates?.latitude ?? '-'}, Lon ${data.coordinates?.longitude ?? '-'}\n`;
		caption += `🚗 *Jalur Mengemudi:* ${data.drivingSide || '-'}\n`;
		caption += `🌐 *Domain TLD:* ${data.internetTLD || '-'}\n`;
		caption += `🏷️ *Kode ISO:* ${data.isoCode?.alpha2?.toUpperCase() || '-'} / ${data.isoCode?.alpha3?.toUpperCase() || '-'} (${data.isoCode?.numeric || '-'})\n`;
		caption += `🏝️ *Negara Terkurung Daratan:* ${data.landlocked ? 'Ya' : 'Tidak'}\n`;
		caption += `🍷 *Aturan Alkohol:* ${data.alcoholProhibition || '-'}\n`;
		
		if (data.famousFor) {
			caption += `🌟 *Terkenal Karena:* ${data.famousFor}\n`;
		}

		if (Array.isArray(data.neighbors) && data.neighbors.length > 0) {
			caption += `\n🤝 *Negara Tetangga:*\n`;
			data.neighbors.forEach((n, idx) => {
				caption += `  ${idx + 1}. ${n.name}\n`;
			});
		}

		if (data.googleMapsLink) {
			caption += `\n🗺️ *Google Maps:* ${data.googleMapsLink}\n`;
		}

		caption += `\n꒰ © Rubby Multi Device ꒱`;

		if (data.flag && typeof data.flag === 'string') {
			await client.sendMessage(m.chat, {
				image: { url: data.flag },
				caption: caption.trim()
			}, { quoted: m });
		} else {
			await reply(caption.trim());
		}

		await global.react(client, m, 'success');
	} catch (e) {
		console.error('[🌸 ɪɴғᴏʀᴍᴀsɪ ɴᴇɢᴀʀᴀ 🌸 ERROR]', e.message);
		await global.react(client, m, 'error');
		return reply(`❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺 saat mencari info negara: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['infonegara <negara>', 'countryinfo <negara>'];
handler.tags = ['tools'];
handler.command = ['infonegara', 'countryinfo', 'negara'];
handler.limit = true;
handler.register = true;

export default handler;
