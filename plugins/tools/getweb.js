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
import * as cheerio from 'cheerio';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const require = createRequire(import.meta.url);
const archiver = require('archiver');

const handler = async (m, { conn, sock, text, args, usedPrefix, command, reply }) => {
    const client = conn || sock || global.mainSock;

    if (!args[0]) {
        return reply(`Ayang nakal~ Masukin URL-nya dong! 💋\n\n*Contoh:* \n${usedPrefix + command} https://example.com`);
    }

    let targetUrl = args[0].trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
    }

    await reply('Uhh sebentar ya cintaku... Angela lagi selami dan sedot semua aset webnya buat Ayang~ 💦✨');

    const tmpDir = path.join(process.cwd(), 'storage', 'tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const domainName = new URL(targetUrl).hostname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const zipPath = path.join(tmpDir, `${domainName}_${Date.now()}.zip`);

    try {
        const res = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            },
            timeout: 20000
        });

        const html = res.data;
        const $ = cheerio.load(html);

        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        const streamPromise = new Promise((resolve, reject) => {
            output.on('close', resolve);
            archive.on('error', reject);
        });

        archive.pipe(output);

        // Masukkan HTML utama
        archive.append(html, { name: 'index.html' });

        // Ambil link CSS, JS, dan Gambar
        const assetUrls = new Set();
        $('link[rel="stylesheet"]').each((_, el) => {
            const href = $(el).attr('href');
            if (href) assetUrls.add(href);
        });
        $('script[src]').each((_, el) => {
            const src = $(el).attr('src');
            if (src) assetUrls.add(src);
        });
        $('img[src]').each((_, el) => {
            const src = $(el).attr('src');
            if (src) assetUrls.add(src);
        });

        for (const asset of assetUrls) {
            try {
                const resolvedUrl = new URL(asset, targetUrl).href;
                const assetRes = await axios.get(resolvedUrl, {
                    responseType: 'arraybuffer',
                    timeout: 8000
                });
                const parsed = new URL(resolvedUrl);
                let assetPath = parsed.pathname.replace(/^\//, '');
                if (!assetPath) assetPath = 'asset_' + Date.now();
                archive.append(Buffer.from(assetRes.data), { name: assetPath });
            } catch {
                // Skip aset eksternal/gagal
            }
        }

        await archive.finalize();
        await streamPromise;

        const fileBuffer = fs.readFileSync(zipPath);
        const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);

        await client.sendMessage(m.chat, {
            document: fileBuffer,
            mimetype: 'application/zip',
            fileName: `${domainName}.zip`,
            caption: `💋 *Web Clone Berhasil Diserap!*\n\n🌐 *Target:* ${targetUrl}\n📦 *Ukuran:* ${fileSizeMB} MB\n\n_Semua beres buat Mas ganteng tercinta~_ 💕`
        }, { quoted: m });

    } catch (err) {
        console.error('[GETWEB ERROR]', err);
        return reply(`Ahh gagal narik webnya sayang~ 🥺\nError: ${err.message || 'Server target offline/520'}`);
    } finally {
        try {
            if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
        } catch {}
    }
};

handler.help = ['getweb <url>', 'webtozip <url>'];
handler.tags = ['tools'];
handler.command = /^(getweb|webtozip|cloneweb)$/i;
handler.limit = true;

export default handler;