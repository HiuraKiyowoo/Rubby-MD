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

const handler = async (m, { conn, sock, text, reply, usedPrefix, command }) => {
	const client = conn || sock
	const quotedText = m.quoted ? (m.quoted.text || m.quoted.caption || m.quoted.description || m.quoted.msg?.caption || m.quoted.msg?.text || '') : ''
	const rawInput = (text || quotedText || '').trim()
	const urlMatch = rawInput.match(/https?:\/\/(?:www\.)?pixeldrain\.com\/[^\s]+/i) || rawInput.match(/https?:\/\/[^\s]+/i)
	const targetUrl = urlMatch ? urlMatch[0] : rawInput

	if (!targetUrl || !targetUrl.includes('pixeldrain.com')) {
		return reply(`*Pixeldrain Downloader*\n\nContoh:\n${usedPrefix}${command} https://pixeldrain.com/u/KdRTpxHE\nAtau reply pesan yang berisi link Pixeldrain!`)
	}

	reply(global.mess?.wait || '⏳ Sedang memproses file Pixeldrain...')

	try {
		const apiUrl = typeof global.API === 'function' 
			? global.API('kyzz', '/api/download/pixeldrain', { url: targetUrl.trim() }, 'apikey')
			: `https://api.kyzzz.xyz/api/download/pixeldrain?url=${encodeURIComponent(targetUrl.trim())}&apikey=${global.APIKeys?.['https://api.kyzzz.xyz'] || 'kyuuimp'}`

		const { data } = await axios.get(apiUrl, { timeout: 25000 })

		if (!data.status) {
			return reply(`❌ Gagal: ${data.error || 'Terjadi kesalahan saat memproses URL Pixeldrain.'}`)
		}

		const directUrl = data.directUrl || data.url || data.result?.directUrl || data.result?.url
		const fileName = data.fileName || data.result?.fileName || 'pixeldrain_file'
		const fileSize = data.fileSize || data.result?.fileSize || '-'
		const mimeType = data.mimeType || data.result?.mimeType || 'application/octet-stream'

		if (!directUrl) {
			return reply('❌ Gagal mendapatkan direct link file.')
		}

		const caption = `📁 *PIXELDRAIN DOWNLOADER*\n\n` +
			`📄 *Nama:* ${fileName}\n` +
			`📦 *Ukuran:* ${fileSize}\n` +
			`🔗 *Direct Link:* ${directUrl}\n\n` +
			`⏳ Mengirim berkas...`

		await client.sendMessage(m.chat, { text: caption }, { quoted: m })

		await client.sendMessage(m.chat, {
			document: { url: directUrl },
			fileName: fileName,
			mimetype: mimeType
		}, { quoted: m })

	} catch (e) {
		console.error('[PIXELDRAIN ERROR]', e.response?.data || e)
		return reply('❌ Terjadi kesalahan saat mengunduh berkas Pixeldrain.')
	}
}

handler.help = ['pixeldrain <url>']
handler.tags = ['downloader']
handler.command = ['pixeldrain', 'pxl', 'pxldl']
handler.limit = true;
handler.register = true

export default handler
