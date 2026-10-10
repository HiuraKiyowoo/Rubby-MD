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

const _resepCache = new Map();

const sendReact = async (conn, sock, m, emoji) => {
	try {
		const client = conn || sock || global.mainSock;
		if (client?.sendMessage) {
			await client.sendMessage(m.chat, { react: { text: emoji, key: m.key } });
		}
	} catch (e) {
		console.error('[RESEP REACT ERROR]', e.message);
	}
};

let handler = async (m, { conn, sock, text, usedPrefix, command, reply }) => {
	const client = conn || sock || global.mainSock;
	const input = (text || '').trim();

	if (!input) {
		return reply(
			`🍳 *PENCARIAN RESEP MASAKAN (Kyzz APIs)* 🍳\n\n` +
			`Gunakan perintah:\n` +
			`> \`${usedPrefix}${command} <nama masakan>\`\n\n` +
			`*Contoh:*\n` +
			`\`${usedPrefix}${command} Ayam\`\n` +
			`\`${usedPrefix}${command} Nasi Goreng\``
		);
	}

	const args = input.split(' ');
	let selectNum = null;
	if (args[0].toLowerCase() === 'get' && args[1] && !isNaN(args[1])) {
		selectNum = parseInt(args[1]);
	} else if (!isNaN(args[0])) {
		selectNum = parseInt(args[0]);
	}

	if (selectNum !== null) {
		const index = selectNum - 1;
		const cached = _resepCache.get(m.chat);

		if (!cached || !cached[index]) {
			return reply(`⚠️ Sesi resep tidak ditemukan atau nomor pilihan salah. Silakan cari ulang dengan \`${usedPrefix}${command} <nama masakan>\``);
		}

		const item = cached[index];
		await sendReact(conn, sock, m, '🕒');

		try {
			const ingredientsList = Array.isArray(item.ingredients) && item.ingredients.length > 0
				? item.ingredients.map((ing) => `• ${ing}`).join('\n')
				: '• Tidak ada detail bahan';

			const hasUrl = item.url && item.url.startsWith('http');

			const caption = `🍳 *${item.title.toUpperCase()}*\n\n` +
				`⏱️ *Waktu:* ${item.time || '-'}\n` +
				`🍽️ *Porsi:* ${item.servings || '-'}\n` +
				(item.chef ? `👨‍🍳 *Koki:* ${item.chef}\n` : '') +
				`\n📝 *Bahan-bahan:*\n${ingredientsList}\n` +
				(hasUrl ? `\n🌐 *Link Cookpad:* ${item.url}\n` : '') +
				`\n✨ *Provider:* Kyzz APIs`;

			if (item.image) {
				await client.sendMessage(m.chat, {
					image: { url: item.image },
					caption: caption
				}, { quoted: m });
			} else {
				await reply(caption);
			}

			await sendReact(conn, sock, m, '✅');
		} catch (e) {
			console.error('[RESEP GET ERROR]', e.message);
			await sendReact(conn, sock, m, '❌');
			await reply(`❌ Gagal menampilkan detail resep: ${e.message}`);
		}
		return;
	}

	await sendReact(conn, sock, m, '🕒');

	try {
		const apiKey = global.APIKeys?.['https://api.kyzzz.xyz'] || 'kyuuimp';
		let apiUrl;
		if (typeof global.API === 'function') {
			apiUrl = global.API('kyzz', '/api/search/resep', { query: input, page: 1 }, 'apikey');
		} else {
			apiUrl = `https://api.kyzzz.xyz/api/search/resep?query=${encodeURIComponent(input)}&page=1&apikey=${apiKey}`;
		}

		const { data } = await axios.get(apiUrl, { timeout: 30000 });

		if (!data?.status || !data?.result?.recipes || data.result.recipes.length === 0) {
			await sendReact(conn, sock, m, '❌');
			return reply(`❌ Resep masakan untuk *"${input}"* tidak ditemukan.`);
		}

		const recipes = data.result.recipes;
		_resepCache.set(m.chat, recipes);

		const maxShow = Math.min(recipes.length, 10);
		const rows = recipes.slice(0, maxShow).map((item, idx) => ({
			title: `${idx + 1}. ${item.title}`.substring(0, 24),
			description: `⏱️ ${item.time || '-'} | 🍽️ ${item.servings || '-'}`,
			id: `${usedPrefix}${command} ${idx + 1}`
		}));

		let textList = `🍳 *PENCARIAN RESEP MASAKAN*\n\n` +
			`🔍 *Kata Kunci:* ${input}\n` +
			`📊 *Ditemukan:* ${recipes.length} resep\n\n`;

		recipes.slice(0, maxShow).forEach((item, idx) => {
			textList += `*${idx + 1}. ${item.title}*\n`;
			textList += `   ⏱️ Waktu: ${item.time || '-'}\n`;
			textList += `   🍽️ Porsi: ${item.servings || '-'}\n\n`;
		});

		textList += `📌 *Pilih resep pada tombol menu di bawah, atau ketik:* \`${usedPrefix}${command} <nomor>\``;

		let listSent = false;

		if (typeof client?.sendButtons === 'function') {
			try {
				await client.sendButtons(m.chat, {
					text: textList,
					footer: global.botName || 'Rubby Multi Device',
					buttons: [
						{
							title: '📜 Pilih Resep Masakan',
							sections: [
								{
									title: `Hasil Pencarian: ${input}`,
									rows: rows
								}
							]
						}
					]
				}, { quoted: m });
				listSent = true;
			} catch (e) {
				console.error('[RESEP LIST BUTTON ERROR]', e.message);
			}
		}

		if (!listSent) {
			await client.sendMessage(m.chat, {
				text: textList
			}, { quoted: m });
		}

		await sendReact(conn, sock, m, '✅');

	} catch (e) {
		console.error('[RESEP SEARCH ERROR]', e.message || e);
		await sendReact(conn, sock, m, '❌');
		await reply(`❌ Terjadi kesalahan saat mencari resep: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['resep <nama masakan>'];
handler.tags = ['search'];
handler.command = ['resep', 'resepmasak', 'cariresep'];
handler.register = true;
handler.limit = true;

export default handler;
