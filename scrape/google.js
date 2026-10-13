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
┇   › Feature  : Google Search / News Scraper
┇   › Engine   : Google RSS Engine
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import * as cheerio from 'cheerio'
import axios from 'axios'

const ENGINE_CONFIG = Object.freeze({
  TARGET_HOST: 'bmV3cy5nb29nbGUuY29t',
  DEFAULT_LANG: 'id',
  DEFAULT_REGION: 'ID',
  NETWORK_TIMEOUT: 8500,
  UA_POOL:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
})

class GoogleScraperKernel {
  constructor() {
    this.resolverHost = Buffer.from(
      ENGINE_CONFIG.TARGET_HOST,
      'base64',
    ).toString('utf-8')
  }

  $extractCipherPayload(sourceUrl) {
    if (!sourceUrl || typeof sourceUrl !== 'string') return null
    const pointer = sourceUrl.indexOf('articles/')
    if (pointer === -1) return null
    return sourceUrl.substring(pointer + 9).split('?')[0]
  }

  $transformSerialization(cipherText) {
    let serialized = cipherText.replace(/-/g, '+').replace(/_/g, '/')
    const padMetric = serialized.length % 4
    if (padMetric > 0) {
      serialized += '='.repeat(4 - padMetric)
    }
    return serialized
  }

  compileBinaryPayload(rawUrl) {
    try {
      const token = this.$extractCipherPayload(rawUrl)
      if (!token) return rawUrl

      const targetMatrix = this.$transformSerialization(token)
      const byteBuffer = Buffer.from(targetMatrix, 'base64')
      const streamOutput = byteBuffer.toString('utf-8')

      const urlVector = streamOutput.match(/https?:\/\/[^\s"\><]+/g)
      return urlVector && urlVector.length > 0 ? urlVector[0] : rawUrl
    } catch {
      return rawUrl
    }
  }

  async executeQueryPipeline(searchToken) {
    if (!searchToken || searchToken.trim().length === 0) {
      return { status: false, error: 'Query tidak boleh kosong' }
    }

    const queryHex = encodeURIComponent(searchToken)
    const endpointUri = `https://${this.resolverHost}/rss/search?q=${queryHex}&hl=${ENGINE_CONFIG.DEFAULT_LANG}&gl=${ENGINE_CONFIG.DEFAULT_REGION}&ceid=${ENGINE_CONFIG.DEFAULT_REGION}:${ENGINE_CONFIG.DEFAULT_LANG}`

    try {
      const networkResponse = await axios.get(endpointUri, {
        timeout: ENGINE_CONFIG.NETWORK_TIMEOUT,
        headers: {
          'User-Agent': ENGINE_CONFIG.UA_POOL,
          'X-Engine-Context': 'Production-Kernel-v3.0.4',
        },
      })

      if (networkResponse.status !== 200) {
        throw new Error(`Network core rejected stream with status: ${networkResponse.status}`)
      }

      const documentContext = cheerio.load(networkResponse.data, {
        xmlMode: true,
      })
      const allocationPool = []

      documentContext('item').each((index, structuralNode) => {
        const nodeLink = documentContext(structuralNode).find('link').text()
        const processedAddress = this.compileBinaryPayload(nodeLink)

        allocationPool.push({
          index_node: index + 1,
          resource_title: documentContext(structuralNode).find('title').text(),
          resolved_endpoint: processedAddress,
          temporal_stamp: documentContext(structuralNode).find('pubDate').text(),
          origin_node: documentContext(structuralNode).find('source').text(),
        })
      })

      return { status: true, results: allocationPool }
    } catch (pipelineError) {
      return { status: false, error: pipelineError.message }
    }
  }
}

async function GoogleSearch(query) {
  const kernel = new GoogleScraperKernel()
  return kernel.executeQueryPipeline(query)
}

export { GoogleSearch }
export default GoogleSearch
