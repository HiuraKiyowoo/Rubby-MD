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

global.botName = 'Rubby Multi Device'
global.owner = ['6283150850721']
global.mode = 'self'
global.noBot = '62895429174872'
global.customPairingCode = 'RUBBYMD1'
global.botVersion = '1.5.0'
global.botCreator = 'Kyuu'
global.packname = 'Rubby Multi Device'
global.author = 'Kyuu'
global.thumb = 'media/thumb.jpg'
global.website = 'https://api.kyzzz.xyz'

global.mess = {
  wait: '⏳ Sedang diproses...',
  error: '❌ Terjadi kesalahan!'
}

global.APIs = {
  kyzz: 'https://api.kyzzz.xyz'
}

global.APIKeys = {
  'https://api.kyzzz.xyz': 'kyuuimp' // Daftar dan dapatkan apikey gratis di https://api.kyzzz.xyz
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => {
  const baseUrl = name in global.APIs ? global.APIs[name] : name
  const q = { ...query }
  if (apikeyqueryname) {
    const key = global.APIKeys[baseUrl] || global.APIKeys[name]
    if (key) q[apikeyqueryname] = key
  }
  const search = new URLSearchParams(q).toString()
  return baseUrl + path + (search ? '?' + search : '')
}
