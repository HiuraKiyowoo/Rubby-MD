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

import './setting.js'
import dns from 'node:dns'
import fs from 'node:fs'
import os from 'node:os'
import process from 'node:process'
import path from 'node:path'
import readline from 'node:readline'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import {
  makeWASocket,
  Browsers,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestWaWebVersion,
  Button,
  Carousel,
  AIRich,
  MB,
  readRichMessage,
  decodeAIRich
} from 'ruby-baileys'
import axios from 'axios'
import pino from 'pino'
import sharp from 'sharp'
import bindMessageHelpers from './lib/message.js'
import { serialize } from './lib/serializer.js'
import { normalizeNumber } from './lib/utils.js'
import { PluginRegistry, PluginWatcher } from './lib/plugins.js'
import { messageHandler } from './handler.js'
import { renderWelcome, renderGoodbye } from './lib/canvas.js'
import { initDatabase, databaseApi } from './lib/database.js'
import {
  startJadiBot,
  stopJadiBot,
  listJadiBots,
  hasBot,
  getBot,
  getBots,
  autoStartSavedSessions,
  setJadibotRegistry
} from './lib/jadibot.js'

global.Button = Button
global.Carousel = Carousel
global.AIRich = AIRich
global.MB = MB
global.readRichMessage = readRichMessage
global.decodeAIRich = decodeAIRich

dns.setDefaultResultOrder('ipv4first')
global.startTime = Date.now()

if (global.noBot) {
  const normBot = normalizeNumber(global.noBot)
  if (!global.owner) global.owner = []
  if (normBot && !global.owner.some(o => normalizeNumber(o) === normBot)) {
    global.owner.push(normBot)
  }
}

await initDatabase()

const _suppressPatterns = [
  'Closing open session in favor of incoming prekey bundle',
  'Closing session',
  'Opening session',
  'Session already closed',
  'Session already open',
  'Removing old closed session',
  'Decrypted message with closed session',
  'Failed to decrypt message with any known session',
  'SessionEntry',
  '_chains',
  'currentRatchet',
  'pendingPreKey'
]

function _shouldMuteLog(...args) {
  for (const a of args) {
    if (!a) continue
    if (typeof a === 'string') {
      if (_suppressPatterns.some(p => a.includes(p))) return true
    } else if (typeof a === 'object') {
      if (a.constructor?.name === 'SessionEntry' || a._chains || a.currentRatchet || a.pendingPreKey) {
        return true
      }
      try {
        const s = JSON.stringify(a)
        if (_suppressPatterns.some(p => s.includes(p))) return true
      } catch {}
    }
  }
  return false
}

const _origWarn = console.warn
console.warn = function(...args) {
  if (_shouldMuteLog(...args)) return
  _origWarn.apply(console, args)
}

const _origInfo = console.info
console.info = function(...args) {
  if (_shouldMuteLog(...args)) return
  _origInfo.apply(console, args)
}

const _origError = console.error
console.error = function(...args) {
  if (_shouldMuteLog(...args)) return
  _origError.apply(console, args)
}

const _origLog = console.log
console.log = function(...args) {
  if (_shouldMuteLog(...args)) return
  _origLog.apply(console, args)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pluginsDir = path.resolve(__dirname, 'plugins')
const sessionDir = path.resolve(__dirname, 'session')
const tmpDir = path.resolve(__dirname, 'tmp')

const colors = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  pink: '\x1b[38;5;213m',
  softPink: '\x1b[38;5;218m',
  lavender: '\x1b[38;5;183m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
}

function cleanTmpFiles() {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
    return
  }
  try {
    const files = fs.readdirSync(tmpDir)
    const now = Date.now()
    for (const file of files) {
      if (file === '.gitkeep') continue
      const filePath = path.join(tmpDir, file)
      try {
        const stats = fs.statSync(filePath)
        if (now - stats.mtimeMs > 5 * 60 * 1000) {
          fs.unlinkSync(filePath)
        }
      } catch {}
    }
  } catch {}
}

cleanTmpFiles()
setInterval(cleanTmpFiles, 10 * 60 * 1000)

