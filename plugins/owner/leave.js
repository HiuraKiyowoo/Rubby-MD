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
	let targetJid = ''

	if (text) {
		const clean = text.trim()
		if (clean.endsWith('@g.us')) {
			targetJid = clean
		} else if (/^\d+$/.test(clean)) {
			targetJid = `${clean}@g.us`
		} else if (clean.includes('chat.whatsapp.com')) {
			const match = clean.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i)
			if (match) {
				try {
					const inviteInfo = await client.groupGetInviteInfo(match[1])
					if (inviteInfo?.id) {
						targetJid = `${inviteInfo.id}@g.us`
					}
				} catch (err) {
					return reply(`❌ Gagal mendapatkan ID grup dari link: ${err?.message || err}`)
				}
			}
		}
	}

	if (!targetJid && m.isGroup) {
		targetJid = m.chat
	}

	if (!targetJid) {
		return reply(
			`📌 *Gunakan format:*\n\n` +
			`• *${usedPrefix + command}* (di dalam grup)\n` +
			`• *${usedPrefix + command} <ID_Grup>*\n` +
			`  _Contoh: ${usedPrefix + command} 120363012345678901@g.us_\n` +
			`• *${usedPrefix + command} <Link_Grup>*\n` +
			`  _Contoh: ${usedPrefix + command} https://chat.whatsapp.com/ExAmPlEcOdE123_`
		)
	}

	try {
		await client.sendMessage(targetJid, { text: '👋 Bot keluar dari grup. Sampai jumpa!' }).catch(() => null)
		await client.groupLeave(targetJid)
		reply(`✅ Berhasil keluar dari grup:\n\`${targetJid}\``)
	} catch (err) {
		console.error('[LEAVE ERROR]', err)
		reply(`❌ Gagal keluar dari grup:\n${err?.message || err}`)
	}
}

handler.help = ['leave [id/link]']
handler.tags = ['owner']
handler.command = ['leave', 'out', 'gcleft']
handler.owner = true
handler.register = true
handler.noJadiBot = true

export default handler
