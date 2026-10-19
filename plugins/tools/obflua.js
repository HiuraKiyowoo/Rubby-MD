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

let handler = async (m, { text, usedPrefix, command, reply }) => {
	let luaCode = text ? text.trim() : '';

	const quoted = m.quoted ? m.quoted : m;
	if (!luaCode && quoted.text) {
		luaCode = quoted.text.trim();
	}

	if (!luaCode) {
		return reply(
			`🔒 *LUA CODE OBFUSCATOR*\n\n` +
			`Format:\n` +
			`• *${usedPrefix + command} <kode_lua>*\n` +
			`• Balas (reply) pesan berisi skrip Lua dengan *${usedPrefix + command}*`
		);
	}

	reply(global.mess?.wait || '⏳ Mengobfuskasi skrip Lua...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/obf-lua', {}, 'apikey');
		const { data } = await axios.post(apiUrl, { code: luaCode }, { timeout: 35000 });

		const result = data.result || data.obfuscated || data.code || data;
		if (typeof result !== 'string' && !result.code) {
			return reply('❌ Gagal mengobfuskasi skrip Lua.');
		}

		const obfText = typeof result === 'string' ? result : result.code;
		return reply(`\`\`\`lua\n${obfText}\n\`\`\``);
	} catch (e) {
		console.error('[OBF LUA ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['obflua <kode>'];
handler.tags = ['tools'];
handler.command = ['obflua', 'luaobf'];
handler.limit = true;
handler.register = true;

export default handler;
