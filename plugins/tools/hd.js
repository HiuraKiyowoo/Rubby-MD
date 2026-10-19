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
import FormData from "form-data";
import crypto from "crypto";

let handler = async (m, { sock, reply }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || "";

    if (!mime.startsWith("image/")) {
      return m.reply("🌸 *ʜᴀʀᴀᴘ ʀᴇᴘʟʏ / ᴋɪʀɪᴍ ɢᴀᴍʙᴀʀ ʏᴀɴɢ ɪɴɢɪɴ ᴅɪ-ʜᴅ-ᴋᴀɴ ʏᴀᴀ!* ✨");
    }

    reply(global.mess?.wait || "⏳ ᴍᴏʜᴏɴ ᴛᴜɴɢɢᴜ, sᴇᴅᴀɴɢ ᴅɪᴘʀᴏsᴇs... 🎀✨");

    let media = await q.download();

    const serial = crypto.randomBytes(16).toString("hex");
    const fname = `Image_${crypto.randomBytes(6).toString("hex")}.jpg`;

    const form = new FormData();

    form.append("original_image_file", media, {
      filename: fname,
      contentType: "image/jpeg",
    });

    form.append("scale_factor", 3);
    form.append("upscale_type", "image-upscale");

    const headers = {
      ...form.getHeaders(),
      "product-serial": serial,
    };

    const createJob = await axios.post(
      "https://api.unblurimage.ai/api/imgupscaler/v2/ai-image-unblur/create-job",
      form,
      { headers }
    );

    const jobId = createJob.data?.result?.job_id;

    if (!jobId) {
      return m.reply("❌ ɢᴀɢᴀʟ ᴍᴇᴍʙᴜᴀᴛ ᴊᴏʙ ᴜᴘsᴄᴀʟᴇ ʜᴅ.");
    }

    let outputUrl = null;
    const timeout = Date.now() + 180000;

    while (Date.now() < timeout) {
      const poll = await axios.get(
        `https://api.unblurimage.ai/api/imgupscaler/v2/ai-image-unblur/get-job/${jobId}`,
        { headers }
      );

      if (
        poll.data.code === 100000 &&
        poll.data.result?.output_url?.[0]
      ) {
        outputUrl = poll.data.result.output_url[0];
        break;
      }

      await new Promise((r) => setTimeout(r, 3000));
    }

    if (!outputUrl) {
      return m.reply("❌ ɢᴀɢᴀʟ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʜᴀsɪʟ ʜᴅ.");
    }

    const resultImg = await axios.get(outputUrl, {
      responseType: "arraybuffer",
    });

    await sock.sendMessage(
      m.chat,
      {
        image: Buffer.from(resultImg.data),
        caption: "✨ *ʜᴀsɪʟ ᴜᴘsᴄᴀʟᴇ ʜᴅ (3x)* ✨\n\n🖼️ *sᴛᴀᴛᴜs:* ɢᴀᴍʙᴀʀ ʙᴇʀʜᴀsɪʟ ᴅɪᴊᴇʀɴɪʜᴋᴀɴ 🌸\n🎀 *sᴇʟᴇsᴀɪ ᴅᴀʟᴀᴍ ᴋᴜᴀʟɪᴛᴀs ᴛɪɴɢɢɪ!*",
      },
      { quoted: m }
    );
  } catch (err) {
    console.error(err);

    m.reply(
      `❌ ᴀᴅᴀ ʏᴀɴɢ ᴇʀʀᴏʀ ɴɪʜ 🥺:\n${err?.response?.data?.message || err.message}`
    );
  }
};

handler.help = ["unblurhd", "hd"];
handler.tags = ["tools"];
handler.command = ["unblur", "upscalehd", "hd"];
handler.limit = true;
handler.register = true;

export default handler;
