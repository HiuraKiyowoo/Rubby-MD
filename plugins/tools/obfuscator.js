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

const handler = async (m, { sock, conn, text, args, usedPrefix, command, reply }) => {
	const client = sock || conn;
	let code = text ? text.trim() : '';

	// If quoting a message, use quoted text
	if (!code && m.quoted && m.quoted.text) {
		code = m.quoted.text.trim();
	}

	if (!code) {
		return reply(
			`🛡️ *JAVASCRIPT CODE OBFUSCATOR* 🎀✨\n\n` +
			`Enkripsi dan amankan source code JavaScript agar sulit dibaca & didekompilasi.\n\n` +
			`*Penggunaan:*\n` +
			`• \`${usedPrefix + command} <kode_js>\`\n` +
			`• \`${usedPrefix + command} --level <low/medium/high> <kode_js>\`\n` +
			`• Atau balas/reply pesan yang berisi kode JavaScript dengan \`${usedPrefix + command}\`\n\n` +
			`*Contoh:*\n` +
			`\`${usedPrefix + command} console.log("Hello World");\`\n` +
			`\`${usedPrefix + command} --high function add(a, b) { return a + b; }\``
		);
	}

	let level = 'medium';
	if (code.startsWith('--high') || code.startsWith('--level high') || args[0] === 'high') {
		level = 'high';
		code = code.replace(/^(--high|--level\s+high|high)\s*/i, '').trim();
	} else if (code.startsWith('--low') || code.startsWith('--level low') || args[0] === 'low') {
		level = 'low';
		code = code.replace(/^(--low|--level\s+low|low)\s*/i, '').trim();
	} else if (code.startsWith('--medium') || code.startsWith('--level medium') || args[0] === 'medium') {
		level = 'medium';
		code = code.replace(/^(--medium|--level\s+medium|medium)\s*/i, '').trim();
	}

	if (!code) {
		return reply('❌ Masukkan kode JavaScript yang ingin diobfuscate!');
	}

	await global.react?.(client, m, '⏳').catch(() => {});
	reply('⏳ *Sedang mengamankan & mengobfuscate kode JavaScript...*');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/js-obfuscator', {}, 'apikey');
		const res = await axios.post(apiUrl, { code, level }, {
			headers: { 'Content-Type': 'application/json' },
			timeout: 30000
		});

		const data = res.data;
		if (!data || !data.status || !data.result) {
			await global.react?.(client, m, '❌').catch(() => {});
			return reply(`❌ Gagal mengobfuscate kode: ${data?.error || 'Tidak ada output dari server'}`);
		}

		const obfusResult = data.result;
		const origLen = data.originalLength || code.length;
		const obfusLen = data.obfuscatedLength || obfusResult.length;
		const outLevel = data.level || level;

		const headerInfo =
			`🛡️ *JS OBFUSCATOR RESULT* 🎀✨\n\n` +
			`• ⚙️ *Level:* \`${outLevel.toUpperCase()}\`\n` +
			`• 📊 *Ukuran Awal:* \`${origLen} karakter\`\n` +
			`• 🔒 *Ukuran Obfuscated:* \`${obfusLen} karakter\`\n\n`;

		// If code length is short to medium, send formatted text with copy code button
		if (obfusResult.length <= 3500) {
			const fullCaption = `${headerInfo}\`\`\`javascript\n${obfusResult}\n\`\`\``;

			if (client && typeof client.sendButtons === 'function') {
				try {
					await client.sendButtons(m.chat, {
						text: fullCaption,
						footer: `© ${global.namaBot || 'Rubby Multi Device'} • JavaScript Obfuscator`,
						buttons: [
							{ copyCode: obfusResult, text: '📋 Salin Kode Obfuscated' }
						]
					}, { quoted: m });
					await global.react?.(client, m, '✅').catch(() => {});
					return;
				} catch (_) {}
			}

			await reply(fullCaption);
			await global.react?.(client, m, '✅').catch(() => {});
			return;
		}

		// If result is large, send as .js document file
		const fileBuffer = Buffer.from(obfusResult, 'utf-8');
		await client.sendMessage(
			m.chat,
			{
				document: fileBuffer,
				fileName: `obfuscated_${Date.now()}.js`,
				mimetype: 'application/javascript',
				caption: headerInfo + `💡 _Kode hasil obfuscation terlalu panjang (${obfusLen} karakter), dikirim sebagai file document .js di atas._`
			},
			{ quoted: m }
		);
		await global.react?.(client, m, '✅').catch(() => {});
	} catch (e) {
		console.error('[JS OBFUSCATOR ERROR]:', e.message);
		await global.react?.(client, m, '❌').catch(() => {});
		return reply(`❌ Terjadi kesalahan saat mengobfuscate kode: ${e.response?.data?.error || e.message}`);
	}
};

handler.help = ['obfuscate <kode_js>'];
handler.tags = ['tools'];
handler.command = ['obfuscate'];
handler.limit = true;
handler.register = true;

export default handler;
