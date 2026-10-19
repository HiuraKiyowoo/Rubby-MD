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

const handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`🌸 *ʙᴀsᴇ64 ᴇɴᴄᴏᴅᴇʀ & ᴅᴇᴄᴏᴅᴇʀ* 🌸\n\n✨ *ᴄᴏɴᴛᴏʜ:*\n• ${usedPrefix + command} enc halo\n• ${usedPrefix + command} dec aGFsbw==`);

    const args = text.trim().split(/\s+/);
    const type = args[0]?.toLowerCase();
    const input = args.slice(1).join(' ');

    if (!['enc', 'dec', 'encode', 'decode'].includes(type) || !input) {
        return m.reply(`🎀 *ғᴏʀᴍᴀᴛ ᴘᴇɴɢɢᴜɴᴀᴀɴ:*\n• ${usedPrefix + command} enc <teks>\n• ${usedPrefix + command} dec <base64>`);
    }

    try {
        if (type === 'enc' || type === 'encode') {
            const encoded = Buffer.from(input, 'utf-8').toString('base64');
            await m.reply(`✨ *ʜᴀsɪʟ ʙᴀsᴇ64 ᴇɴᴄᴏᴅᴇ* ✨\n\n` + ```${encoded}```);
        } else {
            const decoded = Buffer.from(input, 'base64').toString('utf-8');
            await m.reply(`✨ *ʜᴀsɪʟ ʙᴀsᴇ64 ᴅᴇᴄᴏᴅᴇ* ✨\n\n` + ```${decoded}```);
        }
    } catch (e) {
        m.reply(`❌ *ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺:* ${e.message}`);
    }
};

handler.help = ['base64 enc/dec <teks>'];
handler.tags = ['tools'];
handler.command = /^(base64|b64)$/i;

handler.limit = true;

export default handler;
