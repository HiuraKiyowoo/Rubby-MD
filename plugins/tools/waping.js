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

import net from 'net';
import dns from 'dns/promises';
import { performance } from 'perf_hooks';

const pingHost = (host, port = 443, timeout = 4000) => {
    return new Promise((resolve) => {
        const start = performance.now();
        const socket = new net.Socket();

        socket.setTimeout(timeout);

        socket.connect(port, host, () => {
            const latency = performance.now() - start;
            socket.destroy();
            resolve(parseFloat(latency.toFixed(1)));
        });

        socket.on('error', () => {
            socket.destroy();
            resolve(null);
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve(null);
        });
    });
};

const getStatusBadge = (ms) => {
    if (ms === null) return '❌ *TIMEOUT*';
    if (ms < 40) return `⚡ *${ms} ms* (Kilat)`;
    if (ms < 100) return `🟢 *${ms} ms* (Stabil)`;
    if (ms < 200) return `🟡 *${ms} ms* (Sedang)`;
    return `🔴 *${ms} ms* (Lambat)`;
};

let handler = async (m, { sock }) => {
    await sock.sendMessage(m.chat, { react: { text: '📡', key: m.key } });

    const serverList = [
        {
            category: '💬 PROTOCOL & SOCKET ROUTER',
            servers: [
                { host: 'web.whatsapp.com', name: 'WhatsApp Web / Socket API' },
                { host: 'g.whatsapp.net', name: 'Group & Chat Protocol Router' },
                { host: 'api.whatsapp.com', name: 'WhatsApp Universal Web API' },
                { host: 'www.whatsapp.com', name: 'WhatsApp Main Portal' }
            ]
        },
        {
            category: '🖼️ MEDIA & CDN GATEWAY',
            servers: [
                { host: 'mmg.whatsapp.net', name: 'Media Gateway (Upload/Send)' },
                { host: 'pps.whatsapp.net', name: 'Profile Picture CDN Server' },
                { host: 'static.whatsapp.net', name: 'Sticker & Static Assets' },
                { host: 'v.whatsapp.net', name: 'VN & Audio Streaming CDN' }
            ]
        },
        {
            category: '⚙️ TELEMETRY & META CLOUD',
            servers: [
                { host: 'dit.whatsapp.net', name: 'Multi-Device Sync & Telemetry' },
                { host: 'crashlogs.whatsapp.net', name: 'Crash & Error Monitoring' },
                { host: 'graph.facebook.com', name: 'Meta Graph Backbone API' }
            ]
        }
    ];

    let dnsTime = '0.0';
    try {
        const dStart = performance.now();
        await dns.lookup('web.whatsapp.com');
        dnsTime = (performance.now() - dStart).toFixed(1);
    } catch {
        dnsTime = 'Error';
    }

    const allServers = serverList.flatMap(c => c.servers);
    const pingResults = await Promise.all(
        allServers.map(async (s) => {
            const ms = await pingHost(s.host, 443);
            return { ...s, latency: ms };
        })
    );

    const resultMap = new Map(pingResults.map(r => [r.host, r.latency]));
    
    let totalLatency = 0;
    let activeCount = 0;

    let caption = `╭─── 🌐 *WHATSAPP NETWORK BENCHMARK* ───╮\n`;
    caption += `│ 📡 *DNS Lookup :* \`${dnsTime} ms\`\n`;
    caption += `│ 🕒 *Waktu Uji  :* \`${new Date().toLocaleTimeString('id-ID')} WIB\`\n`;
    caption += `╰────────────────────────────────────────╯\n\n`;

    for (const group of serverList) {
        caption += `┌───  *${group.category}*\n`;
        for (const s of group.servers) {
            const ms = resultMap.get(s.host);
            if (ms !== null) {
                totalLatency += ms;
                activeCount++;
            }
            caption += `│ ▢ *${s.name}*\n`;
            caption += `│   └─ \`${s.host}\` : ${getStatusBadge(ms)}\n`;
        }
        caption += `└───────────────────────────────\n\n`;
    }

    const avgLatency = activeCount > 0 ? (totalLatency / activeCount).toFixed(1) : '0.0';
    
    caption += `╭─── 📊 *STATUS KONEKSI SERVER* ───╮\n`;
    caption += `│ • Server Aktif : *${activeCount}/${allServers.length} Server*\n`;
    caption += `│ • Rata-rata    : *${avgLatency} ms*\n`;
    caption += `│ • Kualitas     : ${parseFloat(avgLatency) < 60 ? '🚀 *Sangat Kilat*' : '🟢 *Stabil & Optimal*'}\n`;
    caption += `╰──────────────────────────────────╯\n`;
    caption += `\n_꒰ © Rubby Multi Device • Network Diagnostics ꒱_`;

    await sock.sendMessage(m.chat, { text: caption.trim() }, { quoted: m });
    await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

handler.help = ['waping', 'pingwa', 'cekjaringan'];
handler.tags = ['tools', 'info'];
handler.command = ['waping', 'pingwa', 'cekjaringan', 'waport'];

handler.limit = true;

export default handler;
