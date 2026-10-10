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

import axios from 'axios'
import * as cheerio from 'cheerio'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export async function ephoto(url, textInputs, maxRetries = 3) {
  const textArr = Array.isArray(textInputs) ? textInputs : [textInputs]
  let lastError

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const initialResponse = await axios.get(url, {
        headers: { 'user-agent': UA },
        timeout: 15000
      })
      const cookies = initialResponse.headers['set-cookie']
        ? initialResponse.headers['set-cookie'].map(c => c.split(';')[0]).join('; ')
        : ''
      const $ = cheerio.load(initialResponse.data)
      const token = $('input[name=token]').val()
      const buildServer = $('input[name=build_server]').val()
      const buildServerId = $('input[name=build_server_id]').val()

      if (!token || !buildServer) {
        throw new Error('Form token / build server tidak ditemukan pada halaman website Ephoto360')
      }

      const formParams = new URLSearchParams()
      for (const t of textArr) {
        formParams.append('text[]', t)
      }
      formParams.append('token', token)
      formParams.append('build_server', buildServer)
      formParams.append('build_server_id', buildServerId)

      const postResponse = await axios({
        url,
        method: 'POST',
        data: formParams.toString(),
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'user-agent': UA,
          'cookie': cookies,
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        timeout: 15000
      })

      const $$ = cheerio.load(postResponse.data)
      const formValueRaw = $$('input[name=form_value_input]').val()
      if (!formValueRaw) {
        throw new Error('Respon POST form_value_input tidak valid dari Ephoto360')
      }

      const formValueInput = JSON.parse(formValueRaw)
      formValueInput['text[]'] = formValueInput.text
      delete formValueInput.text

      const { data: finalResponseData } = await axios.post(
        'https://en.ephoto360.com/effect/create-image',
        new URLSearchParams(formValueInput).toString(),
        {
          headers: {
            'user-agent': UA,
            'cookie': cookies,
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest'
          },
          timeout: 20000
        }
      )

      if (!finalResponseData || !finalResponseData.image) {
        throw new Error('API Ephoto360 tidak mengembalikan path gambar yang valid')
      }

      const buildUrl = buildServer.endsWith('/') ? buildServer.slice(0, -1) : buildServer
      const fullImgUrl = buildUrl + finalResponseData.image

      const imgRes = await axios.get(fullImgUrl, {
        responseType: 'arraybuffer',
        timeout: 15000
      })

      const buffer = Buffer.from(imgRes.data)
      if (!buffer || buffer.length < 100) {
        throw new Error('Buffer gambar dari Ephoto360 kosong atau bermasalah')
      }

      return {
        url: fullImgUrl,
        buffer
      }
    } catch (err) {
      lastError = err
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000 * attempt))
      }
    }
  }

  throw new Error(`Gagal memproses Ephoto360 (${lastError?.message || 'Network / Scraper error'})`)
}

export default ephoto
