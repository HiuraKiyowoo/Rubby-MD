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

const POPULAR_CURRENCIES = [
	{ code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
	{ code: 'EUR', name: 'Euro', flag: '🇪🇺' },
	{ code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
	{ code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
	{ code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
	{ code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
	{ code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
	{ code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
	{ code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' }
];

const handler = async (m, { sock, conn, text, args, usedPrefix, command, reply }) => {
	const client = sock || conn;
	const currInput = (args[0] || text || '').toUpperCase().trim();

	await global.react?.(client, m, '⏳').catch(() => {});

	// ── 1. JIKA TANPA PARAMETER: TAMPILKAN TABEL KURS LENGKAP ──────────────────
	if (!currInput) {
		reply('⏳ *Mengambil data kurs valuta asing hari ini...*');

		try {
			const fetchList = POPULAR_CURRENCIES.map(async (c) => {
				try {
					const apiUrl = global.API('kyzz', '/api/tools/kurs', { from: c.code, to: 'IDR', amount: 1 }, 'apikey');
					const { data } = await axios.get(apiUrl, { timeout: 15000 });
					return {
						...c,
						rate: data.rate || data.result,
						formatted: data.formatted || (data.rate ? data.rate.toLocaleString('id-ID') : null)
					};
				} catch (_) {
					return { ...c, rate: null, formatted: '-' };
				}
			});

			const results = await Promise.all(fetchList);

			let out = `💱 *KURS MATA UANG DUNIA HARI INI* 🎀✨\n\n`;
			out += `Nilai tukar mata uang global ke *Rupiah (IDR)*:\n\n`;

			for (const r of results) {
				const rateText = r.rate ? `Rp ${Math.round(r.rate).toLocaleString('id-ID')}` : 'Tidak tersedia';
				out += `${r.flag} *1 ${r.code}* (${r.name}):\n   └ 💵 *${rateText}*\n\n`;
			}

			out += `━━━━━━━━━━━━━━━━━━━━\n`;
			out += `💡 *Cek kurs spesifik:*\n`;
			out += `Ketik: \`${usedPrefix + command} <mata_uang>\`\n`;
			out += `Contoh: \`${usedPrefix + command} USD\` atau \`${usedPrefix + command} SGD\``;

			if (client && typeof client.sendButtons === 'function') {
				try {
					await client.sendButtons(m.chat, {
						text: out.trim(),
						footer: `© ${global.namaBot || 'Rubby Multi Device'} • Live Exchange Rates`,
						buttons: [
							{ displayText: '🇺🇸 Cek Kurs USD', id: `${usedPrefix + command} USD` },
							{ displayText: '🇸🇬 Cek Kurs SGD', id: `${usedPrefix + command} SGD` },
							{ displayText: '🇪🇺 Cek Kurs EUR', id: `${usedPrefix + command} EUR` }
						]
					}, { quoted: m });
					await global.react?.(client, m, '✅').catch(() => {});
					return;
				} catch (_) {}
			}

			await reply(out.trim());
			await global.react?.(client, m, '✅').catch(() => {});
			return;
		} catch (e) {
			console.error('[KURS LIST ERROR]:', e.message);
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Gagal mengambil kurs: ${e.message}`);
		}
	}

	// ── 2. CEK KURS SPESIFIK ───────────────────────────────────────────────────
	reply(`⏳ *Mengambil kurs ${currInput} ke IDR...*`);
	try {
		const apiUrl = global.API('kyzz', '/api/tools/kurs', { from: currInput, to: 'IDR', amount: 1 }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 20000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Mata uang *"${currInput}"* tidak ditemukan.`);
		}

		const rate = data.rate || data.result || 0;
		const formattedVal = data.formatted || `Rp ${Math.round(rate).toLocaleString('id-ID')}`;

		const out =
			`💱 *INFO KURS MATA UANG* 🎀✨\n\n` +
			`• 💵 *Mata Uang:* *1 ${currInput}*\n` +
			`• 🇮🇩 *Nilai Rupiah:* *${formattedVal} IDR*\n` +
			`• 🕒 *Pembaruan:* \`${data.lastUpdated || 'Hari ini'}\`\n\n` +
			`━━━━━━━━━━━━━━━━━━━━\n` +
			`💡 _Data nilai tukar diambil secara realtime dari pasar uang internasional._`;

		if (client && typeof client.sendButtons === 'function') {
			try {
				await client.sendButtons(m.chat, {
					text: out.trim(),
					footer: `© ${global.namaBot || 'Rubby Multi Device'} • Live Kurs`,
					buttons: [
						{ displayText: '🔄 Daftar Kurs Lainnya', id: `${usedPrefix + command}` }
					]
				}, { quoted: m });
				await global.react?.(client, m, '✅').catch(() => {});
				return;
			} catch (_) {}
		}

		await reply(out.trim());
		await global.react?.(client, m, '✅').catch(() => {});
	} catch (e) {
		console.error('[KURS SINGLE ERROR]:', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Gagal mengambil kurs ${currInput}: ${e.message}`);
	}
};

handler.help = ['kurs [mata_uang]'];
handler.tags = ['tools'];
handler.command = ['kurs'];
handler.limit = true;
handler.register = true;

export default handler;
