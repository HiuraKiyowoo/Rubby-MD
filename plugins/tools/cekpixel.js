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

import sharp from 'sharp';

const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const handler = async (m, { usedPrefix, command, reply }) => {
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mtype || '';

	if (!/image/.test(mime)) {
		return reply(`Kirim atau reply gambar dengan caption *${usedPrefix + command}*`);
	}

	try {
		const media = await q.download();
		if (!media || !Buffer.isBuffer(media)) {
			return reply('❌ ɢᴀɢᴀʟ mendownload media gambar.');
		}

		const metadata = await sharp(media).metadata();

		const width = metadata.width || 0;
		const height = metadata.height || 0;
		const totalPixels = (width * height).toLocaleString('id-ID');
		const aspect = width && height ? (width / height).toFixed(2) : '-';
		const format = (metadata.format || 'unknown').toUpperCase();
		const size = media.length ? formatBytes(media.length) : '-';
		const space = metadata.space || 'sRGB';
		const channels = metadata.channels || 3;

		const teks = `🖼️ *IMAGE PIXEL IDENTIFIER*\n\n` +
			`• 📐 *Lebar (Width):* ${width} px\n` +
			`• 📏 *Tinggi (Height):* ${height} px\n` +
			`• 🔍 *Total Pixel:* ${totalPixels} Pixels\n` +
			`• 🖼️ *Aspect Ratio:* ${aspect} (${width}:${height})\n` +
			`• 📦 *Format Gambar:* ${format}\n` +
			`• 💾 *Ukuran File:* ${size}\n` +
			`• 🎨 *Color Space:* ${space} (${channels} Channels)\n\n` +
			`_Identifikasi resolusi gambar berhasil!_ ✨`;

		reply(teks);
	} catch (err) {
		console.error('[cekpixel error]:', err);
		reply(`❌ ɢᴀɢᴀʟ membaca metadata pixel gambar: ${err.message || err}`);
	}
};

handler.help = ['cekpixel'];
handler.tags = ['tools'];
handler.command = ['cekpixel', 'pixelinfo', 'imgsize'];
handler.category = 'tools';
handler.description = 'Cek resolusi pixel, dimensi, dan metadata foto/gambar';
handler.limit = true;
handler.register = true;

export default handler;
