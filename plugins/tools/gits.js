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

import axios from 'axios'

const handler = async (m, { sock, text, reply, usedPrefix, command }) => {
	const token = global.tokengh
	if (!token) return reply('⚠️ Token GitHub belum diset di config/settings.js! (global.tokengh)')

	const q = m.quoted && !text ? m.quoted : m
	const txt = text ? text : typeof q.text === 'string' ? q.text : ''

	if (!txt) {
		return reply(`⚙️ Format salah!\n\nGunakan:\n${usedPrefix}${command} nama_file.js|isi_kode\n\nAtau reply teks dengan:\n${usedPrefix}${command} nama_file.js`)
	}

	const rawText = m.text?.trim() || ''
	const cleanText = rawText.replace(new RegExp(`^\\${usedPrefix}${command}\\s*`, 'i'), '').trim()

	let filename = ''
	let content = ''

	if (m.quoted && m.quoted.text && !cleanText.includes('|')) {
		filename = cleanText.replace(/--raw/gi, '').trim() || 'reply.js'
		content = m.quoted.text
	} else {
		const [fname, ...contentArr] = cleanText.split('|')
		filename = (fname || 'untitled.js').replace(/--raw/gi, '').trim()
		content = contentArr.join('|').trim()
	}

	if (!filename || !content) {
		return reply(`⚙️ Format salah!\n\n*ᴄᴏɴᴛᴏʜ:*\n${usedPrefix}${command} index.js|console.log("Halo dunia!")`)
	}

	const description = `kyu ga gamon`

	try {
		const { data } = await axios.post(
			'https://api.github.com/gists',
			{
				description,
				public: true,
				files: {
					[filename]: { content }
				}
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'User-Agent': 'WhatsApp-Bot'
				}
			}
		)

		const gistUrl = data.html_url

		const msg = `·˚ ༘₊· ͟͟͞͞꒰ kyzzz ꒱ ₊˚ · ˚\n ✿ *Nama* : ${filename}\n ✿ *Tipe* : plugin esm\n ✿ *Author* : kyuuryn\n ✿ *Code* : ${gistUrl}\n ✿ *Manfaat:* gtw\n ✿ *Note:* gtw\n꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷`

		await reply(msg)
	} catch (e) {
		console.error('[GIST ERROR]', e.response?.data || e)
		await reply(`❌ ɢᴀɢᴀʟ upload Gist!\n${e.response?.data?.message || e.message}`)
	}
}

handler.help = ['gist']
handler.tags = ['tools']
handler.command = ['gist', 'uptogist', 'uploadgist']
handler.owner = true
handler.limit = true
handler.register = true

handler.noJadiBot = true;

export default handler