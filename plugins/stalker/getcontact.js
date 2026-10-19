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

import gtc from '../../scrape/getcontact.js';

// State login sementara di memori per chat
const pendingLogin = new Map();

const handler = async (m, { conn, sock, text, args, usedPrefix, command, reply, isOwner }) => {
    const client = conn || sock;
    const sub = (args[0] || '').toLowerCase();

    // 1. Subcommand: LOGIN (Inisiasi Login GetContact via WhatsApp VerifyKit)
    if (sub === 'login') {
        const phoneInput = args[1] || text.replace(/^login\s*/i, '').trim();
        if (!phoneInput) {
            return reply(
                `*🍁 GETCONTACT LOGIN ASSISTANT 🍁*\n\n` +
                `Format: *${usedPrefix + command} login <nomor_wa_getcontact>*\n\n` +
                `Contoh:\n*${usedPrefix + command} login 081234567890*\n\n` +
                `_Catatan: Nomor ini digunakan untuk membuat sesi GetContact resmi via verifikasi pesan WhatsApp VerifyKit._`
            );
        }

        reply('Uhh sebentar ya sayang~ Angela sedang menyiapkan kunci enkripsi dan menghubungi server GetContact... ⏳✨');

        try {
            const session = await gtc.startLogin(phoneInput);
            pendingLogin.set(m.sender, session);

            const msg = 
                `*🍁 GETCONTACT VERIFIKASI LOGIN 🍁*\n\n` +
                `Halo ayang manis~ Handshake enkripsi sudah berhasil! Ikuti langkah di bawah ini ya:\n\n` +
                `📱 *Nomor Akun:* ${session.phone}\n` +
                `🔑 *Kode Unik:* \`${session.verificationCode}\`\n\n` +
                `🔗 *Tautan Verifikasi WhatsApp:*\n${session.deeplink}\n\n` +
                `━━━━━━━━━━━━━━━━━━━\n` +
                `📌 *Langkah Verifikasi:*\n` +
                `1. Klik link di atas atau kirimkan kode di atas ke nomor bot VerifyKit GetContact.\n` +
                `2. Tunggu sampai pesan terkirim & centang dua.\n` +
                `3. Jika sudah, ketik: *${usedPrefix + command} verify* untuk mengonfirmasi login dan menyimpan sesi! 💕`;

            return reply(msg);
        } catch (err) {
            console.error('[GETCONTACT LOGIN ERROR]', err);
            return reply(`Aww maaf sayang, inisiasi login gagal: ${err.message}`);
        }
    }

    // 2. Subcommand: VERIFY (Deteksi Login dan Ambil Token)
    if (sub === 'verify' || sub === 'ceklogin') {
        const session = pendingLogin.get(m.sender);
        if (!session) {
            return reply(`Umm sayang belum melakukan inisiasi login nih~ Ketik *${usedPrefix + command} login <nomor>* dulu yaa cintaku! 💕`);
        }

        reply('Mendeteksi status verifikasi WhatsApp ke VerifyKit... Tahan sebentar ya sayang~ 🔍💓');

        try {
            const check = await gtc.checkLoginStatus({
                reference: session.reference,
                token: session.token,
                finalKey: session.finalKey,
                deviceId: session.deviceId,
                phone: session.phone,
            });

            if (check.success) {
                pendingLogin.delete(m.sender);
                return reply(
                    `*🎉 LOGIN GETCONTACT BERHASIL! 🎉*\n\n` +
                    `Sesi akun *${check.phone}* sudah tersimpan aman dan aktif di dekapan Angela~ 💋\n` +
                    `📅 *Validasi:* ${check.validationDate}\n\n` +
                    `Sekarang ayang sudah bisa langsung kepoin nomor siapa aja dengan:\n` +
                    `👉 *${usedPrefix + command} <nomor_target>*`
                );
            } else {
                return reply(`⚠️ ${check.message}`);
            }
        } catch (err) {
            console.error('[GETCONTACT VERIFY ERROR]', err);
            return reply(`Gagal memeriksa status login: ${err.message}`);
        }
    }

    // 3. Subcommand: KUOTA / QUOTA
    if (sub === 'quota' || sub === 'kuota') {
        try {
            reply(global.mess?.wait || 'Menghitung sisa kuota pencarian... ⏳');
            const q = await gtc.checkQuota();
            const txt = 
                `*📊 SISA KUOTA GETCONTACT 📊*\n\n` +
                `👤 *Akun Aktif:* ${q.account} (${q.phoneNumber})\n` +
                `🔍 *Pencarian Nomor:* ${q.searchRemaining} / ${q.searchLimit} tersisa\n` +
                `🏷️ *Detail Tags:* ${q.numberDetailRemaining} / ${q.numberDetailLimit} tersisa\n` +
                `🔄 *Reset Kuota:* ${q.renewDate}\n\n` +
                `_Gunakan dengan bijak ya mas gantengku~_ 💋`;
            return reply(txt);
        } catch (err) {
            return reply(`Gagal mengecek kuota: ${err.message}`);
        }
    }

    // 4. Default Action: PENCARIAN NOMOR (Cari Save/Tags di nomor)
    let targetNumber = text.trim();
    if (!targetNumber) {
        return reply(
            `*🍁 GETCONTACT STALKER & SCRAPER 🍁*\n\n` +
            `Mau kepoin nomor siapa nih ayang? Simpanan siapa aja bakal Angela bongkar tuntas~ 😈🔥\n\n` +
            `📌 *Cara Penggunaan:*\n` +
            `• *${usedPrefix + command} <nomor>* ➔ Cari nama & daftar tag yang disimpan orang\n` +
            `• *${usedPrefix + command} login <nomor>* ➔ Login akun GetContact baru\n` +
            `• *${usedPrefix + command} verify* ➔ Deteksi & simpan sesi login\n` +
            `• *${usedPrefix + command} kuota* ➔ Cek sisa kuota pencarian akun\n\n` +
            `Contoh:\n*${usedPrefix + command} 081234567890*`
        );
    }

    reply(global.mess?.wait || 'Sedang menggeledah kontak target di database Scarlet Shadow... Tunggu ya cintaku~ 🍃');

    try {
        const result = await gtc.searchNumber(targetNumber);

        let tagListStr = '_Tidak ada tag yang ditemukan / privat._';
        if (result.tags && result.tags.length > 0) {
            tagListStr = result.tags.map((t, idx) => `  ${idx + 1}. ${t.tag} ${t.count > 1 ? `*(x${t.count})*` : ''}`).join('\n');
        }

        const caption = 
            `*🍁 GETCONTACT REPORT 🍁*\n` +
            `_Koleksi nama dan tag dari sasaran ayang:_\n\n` +
            `📱 *Nomor:* ${result.phoneNumber}\n` +
            `👤 *Nama Utama:* ${result.displayName}\n` +
            `📧 *Email:* ${result.email}\n` +
            `🏷️ *Total Tag:* ${result.tagCount}\n` +
            `━━━━━━━━━━━━━━━━━━━\n` +
            `🏷️ *DISIMPAN SEBAGAI APA SAJA:*\n` +
            `${tagListStr}\n` +
            `━━━━━━━━━━━━━━━━━━━\n` +
            `_Semua data berhasil Angela persembahkan buat ayang tercinta~_ 💋✨`;

        return reply(caption);
    } catch (err) {
        console.error('[GETCONTACT SEARCH ERROR]', err);
        return reply(`❌ Gagal mencari nomor tersebut sayang: ${err.message}`);
    }
};

handler.help = ['getcontact <nomor>', 'getcontact login <nomor>', 'getcontact verify', 'getcontact kuota'];
handler.tags = ['stalker'];
handler.command = ['getcontact', 'getkontak', 'gtc', 'stalkwa'];
handler.limit = true;
handler.premium = true;
handler.register = true;

export default handler;