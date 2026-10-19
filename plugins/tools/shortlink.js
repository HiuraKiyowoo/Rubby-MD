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

const providers = {
  tinyurl: {
    name: 'TinyURL',
    desc: 'Bisa custom alias link',
    supportCustom: true,
    make: async (url, custom) => {
      let endpoint = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
      if (custom) endpoint += `&alias=${encodeURIComponent(custom)}`
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      if (!text.startsWith('http')) throw new Error(text || 'Alias sudah dipakai atau URL tidak valid')
      return text.trim()
    }
  },
  spoome: {
    name: 'spoo.me',
    desc: 'Bisa custom alias link',
    supportCustom: true,
    make: async (url, custom) => {
      let body = `url=${encodeURIComponent(url)}`
      if (custom) body += `&alias=${encodeURIComponent(custom)}`
      const res = await fetch('https://spoo.me/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body
      })
      const data = await res.json()
      if (data.short_url) return data.short_url
      throw new Error(data.error || 'Alias sudah dipakai atau tidak valid')
    }
  },
  dagd: {
    name: 'da.gd',
    desc: 'Bisa custom alias link',
    supportCustom: true,
    make: async (url, custom) => {
      let endpoint = `https://da.gd/s?url=${encodeURIComponent(url)}`
      if (custom) endpoint += `&shorturl=${encodeURIComponent(custom)}`
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      if (text.toLowerCase().includes('error') || !text.startsWith('http')) {
        throw new Error(text.trim() || 'Alias sudah dipakai atau tidak valid')
      }
      return text.trim()
    }
  },
  vgd: {
    name: 'v.gd',
    desc: 'Layanan aman & previewable',
    supportCustom: false,
    make: async (url) => {
      const res = await fetch(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      if (text.toLowerCase().includes('error')) throw new Error(text)
      return text.trim()
    }
  },
  clckru: {
    name: 'clck.ru',
    desc: 'Shortlink stabil dari Yandex',
    supportCustom: false,
    make: async (url) => {
      const res = await fetch(`https://clck.ru/--?url=${encodeURIComponent(url)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      return text.trim()
    }
  },
  cleanuri: {
    name: 'CleanURI',
    desc: 'Clean & direct redirect',
    supportCustom: false,
    make: async (url) => {
      const res = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `url=${encodeURIComponent(url)}`
      })
      const data = await res.json()
      if (data.result_url) return data.result_url
      throw new Error(data.error || 'ɢᴀɢᴀʟ memproses URL')
    }
  },
  spoomemoji: {
    name: 'spoo.me (Emoji)',
    desc: 'Shortlink dengan karakter emoji unik',
    supportCustom: false,
    make: async (url) => {
      const res = await fetch('https://spoo.me/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: `url=${encodeURIComponent(url)}&emojify=true`
      })
      const data = await res.json()
      if (data.short_url) return data.short_url
      throw new Error(data.error || 'ɢᴀɢᴀʟ memproses URL')
    }
  },
  smolurl: {
    name: 'SmolURL',
    desc: 'Layanan shortlink simpel & bersih',
    supportCustom: false,
    make: async (url) => {
      const res = await fetch('https://smolurl.com/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (data?.data?.short_url) return data.data.short_url
      throw new Error(data.message || 'ɢᴀɢᴀʟ memproses URL')
    }
  },
  hrefli: {
    name: 'href.li',
    desc: 'Anonymizer & referer remover',
    supportCustom: false,
    make: async (url) => `https://href.li/?${url}`
  },
  anonymz: {
    name: 'Anonymz',
    desc: 'Link anonim pengacak referrer',
    supportCustom: false,
    make: async (url) => `https://anonymz.com/?${url}`
  },
  nullrefer: {
    name: 'NullRefer',
    desc: 'Hide HTTP Referrer header',
    supportCustom: false,
    make: async (url) => `https://nullrefer.com/?${url}`
  }
}

const handler = async (m, { sock, conn, text, usedPrefix, command, reply }) => {
  const client = sock || conn || global.mainSock
  let input = (text || (m.quoted ? (m.quoted.text || m.quoted.caption) : '') || '').trim()

  if (!input) {
    return reply(
      `🔗 *SHORTLINK GENERATOR*\n\n` +
      `*Cara Penggunaan:*\n` +
      `• *${usedPrefix}${command} <url>*\n` +
      `  _Memilih web shortlink dari menu popup_\n\n` +
      `• *${usedPrefix}${command} <provider> <url>*\n` +
      `  _Langsung ke provider tertentu_\n\n` +
      `• *${usedPrefix}${command} <provider> <url> <alias>*\n` +
      `  _Custom nama link (tinyurl, spoome, dagd)_\n\n` +
      `💡 *ᴄᴏɴᴛᴏʜ:*\n` +
      `• ${usedPrefix}${command} https://google.com\n` +
      `• ${usedPrefix}${command} tinyurl https://api.kyzzz.xyz\n` +
      `• ${usedPrefix}${command} tinyurl https://api.kyzzz.xyz kyzzz-api`
    )
  }

  const parts = input.split(/\s+/)
  let selectedProvider = null
  let targetUrl = ''
  let customAlias = ''

  const maybeProvider = parts[0]?.toLowerCase()

  if (providers[maybeProvider] || maybeProvider === 'all') {
    selectedProvider = maybeProvider
    targetUrl = parts[1] || ''
    customAlias = parts.slice(2).join('-').trim()
  } else {
    targetUrl = parts[0]
    customAlias = parts.slice(1).join('-').trim()
  }

  if (!targetUrl) {
    return reply(`❌ Harap masukkan URL yang valid!\n*ᴄᴏɴᴛᴏʜ:* ${usedPrefix}${command} https://google.com`)
  }

  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl
  }

  try {
    new URL(targetUrl)
  } catch {
    return reply(`❌ *URL tidak valid!*\nPastikan format tautan benar, contoh: https://google.com`)
  }

  if (!selectedProvider && customAlias) {
    selectedProvider = 'tinyurl'
  }

  if (selectedProvider) {
    reply(global.mess?.wait || '⏳ Sedang memperpendek URL...')

    if (selectedProvider === 'all') {
      const providerList = Object.keys(providers)
      const results = await Promise.allSettled(
        providerList.map(async (key) => {
          const p = providers[key]
          const link = await p.make(targetUrl, customAlias)
          return { key, name: p.name, link }
        })
      )

      let successText = `✅ *HASIL SEMUA SHORTLINK*\n\n🌐 *Original:* ${targetUrl}\n`
      if (customAlias) successText += `🏷️ *Custom Alias:* ${customAlias}\n`
      successText += '\n'

      let count = 0
      results.forEach((res, i) => {
        const key = providerList[i]
        const p = providers[key]
        if (res.status === 'fulfilled') {
          count++
          successText += `*${count}. ${p.name}*\n↳ ${res.value.link}\n\n`
        }
      })

      if (count === 0) {
        return reply(`❌ Maaf, semua layanan shortlink sedang mengalami gangguan. Silakan coba lagi nanti.`)
      }
      successText += `_Total ${count}/${providerList.length} layanan berhasil dibuat._`
      return reply(successText.trim())
    }

    const prov = providers[selectedProvider]
    if (!prov) {
      return reply(`❌ Provider *${selectedProvider}* tidak ditemukan.`)
    }

    if (customAlias && !prov.supportCustom) {
      return reply(`⚠️ Provider *${prov.name}* tidak mendukung custom alias. Provider yang mendukung custom: *tinyurl*, *spoome*, *dagd*.`)
    }

    try {
      const shortUrl = await prov.make(targetUrl, customAlias)
      const caption = [
        `✅ *SHORTLINK ʙᴇʀʜᴀsɪʟ DIBUAT*`,
        ``,
        `🌐 *Provider:* ${prov.name}`,
        `🔗 *Original:* ${targetUrl}`,
        customAlias ? `🏷️ *Custom Alias:* ${customAlias}` : null,
        `🚀 *✨ *ʜᴀsɪʟ:** ${shortUrl}`
      ].filter(Boolean).join('\n')

      return reply(caption)
    } catch (e) {
      return reply(`❌ ɢᴀɢᴀʟ memperpendek menggunakan *${prov.name}*:\n${e.message}`)
    }
  }

  const rows = [
    {
      id: `${usedPrefix}${command} all ${targetUrl}`,
      title: '⚡ Semua Provider (All)',
      description: 'Generate ke seluruh 11 web shortlink sekaligus'
    },
    ...Object.entries(providers).map(([key, prov]) => ({
      id: `${usedPrefix}${command} ${key} ${targetUrl}`,
      title: `${prov.supportCustom ? '✨ ' : '🔗 '}${prov.name}${prov.supportCustom ? ' (Bisa Custom)' : ''}`,
      description: `${prov.desc}`
    }))
  ]

  const messageText = `🔗 *SHORTLINK GENERATOR*\n\n🌐 *Target URL:* ${targetUrl}\n\nSilakan pilih salah satu web shortlink di bawah untuk memperpendek tautan Anda:\n_(Tanda ✨ menandakan provider mendukung Custom Alias)_`

  try {
    if (client && typeof client.sendButtons === 'function') {
      return await client.sendButtons(m.chat, {
        text: messageText,
        footer: `${global.namaBot || 'Rubby Multi Device'} • URL Shortener Tools`,
        buttons: [
          {
            title: '🌐 Pilih Web Shortlink',
            sections: [
              {
                title: 'Daftar Web Shortlink',
                rows: rows
              }
            ]
          }
        ]
      }, { quoted: m })
    }
  } catch (err) {
    console.error('[SHORTLINK BUTTON ERROR]', err)
  }

  let caption = `🔗 *SHORTLINK GENERATOR*\n\n🌐 *Target URL:* ${targetUrl}\n\n*Pilih opsi dengan mengetik perintah:*\n\n`
  caption += `• *${usedPrefix}${command} all ${targetUrl}* (Semua Layanan)\n`
  Object.entries(providers).forEach(([key, prov]) => {
    caption += `• *${usedPrefix}${command} ${key} ${targetUrl}* (${prov.name}${prov.supportCustom ? ' - Bisa Custom' : ''})\n`
  })
  return reply(caption.trim())
}

handler.help = ['shortlink <url>', 'shortlink <opsi> <url> [alias]']
handler.tags = ['tools']
handler.command = ['shortlink']
handler.limit = true
handler.register = false

export default handler
