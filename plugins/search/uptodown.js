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

const isValidIcon = (url) => {
	if (!url) return false
	try {
		const last = new URL(url).pathname.split('/').pop()
		return !!last && !last.startsWith('.')
	} catch {
		return false
	}
}

let handler = async (m, { sock, args, text, usedPrefix, command, reply }) => {
	global.searchCache = global.searchCache || {}

	if (args[0] && /^\d+$/.test(args[0]) && global.searchCache[m.chat]?.type === 'uptodown') {
		const idx = parseInt(args[0])
		const cached = global.searchCache[m.chat]
		const item = cached.data[idx]

		if (!item) return reply('❌ Pilihan tidak ditemukan, cari ulang aplikasinya.')

		const caption = `📱 *${item.name}*\n\n${item.description}\n\n🔗 URL: ${item.url}`

		if (!isValidIcon(item.icon)) return reply(caption)

		return sock.sendMessage(m.chat, { image: { url: item.icon }, caption }, { quoted: m })
	}

	if (!text) return reply(`Contoh: ${usedPrefix}${command} Naruto`)

	try {
		const res = await fetch(global.API('kyzz', '/api/search/uptodown', { q: text }, 'apikey'))
		const data = await res.json()

		if (!data.status || !data.hasil?.length) return reply('❌ Tidak ada hasil ditemukan.')

		global.searchCache[m.chat] = { type: 'uptodown', data: data.hasil }

		const cards = data.hasil.slice(0, 10).map((item, i) => ({
			...(isValidIcon(item.icon) ? { image: { url: item.icon } } : {}),
			title: item.name,
			body: item.description,
			footer: 'Uptodown',
			buttons: [{ text: 'Pilih', id: `${usedPrefix}${command} ${i}` }]
		}))

		return sock.sendMessage(m.chat, {
			type: 'carousel',
			text: `🔍 Hasil pencarian Uptodown untuk *${text}*\n\nPilih salah satu di bawah untuk lihat detail.`,
			footer: '© kyzz',
			carousel: cards
		}, { quoted: m })
	} catch (e) {
		console.error('[UPTODOWN ERROR]', e.response?.data || e)
		reply('❌ Gagal mengambil hasil pencarian.')
	}
}

handler.help = ['uptodown <query>']
handler.tags = ['search']
handler.command = ['uptodown', 'utd']
handler.limit = true;

handler.register = true;

export default handler;
