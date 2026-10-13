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

const handler = async (m, { sock, usedPrefix }) => {
	if (!global.tokengh) {
		return m.reply(`❌ *Token GitHub Belum Diset!*\n\nGunakan *${usedPrefix}setghtoken ghp_xxxx* untuk mengatur GitHub Access Token.`);
	}

	await m.react('⏳');

	try {
		const headers = {
			'user-agent': 'Mozilla/5.0',
			'Authorization': `token ${global.tokengh}`
		};

		const { data: user } = await axios.get('https://api.github.com/user', { headers, timeout: 10000 });
		const { data: rate } = await axios.get('https://api.github.com/rate_limit', { headers, timeout: 10000 });

		const coreRate = rate.resources.core;
		const resetDate = new Date(coreRate.reset * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

		const textMsg = `🔑 *GITHUB AUTHENTICATED TOKEN INFO*\n\n` +
			`👤 *Token Owner:* ${user.name || user.login} (@${user.login})\n` +
			`📧 *Email:* ${user.email || '-'}\n` +
			`📦 *Public Repos:* ${user.public_repos}\n` +
			`🔒 *Private Repos:* ${user.total_private_repos || 0}\n` +
			`👥 *Followers:* ${user.followers} | *Following:* ${user.following}\n\n` +
			`📊 *API RATE LIMIT QUOTA:*\n` +
			`• Quota Limit: *${coreRate.limit} req/jam*\n` +
			`• Quota Sisa: *${coreRate.remaining} req*\n` +
			`• Reset Quota: *${resetDate} WIB*`;

		const thumb = global.getThumbBuffer ? global.getThumbBuffer() : '';

		await sock.sendButtons(m.chat, {
			image: { url: user.avatar_url },
			caption: textMsg,
			footer: `${global.namaBot || 'Bot'} • GitHub Token Authenticated`,
			buttons: [
				{ url: user.html_url, text: '🌐 Buka Profil GitHub' },
				{ id: `${usedPrefix}ghrepos ${user.login}`, text: '📦 Lihat Repositories' }
			]
		}, { quoted: m });

		await m.react('✅');
	} catch (err) {
		console.error('[GHTOKEN ERROR]', err?.message || err);
		await m.react('❌');
		return m.reply(`❌ Token GitHub invalid atau kadaluarsa!\nError: ${err?.message || 'Unauthorized'}`);
	}
};

handler.command = ['ghtoken', 'ghme', 'ghrate'];
handler.limit = true;
handler.help = ['ghtoken'];
handler.tags = ['github'];
handler.description = 'Cek informasi akun dan sisa kuota API dari Token GitHub';

handler.register = true;

handler.noJadiBot = true;

export default handler;
