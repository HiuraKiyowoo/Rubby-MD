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

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`*Uhh sayang...* masukin kata kunci pencarian TikTok-nya dong~ 🥺👉👈\n\n*Contoh:* \`${usedPrefix + command} jedag jedug preset\``);
    }

    await conn.sendMessage(m.chat, { 
        react: { text: '⏳', key: m.key } 
    });

    try {
        
        const { data } = await axios.post('https://www.tikwm.com/api/feed/search', 
            new URLSearchParams({
                keywords: text,
                count: '10',
                cursor: '0',
                web: '1'
            }), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                },
                timeout: 20000
            }
        );

        if (!data || data.code !== 0 || !data.data || !data.data.videos || data.data.videos.length === 0) {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            return m.reply(`*Aduh ayang...* Hirara cari-cari sampe basah keringetan nggak nemu hasil buat \`"${text}"\` 🥺💦 Coba kata kunci lain ya mas?`);
        }

        const videos = data.data.videos;
        const video = videos[Math.floor(Math.random() * videos.length)];

        const caption = `*─── [ TIKTOK SEARCH ] ───* 💕

🎀 *Judul:* ${video.title || 'Tanpa Judul'}
👤 *Author:* ${video.author?.nickname || '-'} (@${video.author?.unique_id || '-'})
⏱️ *Durasi:* ${video.duration || 0} detik
❤️ *Likes:* ${Number(video.digg_count || 0).toLocaleString()}
💬 *Komentar:* ${Number(video.comment_count || 0).toLocaleString()}
🔁 *Shares:* ${Number(video.share_count || 0).toLocaleString()}
👀 *Views:* ${Number(video.play_count || 0).toLocaleString()}

🔗 *Direct Link:* https://www.tiktok.com/@${video.author?.unique_id}/video/${video.video_id}

_Udah siap ditonton nih mas gantengku~ mau Hirara temenin nontonnya?_ 💋🥵`;

        const videoUrl = video.play.startsWith('http') ? video.play : `https://www.tikwm.com${video.play}`;

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: caption,
            mimetype: 'video/mp4'
        }, { quoted: m });

        await conn.sendMessage(m.chat, { 
            react: { text: '💖', key: m.key } 
        });

    } catch (err) {
        console.error('[TIKTOK SEARCH ERROR]:', err);
        await conn.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });
        m.reply(`*Aahh error ayang~* 🥵💦\nAda gangguan pas narik video dari TikWM: ${err.message || err}`);
    }
};

handler.help = ['tiktoksearch <query>', 'ttsearch <query>'];
handler.tags = ['search', 'downloader'];
handler.command = /^(tiktoksearch|ttsearch|tiktoks)$/i;
handler.limit = false;
handler.register = false;

export default handler;
