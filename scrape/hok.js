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
┇   › Feature  : Honor of Kings Character Scraper
┇   › Source   : Fandom Wiki (MediaWiki API)
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import * as cheerio from 'cheerio'

const FANDOM_BASE = 'https://honor-of-kings.fandom.com'
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

async function searchPageName(query) {
  const searchUrl = `${FANDOM_BASE}/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=5&namespace=0&format=json`
  const res = await fetch(searchUrl, { headers: { 'User-Agent': UA } })
  if (!res.ok) return null
  const [, titles] = await res.json()
  return titles?.length ? titles[0] : null
}

async function fetchParsedPage(pageName) {
  const apiUrl = `${FANDOM_BASE}/api.php?action=parse&page=${encodeURIComponent(pageName)}&prop=text|images&format=json`
  const res = await fetch(apiUrl, { headers: { 'User-Agent': UA } })
  if (!res.ok) return { error: { info: 'Gagal mengambil data dari API' } }
  return res.json()
}

async function scrapeHokCharacter(name) {
  if (!name) throw new Error('Nama karakter kosong')

  let pageName = name
  let json = await fetchParsedPage(pageName)

  if (json.error) {
    const found = await searchPageName(name)
    if (found) {
      pageName = found
      json = await fetchParsedPage(pageName)
    }
    if (json.error) {
      throw new Error(`Karakter "${name}" tidak ditemukan`)
    }
  }

  const pageUrl = `${FANDOM_BASE}/wiki/${encodeURIComponent(pageName)}`

  const { title, text } = json.parse
  const html = text['*']
  const $ = cheerio.load(html)

  const clean = (str) => str?.replace(/\s+/g, ' ').trim()

  let image =
    $('.pi-image img').attr('src') ||
    $('.infobox img').first().attr('src') ||
    $('img').first().attr('src') ||
    null

  if (image && image.startsWith('//')) {
    image = 'https:' + image
  }
  if (image) {
    image = image.replace(/\/revision\/latest\/scale-to-width-down\/\d+/, '/revision/latest')
  }

  const profile = {}
  $('.pi-item.pi-data').each((_, el) => {
    const label = clean($(el).find('.pi-data-label').text())
    const value = clean($(el).find('.pi-data-value').text())
    if (label && value) profile[label] = value
  })

  const bio =
    clean($('.mw-parser-output > p').first().text()) ||
    clean($('p').first().text())

  let skills = []
  if (profile.Skills) {
    skills = profile.Skills
      .split(/[,•]/)
      .map((v) => clean(v))
      .filter(Boolean)
  }

  const loreParts = []
  $('#Background, #Lore, #Story').each((_, el) => {
    const heading = $(el).parent()
    let next = heading.next()
    while (next.length && !/^h[2-3]$/i.test(next[0]?.name)) {
      if (next[0]?.name === 'p') {
        const txt = clean(next.text())
        if (txt) loreParts.push(txt)
      }
      next = next.next()
    }
  })

  return {
    title,
    image,
    profile,
    bio,
    skills,
    lore: loreParts.length ? loreParts.join(' ') : null,
    url: pageUrl
  }
}

export default scrapeHokCharacter
