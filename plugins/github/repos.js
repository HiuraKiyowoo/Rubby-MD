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
		return m.reply(`❌ *Format Salah!*\n\nContoh: *${usedPrefix}${command} torvalds*`);
	}

	const username = text.trim().replace('@', '');
	await m.react('⏳');

	try {
		const headers = { 'user-agent': 'Mozilla/5.0' };
		if (global.tokengh) headers['Authorization'] = `token ${global.tokengh}`;

		const { data: repos } = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, { headers, timeout: 10000 });

		if (!repos || repos.length === 0) {
			await m.react('❌');
			return m.reply(`ℹ️ User *@${username}* tidak memiliki repositori publik.`);
		}

		let textMsg = `📦 *REPOSITORI GITHUB: @${username}*\n\n` +
			`Menampilkan 10 repositori terbaru:\n\n`;

		repos.forEach((repo, i) => {
			textMsg += `${i + 1}. *${repo.name}*\n` +
				`   📝 ${repo.description || 'Tidak ada deskripsi'}\n` +
				`   ⭐ ${repo.stargazers_count} Stars | 🔀 ${repo.forks_count} Forks | 💻 ${repo.language || '-'}\n` +
				`   🔗 ${repo.html_url}\n\n`;
		});

		const firstRepo = repos[0];
		const thumb = global.getThumbBuffer ? global.getThumbBuffer() : '';

		await sock.sendButtons(m.chat, {
			location: {
				degreesLatitude: 0,
				degreesLongitude: 0,
				address: `User Repositories • @${username}`,
				jpegThumbnail: thumb ? (typeof thumb === 'string' ? Buffer.from(thumb, 'base64') : thumb) : Buffer.alloc(0),
			},
			text: textMsg,
			footer: `Ketik .ghclone <owner/repo> untuk mendownload ZIP repo`,
			buttons: [
				{ id: `${usedPrefix}ghclone ${firstRepo.full_name}`, text: `📦 Download ${firstRepo.name}` }
			]
		}, { quoted: m });

		await m.react('✅');
	} catch (err) {
		console.error('[GHREPOS ERROR]', err?.message || err);
		await m.react('❌');
		if (err?.response?.status === 404) {
			return m.reply(`❌ Username GitHub *${username}* tidak ditemukan!`);
		}
		return m.reply(`❌ Gagal mengambil daftar repositori: ${err?.message || 'Error occurred'}`);
	}
};

handler.command = ['ghrepos', 'userrepos', 'githubrepos'];
handler.limit = true;
handler.help = ['ghrepos'];
handler.tags = ['github'];
handler.description = 'Tampilkan daftar repositori publik milik user GitHub';

handler.register = true;

handler.noJadiBot = true;

export default handler;
