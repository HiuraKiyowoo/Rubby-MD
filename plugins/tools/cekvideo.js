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

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const execPromise = promisify(exec);

const formatBytes = (bytes, decimals = 2) => {
	if (!bytes || bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatDuration = (seconds) => {
	const sec = Math.floor(seconds || 0);
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	if (h > 0) return `${h} jam ${m} mnt ${s} dtk`;
	if (m > 0) return `${m} mnt ${s} dtk`;
	return `${s} detik`;
};

const handler = async (m, { usedPrefix, command, reply }) => {
	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mtype || '';

	if (!/video|gif/.test(mime)) {
		return reply(`Kirim atau reply video/GIF dengan caption *${usedPrefix + command}*`);
	}

	reply(global.mess?.loading || '⏳ _Menganalisis metadata video..._');

	let tmpFile = null;
	try {
		const media = await q.download();
		if (!media || !Buffer.isBuffer(media)) {
			return reply('❌ ɢᴀɢᴀʟ mendownload media video.');
		}

		const tmpName = `vid_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.mp4`;
		tmpFile = path.join(os.tmpdir(), tmpName);
		await fs.promises.writeFile(tmpFile, media);

		const cmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${tmpFile}"`;
		const { stdout } = await execPromise(cmd);
		const data = JSON.parse(stdout || '{}');

		const vStream = (data.streams || []).find(s => s.codec_type === 'video') || {};
		const aStream = (data.streams || []).find(s => s.codec_type === 'audio') || {};
		const fmt = data.format || {};

		const width = vStream.width || 0;
		const height = vStream.height || 0;
		const duration = parseFloat(fmt.duration || vStream.duration || 0);
		const fpsRaw = vStream.r_frame_rate || vStream.avg_frame_rate || '0/1';
		const [fNom, fDenom] = fpsRaw.split('/').map(Number);
		const fps = fDenom && fNom ? Math.round(fNom / fDenom) : '-';
		const vCodec = (vStream.codec_name || '-').toUpperCase();
		const aCodec = (aStream.codec_name || 'Tidak ada audio').toUpperCase();
		const bitRate = fmt.bit_rate ? `${Math.round(fmt.bit_rate / 1000)} kbps` : '-';
		const size = media.length ? formatBytes(media.length) : formatBytes(fmt.size || 0);
		const formatName = (fmt.format_long_name || fmt.format_name || 'MP4').split(',')[0];

		const totalPixels = width && height ? (width * height).toLocaleString('id-ID') : '-';
		const aspect = width && height ? `${(width / height).toFixed(2)} (${width}:${height})` : '-';

		const teks = `🎬 *VIDEO SPEC & METADATA IDENTIFIER*\n\n` +
			`• 📐 *Resolusi (Px):* ${width} x ${height} px\n` +
			`• 🔍 *Total Pixel:* ${totalPixels} Pixels\n` +
			`• 🖼️ *Aspect Ratio:* ${aspect}\n` +
			`• ⏱️ *⏱️ *ᴅᴜʀᴀsɪ:** ${formatDuration(duration)} (${duration.toFixed(1)}s)\n` +
			`• 🎞️ *Frame Rate (FPS):* ${fps} FPS\n` +
			`• 📦 *Format Container:* ${formatName}\n` +
			`• 🎥 *Video Codec:* ${vCodec}\n` +
			`• 🔊 *Audio Codec:* ${aCodec}\n` +
			`• ⚡ *Bitrate:* ${bitRate}\n` +
			`• 💾 *Ukuran File:* ${size}\n\n` +
			`_Identifikasi video berhasil!_ ✨`;

		reply(teks);
	} catch (err) {
		console.error('[cekvideo error]:', err);
		reply(`❌ ɢᴀɢᴀʟ membaca metadata video: ${err.message || err}`);
	} finally {
		if (tmpFile && fs.existsSync(tmpFile)) {
			await fs.promises.unlink(tmpFile).catch(() => null);
		}
	}
};

handler.help = ['cekvideo'];
handler.tags = ['tools'];
handler.command = ['cekvideo', 'vidinfo', 'cekvid', 'videometa', 'vidsize', 'cekresolusivid'];
handler.category = 'tools';
handler.description = 'Cek resolusi pixel, durasi, codec, FPS, dan bitrate video';
handler.limit = true;
handler.register = true;

export default handler;
