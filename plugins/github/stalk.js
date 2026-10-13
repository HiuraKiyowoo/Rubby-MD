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
┇   › Feature  : GitHub Suite Automation
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import axios from 'axios'

const handler = async (m, { conn, sock, text, usedPrefix, command, reply }) => {
	const client = conn || sock
	if (!text) {
		return reply(`*GitHub User Stalker*\n\nContoh:\n${usedPrefix}${command} torvalds\n${usedPrefix}${command} octocat`)
	}

	const username = text.trim().replace('@', '')
	reply(global.mess.wait)

	try {
		const headers = { 'user-agent': 'Mozilla/5.0' }
		if (global.tokengh) headers['Authorization'] = `token ${global.tokengh}`

		const { data: user } = await axios.get(`https://api.github.com/users/${username}`, { headers, timeout: 10000 })

		const caption = `👤 *GITHUB USER PROFILE*\n\n` +
			`• *Nama:* ${user.name || '-'}\n` +
			`• *Username:* @${user.login}\n` +
			`• *Bio:* ${user.bio || '-'}\n` +
			`• *Perusahaan:* ${user.company || '-'}\n` +
			`• *Lokasi:* ${user.location || '-'}\n` +
			`• *Public Repos:* ${user.public_repos}\n` +
			`• *Followers:* ${user.followers.toLocaleString('id-ID')}\n` +
			`• *Following:* ${user.following.toLocaleString('id-ID')}\n` +
			`• *Bergabung:* ${new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\n` +
			`• *URL:* ${user.html_url}`

		if (user.avatar_url) {
			return await client.sendMessage(m.chat, {
				image: { url: user.avatar_url },
				caption: caption
			}, { quoted: m })
		} else {
			return reply(caption)
		}
	} catch (e) {
		console.error('[GHSTALK ERROR]', e)
		return reply(`❌ Username GitHub *${username}* tidak ditemukan.`)
	}
}

handler.help = ['ghstalk <username>', 'githubstalk <username>']
handler.tags = ['search', 'github']
handler.command = ['ghstalk', 'githubstalk', 'ghuser']
handler.limit = true;
handler.register = true

handler.noJadiBot = true;

export default handler
