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

import path from 'path';

const handler = async (m, { args, usedPrefix, command }) => {
    const { sendNGL } = await import(path.join(process.cwd(), 'scrape', 'ngl.js'));

    const input = args.join(' ').split('|');
    if (input.length < 3) {
        return m.reply(`*Format:* \`${usedPrefix + command} username|pesan|jumlah\`\n*ᴄᴏɴᴛᴏʜ:* \`${usedPrefix + command} user123|Hai|5\``);
    }

    const username = input[0].trim();
    const message = input[1].trim();
    let total = parseInt(input[2].trim(), 10);

    if (isNaN(total) || total < 1) return m.reply('❌ Jumlah minimal 1!');
    if (total > 15) total = 15;

    let success = 0;
    let failed = 0;

    await m.reply(`🚀 Mulai spam ${total} pesan ke *${username}*...`);

    for (let i = 0; i < total; i++) {
        try {
            const res = await sendNGL({ username, message });
            if (res.status) {
                success++;
            } else {
                failed++;
            }
        } catch {
            failed++;
        }

        await new Promise(r => setTimeout(r, 1800 + Math.random() * 1000));
    }

    return m.reply(
        `✅ *SPAM NGL SELESAI*\n\n` +
        `• Target: *${username}*\n` +
        `• Pesan: _${message}_\n` +
        `• Total: *${total}*\n` +
        `• Sukses: *${success}*\n` +
        `• ɢᴀɢᴀʟ: *${failed}*`
    );
};

handler.help = ['spamngl <user|teks|jumlah>'];
handler.tags = ['tools'];
handler.command = /^(spamngl)$/i;
handler.limit = true;

export default handler;
