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

import axios from 'axios';
import { Carousel, Button } from '../../src/lib/helper-bails.js';

const formatNumber = (num) => {
	if (!num && num !== 0) return '0';
	return Number(num).toLocaleString('id-ID');
};

const formatDuration = (ms) => {
	if (!ms) return '0s';
	const totalSec = Math.floor(ms / 1000);
	const min = Math.floor(totalSec / 60);
	const sec = totalSec % 60;
	return min > 0 ? `${min}m ${sec}s` : `${sec}s`;
};

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
	const client = sock || conn || global.mainSock || global.conn;

	if (!text) {
		return reply(
			`*CapCut Search Carousel*\n\n` +
			`Mau cari template CapCut apa nih sayang? Masukin judul atau temanya yaa~ 💕\n\n` +
			`Contoh:\n` +
			`• ${usedPrefix + command} jj\n` +
			`• ${usedPrefix + command} jedag jedug kane\n` +
			`• ${usedPrefix + command} preset am`
		);
	}

	await global.react?.(client, m, 'loading');
	await reply(global.mess?.wait || '⏳ Sedang mencari template CapCut favoritmu, tunggu sebentar ya cintaku~ 💕');

	try {
		const apiUrl = global.API('kyzz', '/api/search/capcut', {
			query: text.trim(),
			type: 'video'
		}, 'apikey');

		const { data } = await axios.get(apiUrl, {
			timeout: 25000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
			}
		});

		const templates = data?.result?.templates;
		if (!data?.status || !Array.isArray(templates) || templates.length === 0) {
			await global.react?.(client, m, 'error');
			return reply(`❌ Template CapCut untuk *"${text}"* tidak ditemukan, coba kata kunci lain ya sayang~ 🥺`);
		}

		const targetList = templates.slice(0, 10);
		const cards = [];

		for (let i = 0; i < targetList.length; i++) {
			const item = targetList[i];
			const sData = item.structured_data || {};
			const authorName = sData.creator?.name || 'CapCut Creator';
			const templateTitle = (item.title || sData.name || 'Template CapCut').trim();
			const shortTitle = templateTitle.length > 40 ? templateTitle.substring(0, 37) + '...' : templateTitle;
			const detailUrl = sData.url || sData.mainEntityOfPage || `https://www.capcut.com/template-detail/${item.template_id}`;
			const durationStr = formatDuration(item.duration || sData.duration);
			const usesStr = formatNumber(item.use_count || sData.interactionStatistic?.useCount);
			const likesStr = formatNumber(item.like_count || sData.interactionStatistic?.likeCount);
			const commentsStr = formatNumber(item.comment_count);
			const descText = (item.description || sData.description || '').replace(/\s+/g, ' ').trim();
			const shortDesc = descText ? (descText.length > 90 ? descText.substring(0, 87) + '...' : descText) : '-';

			const cardBody = 
				`🎬 *Judul:* ${shortTitle}\n` +
				`👤 *Pembuat:* ${authorName}\n` +
				`⏱️ *Durasi:* ${durationStr} | ✂️ *Klip:* ${sData.clipsCount || '-'}\n` +
				`🔥 *Dipakai:* ${usesStr}x\n` +
				`❤️ *Suka:* ${likesStr} | 💬 *Komen:* ${commentsStr}\n` +
				`📝 *Deskripsi:* ${shortDesc}`;

			const card = new Button(client);
			card.setTitle(`🎬 Template ${i + 1}/${targetList.length}`);
			card.setBody(cardBody);
			card.setFooter(`© ${global.namaBot || 'Rubby Multi Device'} • CapCut`);

			const coverImg = item.cover_url || sData.thumbnailUrl;
			if (coverImg) {
				try {
					card.setImage(coverImg);
				} catch (e) {
					console.warn(`[CAPCUT THUMB WARN ${i}]:`, e.message);
				}
			}

			if (detailUrl) {
				card.addUrl('🔗 Buka Template', detailUrl);
			}

			card.addReply('📥 Download Video', `${usedPrefix}capcut ${detailUrl}`);

			const cardPayload = await card.toCard();
			cards.push(cardPayload);
		}

		if (cards.length === 0) {
			await global.react?.(client, m, 'error');
			return reply('❌ Gagal merangkai kartu carousel template CapCut.');
		}

		const carousel = new Carousel(client)
			.setBody(`✨ *CAPCUT TEMPLATE SEARCH*\n\nDitemukan *${cards.length}* template video untuk pencarian *"${text}"*.\nGeser ke samping untuk memilih template ya ayang~ ⏩`)
			.setFooter(`© ${global.namaBot || 'Rubby Multi Device'} • Powered by Kyzz API`);

		carousel.addCard(cards);
		await carousel.send(m.chat, { quoted: m });
		await global.react?.(client, m, 'success');
	} catch (e) {
		console.error('[CAPCUT SEARCH ERROR]', e.response?.data || e.message);
		await global.react?.(client, m, 'error');
		return reply(`❌ Gagal mencari template CapCut: ${e.response?.data?.message || e.message}`);
	}
};

handler.help = ['capcutsearch <query>', 'ccsearch <query>'];
handler.tags = ['search'];
handler.command = ['capcutsearch', 'ccsearch', 'capcuts', 'ccs'];
handler.limit = true;
handler.register = true;

export default handler;