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

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const premiumFilePath = path.resolve(__dirname, '../database/premium.json')

export function normalizeNumber(jid) {
  if (!jid || typeof jid !== 'string') return ''
  return jid.split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
}

export function normalizeJid(jid) {
  if (!jid || typeof jid !== 'string') return ''
  const num = normalizeNumber(jid)
  return num ? `${num}@s.whatsapp.net` : ''
}

export function isOwner(senderJid) {
  if (!senderJid) return false
  const senderNumber = normalizeNumber(senderJid)
  const owners = (global.owner || []).map(o => normalizeNumber(o))
  return owners.includes(senderNumber)
}

export function getPremiumUsers() {
  try {
    if (!fs.existsSync(premiumFilePath)) {
      fs.mkdirSync(path.dirname(premiumFilePath), { recursive: true })
      fs.writeFileSync(premiumFilePath, JSON.stringify([], null, 2))
      return []
    }
    const data = fs.readFileSync(premiumFilePath, 'utf-8')
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function savePremiumUsers(users) {
  try {
    if (!fs.existsSync(path.dirname(premiumFilePath))) {
      fs.mkdirSync(path.dirname(premiumFilePath), { recursive: true })
    }
    fs.writeFileSync(premiumFilePath, JSON.stringify(users, null, 2))
    return true
  } catch {
    return false
  }
}

export function isPremium(senderJid) {
  if (!senderJid) return false
  if (isOwner(senderJid)) return true
  const senderNumber = normalizeNumber(senderJid)
  const dbPremiums = getPremiumUsers().map(p => normalizeNumber(p))
  return dbPremiums.includes(senderNumber)
}

export function formatRuntime(ms) {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  const hours = Math.floor(ms / (1000 * 60 * 60))

  const h = hours < 10 ? '0' + hours : hours
  const m = minutes < 10 ? '0' + minutes : minutes
  const s = seconds < 10 ? '0' + seconds : seconds

  return `${h}:${m}:${s}`
}
