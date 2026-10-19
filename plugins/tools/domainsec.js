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
	if (!text) {
		return reply(
			`🛡️ *DOMAIN SECURITY CHECK*\n\n` +
			`Format: *${usedPrefix + command} <nama_domain>*\n` +
			`Contoh: *${usedPrefix + command} google.com*`
		);
	}

	const domain = text.trim().replace(/^https?:\/\//i, '').split('/')[0];
	reply(global.mess?.wait || '⏳ Menganalisis keamanan domain...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/domain-security', { domain }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		const res = data.result || data.data || data;
		if (!res || !res.domain) {
			return reply('❌ Gagal mendapatkan data keamanan domain.');
		}

		let out = `🛡️ *ANALISIS KEAMANAN DOMAIN*\n\n`;
		out += `• *Domain* : ${res.domain}\n`;
		out += `• *Waktu Analisis* : ${res.timestamp ? new Date(res.timestamp).toLocaleString('id-ID') : '-'}\n\n`;

		if (res.scores) {
			out += `📊 *Skor Keamanan*:\n`;
			for (const [k, v] of Object.entries(res.scores)) {
				const score = typeof v === 'object' ? `${v.score || 0}/${v.maxScore || 100}` : v;
				out += `  • ${k} : *${score}*\n`;
			}
			out += '\n';
		}

		if (res.checks) {
			out += `🔍 *Status Pemeriksaan*:\n`;
			for (const [k, v] of Object.entries(res.checks)) {
				const statusIcon = v?.valid || v?.status === 'pass' || v?.passed ? '✅' : '⚠️';
				out += `  ${statusIcon} ${k}\n`;
			}
		}

		return reply(out.trim());
	} catch (e) {
		console.error('[DOMAIN SECURITY ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['domainsec <domain>'];
handler.tags = ['tools'];
handler.command = ['domainsec', 'cekdomain'];
handler.limit = true;
handler.register = true;

export default handler;
