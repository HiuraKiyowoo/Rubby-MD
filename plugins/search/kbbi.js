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
			`📖 *KAMUS BESAR BAHASA INDONESIA (KBBI)* 🇮🇩\n\n` +
			`Format: *${usedPrefix + command} <kata>*` +
			`\nContoh: *${usedPrefix + command} petualang*`
		);
	}

	reply(global.mess?.wait || '⏳ Mencari arti kata di KBBI...');

	try {
		const apiUrl = global.API('kyzz', '/api/search/kbbi', { query: text.trim() }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data.status && !data.success) {
			return reply(`❌ Kata "*${text}*" tidak ditemukan dalam KBBI daring.`);
		}

		let out = `📖 *KBBI DARING: ${(data.word || text).toUpperCase()}* 🇮🇩\n\n`;
		if (Array.isArray(data.entries) && data.entries.length > 0) {
			data.entries.forEach((e, idx) => {
				out += `*${idx + 1}. ${e.lemma || data.word}*` + (e.raw_data ? ` — _${e.raw_data}_\n` : '\n');
				if (Array.isArray(e.meanings)) {
					e.meanings.forEach(mItem => {
						out += `   • ${mItem}\n`;
					});
				}
				out += '\n';
			});
		} else if (data.result) {
			out += typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
		} else {
			out += 'Arti kata berhasil ditemukan.';
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[KBBI ERROR]', e.message);
		return reply(`❌ Gagal mencari di KBBI: ${e.message}`);
	}
};

handler.help = ['kbbi <kata>'];
handler.tags = ['search'];
handler.command = ['kbbi', 'artikata'];
handler.limit = true;
handler.register = true;

export default handler;
