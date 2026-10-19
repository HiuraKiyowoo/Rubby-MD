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

const beautifyJS = (code) => {
	try {
		return code
			.replace(/([=+\-*/%<>!&|^])\s*([=+\-*/%<>!&|^])/g, '$1 $2')
			.replace(/([=+\-*/%<>!&|^])\s*([^=+\-*/%<>!&|^])/g, '$1 $2')
			.replace(/,(?!\s)/g, ', ')
			.replace(/;(?!\s|\n)/g, '; ')
			.replace(/function\s*\(/g, 'function (')
			.replace(/\)\s*{/g, ') {')
			.replace(/(if|for|while|switch)\s*\(/g, '$1 (')
			.replace(/:\s*(?!\s)/g, ': ')
			.replace(/\[\s+/g, '[')
			.replace(/\s+\]/g, ']')
			.replace(/{\s*([^}]+)\s*}/g, (match, content) => {
				if (content.includes(';') || content.includes('{')) {
					return '{\n    ' + content.trim().replace(/;\s*/g, ';\n    ').replace(/\n\s*$/, '\n') + '}';
				}
				return match;
			})
			.replace(/;\s*}/g, ';\n}')
			.replace(/}\s*else\s*{/g, '} else {')
			.replace(/}\s*catch\s*\(/g, '} catch (')
			.replace(/}\s*finally\s*{/g, '} finally {');
	} catch {
		return code;
	}
};

const beautifyCSS = (code) => {
	try {
		return code
			.replace(/([^{\s])\s*{/g, '$1 {')
			.replace(/:\s*([^;]+)/g, ': $1')
			.replace(/,(?!\s)/g, ', ')
			.replace(/{([^}]+)}/g, (match, content) => {
				const props = content.split(';').filter(p => p.trim());
				if (props.length > 1) {
					return '{\n    ' + props.map(p => p.trim()).join(';\n    ') + ';\n}';
				}
				return match;
			});
	} catch {
		return code;
	}
};

const beautifyHTML = (code) => {
	try {
		return code
			.replace(/>\s*</g, '>\n<')
			.replace(/(<[^\/][^>]*>)([^<]*<)/g, '$1\n    $2')
			.replace(/([^\/])>/g, '$1 >')
			.replace(/\s+>/g, '>')
			.replace(/\s+/g, ' ')
			.replace(/>\s+</g, '><')
			.trim();
	} catch {
		return code;
	}
};

const beautifyJSON = (code) => {
	try {
		const parsed = JSON.parse(code);
		return JSON.stringify(parsed, null, 2);
	} catch {
		return code;
	}
};

const detectLang = (code) => {
	if (/^\s*[\{\[]/.test(code) && /[\}\]]\s*$/.test(code)) return 'json';
	if (/<html|<div|<body|<head|<!DOCTYPE/i.test(code)) return 'html';
	if (/\{[\s\S]*:\s*[\s\S]*\}/.test(code) && /@media|#|\./.test(code)) return 'css';
	return 'javascript';
};

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
	const client = sock || conn;
	const input = text || (m.quoted && m.quoted.text);
	if (!input) {
		return reply(
			`✨ *CODE BEAUTIFIER & FORMATTER* 🎀✨\n\n` +
			`Rapikan susunan indentasi kode JavaScript, JSON, HTML, & CSS agar mudah dibaca.\n\n` +
			`*Penggunaan:*\n` +
			`• \`${usedPrefix + command} <code>\`\n` +
			`• Atau balas/reply pesan yang berisi kode dengan \`${usedPrefix + command}\``
		);
	}

	const lang = detectLang(input);
	let result = input;

	await global.react?.(client, m, '⏳').catch(() => {});

	// 1. Try Kyzz API
	let done = false;
	try {
		const apiUrl = global.API('kyzz', '/api/tools/code-beautify', {}, 'apikey');
		const res = await axios.post(apiUrl, { code: input, type: lang, indent: 2 }, {
			headers: { 'Content-Type': 'application/json' },
			timeout: 20000
		});
		if (res.data && res.data.status && res.data.result) {
			result = res.data.result;
			done = true;
		}
	} catch (_) {}

	// 2. Try Fallback Public API
	if (!done) {
		try {
			const res = await fetch('https://api.beautifier.io/api/beautify', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ source: input, type: lang, options: { indent_size: 2 } }),
				signal: AbortSignal.timeout(6000)
			});
			if (res.ok) {
				const d = await res.json();
				result = d.data || d.beautified || d.result || input;
				done = true;
			}
		} catch (_) {}
	}

	// 3. Fallback to Local Beautifier
	if (!done) {
		if (lang === 'json') result = beautifyJSON(input);
		else if (lang === 'html') result = beautifyHTML(input);
		else if (lang === 'css') result = beautifyCSS(input);
		else result = beautifyJS(input);
	}

	const caption = `✨ *BEAUTIFY CODE (${lang.toUpperCase()})* 🎀✨\n\n\`\`\`${lang}\n${result}\n\`\`\``;

	if (result.length <= 3500) {
		if (client && typeof client.sendButtons === 'function') {
			try {
				await client.sendButtons(m.chat, {
					text: caption,
					footer: `© ${global.namaBot || 'Rubby Multi Device'} • Code Beautifier`,
					buttons: [
						{ copyCode: result, text: '📋 Salin Kode' }
					]
				}, { quoted: m });
				await global.react?.(client, m, '✅').catch(() => {});
				return;
			} catch (_) {}
		}
		await reply(caption);
		await global.react?.(client, m, '✅').catch(() => {});
		return;
	}

	// Large file -> send as document
	const ext = lang === 'javascript' ? 'js' : lang;
	const fileBuffer = Buffer.from(result, 'utf-8');
	await client.sendMessage(
		m.chat,
		{
			document: fileBuffer,
			fileName: `beautified_${Date.now()}.${ext}`,
			mimetype: 'text/plain',
			caption: `✨ *BEAUTIFY CODE (${lang.toUpperCase()})*\n\nKode hasil format dikirim sebagai dokumen file di atas.`
		},
		{ quoted: m }
	);
	await global.react?.(client, m, '✅').catch(() => {});
};

handler.help = ['beautify <reply/kode>'];
handler.tags = ['tools'];
handler.command = ['beautify'];
handler.limit = true;
handler.register = true;

export default handler;
