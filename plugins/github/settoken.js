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

import fs from 'fs';
import path from 'path';

const handler = async (m, { text, usedPrefix, command }) => {
	if (!text) {
		const maskedToken = global.tokengh ? `${global.tokengh.slice(0, 8)}...${global.tokengh.slice(-4)}` : 'Belum diset';
		return m.reply(`🔑 *GITHUB TOKEN SETTING*\n\n• Token Saat Ini: \`${maskedToken}\`\n\nContoh Penggunaan:\n*${usedPrefix}${command} ghp_xxxx...*`);
	}

	const newToken = text.trim();
	global.tokengh = newToken;

	try {
		const settingsPath = path.join(process.cwd(), 'setting.js');
		let content = fs.readFileSync(settingsPath, 'utf-8');

		if (content.includes('global.tokengh')) {
			content = content.replace(/global\.tokengh\s*=\s*['"][^'"]*['"];?/, `global.tokengh = '${newToken}';`);
		} else {
			content += `\nglobal.tokengh = '${newToken}';\n`;
		}

		fs.writeFileSync(settingsPath, content);
		return m.reply(`✅ *TOKEN GITHUB BERHASIL DISIMPAN*\n\nToken baru telah berhasil disimpan ke \`setting.js\` dan siap digunakan.`);
	} catch (e) {
		console.error('[SETGHTOKEN ERROR]', e);
		return m.reply(`✅ Token aktif di memory tetapi gagal menyimpan ke file setting.js.`);
	}
};

handler.help = ['setghtoken'];
handler.tags = ['github'];
handler.command = ['setghtoken'];
handler.limit = true;
handler.owner = true;
handler.noJadiBot = true;

handler.register = true;

export default handler;
