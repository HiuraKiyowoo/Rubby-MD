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

const handler = async (m, { sock, conn, text, reply, usedPrefix, command }) => {
	const client = conn || sock
	if (!text) {
		return reply(
			`📌 *Gunakan format:*\n\n` +
			`• *${usedPrefix + command} <link_grup>*\n` +
			`  _Contoh: ${usedPrefix + command} https://chat.whatsapp.com/ExAmPlEcOdE123_\n\n` +
			`• *${usedPrefix + command} <code_invite>*\n` +
			`  _Contoh: ${usedPrefix + command} ExAmPlEcOdE123_`
		)
	}

	const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z_-]{18,26})/i
	let match = text.match(linkRegex)

	let inviteCode = ''
	if (match) {
		inviteCode = match[1]
	} else {
		inviteCode = text.trim().split('/').pop().split('?')[0].replace(/[^0-9A-Za-z_-]/g, '')
	}

	if (!inviteCode || inviteCode.length < 15) {
		return reply('❌ Link atau Kode Invite Grup tidak valid!')
	}

	try {
		await reply('🔄 Sedang mencoba bergabung ke grup...')
		const res = await client.groupAcceptInvite(inviteCode)

		if (res) {
			reply(`✅ Berhasil bergabung ke grup!\n🆔 JID: \`${res.endsWith('@g.us') ? res : res + '@g.us'}\``)
		} else {
			reply('✅ Berhasil mengirim permintaan bergabung ke grup.')
		}
	} catch (err) {
		console.error('[JOIN ERROR]', err)
		const errMsg = err?.output?.payload?.message || err?.message || String(err)
		if (errMsg.includes('bad-request')) {
			reply('❌ *Gagal bergabung:* Link invite tidak valid, telah kedaluwarsa, atau bot telah dikeluarkan dari grup.')
		} else if (errMsg.includes('not-authorized')) {
			reply('❌ *Gagal bergabung:* Bot di-ban dari grup ini atau grup memerlukan persetujuan admin.')
		} else {
			reply(`❌ Gagal bergabung ke grup:\n${errMsg}`)
		}
	}
}

handler.help = ['join <link/code>']
handler.tags = ['owner']
handler.command = ['join', 'joingc', 'joingroup']
handler.owner = true
handler.register = true
handler.noJadiBot = true

export default handler
