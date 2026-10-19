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

const handler = async (m, { text, usedPrefix, command, reply }) => {
	if (!text) {
		return reply(
			`🗓️ *CEK WETON KELAHIRAN JAWA* 🔮\n\n` +
			`Format: *${usedPrefix + command} <Tgl-Bln-Thn>*` +
			`\nContoh: *${usedPrefix + command} 17-08-1945*`
		);
	}

	reply(global.mess?.wait || '⏳ Menghitung weton...');

	try {
		const apiUrl = global.API('kyzz', '/api/primbon/weton', { tanggal: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			return reply(`❌ Gagal menghitung weton tanggal "*${text}*". Pastikan format: DD-MM-YYYY.`);
		}

		let out = `🗓️ *WETON KELAHIRAN & KARAKTER JAWA* 🔮\n\n`;
		if (typeof res === 'object') {
			for (const [k, v] of Object.entries(res)) {
				if (typeof v === 'string' || typeof v === 'number') {
					out += `• *${k.toUpperCase()}:* ${v}\n`;
				}
			}
		} else {
			out += res;
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[WETON ERROR]', e.message);
		return reply(`❌ Gagal menghitung weton: ${e.message}`);
	}
};

handler.help = ['weton <DD-MM-YYYY>'];
handler.tags = ['primbon'];
handler.category = 'primbon';
handler.command = ['weton', 'wetonjawa'];
handler.limit = true;
handler.register = true;

export default handler;
