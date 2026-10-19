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
			`📜 *PRIMBON ARTI NAMA* 🔮\n\n` +
			`Format: *${usedPrefix + command} <nama kamu>*` +
			`\nContoh: *${usedPrefix + command} Angela*`
		);
	}

	reply(global.mess?.wait || '⏳ Mengartikan nama...');

	try {
		const apiUrl = global.API('kyzz', '/api/primbon/artinama', { nama: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		if (!res || !data.status) {
			return reply(`❌ Tidak dapat menemukan arti nama untuk "*${text}*".`);
		}

		let out = `📜 *PRIMBON ARTI NAMA: ${text.toUpperCase()}* 🔮\n\n`;
		out += typeof res === 'string' ? res : (res.arti || res.makna || res.deskripsi || JSON.stringify(res));

		return reply(out.trim());
	} catch (e) {
		console.error('[ARTI NAMA ERROR]', e.message);
		return reply(`❌ Gagal memproses: ${e.message}`);
	}
};

handler.help = ['artinama <nama>'];
handler.tags = ['primbon'];
handler.category = 'primbon';
handler.command = ['artinama', 'namaku'];
handler.limit = true;
handler.register = true;

export default handler;
