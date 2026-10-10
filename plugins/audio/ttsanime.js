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

const ANIME_VOICES = {
	miku: { id: 3, name: 'Hatsune Miku', desc: 'Vocaloid' },
	nahida: { id: 14, name: 'Nahida', desc: 'Genshin Impact' },
	nami: { id: 16, name: 'Nami', desc: 'One Piece' },
	goku: { id: 21, name: 'Son Goku', desc: 'Dragon Ball' },
	kurumi: { id: 1, name: 'Kurumi Tokisaki', desc: 'Date A Live' },
	anya: { id: 8, name: 'Anya Forger', desc: 'Spy x Family' },
	hutao: { id: 14, name: 'Hu Tao', desc: 'Genshin Impact' },
	furina: { id: 23, name: 'Furina', desc: 'Genshin Impact' },
	raiden: { id: 13, name: 'Raiden Shogun', desc: 'Genshin Impact' },
	megumin: { id: 20, name: 'Megumin', desc: 'Konosuba' },
	klee: { id: 27, name: 'Klee', desc: 'Genshin Impact' },
	zundamon: { id: 1, name: 'Zundamon (ずんだもん)', desc: 'Ceria & Menggemaskan' },
	tsumugi: { id: 8, name: 'Kasukabe Tsumugi (春日部つむぎ)', desc: 'Gadis Periang' },
	ritsu: { id: 13, name: 'Namidare Ritsu (波音リツ)', desc: 'Suara Elegan & Dewasa' },
	himari: { id: 14, name: 'Meimei Himari (冥鳴ひまり)', desc: 'Suara Lembut & Imut' },
	sora: { id: 16, name: 'Kyushu Sora (九州そら)', desc: 'Suara Onee-san' },
	mochiko: { id: 20, name: 'Mochiko-san (もち子さん)', desc: 'Suara Jernih & Manis' },
	whitecul: { id: 23, name: 'WhiteCUL', desc: 'Karakter Cool & Tenang' },
	shikimi: { id: 27, name: 'Chibi Shikimi (後鬼)', desc: 'Suara Centil & Lincah' },
	seven: { id: 29, name: 'No.7 (SEVEN)', desc: 'Suara Manis & Ramah' },
	saki: { id: 51, name: 'Saki (小夜/SAYO)', desc: 'Suara Halus & Santai' }
};

