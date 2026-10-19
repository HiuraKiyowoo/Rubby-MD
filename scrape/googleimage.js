import axios from 'axios'
import * as cheerio from 'cheerio'

export async function googleImageSearch(query) {
  try {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    })
    const results = []
    const regex = /\["(https:\/\/[^"]+)",\d+,\d+\]/g
    let match
    while ((match = regex.exec(data)) !== null) {
      const imgUrl = match[1]
      if (imgUrl.endsWith('.jpg') || imgUrl.endsWith('.png') || imgUrl.endsWith('.jpeg')) {
        results.push({ url: imgUrl, title: query })
      }
    }
    if (results.length === 0) {
      const $ = cheerio.load(data)
      $('img').each((i, el) => {
        const src = $(el).attr('src')
        if (src && src.startsWith('http')) {
          results.push({ url: src, title: query })
        }
      })
    }
    return results
  } catch {
    return []
  }
}

export default { googleImageSearch }
