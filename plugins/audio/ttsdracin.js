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
import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';

const toAudioVN = async (buffer) => {
	const tmpDir = os.tmpdir();
	const time = Date.now() + Math.random().toString(36).substring(2, 7);
	const mediaPath = path.join(tmpDir, `tts_in_${time}.mp3`);
	const outPath = path.join(tmpDir, `tts_out_${time}.ogg`);

	try {
		fs.writeFileSync(mediaPath, buffer);
		await new Promise((resolve, reject) => {
			exec(`ffmpeg -y -i "${mediaPath}" -vn -c:a libopus -b:a 64k -ac 1 -ar 48000 "${outPath}"`, (err) => {
				if (err) return reject(err);
				resolve();
			});
		});

		return fs.readFileSync(outPath);
	} catch (e) {
		console.error('[TO AUDIO VN ERROR]', e.message);
		return null;
	} finally {
		if (fs.existsSync(mediaPath)) try { fs.unlinkSync(mediaPath); } catch (_) {}
		if (fs.existsSync(outPath)) try { fs.unlinkSync(outPath); } catch (_) {}
	}
};

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
	const client = sock || conn;

	if (!text && !m.quoted) {
		return reply(`Gunakan format:\n*${usedPrefix}${command} <teks>*\n\nContoh:\n*${usedPrefix}${command} halo kyuu*\n*${usedPrefix}${command} cewe|halo kyuu* (opsional ganti voice: laki / cewe)`);
	}

	let queryText = text || m.quoted?.text || m.quoted?.caption || '';
	let voice = 'laki';

	if (queryText.includes('|')) {
		const parts = queryText.split('|');
		const v = parts[0].trim().toLowerCase();
		if (v === 'laki' || v === 'cewe' || v === 'pria' || v === 'wanita') {
			voice = (v === 'cewe' || v === 'wanita') ? 'cewe' : 'laki';
			queryText = parts.slice(1).join('|').trim();
		}
	}

	if (!queryText) {
		return reply('❌ Masukkan teks yang ingin diubah menjadi suara!');
	}

	try {
		await global.react?.(client, m, '🕒').catch(() => {});

		const apiUrl = `https://api.kyzzz.xyz/api/audio/tts-id?text=${encodeURIComponent(queryText)}&voice=${encodeURIComponent(voice)}&apikey=kyuuimp`;

		const response = await axios.get(apiUrl, {
			responseType: 'arraybuffer',
			timeout: 30000
		});

		const audioBuffer = Buffer.from(response.data);

		if (!audioBuffer || audioBuffer.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Gagal mengambil audio TTS.');
		}

		const vnBuf = await toAudioVN(audioBuffer);

		if (vnBuf) {
			await client.sendMessage(m.chat, {
				audio: vnBuf,
				mimetype: 'audio/ogg; codecs=opus',
				ptt: true
			}, { quoted: m });
		} else {
			await client.sendMessage(m.chat, {
				audio: audioBuffer,
				mimetype: 'audio/mpeg',
				ptt: false
			}, { quoted: m });
		}

		await global.react?.(client, m, '✅').catch(() => {});

	} catch (err) {
		console.error('[TTS ERROR]', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply('❌ Terjadi kesalahan saat memproses TTS.');
	}
};

handler.help = ['ttsdracin <teks>'];
handler.tags = ['audio'];
handler.command = ['ttsdracin'];
handler.limit = true;

handler.register = true;

export default handler;
