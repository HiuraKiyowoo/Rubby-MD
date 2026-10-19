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

const handler = async (m, { conn, sock, text, args, usedPrefix, command, reply }) => {
	const client = conn || sock || global.mainSock;
	const targetUrl = args[0] || (m.quoted ? (m.quoted.text || '') : text);

	if (!targetUrl) {
		return reply(`🌐 *🌸 ᴠɪᴇᴡ ᴘᴀɢᴇ sᴏᴜʀᴄᴇ 🌸*\n\n✨ ᴋɪʀɪᴍ ʟɪɴᴋ ᴡᴇʙ ʏᴀɴɢ ᴍᴀᴜ ᴋᴀᴋᴀᴋ ɪɴᴛɪᴘ sᴏᴜʀᴄᴇ ᴄᴏᴅᴇ-ɴʏᴀ ʏᴀ ᴋᴀᴋ~ 📄 📄\n\n*ᴄᴏɴᴛᴏʜ:*\n*${usedPrefix + command} https://example.com*`);
	}

	const match = targetUrl.match(/https?:\/\/[^\s]+/i);
	const urlToFetch = match ? match[0] : (targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);

	await global.react(client, m, 'loading');

	try {
		const apiUrl = global.API('kyzz', '/api/tools/view-page-source', { url: urlToFetch }, 'apikey');
		const { data: res } = await axios.get(apiUrl, { timeout: 30000 });

		if (!res || !res.status || !res.result) {
			await global.react(client, m, 'error');
			return reply(`❌ ɢᴀɢᴀʟ mengambil page source untuk *"${urlToFetch}"*. Pastikan URL valid dan dapat diakses.`);
		}

		const result = res.result;
		const htmlContent = result.html || '';
		const pageInfo = result.pageInfo || {};
		const serverInfo = result.serverInfo || {};
		const metrics = result.metrics || {};
		const meta = result.meta || {};

		if (!htmlContent) {
			await global.react(client, m, 'error');
			return reply(`❌ Source code HTML kosong atau tidak ditemukan.`);
		}

		let hostName = 'page';
		try {
			const u = new URL(urlToFetch);
			hostName = u.hostname.replace(/[^a-zA-Z0-9.-]/g, '_');
		} catch (_) {}

		const fileName = `source_${hostName}.html`;
		const buffer = Buffer.from(htmlContent, 'utf-8');

		let caption = `📄 *✨ ʜᴀsɪʟ ᴠɪᴇᴡ ᴘᴀɢᴇ sᴏᴜʀᴄᴇ ✨*\n\n`;
		caption += `🌐 *URL:* ${meta.url || urlToFetch}\n`;
		if (meta.title) caption += `📑 *Title:* ${meta.title}\n`;
		caption += `\n📊 *📊 *ɪɴғᴏʀᴍᴀsɪ ʜᴀʟᴀᴍᴀɴ:**\n`;
		caption += ` ├ 📦 📦 *ᴜᴋᴜʀᴀɴ:* ${pageInfo.totalSize || `${(buffer.length / 1024).toFixed(2)} KB`}\n`;
		caption += ` ├ 🔡 🔡 *ᴛᴏᴛᴀʟ ᴋᴀʀᴀᴋᴛᴇʀ:* ${pageInfo.totalChars?.toLocaleString('id-ID') || buffer.length}\n`;
		caption += ` ├ 📝 📝 *ᴛᴏᴛᴀʟ ᴋᴀᴛᴀ:* ${pageInfo.totalWords?.toLocaleString('id-ID') || '-'}\n`;
		caption += ` ├ 📑 📑 *ᴛᴏᴛᴀʟ ʙᴀʀɪs:* ${pageInfo.totalLines?.toLocaleString('id-ID') || '-'}\n`;
		caption += ` └ 🏷️ 🏷️ *ᴛᴀɢ ᴄᴏᴜɴᴛ:* ${pageInfo.tagCount || '-'}\n`;

		if (serverInfo.httpCode || serverInfo.server) {
			caption += `\n🖥️ *🖥️ *sᴇʀᴠᴇʀ ɪɴғᴏ:**\n`;
			caption += ` ├ 🚦 HTTP Code: ${serverInfo.httpCode || '-'}\n`;
			caption += ` ├ 🖥️ Server: ${serverInfo.server || '-'}\n`;
			caption += ` └ ⚡ Protocol: ${serverInfo.httpVersion || '-'}\n`;
		}

		if (metrics.totalTime) {
			caption += `\n⏱️ *Metrics:* Total Time: ${typeof metrics.totalTime === 'number' ? metrics.totalTime.toFixed(2) : metrics.totalTime} ms\n`;
		}

		caption += `\n📎 _File HTML lengkap terlampir di atas._\n꒰ © Rubby Multi Device ꒱`;

		await client.sendMessage(m.chat, {
			document: buffer,
			mimetype: 'text/html',
			fileName: fileName,
			caption: caption.trim()
		}, { quoted: m });

		await global.react(client, m, 'success');
	} catch (e) {
		console.error('[🌸 ᴠɪᴇᴡ ᴘᴀɢᴇ sᴏᴜʀᴄᴇ 🌸 ERROR]', e.message);
		await global.react(client, m, 'error');
		return reply(`❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺 saat mengambil source code: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['viewsource <url>', 'viewpagesource <url>', 'pagesource <url>'];
handler.tags = ['tools'];
handler.command = ['viewsource', 'viewpagesource', 'pagesource', 'htmlsource'];
handler.limit = true;
handler.premium = true;
handler.register = true;

export default handler;
