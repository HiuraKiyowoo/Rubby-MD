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
import path from 'path';

const handler = async (m, { sock, conn, text, usedPrefix, command }) => {
    const { compressImage } = await import(path.join(process.cwd(), 'scrape', 'tinypng.js'));
    const client = sock || conn;
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    let imageBuffer;
    let contentType = 'image/jpeg';

    if (/image\/(jpeg|png)/.test(mime)) {
        imageBuffer = await q.download();
        contentType = mime;
    } else if (text && /https?:\/\/\S+/i.test(text)) {
        try {
            const urlResponse = await axios.get(text.trim(), { responseType: 'arraybuffer' });
            imageBuffer = Buffer.from(urlResponse.data);
            contentType = urlResponse.headers['content-type'] || 'image/jpeg';
        } catch {
            return m.reply('❌ ɢᴀɢᴀʟ mendownload gambar dari URL.');
        }
    } else {
        return m.reply(`*ᴄᴏɴᴛᴏʜ:* Kirim/reply gambar dengan caption \`${usedPrefix + command}\` atau masukkan link gambar.`);
    }

    try {
        const result = await compressImage(imageBuffer, contentType);

        const caption = `📉 *KOMPRESI GAMBAR ʙᴇʀʜᴀsɪʟ*\n\n` +
            `• Sebelum: *${(result.originalSize / 1024).toFixed(2)} KB*\n` +
            `• Sesudah: *${(result.compressedSize / 1024).toFixed(2)} KB*\n` +
            `• Hemat: *${result.savedPercent}%* (${(result.savedBytes / 1024).toFixed(2)} KB)\n` +
            `• Dimensi: *${result.width} x ${result.height}*`;

        await client.sendMessage(m.chat, {
            image: result.buffer,
            caption
        }, { quoted: m });

    } catch (error) {
        m.reply('❌ ɢᴀɢᴀʟ mengompres gambar.');
    }
};

handler.help = ['compress <reply/url>'];
handler.tags = ['tools'];
handler.command = /^(compress|kompres|tinypng)$/i;

handler.limit = true;

export default handler;
