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
┇   › Feature  : Komiktap Scraper Suite
┇   › Target   : komiktap.info
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import * as cheerio from 'cheerio'
import axios from 'axios'

const BASE_URL = 'https://komiktap.info'
const DEFAULT_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  Referer: BASE_URL,
}

const client = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: 15000,
})

/**
 * Cari komik / manhwa di Komiktap
 * @param {string} query
 * @param {number} [page=1]
 */
export async function search(query, page = 1) {
  try {
    const endpoint = page > 1 ? `/page/${page}/?s=${encodeURIComponent(query)}` : `/?s=${encodeURIComponent(query)}`
    const { data } = await client.get(endpoint)
    const $ = cheerio.load(data)
    const results = []

    $('.bsx').each((_, el) => {
      const link = $(el).find('a').first()
      const title = link.attr('title') || $(el).find('.tt').text().trim()
      const url = link.attr('href') || ''
      const thumbnail = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || ''
      const type = $(el).find('.type').text().trim() || $(el).find('.typeflag').text().trim()
      const chapter = $(el).find('.epxs').text().trim()
      const rating = $(el).find('.numscore').text().trim()

      if (title && url) {
        results.push({
          title,
          url,
          thumbnail,
          type: type || 'Unknown',
          chapter: chapter || 'N/A',
          rating: rating || 'N/A',
        })
      }
    })

    return {
      status: true,
      query,
      page,
      total: results.length,
      results,
    }
  } catch (err) {
    return {
      status: false,
      message: err.message,
      results: [],
    }
  }
}

/**
 * Ambil daftar komik terbaru / katalog
 * @param {number} [page=1]
 * @param {string} [type='all'] - 'all' | 'manga' | 'manhwa' | 'manhua'
 */
export async function getLatest(page = 1, type = 'all') {
  try {
    let endpoint = `/manga/?page=${page}`
    if (type === 'manhwa') endpoint = `/list-manhwa/?page=${page}`
    else if (type === 'manga') endpoint = `/list-manga/?page=${page}`
    else if (type === 'manhua') endpoint = `/list-manhua/?page=${page}`

    const { data } = await client.get(endpoint)
    const $ = cheerio.load(data)
    const results = []

    $('.bsx').each((_, el) => {
      const link = $(el).find('a').first()
      const title = link.attr('title') || $(el).find('.tt').text().trim()
      const url = link.attr('href') || ''
      const thumbnail = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || ''
      const chapter = $(el).find('.epxs').text().trim()
      const rating = $(el).find('.numscore').text().trim()

      if (title && url) {
        results.push({
          title,
          url,
          thumbnail,
          chapter: chapter || 'N/A',
          rating: rating || 'N/A',
        })
      }
    })

    return {
      status: true,
      page,
      type,
      total: results.length,
      results,
    }
  } catch (err) {
    return {
      status: false,
      message: err.message,
      results: [],
    }
  }
}

/**
 * Ambil detail informasi komik beserta daftar chapter
 * @param {string} comicUrl - URL detail komik (contoh: https://komiktap.info/manga/xxx/)
 */
export async function getDetail(comicUrl) {
  try {
    const url = comicUrl.startsWith('http') ? comicUrl : `${BASE_URL}/manga/${comicUrl}/`
    const { data } = await client.get(url)
    const $ = cheerio.load(data)

    const title = $('.entry-title').text().trim()
    const alterTitle = $('.seriestualt').text().trim()
    const thumbnail =
      $('.thumb img').attr('src') || $('.thumb img').attr('data-src') || ''
    const synopsis =
      $('.entry-content p').text().trim() || $('.seriestucontentr p').text().trim() || $('.entry-content').text().trim()
    const rating = $('.numscore, .rating-prc [itemprop="ratingValue"]').first().text().trim()

    const genres = []
    $('.seriestugenre a, .mgen a').each((_, el) => {
      const g = $(el).text().trim()
      if (g) genres.push(g)
    })

    const metadata = {}
    $('.seriestucontentr table tr').each((_, el) => {
      const key = $(el).find('td').first().text().trim().replace(/:$/, '')
      const val = $(el).find('td').last().text().trim()
      if (key && val) metadata[key] = val
    })

    const chapters = []
    $('#chapterlist li, .eplister li').each((_, el) => {
      const chNum = $(el).find('.chapternum').text().trim()
      const chUrl = $(el).find('a').attr('href') || ''
      const chDate = $(el).find('.chapterdate').text().trim()

      if (chUrl) {
        chapters.push({
          title: chNum || $(el).find('a').text().trim(),
          url: chUrl,
          date: chDate || 'Unknown',
        })
      }
    })

    return {
      status: true,
      title,
      alterTitle,
      thumbnail,
      synopsis,
      rating: rating || 'N/A',
      genres,
      metadata,
      totalChapters: chapters.length,
      chapters,
    }
  } catch (err) {
    return {
      status: false,
      message: err.message,
    }
  }
}

/**
 * Ambil gambar-gambar (panel) dalam satu chapter
 * @param {string} chapterUrl - URL chapter (contoh: https://komiktap.info/xxx-chapter-xx/)
 */
export async function getChapter(chapterUrl) {
  try {
    const url = chapterUrl.startsWith('http') ? chapterUrl : `${BASE_URL}/${chapterUrl}/`
    const { data } = await client.get(url)
    const $ = cheerio.load(data)

    const title = $('.entry-title').text().trim()
    let images = []
    let prevUrl = ''
    let nextUrl = ''

    // 1. Ekstrak dari ts_reader.run JSON script
    const scriptMatch = data.match(/ts_reader\.run\((\{[\s\S]*?\})\);/)
    if (scriptMatch) {
      try {
        const parsed = JSON.parse(scriptMatch[1])
        if (parsed.sources && parsed.sources.length > 0) {
          images = parsed.sources[0].images || []
        }
        prevUrl = parsed.prevUrl || ''
        nextUrl = parsed.nextUrl || ''
      } catch (_) {}
    }

    // 2. Fallback parser jika ts_reader tidak ditemukan / kosong
    if (!images || images.length === 0) {
      $('#readerarea img').each((_, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src') || ''
        if (src && !images.includes(src)) {
          images.push(src)
        }
      })
      prevUrl = $('.ch-prev-btn, a.prev, .nextprev a[rel="prev"]').attr('href') || ''
      nextUrl = $('.ch-next-btn, a.next, .nextprev a[rel="next"]').attr('href') || ''
    }

    return {
      status: true,
      title,
      totalImages: images.length,
      images,
      navigation: {
        prevUrl,
        nextUrl,
      },
    }
  } catch (err) {
    return {
      status: false,
      message: err.message,
      images: [],
    }
  }
}

/**
 * Daftar Genre yang tersedia
 */
export async function getGenres() {
  try {
    const { data } = await client.get('/genres/')
    const $ = cheerio.load(data)
    const genres = []

    $('.taxindex li a, ul.genre li a').each((_, el) => {
      const name = $(el).text().trim()
      const url = $(el).attr('href') || ''
      if (name && url) {
        genres.push({ name, url })
      }
    })

    return {
      status: true,
      total: genres.length,
      genres,
    }
  } catch (err) {
    return {
      status: false,
      message: err.message,
      genres: [],
    }
  }
}

export default {
  search,
  getLatest,
  getDetail,
  getChapter,
  getGenres,
}
