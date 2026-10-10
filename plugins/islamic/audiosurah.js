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

let quranCache = null;

const getQuranData = async () => {
	if (quranCache) return quranCache;
	const res = await axios.get('https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json', { timeout: 20000 });
	if (Array.isArray(res.data)) {
		quranCache = res.data;
		return quranCache;
	}
	throw new Error('Data Al-Quran tidak valid.');
};

const handler = async (m, { sock, conn, hirara, text, usedPrefix, command, reply }) => {
	const client = sock || conn || hirara || global.mainSock;

	if (!text || !text.trim()) {
		const exampleText = `📖 *AUDIO MUROTTAL SURAH AL-QURAN*\n\n` +
			`Gunakan nomor surah *(1 - 114)* atau nama surah.\n\n` +
			`• *Contoh:* \`${usedPrefix + command} 1\`\n` +
			`• *Contoh:* \`${usedPrefix + command} Al-Fatihah\`\n` +
			`• *Contoh:* \`${usedPrefix + command} Yasin\`\n\n` +
			`*Daftar Surah Populer:*\n` +
			`• 1 : Al-Fatihah (Pembuka)\n` +
			`• 2 : Al-Baqarah (Sapi Betina)\n` +
			`• 3 : Ali 'Imran (Keluarga Imran)\n` +
			`• 4 : An-Nisa' (Wanita)\n` +
			`• 18 : Al-Kahf (Penghuni Gua)\n` +
			`• 36 : Yasin (Yasin)\n` +
			`• 55 : Ar-Rahman (Maha Pengasih)\n` +
			`• 56 : Al-Waqi'ah (Hari Kiamat)\n` +
			`• 67 : Al-Mulk (Kerajaan)\n` +
			`• 112 : Al-Ikhlas (Ikhlas)\n` +
			`• 113 : Al-Falaq (Waktu Subuh)\n` +
			`• 114 : An-Nas (Manusia)`;
		return reply(exampleText);
	}

	reply(global.mess?.loading || global.mess?.wait || '⏳ _Sedang mengambil data murottal surah..._');

	try {
		const surahData = await getQuranData();
		const input = text.trim();
		let selectedSurah = null;

		if (!isNaN(input) && Number(input) >= 1 && Number(input) <= 114) {
			const num = Number(input);
			selectedSurah = surahData.find(s => s.number_of_surah == num);
		} else {
			const inputClean = input.toLowerCase().replace(/[^a-z0-9]/g, '');
			selectedSurah = surahData.find(s => {
				const nameClean = (s.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
				const idClean = (s.name_translations?.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
				const enClean = (s.name_translations?.en || '').toLowerCase().replace(/[^a-z0-9]/g, '');
				return nameClean === inputClean || idClean === inputClean || enClean === inputClean;
			});
		}

		if (!selectedSurah) {
			return reply(`❌ Surah *"${text}"* tidak ditemukan!\n\nPastikan nomor berada di rentang 1 - 114 atau nama surah tepat. Contoh: *${usedPrefix + command} Al-Mulk*`);
		}

		const audioUrl = selectedSurah.recitation;
		const surahNum = selectedSurah.number_of_surah;
		const surahNameLatin = selectedSurah.name;
		const surahNameAr = selectedSurah.name_translations?.ar || '';
		const surahMeaning = selectedSurah.name_translations?.id || selectedSurah.name_translations?.en || '';
		const totalAyah = selectedSurah.number_of_ayah;
		const place = selectedSurah.place === 'Mecca' ? 'Makkiyah' : 'Madaniyah';

		const infoCaption = `🎧 *AUDIO MUROTTAL AL-QURAN* 📖\n\n` +
			`• 🔢 *Surah Ke:* ${surahNum} dari 114\n` +
			`• 📜 *Nama Surah:* ${surahNameLatin} (${surahNameAr})\n` +
			`• 💡 *Arti Surah:* ${surahMeaning}\n` +
			`• 🔢 *Jumlah Ayat:* ${totalAyah} Ayat\n` +
			`• 📍 *Tempat Turun:* ${place}\n\n` +
			`_Mengirimkan audio murottal lengkap..._ 🎙️`;

		await reply(infoCaption);

		await client.sendMessage(m.chat, {
			audio: { url: audioUrl },
			mimetype: 'audio/mpeg',
			ptt: false,
			fileName: `Surah_${surahNum}_${surahNameLatin.replace(/\s+/g, '_')}.mp3`
		}, { quoted: m });

	} catch (error) {
		console.error('[AUDIOSURAH ERROR]', error);
		reply(`❌ Gagal mengambil audio surah: ${error.message || error}`);
	}
};

handler.help = ['audiosurah <nomor/nama>', 'audiosurat <nomor/nama>'];
handler.tags = ['islamic'];
handler.command = ['audiosurah', 'audiosurat', 'murottal', 'murotalsurah', 'quranaudio'];
handler.category = 'islamic';
handler.description = 'Dengarkan lantunan audio murottal Al-Quran per surah (1 - 114)';
handler.limit = true;
handler.register = true;

export default handler;
