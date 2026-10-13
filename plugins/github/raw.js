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
┇   › Feature  : GitHub Suite Automation
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import axios from 'axios';

const handler = async (m, { sock, text, usedPrefix, command }) => {
	if (!text) {
		return m.reply(`❌ *Format Salah!*\n\nContoh: *${usedPrefix}${command} whiskeysockets/baileys/package.json*\natau raw URL GitHub.`);
	}

	let rawUrl = text.trim();
	if (rawUrl.startsWith('https://raw.githubusercontent.com/')) {
	} else if (rawUrl.startsWith('https://github.com/')) {
		rawUrl = rawUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
	} else {
		const parts = rawUrl.split('/');
		if (parts.length >= 3) {
			const owner = parts[0];
			const repo = parts[1];
			const filePath = parts.slice(2).join('/');
			rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
		} else {
			return m.reply(`❌ Format tidak valid! Gunakan format *owner/repo/path/file.ext*`);
		}
	}

	await m.react('⏳');

	try {
		const headers = { 'user-agent': 'Mozilla/5.0' };
		const res = await axios.get(rawUrl, { headers, timeout: 10000 });

		let fileContent = typeof res.data === 'object' ? JSON.stringify(res.data, null, 2) : String(res.data);

		if (fileContent.length > 4000) {
			fileContent = fileContent.slice(0, 4000) + '\n\n... (Terpotong karena isi file terlalu panjang)';
		}

		await m.reply(`📄 *RAW FILE GITHUB*\n🔗 ${rawUrl}\n\n\`\`\`\n${fileContent}\n\`\`\``);
		await m.react('✅');
	} catch (err) {
		console.error('[GHRAW ERROR]', err?.message || err);
		await m.react('❌');
		return m.reply(`❌ Gagal mengambil raw file GitHub! Pastikan path file atau URL benar.\nURL: ${rawUrl}`);
	}
};

handler.command = ['ghraw', 'ghfile', 'rawgithub'];
handler.limit = true;
handler.help = ['ghraw'];
handler.tags = ['github'];
handler.description = 'Ambil isi kode/file raw langsung dari GitHub';

handler.register = true;

handler.noJadiBot = true;

export default handler;
