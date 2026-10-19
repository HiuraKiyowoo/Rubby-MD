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

const handler = async (m, { text, args, usedPrefix, command, reply }) => {
	const sub = (args[0] || '').toLowerCase();

	if (sub === 'inbox' || sub === 'cek') {
		const email = args[1];
		const token = args[2] || '';
		if (!email) {
			return reply(`Format: *${usedPrefix + command} inbox <email> [token]*`);
		}

		reply('⏳ Mengecek kotak masuk email...');
		try {
			const apiUrl = global.API('kyzz', '/api/tools/temp-mail/inbox', { email, token }, 'apikey');
			const { data } = await axios.get(apiUrl, { timeout: 25000 });

			const list = data.result || data.messages || data.data || [];
			if (!Array.isArray(list) || list.length === 0) {
				return reply(`📭 Kotak masuk email *${email}* masih kosong.`);
			}

			let out = `📬 *INBOX EMAIL: ${email}* 📨\n\n`;
			list.slice(0, 5).forEach((msg, idx) => {
				out += `*${idx + 1}. Dari: ${msg.from || msg.sender}*\n`;
				out += `   📌 Subjek: ${msg.subject || '-'}\n`;
				out += `   📝 Pesan: ${(msg.body || msg.text || '-').slice(0, 150)}...\n\n`;
			});

			return reply(out.trim());
		} catch (e) {
			console.error('[TEMP MAIL INBOX ERROR]', e.message);
			return reply(`❌ Gagal cek inbox: ${e.message}`);
		}
	}

	reply('⏳ Membuat email sementara baru...');
	try {
		const apiUrl = global.API('kyzz', '/api/tools/temp-mail/create', {}, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		const res = data.result || data.data || data;
		const email = res.email || res.address;

		if (!email) {
			return reply('❌ Gagal membuat alamat email sementara.');
		}

		let out = `📧 *EMAIL SEMENTARA (TEMP MAIL) DIBUAT* ✨\n\n`;
		out += `• 📬 *Alamat Email:* \`\`\`${email}\`\`\`\n`;
		if (res.token) out += `• 🔑 *Token Inbox:* \`\`\`${res.token}\`\`\`\n\n`;
		out += `_Cek pesan masuk kapan saja dengan: ${usedPrefix + command} inbox ${email}_`;

		return reply(out.trim());
	} catch (e) {
		console.error('[TEMP MAIL CREATE ERROR]', e.message);
		return reply(`❌ Gagal membuat temp mail: ${e.message}`);
	}
};

handler.help = ['tempmail', 'tempmail inbox <email>'];
handler.tags = ['tools'];
handler.command = ['tempmail', 'tempemail', 'cekmail'];
handler.limit = true;
handler.register = true;

export default handler;