const CONFIG = {
  name: global.botName || 'Rubby Multi Device',
  dev: global.botCreator || 'Kyuu',
  website: global.website || 'https://api.kyzzz.xyz',
  github: 'https://github.com/KyuuX444/Rubby-MD',
  youtube: 'https://youtube.com/@MommyKyuu',
  session: sessionDir,
  phoneNumber: global.noBot,
  customPairingCode: global.customPairingCode || global.pairingCode,
  pairing: true
}

const pinoLogger = pino({ level: 'silent' })

const bytes = (n) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(2)} ${units[i]}`
}

function startup(pluginsCount = 0, commandsCount = 0) {
  const mem = process.memoryUsage()
  const total = os.totalmem()
  const free = os.freemem()

  console.log(`
${colors.pink}╭─── ୨୧ RUBBY MULTI DEVICE ୨୧ ───╮${colors.reset}
${colors.pink}│${colors.reset} ૮₍˶ᵔ ᵕ ᵔ˶₎ა ${colors.softPink}system initialization!${colors.reset}
${colors.pink}╰────────────────────────────────╯${colors.reset}

${colors.lavender}୨ৎ  SYSTEM INFORMATION${colors.reset}
${colors.pink}│${colors.reset}
${colors.pink}├─${colors.reset} ♡ Bot Name  : ${colors.cyan}${CONFIG.name}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Developer : ${colors.softPink}${CONFIG.dev}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Core      : ${colors.pink}Ruby MD by Kyu${colors.reset}
${colors.pink}├─${colors.reset} ♡ Website   : ${colors.magenta}${CONFIG.website}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Node.js   : ${colors.yellow}${process.version}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Platform  : ${colors.yellow}${process.platform} (${process.arch})${colors.reset}
${colors.pink}├─${colors.reset} ♡ RAM       : ${colors.cyan}${bytes(total - free)} / ${bytes(total)}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Plugins   : ${colors.green}${pluginsCount} plugins${colors.reset}
${colors.pink}├─${colors.reset} ♡ Commands  : ${colors.green}${commandsCount} commands${colors.reset}
${colors.pink}└─${colors.reset} ♡ Status    : ${colors.green}starting up...${colors.reset}

