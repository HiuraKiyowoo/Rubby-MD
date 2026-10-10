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

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
	const client = sock || conn
	const nama = text?.trim()

	if (!nama) {
		return reply(`Gunakan format:\n*${usedPrefix}${command} <nama nabi>*\n\nContoh:\n*${usedPrefix}${command} adam*\n*${usedPrefix}${command} muhammad*`)
	}

	try {
		const apiUrl = global.API('kyzz', '/api/islamic/kisah-nabi', { nama }, 'apikey')
		const { data } = await axios.get(apiUrl, { timeout: 15000 })

		if (!data?.status || !data?.result) {
			return reply(`❌ Kisah nabi *${nama}* tidak ditemukan.`)
		}

		const res = data.result
		let desc = res.description || ''
		if (desc.length > 3000) {
			desc = desc.substring(0, 3000) + '...\n\n_(Kisah dipotong karena terlalu panjang)_'
		}

		const caption = `📜 *KISAH ${res.name.toUpperCase()}*\n\n` +
			`👶 *Kelahiran:* ${res.thn_kelahiran || '-'}\n` +
			`⏳ *Usia:* ${res.usia || '-'} tahun\n` +
			`📍 *Tempat:* ${res.tmp || '-'}\n\n` +
			`📖 *Kisah:*\n${desc}`

		if (res.image_url && /^https?:\/\//.test(res.image_url)) {
			await client.sendMessage(m.chat, {
				image: { url: res.image_url },
				caption
			}, { quoted: m }).catch(async () => {
				await reply(caption)
			})
		} else {
			await reply(caption)
		}
	} catch (err) {
		console.error('[KISAH NABI ERROR]', err)
		return reply('❌ Terjadi kesalahan saat mengambil Kisah Nabi!')
	}
}

handler.help = ['kisahnabi <nama nabi>']
handler.tags = ['islamic']
handler.command = ['kisahnabi', 'nabi']
handler.limit = true
handler.register = true

export default handler
