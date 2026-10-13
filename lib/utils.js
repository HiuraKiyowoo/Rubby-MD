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

import { databaseApi } from './database.js'

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
  if (global.db?.getPremiumUsers) {
    return global.db.getPremiumUsers()
  }
  return databaseApi.getPremiumUsers()
}

export function savePremiumUsers(users) {
  if (!Array.isArray(users)) return false
  const current = getPremiumUsers()
  const dbInst = global.db || databaseApi
  for (const u of current) {
    if (!users.includes(u)) {
      dbInst.delPremium(u)
    }
  }
  for (const u of users) {
    dbInst.addPremium(u)
  }
  return true
}

export function isPremium(senderJid) {
  if (!senderJid) return false
  if (isOwner(senderJid)) return true
  const senderNumber = normalizeNumber(senderJid)
  if (global.db?.isPremium) {
    return global.db.isPremium(senderNumber)
  }
  return databaseApi.isPremium(senderNumber)
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
