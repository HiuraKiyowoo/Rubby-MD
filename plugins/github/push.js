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
┇   › Feature  : GitHub Suite Automation
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import axios from 'axios'
import AdmZip from 'adm-zip'

const handler = async (m, { sock, text, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || ''

    if (!text) {
        return m.reply(
            `Balas file ZIP lalu gunakan:\n\n${usedPrefix + command} nama-repo|true/false\n\nContoh:\n${usedPrefix + command} my-bot|true`
        )
    }

    const [repoName, isPrivateRaw] = text.split('|').map(v => v.trim())

    if (!repoName) return m.reply('Nama repo tidak boleh kosong!')
    if (!isPrivateRaw) return m.reply('Isi true/false untuk private repo')
    if (!/zip/i.test(mime) && !q.document) return m.reply('Silakan reply file ZIP terlebih dahulu!')

    const token = global.tokengh
    if (!token) return m.reply('Token GitHub tidak ditemukan di global.tokengh')

    const isPrivate = isPrivateRaw.toLowerCase() === 'true'
    const gh = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            Authorization: `token ${token}`,
            'User-Agent': 'WhatsAppBot',
            Accept: 'application/vnd.github+json'
        }
    })

    const react = async emoji => {
        try {
            await sock.sendMessage(m.chat, { react: { text: emoji, key: m.key } })
        } catch {}
    }

    try {
        await react('⏳')

        const { data: user } = await gh.get('/user')
        const login = user.login

        let exists = true
        try {
            await gh.get(`/repos/${login}/${repoName}`)
        } catch (e) {
            if (e.response?.status === 404) exists = false
            else throw e
        }

        if (!exists) {
            await gh.post('/user/repos', {
                name: repoName,
                private: isPrivate,
                auto_init: true
            })
        }

        const zipBuffer = await q.download()
        if (!Buffer.isBuffer(zipBuffer)) throw new Error('File ZIP tidak valid')

        const directory = await unzipper.Open.buffer(zipBuffer)
        let total = 0

        for (const file of directory.files) {
            if (
                file.type === 'Directory' ||
                file.path.includes('__MACOSX') ||
                file.path.endsWith('.DS_Store')
            ) continue

            const path = file.path.replace(/^\/+/, '')
            const encodedPath = encodeURIComponent(path).replace(/%2F/g, '/')
            const content = (await file.buffer()).toString('base64')

            let sha
            try {
                const { data } = await gh.get(`/repos/${login}/${repoName}/contents/${encodedPath}`)
                sha = data.sha
            } catch {}

            await gh.put(`/repos/${login}/${repoName}/contents/${encodedPath}`, {
                message: 'Upload via WhatsApp Bot',
                content,
                ...(sha ? { sha } : {})
            })

            total++
        }

        await react('✅')

        await sock.sendMessage(m.chat, {
            text: `「 PUSH GIT SUCCESS 」\n\n📁 Repo: ${login}/${repoName}\n🔒 Private: ${isPrivate}\n📦 Files: ${total}\n🌐 https://github.com/${login}/${repoName}`
        }, { quoted: m })

    } catch (e) {
        await react('❌')
        m.reply(`❌ Error:\n${e.response?.data?.message || e.message}`)
    }
}

handler.help = ['pushgit <repo>|<true/false>']
handler.tags = ['github']
handler.command = ['pushgit', 'gitpush', 'ghpush']
handler.limit = true;
handler.owner = true

handler.register = true;

handler.noJadiBot = true;

export default handler;