${colors.softPink}꒰ა ♡ ໒꒱ loading modules & session...${colors.reset}
`)
}

const registry = new PluginRegistry(pluginsDir)
await registry.loadAll()
global.registry = registry
setJadibotRegistry(registry)

global.startJadiBot = (num, m, isAuto) => startJadiBot(num, m, isAuto, registry)
global.stopJadiBot = stopJadiBot
global.listJadiBots = listJadiBots
global.hasJadiBot = hasBot
global.getJadiBots = getBots

const watcher = new PluginWatcher(registry, pluginsDir)
watcher.start()

startup(registry.plugins.size, registry.commands.size)

let sock = null
let isReconnecting = false
let isClosed = false
let hasPairingCodeRequested = false

function cleanupSocket() {
  if (sock) {
    try {
      sock.ev.removeAllListeners('connection.update')
      sock.ev.removeAllListeners('creds.update')
      sock.ev.removeAllListeners('messages.upsert')
      sock.ev.removeAllListeners('group-participants.update')
      if (sock.ws) {
        sock.ws.close()
      }
    } catch {}
    sock = null
  }
}

async function startBot() {
    let lastKnownCommitSha = null
  let isPromptingUpdate = false

  async function checkGitHubUpdate() {
    try {
      const repoUrl = "https://api.github.com/repos/KyuuX444/Rubby-MD/commits/main"
      const { data } = await axios.get(repoUrl, {
        headers: { "User-Agent": "Ruby-Baileys-Bot" },
        timeout: 10000
      })

      const latestSha = data.sha
      const commitMsg = data.commit?.message?.trim() || "Pembaruan script"
      const commitAuthor = data.commit?.author?.name || "Kyuu"
      const commitDate = data.commit?.author?.date
        ? new Date(data.commit.author.date).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
        : "-"

      let localSha = ""
      try {
        const { stdout } = await promisify(exec)("git rev-parse HEAD")
        localSha = stdout.trim()
      } catch {}

      if (!lastKnownCommitSha) {
        lastKnownCommitSha = localSha || latestSha
      }

      if (latestSha !== lastKnownCommitSha && latestSha !== localSha) {
        lastKnownCommitSha = latestSha

        console.log(`\n\x1b[36m╭───────────────────────────────────────────────╮\x1b[0m`)
        console.log(`\x1b[36m│\x1b[0m 🚀 \x1b[1m\x1b[32mUPDATE TERSEDIA DI GITHUB REPOSITORY!\x1b[0m       \x1b[36m│\x1b[0m`)
        console.log(`\x1b[36m├───────────────────────────────────────────────┤\x1b[0m`)
        console.log(`\x1b[36m│\x1b[0m • Commit : \x1b[33m${latestSha.slice(0, 7)}\x1b[0m`)
        console.log(`\x1b[36m│\x1b[0m • Pesan  : ${commitMsg.slice(0, 36)}`)
        console.log(`\x1b[36m│\x1b[0m • Author : ${commitAuthor}`)
        console.log(`\x1b[36m│\x1b[0m • Waktu  : ${commitDate} WIB`)
        console.log(`\x1b[36m╰───────────────────────────────────────────────╯\x1b[0m\n`)

        if (!isPromptingUpdate && process.stdin.isTTY) {
          isPromptingUpdate = true
          const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
          rl.question("\x1b[35mApakah kamu ingin mengupdate SC sekarang? (y/n): \x1b[0m", async (ans) => {
            rl.close()
            isPromptingUpdate = false
            if (ans.trim().toLowerCase() === "y" || ans.trim().toLowerCase() === "yes") {
              console.log("\x1b[33mMengunduh update dari GitHub (git pull)...\x1b[0m")
              try {
                const { stdout, stderr } = await promisify(exec)("git pull origin main")
                console.log("\x1b[32m" + stdout + "\x1b[0m")
                console.log("\x1b[32mUpdate berhasil! Memulai ulang bot...\x1b[0m")
                process.exit(0)
              } catch (e) {
                console.error("\x1b[31mGagal melakukan git pull:\x1b[0m", e.message)
              }
            } else {
              console.log("\x1b[90mUpdate dilewati.\x1b[0m")
            }
          })
        }
      }
    } catch {}
  }


  if (isClosed) return

  const { state, saveCreds } = await useMultiFileAuthState(CONFIG.session)
  const { version } = await fetchLatestWaWebVersion().catch(() => ({ version: [2, 3000, 1049236237], isLatest: false }))

  const rawSock = makeWASocket({
    version,
    auth: state,
    logger: pinoLogger,
    browser: Browsers.ubuntu('Chrome'),
    printQRInTerminal: false,
    markOnlineOnConnect: false,
    generateHighQualityLinkPreview: true,
    syncFullHistory: false,
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 25000,
    defaultQueryTimeoutMs: 60000
  })

  rawSock.identity = 'Kyzz'
  rawSock.registry = registry
  rawSock.isJadiBot = false
  sock = bindMessageHelpers(rawSock)
  sock.isJadiBot = false
  global.conn = sock
  global.mainSock = sock
  global.conn.welcome = global.conn.welcome || '✦━━━━━━[ WELCOME ]━━━━━━✦\n\n┏––––––━━━━━━━━•\n│⫹⫺ @subject\n┣━━━━━━━━┅┅┅\n│( 👋 Hallo @user)\n├[ INTRO ]—\n│ Nama: \n│ Umur: \n│ Gender:\n┗––––––━━┅┅┅\n\n––––––┅┅ DESCRIPTION ┅┅––––––\n@desc'
  global.conn.bye = global.conn.bye || '✦━━━━━━[ GOOD BYE ]━━━━━━✦\nSayonara @user 👋( ╹▽╹ )'

  if (CONFIG.pairing && !sock.authState.creds.registered && !hasPairingCodeRequested) {
    const cleanNumber = normalizeNumber(CONFIG.phoneNumber)
    if (cleanNumber) {
      hasPairingCodeRequested = true
      let pairingTimeout = setTimeout(async () => {
        const doPairing = async (retryCount = 0) => {
          try {
            const customCode = (global.customPairingCode || global.pairingCode || CONFIG.customPairingCode)?.toString().trim()
            const code = await sock.requestPairingCode(cleanNumber, customCode || undefined)
            const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code

            console.log(`
${colors.pink}╭─── ୨୧ RUBBY MULTI DEVICE ୨୧ ───╮${colors.reset}
${colors.pink}│${colors.reset} ૮₍˶ᵔ ᵕ ᵔ˶₎ა ${colors.softPink}whatsapp pairing!${colors.reset}
${colors.pink}╰────────────────────────────────╯${colors.reset}

${colors.lavender}୨ৎ  PAIRING CODE${colors.reset}
${colors.pink}│${colors.reset}
${colors.pink}├─${colors.reset} ♡ Number       : ${colors.yellow}${CONFIG.phoneNumber}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Pairing Code : ${colors.green}${formattedCode}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Status       : ${colors.cyan}waiting for confirmation${colors.reset}
${colors.pink}└─${colors.reset} ♡ Instruction  : ${colors.softPink}Link with phone number in WhatsApp${colors.reset}

${colors.softPink}꒰ა ♡ ໒꒱ enter the code in your whatsapp!${colors.reset}
`)
          } catch (error) {
            console.error(`Pairing failed: ${error.message}`)
            if (error.message?.includes('rate-overlimit') && retryCount < 10) {
              const waitSec = Math.min(20 + retryCount * 10, 60)
              console.log(`${colors.yellow}WhatsApp rate-overlimit terdeteksi, menunggu ${waitSec} detik sebelum mencoba lagi...${colors.reset}`)
              setTimeout(() => doPairing(retryCount + 1), waitSec * 1000)
            }
          }
        }
        await doPairing()
      }, 3000)
    }
  }

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'connecting') {
      console.log(`${colors.dim}[WHATSAPP]${colors.reset} ${colors.cyan}Connecting to WhatsApp...${colors.reset}`)
    }

    if (connection === 'open') {
      global.connectedTime = Date.now()

      const selfBotNum = normalizeNumber(sock.user?.id || '')
      if (selfBotNum && !global.owner.some(o => normalizeNumber(o) === selfBotNum)) {
        global.owner.push(selfBotNum)
      }

      console.log(`
${colors.pink}╭─── ୨୧ RUBBY MULTI DEVICE ୨୧ ───╮${colors.reset}
${colors.pink}│${colors.reset} ૮₍˶ᵔ ᵕ ᵔ˶₎ა ${colors.softPink}whatsapp connected!${colors.reset}
${colors.pink}╰────────────────────────────────╯${colors.reset}

${colors.lavender}୨ৎ  CONNECTION STATUS${colors.reset}
${colors.pink}│${colors.reset}
${colors.pink}├─${colors.reset} ♡ Bot Name : ${colors.softPink}${sock.user?.name || sock.user?.id || 'Rubby'}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Bot JID  : ${colors.yellow}${sock.user?.id || 'Unknown'}${colors.reset}
${colors.pink}├─${colors.reset} ♡ Library  : ${colors.cyan}ruby-baileys@1.5.17${colors.reset}
${colors.pink}├─${colors.reset} ♡ Status   : ${colors.green}online & ready${colors.reset}
${colors.pink}└─${colors.reset} ♡ Auth     : ${colors.green}authenticated ✓${colors.reset}

${colors.softPink}꒰ა ♡ ໒꒱ rubby is ready to serve!${colors.reset}
`)
      isReconnecting = false
      setTimeout(async () => {
        try {
          if (typeof sock?.newsletterFollow === 'function') {
            await sock.newsletterFollow('120363400297473298@newsletter').catch(() => {})
            await sock.newsletterFollow('120363412125354105@newsletter').catch(() => {})
          }
          const botJid = sock.user?.id ? (typeof sock.decodeJid === 'function' ? await sock.decodeJid(sock.user.id) : sock.user.id.split(':')[0] + '@s.whatsapp.net') : null
          if (botJid) {
            const connectMsg = `୨ৎ RUBBY MULTI DEVICE ୨ৎ\n\n` +
              `♡ Bot berhasil terhubung!\n` +
              `› Status : Connected ✓\n` +
              `› Mode   : WhatsApp Multi Device\n` +
              `› Dev    : Kyuu\n\n` +
              `૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა Rubby is online ♡\n\n` +
              `› GitHub : https://github.com/KyuuX444\n` +
              `› Channel : https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13`
            await sock.sendMessage(botJid, { text: connectMsg }).catch(() => {})
            await checkGitHubUpdate()
            setInterval(() => checkGitHubUpdate(true), 15 * 60 * 1000)
            autoStartSavedSessions(registry).catch(() => {})
          }
        } catch {}
      }, 2000)
    }

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode
      console.log(`${colors.dim}[WHATSAPP]${colors.reset} ${colors.yellow}Connection closed (${code ?? 'unknown'})${colors.reset}`)

      if (code !== DisconnectReason.loggedOut) {
        if (!isClosed && !isReconnecting) {
          isReconnecting = true
          console.log(`${colors.dim}[WHATSAPP]${colors.reset} ${colors.magenta}Reconnecting...${colors.reset}`)
          setTimeout(() => {
            cleanupSocket()
            startBot().catch((err) =>
              console.error(`Restart failed: ${err.message}`)
            )
          }, 3000)
        }
      } else {
        console.error('Session logged out. Clearing dead session and restarting for pairing...')
        try {
          fs.rmSync(CONFIG.session, { recursive: true, force: true })
          fs.mkdirSync(CONFIG.session, { recursive: true })
        } catch {}
        hasPairingCodeRequested = false
        setTimeout(() => {
          cleanupSocket()
          startBot().catch((err) =>
            console.error(`Restart failed: ${err.message}`)
          )
        }, 2000)
      }
    }
  })

  function getGroupData(groupId) {
    if (global.db?.getGroup) {
      return global.db.getGroup(groupId)
    }
    return databaseApi.getGroup(groupId)
  }

  async function generateCanvasBuffer(type, ppBuffer, bgBuffer, name, group, member) {
    try {
      if (type === 'goodbye') {
        return await renderGoodbye({
          username: name,
          profileImage: ppBuffer,
          groupName: group,
          description: `Member: ${member}`
        })
      } else {
        return await renderWelcome({
          username: name,
          profileImage: ppBuffer,
          groupName: group,
          description: `Member: ${member}`
        })
      }
    } catch (err) {
      console.error('Error generating canvas buffer:', err)
      return null
    }
  }

  async function handleGroupParticipantsUpdate(sockInstance, event) {
    if (!event || !event.id) return
    const groupId = event.id
    const action = event.action
    if (action !== 'add' && action !== 'remove') return

    let rawParticipants = event.participants || []
    if (!rawParticipants.length && (event.author || event.authorPn)) {
      rawParticipants = [event.authorPn || event.author]
    }
    if (!rawParticipants.length) return

    console.log(`[GROUP PARTICIPANTS UPDATE] Group: ${groupId}, Action: ${action}, Raw Count: ${rawParticipants.length}`)

    const groupData = getGroupData(groupId)
    if (action === 'add' && !groupData.welcome) {
      console.log(`[GROUP PARTICIPANTS] Welcome is inactive for ${groupId}`)
      return
    }
    if (action === 'remove' && !groupData.goodbye) {
      console.log(`[GROUP PARTICIPANTS] Goodbye is inactive for ${groupId}`)
      return
    }

    let metadata = null
    try {
      metadata = await sockInstance.groupMetadata(groupId)
    } catch {}

    const groupName = metadata?.subject || 'Grup'
    const groupBio = metadata?.desc?.toString() || ''
    const memberCount = metadata?.participants?.length || 0
    const localThumbPath = path.resolve(__dirname, 'media/thumb.jpg')
    const defaultBg = fs.existsSync(localThumbPath) ? fs.readFileSync(localThumbPath) : null

    for (const participant of rawParticipants) {
      let participantJid = ''
      if (typeof participant === 'string') {
        participantJid = participant
      } else if (typeof participant === 'object' && participant !== null) {
        if (participant.phoneNumber) {
          const num = String(participant.phoneNumber).replace(/[^0-9]/g, '')
          participantJid = num ? `${num}@s.whatsapp.net` : participant.phoneNumber
        } else if (participant.id) {
          participantJid = participant.id
        } else if (participant.jid) {
          participantJid = participant.jid
        } else if (participant.lid) {
          participantJid = participant.lid
        }
      }

      if (!participantJid) continue

      if (participantJid.endsWith('@lid') && metadata?.participants) {
        const found = metadata.participants.find(p => p.lid === participantJid || p.id === participantJid)
        if (found?.id && !found.id.endsWith('@lid')) {
          participantJid = found.id
        } else if (found?.phoneNumber) {
          participantJid = `${String(found.phoneNumber).replace(/[^0-9]/g, '')}@s.whatsapp.net`
        }
      }

      const userNumber = normalizeNumber(participantJid)
      let template = ''
      let type = ''

      if (action === 'add') {
        type = 'welcome'
        template = groupData.welcomeText || global.conn?.welcome || '✦━━━━━━[ WELCOME ]━━━━━━✦\n\n┏––––––━━━━━━━━•\n│⫹⫺ @subject\n┣━━━━━━━━┅┅┅\n│( 👋 Hallo @user)\n├[ INTRO ]—\n│ Nama: \n│ Umur: \n│ Gender:\n┗––––––━━┅┅┅\n\n––––––┅┅ DESCRIPTION ┅┅––––––\n@desc'
      } else {
        type = 'goodbye'
        template = groupData.goodbyeText || global.conn?.bye || global.conn?.goodbye || '✦━━━━━━[ GOOD BYE ]━━━━━━✦\nSayonara @user 👋( ╹▽╹ )'
      }

      const captionText = template
        .replaceAll('@user', userNumber ? `@${userNumber}` : `@${participantJid.split('@')[0]}`)
        .replaceAll('@subject', groupName)
        .replaceAll('@grup', groupName)
        .replaceAll('@group', groupName)
        .replaceAll('@desc', groupBio)
        .replaceAll('@bio', groupBio)

      let ppBuffer = null
      try {
        const ppUrl = await sockInstance.profilePictureUrl(participantJid, 'image').catch(() => null)
        if (ppUrl) {
          const res = await fetch(ppUrl)
          ppBuffer = Buffer.from(await res.arrayBuffer())
        }
      } catch {}

      if (!ppBuffer) {
        ppBuffer = defaultBg
      }

      let canvasBuffer = null
      if (ppBuffer && defaultBg) {
        try {
          canvasBuffer = await generateCanvasBuffer(type, ppBuffer, defaultBg, userNumber || participantJid.split('@')[0], groupName, memberCount)
        } catch (errCanvas) {
          console.error('[CANVAS ERROR]:', errCanvas?.message || errCanvas)
        }
      }

      try {
        if (canvasBuffer) {
          await sockInstance.sendMessage(groupId, {
            image: canvasBuffer,
            caption: captionText,
            mentions: [participantJid]
          })
        } else {
          await sockInstance.sendMessage(groupId, {
            text: captionText,
            mentions: [participantJid]
          })
        }
        console.log(`[GROUP PARTICIPANTS] Successfully sent ${type} to ${groupId} for ${participantJid}`)
      } catch (err) {
        console.error(`Failed to send group participant update: ${err.message || err}`)
      }
    }
  }

  sock.ev.on('group-participants.update', async (event) => {
    try {
      await handleGroupParticipantsUpdate(sock, event)
    } catch (err) {
      console.error(`Error handling group-participants.update: ${err.message || err}`)
    }
  })

  const tqtoSmallCaps = (str) => {
    const smallCapsMap = {
      a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
      j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
      s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
    }
    return String(str).toLowerCase().split('').map(c => smallCapsMap[c] || c).join('')
  }

  const tqtoText = `╭─❁ *${tqtoSmallCaps('THANK YOU TO')}* ❁\n` +
    `│\n` +
    `│ ✦ *Allah SWT.* (The Creator of Everything)\n` +
    `│ ✦ *Mother & Father* (My Greatest Support)\n` +
    `│ ✦ *Mommy Kyu* (Developer)\n` +
    `│ ✦ *Nana* (My Girlfriend)\n` +
    `╰─❁`

  async function getRepoInfo() {
    try {
      const { data } = await axios.get('https://api.github.com/repos/KyuuX444/Rubby-MD', {
        headers: { 'User-Agent': 'Ruby-Baileys-Bot' },
        timeout: 8000
      })
      const created = data.created_at ? new Date(data.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'
      const updated = data.updated_at ? new Date(data.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'
      return {
        name: data.name || 'Rubby-MD',
        url: data.html_url || 'https://github.com/KyuuX444/Rubby-MD',
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
        created,
        updated
      }
    } catch {
      return {
        name: 'Rubby-MD',
        url: 'https://github.com/KyuuX444/Rubby-MD',
        stars: '-',
        forks: '-',
        created: '-',
        updated: '-'
      }
    }
  }

  sock.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      if (chatUpdate?.type && chatUpdate.type !== 'notify') return
      if (chatUpdate?.messages?.length) {
        for (const rawMessage of chatUpdate.messages) {
          if (!rawMessage?.message) continue

          const msgTimestamp = rawMessage.messageTimestamp ? Number(rawMessage.messageTimestamp) * 1000 : 0
          if (global.connectedTime && msgTimestamp && msgTimestamp < (global.connectedTime - 5000)) {
            continue
          }
          const m = await serialize(sock, rawMessage)
          if (!m?.text) continue

          const trimmed = (m.text || '').trim()
          const matched = trimmed.match(/^[.!#/\\?%&$+~]?(tqto|thanksto|thanks)$/i)
          if (matched) {
            const isSelfMode = (global.mode || 'public').toLowerCase() === 'self'
            if (isSelfMode && !m.isOwner) continue

            await m.reply(tqtoText)
            continue
          }

          const matchedSc = trimmed.match(/^[.!#/\\?%&$+~]?(sc|script|sourcecode)$/i)
          if (matchedSc) {

            const repo = await getRepoInfo()
            const textContent =
              `╭━━━〔 ୨ৎ *SOURCE CODE* ୨ৎ 〕━━━╮\n` +
              `┇ 📦 *Repository :* ${repo.name}\n` +
              `┇ 📅 *Awal Upload :* ${repo.created}\n` +
              `┇ 🔄 *Terakhir Update :* ${repo.updated}\n` +
              `┇ ⭐ *Stars :* ${repo.stars}\n` +
              `┇ 🍴 *Forks :* ${repo.forks}\n` +
              `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`

            try {
              const btn = new Button(sock).setBody(textContent)

              const thumbPath = path.resolve(__dirname, 'media/thumb.jpg')
              if (fs.existsSync(thumbPath)) {
                btn.setImage(fs.readFileSync(thumbPath))
              }

              btn.addUrl('🌐 Buka Repository', repo.url)
              btn.addUrl('📡 Saluran WhatsApp', 'https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13')

              await btn.send(m.chat, { quoted: m.raw })
            } catch {
              await m.reply(textContent)
            }
            continue
          }
        }
      }
      await messageHandler(sock, chatUpdate, registry)
    } catch (err) {
      console.error(`Error handling messages.upsert: ${err.message || err}`)
    }
  })

  return sock
}

startBot().catch((error) => {
  console.error('STARTUP ERROR:', error.stack || error.message)
  process.exitCode = 1
})

const cleanExit = () => {
  console.log('Shutting down gracefully...')
  isClosed = true
  watcher.close()
  cleanupSocket()
  for (const [num, bot] of getBots().entries()) {
    try {
      bot.socket?.ev?.removeAllListeners()
      bot.socket?.logout()
    } catch {}
  }
  databaseApi.close()
  process.exit(0)
}

process.on('SIGINT', cleanExit)
process.on('SIGTERM', cleanExit)
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err?.message || err}`)
})
process.on('unhandledRejection', (reason) => {
  console.error(`Unhandled Rejection: ${reason?.message || reason}`)
})
