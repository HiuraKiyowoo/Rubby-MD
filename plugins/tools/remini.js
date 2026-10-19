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

import fs from 'fs';
import { reminiHD } from '../../scrape/remini.js';

const handler = async (m, { sock, conn, usedPrefix, command, reply }) => {
	const client = sock || conn || global.mainSock || global.conn;

	const q = m.quoted ? m.quoted : m;
	const mime = (q.msg || q).mimetype || q.mimetype || '';

	if (!/image\/(jpe?g|png|webp)/i.test(mime)) {
		return reply(`🍓 ᴍᴏʜᴏɴ ᴍᴀᴀғ: ᴋɪʀɪᴍ ᴀᴛᴀᴜ ʀᴇᴘʟʏ ɢᴀᴍʙᴀʀ ᴅᴇɴɢᴀɴ ᴄᴀᴘᴛɪᴏɴ \`${usedPrefix + command}\` ʏᴀᴀ 🎀✨`);
	}

	await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

	try {
		const media = await q.download?.();
		if (!media) throw new Error('ɢᴀɢᴀʟ ᴍᴇɴɢᴜɴᴅᴜʜ ɢᴀᴍʙᴀʀ.');

		const result = await reminiHD(media);

		if (result.error || !result.output?.url) {
			throw new Error(result.error || 'ɢᴀɢᴀʟ ᴍᴇᴍᴘʀᴏsᴇs ɢᴀᴍʙᴀʀ.');
		}

		const kb = (result.input.size / 1024).toFixed(1);
		const targetTag = m.sender.split('@')[0];

		const caption = `🍓 *ʜᴀsɪʟ ʀᴇᴍɪɴɪ ʜᴅ* 🎀✨\n\n` +
			`• 👤 *ᴘᴇᴍɪʟɪᴋ:* @${targetTag}\n` +
			`• 📊 *ᴋᴜᴀʟɪᴛᴀs:* *${result.upscale || '4x'} ʜᴅ*\n` +
			`• 📐 *ʀᴇsᴏʟᴜsɪ:* ${result.input.width}x${result.input.height} ➔ ʜᴅ\n` +
			`• 💾 *ᴜᴋᴜʀᴀɴ ᴀᴡᴀʟ:* ${kb} ᴋʙ\n\n` +
			`✨ _sᴜᴋsᴇs ᴅɪᴘʀᴏsᴇs ᴅᴇɴɢᴀɴ ᴊᴇʀɴɪʜ ʏᴀᴀ_ 🎀`;

		await client.sendMessage(
			m.chat,
			{
				image: { url: result.output.url },
				caption: caption,
				mentions: [m.sender]
			},
			{ quoted: m }
		);

		await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
	} catch (e) {
		console.error('[REMINI ERROR]:', e);
		await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
		await reply(`❌ ᴛᴇʀᴊᴀᴅɪ ᴋᴇsᴀʟᴀʜᴀɴ: ${e.message || 'ɢᴀɢᴀʟ ᴍᴇᴍᴘʀᴏsᴇs ɢᴀᴍʙᴀʀ 🎀✨'}`);
	}
};

handler.help = ['remini', 'hdv2'];
handler.tags = ['tools'];
handler.command = ['remini', 'hdv2'];
handler.limit = true;

export default handler;
