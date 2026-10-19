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

const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  pink: '\x1b[38;5;213m',
  softPink: '\x1b[38;5;218m',
  lavender: '\x1b[38;5;183m'
}

function getTimestamp() {
  return new Date().toTimeString().split(' ')[0]
}

function formatTag(tag, color = colors.cyan) {
  return `${colors.dim}[${getTimestamp()}]${colors.reset} ${color}[${tag}]${colors.reset}`
}

export function maskSensitive(str) {
  if (!str) return ''
  let text = typeof str === 'string' ? str : String(str)
  // Mask GitHub tokens
  text = text.replace(/ghp_[a-zA-Z0-9]{20,}/g, 'ghp_********************')
  text = text.replace(/github_pat_[a-zA-Z0-9_]{20,}/g, 'github_pat_********************')
  // Mask generic Bearer tokens
  text = text.replace(/Bearer\s+[a-zA-Z0-9\-_.]+/gi, 'Bearer **********')
  // Mask apikey parameters in text/URLs
  text = text.replace(/([?&]apikey=)[^&\s]+/gi, '$1**********')
  text = text.replace(/(api[_-]?key["':\s]+)[a-zA-Z0-9_\-]+/gi, '$1**********')
  // Mask passwords
  text = text.replace(/(password["':\s]+)[^"'\s,]+/gi, '$1**********')
  return text
}

let lastErrorMsg = null
let lastErrorTime = 0
let suppressedCount = 0

function flushSuppressedErrors() {
  if (suppressedCount > 0) {
    console.warn(`${formatTag('ERROR_THROTTLE', colors.yellow)} ${colors.yellow}Previous error repeated ${suppressedCount} times (suppressed to prevent log spam)${colors.reset}`)
    suppressedCount = 0
  }
}

export const logger = {
  system(msg) {
    flushSuppressedErrors()
    console.log(`${formatTag('SYSTEM', colors.blue)} ${maskSensitive(msg)}`)
  },
  plugin(msg) {
    flushSuppressedErrors()
    console.log(`${formatTag('PLUGIN', colors.green)} ${maskSensitive(msg)}`)
  },
  whatsapp(msg) {
    flushSuppressedErrors()
    console.log(`${formatTag('WHATSAPP', colors.magenta)} ${maskSensitive(msg)}`)
  },
  message(msg) {
    flushSuppressedErrors()
    console.log(`${formatTag('MESSAGE', colors.cyan)} ${maskSensitive(msg)}`)
  },
  hotreload(msg) {
    flushSuppressedErrors()
    console.log(`${formatTag('HOTRELOAD', colors.yellow)} ${maskSensitive(msg)}`)
  },
  warn(msg) {
    flushSuppressedErrors()
    console.warn(`${formatTag('WARN', colors.yellow)} ${colors.yellow}${maskSensitive(msg)}${colors.reset}`)
  },
  error(msg, err) {
    const errorKey = `${msg}:${err?.message || err}`
    const now = Date.now()
    if (lastErrorMsg === errorKey && (now - lastErrorTime) < 3000) {
      suppressedCount++
      lastErrorTime = now
      return
    }

    flushSuppressedErrors()
    lastErrorMsg = errorKey
    lastErrorTime = now

    const maskedMsg = maskSensitive(msg)
    console.error(`${formatTag('ERROR', colors.red)} ${colors.red}${maskedMsg}${colors.reset}`)
    if (err?.stack) {
      console.error(`${colors.dim}${maskSensitive(err.stack)}${colors.reset}`)
    } else if (err) {
      console.error(maskSensitive(typeof err === 'object' ? JSON.stringify(err) : String(err)))
    }
  },
  chat({
    isGroup = false,
    groupName = '',
    sender = '',
    number = '',
    message = '',
    command = '',
    responseTime = 0,
    status = 'success ✓'
  }) {
    const timeStr = typeof responseTime === 'number' ? `${responseTime} ms` : String(responseTime)
    const cmdStr = command ? command : '-'
    const msgStr = message ? (message.length > 60 ? message.slice(0, 57) + '...' : message) : '-'
    const senderStr = sender || 'Unknown'
    const numberStr = number || '-'

    if (isGroup) {
      const gName = groupName || 'Group Chat'
      console.log(
`${colors.pink}╭─── ୨୧ RUBBY MULTI DEVICE ୨୧ ───╮${colors.reset}
${colors.pink}│${colors.reset} ૮₍˶ᵔ ᵕ ᵔ˶₎ა ${colors.softPink}group message!${colors.reset}
${colors.pink}╰────────────────────────────────╯${colors.reset}

${colors.lavender}୨ৎ  GROUP CHAT${colors.reset}
${colors.pink}│${colors.reset}
${colors.pink}├─${colors.reset} ♡ Group   : ${colors.cyan}${gName} ♡${colors.reset}
${colors.pink}├─${colors.reset} ♡ Sender  : ${colors.softPink}${senderStr}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Number  : ${colors.yellow}${numberStr}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Message : ${colors.reset}${msgStr}
${colors.pink}├─${colors.reset} ♡ Command : ${colors.green}${cmdStr}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Response: ${colors.magenta}${timeStr}${colors.reset}
${colors.pink}└─${colors.reset} ♡ Status  : ${status.includes('error') ? colors.red : colors.green}${status}${colors.reset}

${colors.softPink}꒰ა ♡ ໒꒱ rubby is ready for more chats!${colors.reset}
`
      )
    } else {
      console.log(
`${colors.pink}╭─── ୨୧ RUBBY MULTI DEVICE ୨୧ ───╮${colors.reset}
${colors.pink}│${colors.reset} ૮₍˶ᵔ ᵕ ᵔ˶₎ა ${colors.softPink}private message!${colors.reset}
${colors.pink}╰────────────────────────────────╯${colors.reset}

${colors.lavender}୨ৎ  PRIVATE CHAT${colors.reset}
${colors.pink}│${colors.reset}
${colors.pink}├─${colors.reset} ♡ Sender  : ${colors.softPink}${senderStr}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Number  : ${colors.yellow}${numberStr}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Message : ${colors.reset}${msgStr}
${colors.pink}├─${colors.reset} ♡ Command : ${colors.green}${cmdStr}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Response: ${colors.magenta}${timeStr}${colors.reset}
${colors.pink}└─${colors.reset} ♡ Status  : ${status.includes('error') ? colors.red : colors.green}${status}${colors.reset}

${colors.softPink}꒰ა ♡ ໒꒱ rubby is ready for more chats!${colors.reset}
`
      )
    }
  }
}

export default logger
