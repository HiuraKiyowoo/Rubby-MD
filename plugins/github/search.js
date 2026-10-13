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
		return m.reply(`❌ *Format Salah!*\n\nContoh: *${usedPrefix}${command} baileys bot*`);
	}

	await m.react('⏳');

	try {
		const headers = { 'user-agent': 'Mozilla/5.0' };
		if (global.tokengh) headers['Authorization'] = `token ${global.tokengh}`;

		const { data } = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(text)}&per_page=5`, { headers, timeout: 10000 });

		if (!data || !data.items || data.items.length === 0) {
			await m.react('❌');
			return m.reply(`❌ Repositori GitHub untuk pencarian "*${text}*" tidak ditemukan!`);
		}

		let resultMsg = `🔍 *PENCARIAN REPOSITORI GITHUB*\n\n` +
			`Kata Kunci: *${text}*\n` +
			`Total Hasil: *${data.total_count.toLocaleString('id-ID')}*\n\n`;

		data.items.forEach((item, index) => {
			resultMsg += `${index + 1}. *${item.full_name}*\n` +
				`   📝 Desc: ${item.description || 'Tidak ada deskripsi'}\n` +
				`   ⭐ Stars: ${item.stargazers_count} | 🔀 Forks: ${item.forks_count}\n` +
				`   💻 Bahasa: ${item.language || '-'}\n` +
				`   🔗 ${item.html_url}\n\n`;
		});

		const firstRepo = data.items[0];
		const thumb = global.getThumbBuffer ? global.getThumbBuffer() : '';

		await sock.sendButtons(m.chat, {
			location: {
				degreesLatitude: 0,
				degreesLongitude: 0,
				address: `GitHub Search • ${data.total_count} Repos`,
				jpegThumbnail: thumb ? (typeof thumb === 'string' ? Buffer.from(thumb, 'base64') : thumb) : Buffer.alloc(0),
			},
			text: resultMsg,
			footer: `Ketik .ghclone <owner/repo> untuk mendownload ZIP repo`,
			buttons: [
				{ id: `${usedPrefix}ghclone ${firstRepo.full_name}`, text: `📦 Download ${firstRepo.name}` }
			]
		}, { quoted: m });

		await m.react('✅');
	} catch (err) {
		console.error('[GHSEARCH ERROR]', err?.message || err);
		await m.react('❌');
		return m.reply(`❌ Gagal mencari repositori GitHub: ${err?.message || 'Error occurred'}`);
	}
};

handler.command = ['ghsearch', 'githubsearch', 'searchrepo'];
handler.limit = true;
handler.help = ['ghsearch'];
handler.tags = ['github'];
handler.description = 'Cari repositori di GitHub berdasarkan kata kunci';

handler.register = true;

handler.noJadiBot = true;

export default handler;
