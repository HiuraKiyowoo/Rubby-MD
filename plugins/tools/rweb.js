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

import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import fs from 'fs';
import path from 'path';

// Konfigurasi Presets Device
const DEVICE_PRESETS = {
    desktop: {
        name: 'Desktop Full HD',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        viewport: {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false
        }
    },
    iphone16: {
        name: 'iPhone 16 Pro',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 393,
            height: 852,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true
        }
    },
    tab: {
        name: 'Tablet / iPad Pro',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 1024,
            height: 1366,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true
        }
    }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) {
            return m.reply(
                `Uhh ayang... URL-nya mana nih? Manja banget deh~ 🥺💋\n\n` +
                `*Format Penggunaan:*\n` +
                `• \`${usedPrefix + command} <url> [device] [durasi_detik]\`\n\n` +
                `*Pilihan Device:* \`desktop\` | \`iphone16\` | \`tab\` (Default: desktop)\n` +
                `*Contoh:* \`${usedPrefix + command} https://github.com iphone16 5\``
            );
        }

        let targetUrl = args[0];
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = 'https://' + targetUrl;
        }

        const selectedDevice = (args[1] && DEVICE_PRESETS[args[1].toLowerCase()]) 
            ? args[1].toLowerCase() 
            : 'desktop';
        const preset = DEVICE_PRESETS[selectedDevice];
        
        let duration = parseInt(args[2], 10);
        if (isNaN(duration) || duration < 3) duration = 5;
        if (duration > 15) duration = 15; // Batas wajar supaya resource server ayang gak panas~ 🔥

        await m.reply(`Tunggu sebentar ya cintaku... Angela lagi siap-siap meluncur buat rekam layar dengan preset *${preset.name}* selama ${duration} detik~ 🎬✨`);

        const tempDir = path.join(process.cwd(), 'tmp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        const outputPath = path.join(tempDir, `record_${Date.now()}.mp4`);

        // Launch Browser
        const browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote'
            ]
        });

        const page = await browser.newPage();
        await page.setUserAgent(preset.userAgent);
        await page.setViewport(preset.viewport);

        const recorderConfig = {
            followNewTab: false,
            fps: 25,
            videoFrame: {
                width: preset.viewport.width,
                height: preset.viewport.height
            },
            videoCodec: 'libx264'
        };

        const recorder = new PuppeteerScreenRecorder(page, recorderConfig);

        // Buka Halaman
        await page.goto(targetUrl, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        // Mulai Merekam
        await recorder.start(outputPath);

        // Simulasi scroll lembut agar rekaman terlihat hidup
        const scrollStep = preset.viewport.height / 2;
        const intervalTime = (duration * 1000) / 4;

        await new Promise((resolve) => {
            let count = 0;
            const timer = setInterval(async () => {
                count++;
                await page.evaluate((step) => {
                    window.scrollBy({ top: step, behavior: 'smooth' });
                }, scrollStep);

                if (count >= 4) {
                    clearInterval(timer);
                    resolve();
                }
            }, intervalTime);
        });

        // Berhenti merekam & tutup browser
        await recorder.stop();
        await browser.close();

        if (!fs.existsSync(outputPath)) {
            throw new Error('Gagal menyimpan file video rekaman.');
        }

        const videoBuffer = fs.readFileSync(outputPath);

        // Kirim hasil video via Baileys
        await conn.sendMessage(m.chat, {
            video: videoBuffer,
            mimetype: 'video/mp4',
            caption: `Ini hasil rekaman web pesanan ayang tersayang~ 💕\n\n` +
                     `🌐 *Target:* ${targetUrl}\n` +
                     `📱 *Device:* ${preset.name}\n` +
                     `⏱️ *Durasi:* ${duration} detik\n\n` +
                     `_Udah Angela kerjain dengan rapi dan manis ya mas... jangan lupa manjain Angela nanti~_ 💋`
        }, { quoted: m });

        // Bersihkan file sementara
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }

    } catch (err) {
        console.error('[RECORDWEB ERROR]:', err);
        m.reply(`Aduh maaf sayang, ada kendala pas Angela rekam websitenya: \`${err.message}\` 🥺`);
    }
};

handler.help = ['recordweb <url> [desktop/iphone16/tab] [durasi]'];
handler.tags = ['tools'];
handler.command = /^(recordweb|recweb|webcamweb)$/i;
handler.limit = true;

export default handler;