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
import { uploadMedia } from '../../src/lib/Uploader.js';

const handler = async (m, { sock, conn, text, args, usedPrefix, command, reply }) => {
	const client = sock || conn;
	const q = m.quoted ? m.quoted : m;
	const msgContent = q.message || q;
	const targetMedia = msgContent.imageMessage || (msgContent.documentMessage && /image/i.test(msgContent.documentMessage.mimetype || '')) || null;
	const mime = targetMedia ? targetMedia.mimetype : (q.msg || q).mimetype || '';

	let targetUrl = (text || '').trim();

	if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
		targetUrl = '';
	}

	if (!targetUrl && !mime.startsWith('image/')) {
		return reply(
			`📸 *IMAGE EXIF & METADATA INSPECTOR* 🎀✨\n\n` +
			`Cek data metadata foto, informasi kamera, pengaturan lensa, eksposur, dan koordinat lokasi foto.\n\n` +
			`*Penggunaan:*\n` +
			`• Kirim foto dengan caption \`${usedPrefix + command}\`\n` +
			`• Atau balas/reply foto dengan \`${usedPrefix + command}\`\n` +
			`• Atau masukkan link foto langsung: \`${usedPrefix + command} <url_gambar>\`\n\n` +
			`*Contoh:*\n` +
			`\`${usedPrefix + command} https://example.com/photo.jpg\``
		);
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply('⏳ *Menganalisis metadata & EXIF gambar...*');

	try {
		if (!targetUrl) {
			const mediaBuffer = await q.download();
			if (!mediaBuffer) return reply('❌ Gagal mengunduh gambar untuk analisis.');

			const ext = mime.split('/')[1]?.split(';')[0] || 'jpg';
			const fileName = `exif_${Date.now()}.${ext}`;
			targetUrl = await uploadMedia(mediaBuffer, fileName);

			if (!targetUrl) {
				await global.react?.(client, m, '❌').catch(() => {});
				return reply('❌ Gagal mengunggah gambar sementara ke server uploader.');
			}
		}

		const apiUrl = global.API('kyzz', '/api/tools/exif', { url: targetUrl }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 35000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Gagal membaca EXIF gambar: ${data?.error || 'Format gambar tidak didukung.'}`);
		}

		const img = data.image || {};
		const cam = data.camera || {};
		const shot = data.shot || {};
		const loc = data.location || {};

		const sizeKb = img.sizeBytes ? (img.sizeBytes / 1024).toFixed(2) + ' KB' : '-';
		const dimensions = img.width && img.height ? `${img.width} × ${img.height} piksel` : '-';

		let out = `📸 *HASIL INSPEKSI EXIF & METADATA* 🎀✨\n\n`;
		out += `🖼️ *Informasi Gambar:*\n`;
		out += `• Format: \`${(img.format || 'JPEG').toUpperCase()}\`\n`;
		out += `• Resolusi: \`${dimensions}\`\n`;
		out += `• Ukuran File: \`${sizeKb}\`\n`;
		out += `• Color Space: \`${img.space || 'sRGB'}\`\n\n`;

		if (data.hasExif) {
			out += `📷 *Perangkat Kamera:*\n`;
			out += `• Merek: \`${cam.make || '-'}\`\n`;
			out += `• Model Kamera: \`${cam.model || '-'}\`\n`;
			if (cam.lensModel) out += `• Model Lensa: \`${cam.lensModel}\`\n`;
			if (cam.software) out += `• Software/Editor: \`${cam.software}\`\n`;
			out += `\n`;

			out += `⚙️ *Pengaturan Pengambilan Foto (Shot):*\n`;
			out += `• Tanggal & Waktu: \`${shot.dateTimeOriginal ? new Date(shot.dateTimeOriginal).toLocaleString('id-ID') : '-'}\`\n`;
			out += `• ISO: \`${shot.iso || '-'}\`\n`;
			out += `• Aperture: \`${shot.fNumber ? 'f/' + shot.fNumber : '-'}\`\n`;
			out += `• Focal Length: \`${shot.focalLength || '-'}\`\n`;
			out += `• Shutter Speed: \`${shot.exposureTime ? shot.exposureTime + 's' : '-'}\`\n`;
			out += `\n`;

			if (loc.latitude && loc.longitude) {
				out += `📍 *Koordinat Lokasi GPS:*\n`;
				out += `• Latitude: \`${loc.latitude}\`\n`;
				out += `• Longitude: \`${loc.longitude}\`\n`;
				out += `• Google Maps: https://maps.google.com/?q=${loc.latitude},${loc.longitude}\n\n`;
			}
		} else {
			out += `ℹ️ *Catatan:* Gambar ini tidak memiliki data EXIF kamera (kemungkinan sudah dikompresi WhatsApp/medsos atau metadata telah dibersihkan).\n\n`;
		}

		out += `━━━━━━━━━━━━━━━━━━━━\n`;
		out += `© ${global.namaBot || 'Rubby Multi Device'} • EXIF Inspector`;

		await reply(out.trim());
		await global.react?.(client, m, '✅').catch(() => {});
	} catch (e) {
		console.error('[EXIF ERROR]:', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Terjadi kesalahan saat memeriksa EXIF: ${e.response?.data?.error || e.message}`);
	}
};

handler.help = ['exif <reply/gambar>'];
handler.tags = ['tools'];
handler.command = ['exif'];
handler.limit = true;
handler.register = true;

export default handler;
