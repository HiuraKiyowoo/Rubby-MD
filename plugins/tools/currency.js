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

	// ── 1. DEFAULT: KURS DAFTAR MATA UANG UTAMA ────────────────────────────────
	if (!text) {
		await global.react?.(client, m, '⏳').catch(() => {});
		reply('⏳ *Mengambil data kurs mata uang dunia terbaru...*');

		try {
			const fetchList = POPULAR_CURRENCIES.map(async (c) => {
				try {
					const apiUrl = global.API('kyzz', '/api/tools/currency', { from: c.code, to: 'IDR', amount: 1 }, 'apikey');
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
			out += `💡 *Ingin konversi jumlah tertentu?*\n`;
			out += `Ketik: \`${usedPrefix + command} <jumlah> <dari> <ke>\`\n`;
			out += `Contoh:\n`;
			out += `• *${usedPrefix + command} 100 USD IDR*\n`;
			out += `• *${usedPrefix + command} 50 SGD IDR*\n`;
			out += `• *${usedPrefix + command} 2500000 IDR USD*`;

			if (client && typeof client.sendButtons === 'function') {
				try {
					await client.sendButtons(m.chat, {
						text: out.trim(),
						footer: `© ${global.namaBot || 'Rubby Multi Device'} • Live Exchange Rates`,
						buttons: [
							{ displayText: '🇺🇸 Konversi $100 USD', id: `${usedPrefix + command} 100 USD IDR` },
							{ displayText: '🇸🇬 Konversi $50 SGD', id: `${usedPrefix + command} 50 SGD IDR` },
							{ displayText: '🇪🇺 Konversi €50 EUR', id: `${usedPrefix + command} 50 EUR IDR` }
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

	// ── 2. CONVERT SPECIFIC CURRENCY ───────────────────────────────────────────
	let amount = 1;
	let from = 'USD';
	let to = 'IDR';

	// Case: ".currency 100 USD IDR" or ".currency 100 USD" or ".currency USD IDR"
	if (args.length === 1) {
		from = args[0].toUpperCase();
		to = 'IDR';
	} else if (args.length === 2) {
		if (!isNaN(args[0])) {
			amount = parseFloat(args[0]);
			from = args[1].toUpperCase();
			to = 'IDR';
		} else {
			from = args[0].toUpperCase();
			to = args[1].toUpperCase();
		}
	} else if (args.length >= 3) {
		amount = parseFloat(args[0]) || 1;
		from = args[1].toUpperCase();
		to = args[2].toUpperCase();
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply(`⏳ *Mengonversi ${amount.toLocaleString('id-ID')} ${from} ke ${to}...*`);

	try {
		const apiUrl = global.API('kyzz', '/api/tools/currency', { from, to, amount }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Gagal mengonversi mata uang: ${data?.error || 'Mata uang tidak didukung.'}`);
		}

		const rate = data.rate || 0;
		const totalResult = data.result || (amount * rate);
		const formattedVal = data.formatted || totalResult.toLocaleString('id-ID');
		const lastUpdated = data.lastUpdated || 'Hari ini';

		const out =
			`💱 *HASIL KONVERSI MATA UANG* 🎀✨\n\n` +
			`• 💵 *Jumlah Awal:* *${amount.toLocaleString('id-ID')} ${from}*\n` +
			`• 🎯 *Hasil Konversi:* *${formattedVal} ${to}*\n` +
			`• 📈 *Nilai Kurs (Rate):* \`1 ${from} = ${rate.toLocaleString('id-ID')} ${to}\`\n` +
			`• 🕒 *Terakhir Diperbarui:* \`${lastUpdated}\`\n\n` +
			`━━━━━━━━━━━━━━━━━━━━\n` +
			`💡 _Data nilai tukar diambil secara realtime dari pasar valuta asing internasional._`;

		if (client && typeof client.sendButtons === 'function') {
			try {
				await client.sendButtons(m.chat, {
					text: out.trim(),
					footer: `© ${global.namaBot || 'Rubby Multi Device'} • Currency Exchange`,
					buttons: [
						{ displayText: '🔄 Kurs Utama Lainnya', id: `${usedPrefix + command}` },
						{ displayText: '💵 Konversi $100 USD', id: `${usedPrefix + command} 100 USD IDR` }
					]
				}, { quoted: m });
				await global.react?.(client, m, '✅').catch(() => {});
				return;
			} catch (_) {}
		}

		await reply(out.trim());
		await global.react?.(client, m, '✅').catch(() => {});
	} catch (e) {
		console.error('[CURRENCY ERROR]:', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Terjadi kesalahan saat konversi mata uang: ${e.response?.data?.error || e.message}`);
	}
};

handler.help = ['currency <jumlah> <dari> <ke>'];
handler.tags = ['tools'];
handler.command = ['currency'];
handler.limit = true;
handler.register = true;

export default handler;
