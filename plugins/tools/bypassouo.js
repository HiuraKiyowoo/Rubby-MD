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
	if (!text || !text.startsWith('http')) {
		return reply(
			`🔓 *OUO SHORTLINK BYPASSER* 🚀\n\n` +
			`Format: *${usedPrefix + command} <URL OuO>*` +
			`\nContoh: *${usedPrefix + command} https://ouo.io/xxxx*`
		);
	}

	reply(global.mess?.wait || '⏳ Mem-bypass link OuO...');

	try {
		const apiUrl = global.API('kyzz', '/api/bypass/ouo', { url: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const res = data.result || data.data || data;
		const targetUrl = res.url || res.link || res.destination;

		if (!targetUrl) {
			return reply('❌ Gagal mem-bypass tautan OuO.');
		}

		return reply(
			`🔓 *BYPASS OUO BERHASIL* 🚀\n\n` +
			`• 🔗 *Direct Link:* ${targetUrl}`
		);
	} catch (e) {
		console.error('[BYPASS OUO ERROR]', e.message);
		return reply(`❌ Gagal bypass: ${e.message}`);
	}
};

handler.help = ['bypassouo <url>'];
handler.tags = ['tools'];
handler.command = ['bypassouo', 'ouobypass'];
handler.limit = true;
handler.register = true;

export default handler;
