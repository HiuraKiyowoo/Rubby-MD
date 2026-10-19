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
			`📦 *WEB TO APK BUILDER*\n\n` +
			`Format: *${usedPrefix + command} <url_website>*\n` +
			`Contoh: *${usedPrefix + command} https://example.com*`
		);
	}

	let targetUrl = text.trim();
	if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

	reply(global.mess?.wait || '⏳ Mengonversi website menjadi APK Android...');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/web2apk', {}, 'apikey');
		const { data } = await axios.post(apiUrl, { url: targetUrl }, { timeout: 60000 });

		const res = data.result || data.data || data;
		if (!res || (!res.apk_url && !res.download_url && !res.url)) {
			return reply(`❌ Gagal: ${data.message || 'Tidak dapat memproses website ke APK.'}`);
		}

		const apkLink = res.apk_url || res.download_url || res.url;
		let out = `📦 *WEBSITE TO APK READY*\n\n`;
		out += `• *Website* : ${targetUrl}\n`;
		out += `• *Nama Aplikasi* : ${res.app_name || res.title || 'Web APK'}\n`;
		out += `• *Ukuran* : ${res.size || '-'}\n\n`;
		out += `📥 *Link Download APK*:\n${apkLink}`;

		return reply(out);
	} catch (e) {
		console.error('[WEB2APK ERROR]', e.message);
		return reply(`❌ Gagal: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['web2apk <url>'];
handler.tags = ['tools'];
handler.command = ['web2apk'];
handler.limit = true;
handler.register = true;

export default handler;
