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

import axios from "axios";

const handler = async (m, { conn, sock, text, usedPrefix, command, reply }) => {
	const client = conn || sock;
	if (!text) {
		return reply(`• *Penggunaan:* ${usedPrefix + command} <username>\n• *Contoh:* ${usedPrefix + command} Roblox`);
	}

	const username = text.trim();
	reply(global.mess.wait);

	try {
		const apiUrl = global.API("kyzz", "/api/stalker/roblox", { username }, "apikey");
		const { data } = await axios.get(apiUrl, { timeout: 20000 });

		if (!data.status || !data.result) {
			return reply(`❌ Akun Roblox *${username}* tidak ditemukan.`);
		}

		const res = data.result;
		const basic = res.basic || res.metadata || res;
		const userId = res.userId || basic.id || "-";
		const name = basic.name || username;
		const displayName = basic.displayName || name;
		const description = basic.description ? basic.description.trim() : "-";
		const isBanned = basic.isBanned ? "Ya (Banned)" : "Tidak (Aktif)";
		const verified = basic.hasVerifiedBadge ? "Ya" : "Tidak";
		const extDisplayName = basic.externalAppDisplayName || "-";
		
		let createdAt = "-";
		if (basic.created) {
			const d = new Date(basic.created);
			createdAt = isNaN(d.getTime()) ? basic.created : d.toLocaleDateString("id-ID", {
				day: "numeric",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit"
			});
		}

		const presenceObj = res.presence?.userPresences?.[0] || {};
		const presenceTypes = {
			0: "Offline",
			1: "Online (Website)",
			2: "In Game",
			3: "In Studio"
		};
		const currentPresence = presenceTypes[presenceObj.userPresenceType] || "Offline";
		const lastLocation = presenceObj.lastLocation || "-";
		const lastGameId = presenceObj.gameId || presenceObj.placeId || "-";

		const friendsCount = res.social?.friends?.count != null ? res.social.friends.count.toLocaleString("id-ID") : "-";
		const followingCount = res.social?.following?.count != null ? res.social.following.count.toLocaleString("id-ID") : "-";
		const followersCount = res.social?.followers?.count != null ? res.social.followers.count.toLocaleString("id-ID") : (res.social?.followers != null ? String(res.social.followers) : "-");

		const groupsList = res.groups?.list?.data || [];
		const groupStr = groupsList.length > 0
			? groupsList.map((g, i) => `${i + 1}. ${g.group.name} (Role: ${g.role.name} | Rank: ${g.role.rank} | Anggota: ${g.group.memberCount?.toLocaleString("id-ID") || "-"})`).join("\n")
			: "-";

		const badgesList = res.achievements?.robloxBadges || [];
		const badgesStr = badgesList.length > 0
			? badgesList.map((b, i) => `${i + 1}. ${b.name} - ${b.description}`).join("\n")
			: "-";

		const catalogList = res.catalog?.bundles?.data || [];
		const catalogStr = catalogList.length > 0
			? catalogList.map((c, i) => `${i + 1}. ${c.name} (Tipe: ${c.bundleType} | ID: ${c.id})`).join("\n")
			: "-";

		const assetIds = res.avatar?.wearing?.assetIds || [];
		const totalWearing = assetIds.length > 0 ? `${assetIds.length} item` : "-";

		const avatarUrl = res.avatar?.fullBody?.data?.[0]?.imageUrl ||
			res.avatar?.headshot?.data?.[0]?.imageUrl ||
			res.avatar?.bust?.data?.[0]?.imageUrl ||
			res.avatar?.avatar ||
			res.avatar ||
			res.headshot ||
			null;

		const profileUrl = `https://www.roblox.com/users/${userId}/profile`;

		const stlkText = `*ROBLOX PROFILE STALKER*\n\n` +
			`*USER INFORMATION*\n` +
			`• User ID: ${userId}\n` +
			`• Username: @${name}\n` +
			`• Display Name: ${displayName}\n` +
			`• External App Name: ${extDisplayName}\n` +
			`• Verified Badge: ${verified}\n` +
			`• Is Banned: ${isBanned}\n` +
			`• Created At: ${createdAt}\n\n` +
			`*PRESENCE & ACTIVITY*\n` +
			`• Status: ${currentPresence}\n` +
			`• Last Location: ${lastLocation}\n` +
			`• Game / Place ID: ${lastGameId}\n\n` +
			`*SOCIAL STATISTICS*\n` +
			`• Friends: ${friendsCount}\n` +
			`• Following: ${followingCount}\n` +
			`• Followers: ${followersCount}\n` +
			`• Total Wearing Assets: ${totalWearing}\n\n` +
			`*GROUPS*\n` +
			`${groupStr}\n\n` +
			`*ROBLOX BADGES*\n` +
			`${badgesStr}\n\n` +
			`*CATALOG & BUNDLES*\n` +
			`${catalogStr}\n\n` +
			`*BIOGRAPHY*\n` +
			`${description}\n\n` +
			`*PROFILE LINK*\n` +
			`${profileUrl}`;

		if (avatarUrl) {
			return await client.sendMessage(m.chat, {
				image: { url: avatarUrl },
				caption: stlkText
			}, { quoted: m });
		}

		return reply(stlkText);
	} catch (e) {
		console.error("[ROBLOX STALK ERROR]", e.response?.data || e.message);
		return reply("❌ Terjadi kesalahan saat melakukan stalk Roblox.");
	}
};

handler.help = ["robloxstalk <username>", "rblxstalk <username>"];
handler.tags = ["stalker"];
handler.command = ["robloxstalk", "rblxstalk", "stalkroblox"];
handler.limit = true;
handler.register = true;

export default handler;