const toAudioVN = async (buffer) => {
	const tmpDir = os.tmpdir();
	const time = Date.now() + Math.random().toString(36).substring(2, 7);
	const mediaPath = path.join(tmpDir, `ttsanime_in_${time}.mp3`);
	const outPath = path.join(tmpDir, `ttsanime_out_${time}.ogg`);

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
	const client = sock || conn || global.mainSock || global.conn;

	if (!text && !m.quoted) {
		return reply(
			`🌸 *TTS ANIME (TEXT TO SPEECH)* 🎀✨\n\n` +
			`Gunakan format:\n` +
			`• *${usedPrefix + command} <teks>*\n` +
			`• *${usedPrefix + command} <karakter>|<teks>*\n\n` +
			`Contoh:\n` +
			`• *${usedPrefix + command} konnichiwa minna-san*\n` +
			`• *${usedPrefix + command} miku|daisuki dayo*\n\n` +
			`💡 _Ketik \`${usedPrefix + command} <teks>\` untuk membuka Single Select pilihan karakter anime._`
		);
	}

	let query = (text || m.quoted?.text || m.quoted?.caption || '').trim();

	let selectedVoiceKey = null;
	if (query.includes('|')) {
		const parts = query.split('|');
		const potentialChar = parts[0].trim().toLowerCase().replace(/\s+/g, '');
		if (ANIME_VOICES[potentialChar]) {
			selectedVoiceKey = potentialChar;
			query = parts.slice(1).join('|').trim();
		}
	}

	if (!selectedVoiceKey) {
		try {
			const btn = new Button(client);
			btn.setBody(
				`🌸 *TTS ANIME - PILIH SUARA KARAKTER* 🎀✨\n\n` +
				`📝 *Teks:* "${query}"\n\n` +
				`Silakan pilih suara karakter anime pada menu di bawah ini:`
			);
			btn.setFooter(`© Hirara AI • Anime TTS Engine`);
			btn.addSelection('🎭 PILIH KARAKTER ANIME');
			btn.makeSection('✨ Daftar Suara Karakter Anime');

			for (const [key, item] of Object.entries(ANIME_VOICES)) {
				btn.makeRow(
					'',
					item.name.slice(0, 24),
					item.desc.slice(0, 50),
					`${usedPrefix + command} ${key}|${query}`
				);
			}

			await btn.send(m.chat, { quoted: m });
			return;
		} catch (errBtn) {
			console.error('[Single Select Error, using fallback text]:', errBtn.message);
			const voiceList = Object.entries(ANIME_VOICES)
				.map(([k, v]) => `• *${usedPrefix + command} ${k}|${query}* → ${v.name}`)
				.join('\n');
			return reply(`🌸 *PILIH SUARA KARAKTER ANIME:*\n\n${voiceList}`);
		}
	}

	await global.react?.(client, m, '🕒').catch(() => {});

	try {
		let audioBuffer = null;

		try {
			const kyzzUrl = global.API('kyzz', '/api/audio/tts', {
				text: query,
				voice: selectedVoiceKey
			}, 'apikey');

			const resKyzz = await axios.get(kyzzUrl, { responseType: 'arraybuffer', timeout: 12000 });
			if (resKyzz.data && resKyzz.data.length > 500) {
				const headerStr = resKyzz.data.slice(0, 50).toString();
				if (!headerStr.includes('"status":false') && !headerStr.includes('"error"')) {
					audioBuffer = Buffer.from(resKyzz.data);
				}
			}
		} catch (_) {}

		if (!audioBuffer) {
			const speakerId = ANIME_VOICES[selectedVoiceKey]?.id || 1;
			const questUrl = `https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(query)}&speaker=${speakerId}`;
			const initRes = await axios.get(questUrl, { timeout: 15000 });

			if (initRes.data?.success && initRes.data?.audioStatusUrl) {
				let isReady = false;
				let attempts = 0;
				while (!isReady && attempts < 15) {
					await new Promise((r) => setTimeout(r, 1000));
					const statusRes = await axios.get(initRes.data.audioStatusUrl, { timeout: 5000 });
					if (statusRes.data?.isAudioReady) {
						isReady = true;
						break;
					}
					attempts++;
				}

				if (isReady && initRes.data?.mp3DownloadUrl) {
					const dlRes = await axios.get(initRes.data.mp3DownloadUrl, { responseType: 'arraybuffer', timeout: 15000 });
					if (dlRes.data && dlRes.data.length > 500) {
						audioBuffer = Buffer.from(dlRes.data);
					}
				}
			}
		}

		if (!audioBuffer || audioBuffer.length === 0) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply('❌ Gagal menghasilkan audio TTS Anime.');
		}

		const vnBuf = await toAudioVN(audioBuffer);

		if (vnBuf) {
			await client.sendMessage(
				m.chat,
				{
					audio: vnBuf,
					mimetype: 'audio/ogg; codecs=opus',
					ptt: true
				},
				{ quoted: m }
			);
		} else {
			await client.sendMessage(
				m.chat,
				{
					audio: audioBuffer,
					mimetype: 'audio/mpeg',
					ptt: false
				},
				{ quoted: m }
			);
		}

		await global.react?.(client, m, '✅').catch(() => {});
	} catch (err) {
		console.error('[TTS ANIME ERROR]', err.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply('❌ Terjadi kesalahan saat memproses TTS Anime.');
	}
};

handler.help = ['tts-anime', 'ttsanime'];
handler.tags = ['audio', 'anime'];
handler.command = ['tts-anime', 'ttsanime', 'animetts', 'voiceanime'];

export default handler;
