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

const TOP_COINS = [
	{ code: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
	{ code: 'eth', name: 'Ethereum', symbol: 'ETH', icon: '🔷' },
	{ code: 'sol', name: 'Solana', symbol: 'SOL', icon: '🟣' },
	{ code: 'bnb', name: 'Binance Coin', symbol: 'BNB', icon: '🟡' },
	{ code: 'doge', name: 'Dogecoin', symbol: 'DOGE', icon: '🐕' }
];

const handler = async (m, { sock, conn, text, args, usedPrefix, command, reply }) => {
	const client = sock || conn;
	const coinInput = (args[0] || text || '').toLowerCase().trim();

	// ── 1. DEFAULT: OVERVIEW TOP CRYPTO ────────────────────────────────────────
	if (!coinInput) {
		await global.react?.(client, m, '⏳').catch(() => {});
		reply('⏳ *Mengambil harga pasar crypto teratas hari ini...*');

		try {
			const fetchList = TOP_COINS.map(async (c) => {
				try {
					const apiUrl = global.API('kyzz', '/api/tools/crypto', { coin: c.code }, 'apikey');
					const { data } = await axios.get(apiUrl, { timeout: 15000 });
					return {
						...c,
						data
					};
				} catch (_) {
					return { ...c, data: null };
				}
			});

			const results = await Promise.all(fetchList);

			let out = `🪙 *PASAR CRYPTOCURRENCY HARI INI* 🎀✨\n\n`;
			out += `Harga aset kripto terpopuler secara realtime:\n\n`;

			for (const r of results) {
				const d = r.data;
				if (d && d.status) {
					const change = d.change_24h_usd ?? 0;
					const changeEmoji = change >= 0 ? '📈 +' : '📉 ';
					out += `${r.icon} *${r.name} (${r.symbol})*\n`;
					out += `   └ 💵 *USD:* \`${d.formatted_usd || `$${d.price_usd?.toLocaleString()}`}\`\n`;
					out += `   └ 🇮🇩 *IDR:* \`${d.formatted_idr || `Rp ${d.price_idr?.toLocaleString('id-ID')}`}\`\n`;
					out += `   └ 24h: *${changeEmoji}${change.toFixed(2)}%*\n\n`;
				}
			}

			out += `━━━━━━━━━━━━━━━━━━━━\n`;
			out += `💡 *Cek detail koin spesifik:*\n`;
			out += `Ketik: \`${usedPrefix + command} <nama/simbol koin>\`\n`;
			out += `Contoh:\n`;
			out += `• *${usedPrefix + command} btc*\n`;
			out += `• *${usedPrefix + command} eth*\n`;
			out += `• *${usedPrefix + command} sol*\n`;
			out += `• *${usedPrefix + command} xrp*`;

			if (client && typeof client.sendButtons === 'function') {
				try {
					await client.sendButtons(m.chat, {
						text: out.trim(),
						footer: `© ${global.namaBot || 'Rubby Multi Device'} • Live Crypto Tracker`,
						buttons: [
							{ displayText: '₿ Cek Bitcoin', id: `${usedPrefix + command} btc` },
							{ displayText: '🔷 Cek Ethereum', id: `${usedPrefix + command} eth` },
							{ displayText: '🟣 Cek Solana', id: `${usedPrefix + command} sol` }
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
			console.error('[CRYPTO OVERVIEW ERROR]:', e.message);
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Gagal mengambil data crypto: ${e.message}`);
		}
	}

	// ── 2. SINGLE COIN DETAIL ──────────────────────────────────────────────────
	await global.react?.(client, m, '⏳').catch(() => {});
	reply(`⏳ *Mengambil data pasar crypto untuk "${coinInput.toUpperCase()}"...*`);

	try {
		const apiUrl = global.API('kyzz', '/api/tools/crypto', { coin: coinInput }, 'apikey');
		const { data } = await axios.get(apiUrl, { timeout: 25000 });

		if (!data || !data.status) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Koin *"${coinInput}"* tidak ditemukan. Pastikan nama atau simbol koin sudah benar (misal: btc, eth, sol, doge, xrp).`);
		}

		const change = data.change_24h_usd ?? 0;
		const changeSign = change >= 0 ? '📈 +' : '📉 ';
		const coinName = (data.coin || coinInput).toUpperCase();
		const mcUsd = data.market_cap_usd ? `$${Math.round(data.market_cap_usd).toLocaleString()}` : '-';
		const mcIdr = data.market_cap_idr ? `Rp ${Math.round(data.market_cap_idr).toLocaleString('id-ID')}` : '-';

		const out =
			`🪙 *CRYPTO MARKET INFO: ${coinName}* 🎀✨\n\n` +
			`• 💵 *Harga (USD):* *${data.formatted_usd || `$${data.price_usd?.toLocaleString()}`}*\n` +
			`• 🇮🇩 *Harga (IDR):* *${data.formatted_idr || `Rp ${data.price_idr?.toLocaleString('id-ID')}`}*\n` +
			`• 📊 *Perubahan 24 Jam:* *${changeSign}${change.toFixed(2)}%*\n` +
			`• 🏛️ *Kapitalisasi Pasar (USD):* \`${mcUsd}\`\n` +
			`• 🏛️ *Kapitalisasi Pasar (IDR):* \`${mcIdr}\`\n\n` +
			`━━━━━━━━━━━━━━━━━━━━\n` +
			`💡 _Harga pasar aset kripto fluktuatif dan diperbarui secara realtime._`;

		if (client && typeof client.sendButtons === 'function') {
			try {
				await client.sendButtons(m.chat, {
					text: out.trim(),
					footer: `© ${global.namaBot || 'Rubby Multi Device'} • Live Crypto Price`,
					buttons: [
						{ displayText: '🔄 Pasar Crypto Utama', id: `${usedPrefix + command}` },
						{ displayText: '₿ Cek Bitcoin', id: `${usedPrefix + command} btc` }
					]
				}, { quoted: m });
				await global.react?.(client, m, '✅').catch(() => {});
				return;
			} catch (_) {}
		}

		await reply(out.trim());
		await global.react?.(client, m, '✅').catch(() => {});
	} catch (e) {
		console.error('[CRYPTO ERROR]:', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Terjadi kesalahan saat mengambil harga crypto: ${e.response?.data?.error || e.message}`);
	}
};

handler.help = ['crypto [koin]'];
handler.tags = ['tools'];
handler.command = ['crypto'];
handler.limit = true;
handler.register = true;

export default handler;
