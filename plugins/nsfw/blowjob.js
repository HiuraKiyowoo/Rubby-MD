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

const handler = async (m, { sock, isPremium, isOwner, reply }) => {
	if (!isPremium && !isOwner) {
		return reply(global.mess.vip);
	}

	if (global.mess?.wait) reply(global.mess.wait);
	if (typeof global.react === "function") global.react(sock, m, "loading");

	try {
		const apiUrl = global.API("kyzz", "/api/nsfw/blowjob", {}, "apikey");
		const res = await axios.get(apiUrl, {
			responseType: "arraybuffer",
			timeout: 30000
		});

		const contentType = res.headers["content-type"] || "";
		let mediaBuffer = null;
		let isGif = false;

		if (contentType.includes("application/json")) {
			const jsonStr = Buffer.from(res.data).toString("utf-8");
			const json = JSON.parse(jsonStr);
			const imgUrl = json.url || json.result || json.image || json.data;
			if (!imgUrl) throw new Error("URL gambar tidak ditemukan pada response API.");
			const imgRes = await axios.get(imgUrl, { responseType: "arraybuffer", timeout: 30000 });
			mediaBuffer = Buffer.from(imgRes.data);
			isGif = imgUrl.toLowerCase().endsWith(".gif") || imgRes.headers["content-type"]?.includes("gif");
		} else {
			mediaBuffer = Buffer.from(res.data);
			isGif = contentType.includes("gif") || "blowjob" === "gifs";
		}

		if (!mediaBuffer || mediaBuffer.length === 0) {
			throw new Error("Buffer media kosong");
		}

		const caption = "huuuu cabulllll";

		if (isGif) {
			await sock.sendMessage(m.chat, {
				video: mediaBuffer,
				gifPlayback: true,
				caption: caption
			}, { quoted: m });
		} else {
			await sock.sendMessage(m.chat, {
				image: mediaBuffer,
				caption: caption
			}, { quoted: m });
		}

		if (typeof global.react === "function") global.react(sock, m, "success");
	} catch (e) {
		console.error("[NSFW blowjob ERROR]:", e.message);
		if (typeof global.react === "function") global.react(sock, m, "error");
		return reply("❌ Gagal mengambil gambar NSFW. Silakan coba lagi nanti.");
	}
};

handler.help = ["blowjob"];
handler.tags = ["nsfw"];
handler.command = ["blowjob"];
handler.premium = true;
handler.limit = true;
handler.register = true;

export default handler;
