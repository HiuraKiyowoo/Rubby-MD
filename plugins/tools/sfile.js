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
import { fileTypeFromBuffer } from 'file-type';

let handler = async (m, { sock, text, usedPrefix, command, reply }) => {
	const quotedText = m.quoted ? (m.quoted.text || m.quoted.caption || m.quoted.description || m.quoted.msg?.caption || m.quoted.msg?.text || '') : '';
	const quotedUrlMatch = quotedText.match(/https?:\/\/(?:www\.)?sfile\.(?:co|mobi)\/[^\s]+/i);
	let trimmedText = text ? text.trim() : '';

	if (!trimmedText && quotedUrlMatch) {
		trimmedText = quotedUrlMatch[0];
	} else if (!trimmedText && quotedText) {
		trimmedText = quotedText.trim();
	}

	if (!trimmedText) {
		return reply(
			`📁 *SFILE DOWNLOADER & SEARCH*\n\n` +
			`*ᴄᴀʀᴀ ᴘᴀᴋᴀɪ:*\n` +
			`• *${usedPrefix}${command} search <query>*\n` +
			`  _Cari file di Sfile.mobi_\n` +
			`• *${usedPrefix}${command} dl <url_sfile>*\n` +
			`  _Download file dari Sfile.mobi_\n\n` +
			`*ᴄᴏɴᴛᴏʜ:*\n` +
			`• ${usedPrefix}${command} search script fanny\n` +
			`• ${usedPrefix}${command} dl https://sfile.co/nLyKEh2AZ0b\n\n` +
			`_Atau reply pesan yang berisi link Sfile!_`
		);
	}

	const args = trimmedText.split(/\s+/);
	const subCommand = args[0]?.toLowerCase();

	if (subCommand === 'dl' || subCommand === 'download' || /^https?:\/\/(www\.)?sfile\.(co|mobi)/i.test(trimmedText)) {
		let sfileUrl = (subCommand === 'dl' || subCommand === 'download') ? (args[1] || (quotedUrlMatch ? quotedUrlMatch[0] : '')) : trimmedText;

		if (!sfileUrl) {
			return reply(`❓ Harap masukkan URL Sfile.\n*ᴄᴏɴᴛᴏʜ:* *${usedPrefix}${command} dl https://sfile.co/nLyKEh2AZ0b*`);
		}

		if (!/sfile\.(co|mobi)/i.test(sfileUrl)) {
			return reply(`⚠️ URL tidak valid. Pastikan link berasal dari sfile.co / sfile.mobi`);
		}

		await global.react(sock, m, 'loading').catch(() => {});

		try {
			const apiUrl = global.API('kyzz', '/api/download/sfile', { url: sfileUrl }, 'apikey');
			const { data } = await axios.get(apiUrl);

			if (!data.status || !data.result || !data.result.download_url) {
				await global.react(sock, m, 'error').catch(() => {});
				return reply(`❌ ɢᴀɢᴀʟ mendapatkan link download Sfile.`);
			}

			const res = data.result;
			const caption = 
				`📥 *SFILE DOWNLOADER*\n\n` +
				`• *Nama File:* ${res.fileName || res.title}\n` +
				`• *📦 *ᴜᴋᴜʀᴀɴ:** ${res.size_bytes ? (res.size_bytes / (1024 * 1024)).toFixed(2) + ' MB' : '-'}\n` +
				`• *Link Asli:* ${res.originalUrl || sfileUrl}\n` +
				(res.expires_note ? `\n⚠️ _${res.expires_note}_` : '');

			await reply(caption);

			const fileStream = await axios.get(res.download_url, { responseType: 'arraybuffer' });
			const fileBuffer = Buffer.from(fileStream.data);

			const detected = await fileTypeFromBuffer(fileBuffer).catch(() => null);
			const fileName = res.fileName || res.title || 'file';
			const extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
			const ext = extMatch ? extMatch[1].toLowerCase() : (detected?.ext || '');

			const mimeMap = {
				zip: 'application/zip',
				rar: 'application/x-rar-compressed',
				'7z': 'application/x-7z-compressed',
				apk: 'application/vnd.android.package-archive',
				pdf: 'application/pdf',
				doc: 'application/msword',
				docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				xls: 'application/vnd.ms-excel',
				xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				ppt: 'application/vnd.ms-powerpoint',
				pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
				txt: 'text/plain',
				json: 'application/json',
				js: 'application/javascript',
				html: 'text/html',
				mp3: 'audio/mpeg',
				mp4: 'video/mp4',
				jpg: 'image/jpeg',
				jpeg: 'image/jpeg',
				png: 'image/png'
			};

			const mimetype = detected?.mime || mimeMap[ext] || 'application/octet-stream';

			await sock.sendMessage(
				m.chat,
				{
					document: fileBuffer,
					fileName: fileName,
					mimetype: mimetype
				},
				{ quoted: m }
			);

			await global.react(sock, m, 'success').catch(() => {});
		} catch (err) {
			console.error('[SFILE DOWNLOAD ERROR]', err);
			await global.react(sock, m, 'error').catch(() => {});
			return reply(`❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺 saat mengunduh file:\n${err.response?.data?.message || err.message}`);
		}
		return;
	}

	let query = trimmedText;
	if (subCommand === 'search') {
		query = args.slice(1).join(' ');
	}

	if (!query) {
		return reply(`❓ Harap masukkan kata kunci pencarian.\n*ᴄᴏɴᴛᴏʜ:* *${usedPrefix}${command} search script fanny*`);
	}

	await global.react(sock, m, 'loading').catch(() => {});

	try {
		const apiUrl = global.API('kyzz', '/api/search/sfile', { query }, 'apikey');
		const { data } = await axios.get(apiUrl);

		if (!data.status || !data.results || data.results.length === 0) {
			await global.react(sock, m, 'error').catch(() => {});
			return reply(`❌ Tidak ditemukan hasil untuk query: *${query}*`);
		}

		await global.react(sock, m, 'success').catch(() => {});

		const items = data.results.slice(0, 10);
		const rows = items.map((item, index) => ({
			id: `${usedPrefix}${command} dl ${item.link}`,
			title: `${index + 1}. ${item.title.length > 24 ? item.title.substring(0, 21) + '...' : item.title}`,
			description: `📦 ${item.size} | 📅 ${item.uploadedAt}`
		}));

		const messageText = 
			`🔎 *SFILE SEARCH RESULTS*\n\n` +
			`• *Query:* ${data.query || query}\n` +
			`• *Total ✨ *ʜᴀsɪʟ:** ${data.totalResults || data.results.length}\n\n` +
			`Silakan pilih file di bawah ini untuk mengunduhnya:`;

		return await sock.sendButtons(m.chat, {
			text: messageText,
			footer: `${global.namaBot || 'Rubby Multi Device'} • Sfile Downloader`,
			buttons: [
				{
					title: '📁 Pilih File Sfile',
					sections: [
						{
							title: `Hasil Pencarian (${items.length} file)`,
							rows: rows
						}
					]
				}
			]
		}, { quoted: m });

	} catch (err) {
		console.error('[SFILE SEARCH ERROR]', err);
		await global.react(sock, m, 'error').catch(() => {});
		return reply(`❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺 saat mencari file:\n${err.response?.data?.message || err.message}`);
	}
};

handler.help = ['sfile <search|dl> <query|url>'];
handler.tags = ['tools', 'downloader', 'search'];
handler.command = ['sfile', 'sfilesearch', 'sfiledl'];
handler.limit = true;

handler.register = true;

export default handler;
