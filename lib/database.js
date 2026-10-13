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
┇   › Database : 100% SQLite via sql.js
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import initSqlJs from 'sql.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_FILE = path.resolve(__dirname, '../database/database.sqlite')

let SQL = null
let db = null
let initPromise = null

function ensureDbDir() {
  const dir = path.dirname(DB_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function persist() {
  if (!db) return
  ensureDbDir()
  const data = db.export()
  const buffer = Buffer.from(data)
  fs.writeFileSync(DB_FILE, buffer)
}

function initTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT DEFAULT '',
      limit_count INTEGER DEFAULT 25,
      exp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 0,
      role TEXT DEFAULT 'Beginner',
      premium INTEGER DEFAULT 0,
      premium_time INTEGER DEFAULT 0,
      registered INTEGER DEFAULT 0,
      reg_time INTEGER DEFAULT 0,
      data TEXT DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
      name TEXT DEFAULT '',
      welcome INTEGER DEFAULT 0,
      goodbye INTEGER DEFAULT 0,
      welcome_text TEXT DEFAULT '',
      goodbye_text TEXT DEFAULT '',
      mute INTEGER DEFAULT 0,
      antilink INTEGER DEFAULT 0,
      data TEXT DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS disabled_plugins (
      name TEXT PRIMARY KEY
    );
  `)
}

function migrateOldJson() {
  try {
    const premFile = path.resolve(__dirname, '../database/premium.json')
    if (fs.existsSync(premFile)) {
      const content = fs.readFileSync(premFile, 'utf-8').trim()
      if (content) {
        const users = JSON.parse(content)
        if (Array.isArray(users)) {
          const stmt = db.prepare(`
            INSERT INTO users (id, premium)
            VALUES (?, 1)
            ON CONFLICT(id) DO UPDATE SET premium = 1;
          `)
          for (const u of users) {
            const cleanId = String(u).replace(/[^0-9]/g, '')
            if (cleanId) {
              stmt.run([cleanId])
            }
          }
          stmt.free()
        }
      }
    }
  } catch {}

  try {
    const disFile = path.resolve(__dirname, '../database/disabled_plugins.json')
    if (fs.existsSync(disFile)) {
      const content = fs.readFileSync(disFile, 'utf-8').trim()
      if (content) {
        const list = JSON.parse(content)
        if (Array.isArray(list)) {
          const stmt = db.prepare(`
            INSERT OR IGNORE INTO disabled_plugins (name) VALUES (?);
          `)
          for (const item of list) {
            if (item) stmt.run([String(item)])
          }
          stmt.free()
        }
      }
    }
  } catch {}

  try {
    const grpFile = path.resolve(__dirname, '../database/groups.json')
    if (fs.existsSync(grpFile)) {
      const content = fs.readFileSync(grpFile, 'utf-8').trim()
      if (content) {
        const grps = JSON.parse(content)
        if (typeof grps === 'object' && grps !== null) {
          const stmt = db.prepare(`
            INSERT INTO groups (id, welcome, goodbye, welcome_text, goodbye_text, data)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              welcome = excluded.welcome,
              goodbye = excluded.goodbye,
              welcome_text = excluded.welcome_text,
              goodbye_text = excluded.goodbye_text,
              data = excluded.data;
          `)
          for (const [gid, gdata] of Object.entries(grps)) {
            stmt.run([
              gid,
              gdata.welcome ? 1 : 0,
              gdata.goodbye ? 1 : 0,
              gdata.welcomeText || '',
              gdata.goodbyeText || '',
              JSON.stringify(gdata)
            ])
          }
          stmt.free()
        }
      }
    }
  } catch {}
}

export async function initDatabase() {
  if (db) return db
  if (initPromise) return initPromise

  initPromise = (async () => {
    ensureDbDir()
    SQL = await initSqlJs()

    if (fs.existsSync(DB_FILE)) {
      const fileBuffer = fs.readFileSync(DB_FILE)
      db = new SQL.Database(fileBuffer)
    } else {
      db = new SQL.Database()
    }

    initTables()
    migrateOldJson()
    persist()

    global.db = databaseApi
    return db
  })()

  return initPromise
}

export const databaseApi = {
  getSql: () => db,

  save: () => persist(),

  isPremium(jidOrNumber) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false
    const res = db.exec('SELECT premium, premium_time FROM users WHERE id = ?;', [num])
    if (!res || !res.length || !res[0].values || !res[0].values.length) return false
    const [prem, premTime] = res[0].values[0]
    if (!prem) return false
    if (premTime && premTime > 0 && Date.now() > premTime) {
      db.run('UPDATE users SET premium = 0, premium_time = 0 WHERE id = ?;', [num])
      persist()
      return false
    }
    return true
  },

  getPremiumUsers() {
    if (!db) return []
    const now = Date.now()
    const res = db.exec('SELECT id, premium_time FROM users WHERE premium = 1;')
    if (!res || !res.length || !res[0].values) return []
    const users = []
    for (const [id, premTime] of res[0].values) {
      if (premTime && premTime > 0 && now > premTime) {
        db.run('UPDATE users SET premium = 0, premium_time = 0 WHERE id = ?;', [id])
      } else {
        users.push(String(id))
      }
    }
    persist()
    return users
  },

  addPremium(jidOrNumber, durationMs = 0) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false
    const premTime = durationMs > 0 ? Date.now() + durationMs : 0
    db.run(
      `INSERT INTO users (id, premium, premium_time)
       VALUES (?, 1, ?)
       ON CONFLICT(id) DO UPDATE SET premium = 1, premium_time = ?;`,
      [num, premTime, premTime]
    )
    persist()
    return true
  },

  delPremium(jidOrNumber) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false
    db.run('UPDATE users SET premium = 0, premium_time = 0 WHERE id = ?;', [num])
    persist()
    return true
  },

  getUser(jidOrNumber) {
    if (!db) return null
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return null
    const res = db.exec('SELECT * FROM users WHERE id = ?;', [num])
    if (!res || !res.length || !res[0].values || !res[0].values.length) {
      db.run('INSERT OR IGNORE INTO users (id) VALUES (?);', [num])
      persist()
      return {
        id: num,
        name: '',
        limit_count: 25,
        exp: 0,
        level: 0,
        role: 'Beginner',
        premium: 0,
        premium_time: 0,
        registered: 0,
        reg_time: 0,
        data: {}
      }
    }
    const cols = res[0].columns
    const row = res[0].values[0]
    const user = {}
    cols.forEach((col, idx) => {
      user[col] = row[idx]
    })
    try {
      user.data = JSON.parse(user.data || '{}')
    } catch {
      user.data = {}
    }
    return user
  },

  updateUser(jidOrNumber, fields = {}) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false
    const allowed = ['name', 'limit_count', 'exp', 'level', 'role', 'premium', 'premium_time', 'registered', 'reg_time']
    const updates = []
    const values = []
    for (const [k, v] of Object.entries(fields)) {
      if (allowed.includes(k)) {
        updates.push(`${k} = ?`)
        values.push(v)
      }
    }
    if (fields.data && typeof fields.data === 'object') {
      updates.push(`data = ?`)
      values.push(JSON.stringify(fields.data))
    }
    if (!updates.length) return false
    values.push(num)
    db.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?;`, values)
    persist()
    return true
  },

  getGroup(groupId) {
    if (!db || !groupId) return {}
    const res = db.exec('SELECT * FROM groups WHERE id = ?;', [groupId])
    if (!res || !res.length || !res[0].values || !res[0].values.length) {
      return {
        id: groupId,
        welcome: false,
        goodbye: false,
        welcomeText: '',
        goodbyeText: ''
      }
    }
    const cols = res[0].columns
    const row = res[0].values[0]
    const g = {}
    cols.forEach((col, idx) => {
      g[col] = row[idx]
    })
    let extra = {}
    try {
      extra = JSON.parse(g.data || '{}')
    } catch {}
    return {
      ...extra,
      id: groupId,
      name: g.name || extra.name || '',
      welcome: Boolean(g.welcome),
      goodbye: Boolean(g.goodbye),
      welcomeText: g.welcome_text || extra.welcomeText || '',
      goodbyeText: g.goodbye_text || extra.goodbyeText || '',
      mute: Boolean(g.mute),
      antilink: Boolean(g.antilink)
    }
  },

  setGroup(groupId, updates = {}) {
    if (!db || !groupId) return false
    const curr = databaseApi.getGroup(groupId)
    const merged = { ...curr, ...updates }
    const welcome = merged.welcome ? 1 : 0
    const goodbye = merged.goodbye ? 1 : 0
    const welcomeText = merged.welcomeText || ''
    const goodbyeText = merged.goodbyeText || ''
    const name = merged.name || ''
    const mute = merged.mute ? 1 : 0
    const antilink = merged.antilink ? 1 : 0
    const dataJson = JSON.stringify(merged)

    db.run(
      `INSERT INTO groups (id, name, welcome, goodbye, welcome_text, goodbye_text, mute, antilink, data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         welcome = excluded.welcome,
         goodbye = excluded.goodbye,
         welcome_text = excluded.welcome_text,
         goodbye_text = excluded.goodbye_text,
         mute = excluded.mute,
         antilink = excluded.antilink,
         data = excluded.data;`,
      [groupId, name, welcome, goodbye, welcomeText, goodbyeText, mute, antilink, dataJson]
    )
    persist()
    return true
  },

  getAllGroups() {
    if (!db) return {}
    const res = db.exec('SELECT id, data, welcome, goodbye, welcome_text, goodbye_text FROM groups;')
    if (!res || !res.length || !res[0].values) return {}
    const out = {}
    for (const [id, dataStr, wel, bye, wText, bText] of res[0].values) {
      let parsed = {}
      try {
        parsed = JSON.parse(dataStr || '{}')
      } catch {}
      out[id] = {
        ...parsed,
        welcome: Boolean(wel),
        goodbye: Boolean(bye),
        welcomeText: wText || '',
        goodbyeText: bText || ''
      }
    }
    return out
  },

  getDisabledPlugins() {
    if (!db) return []
    const res = db.exec('SELECT name FROM disabled_plugins;')
    if (!res || !res.length || !res[0].values) return []
    return res[0].values.map(v => v[0])
  },

  setDisabledPlugins(list = []) {
    if (!db) return false
    db.run('DELETE FROM disabled_plugins;')
    const stmt = db.prepare('INSERT INTO disabled_plugins (name) VALUES (?);')
    for (const item of list) {
      if (item) stmt.run([String(item)])
    }
    stmt.free()
    persist()
    return true
  },

  togglePlugin(pluginName) {
    if (!db || !pluginName) return false
    const name = String(pluginName).toLowerCase().trim()
    const res = db.exec('SELECT name FROM disabled_plugins WHERE name = ?;', [name])
    const exists = res && res.length && res[0].values && res[0].values.length
    if (exists) {
      db.run('DELETE FROM disabled_plugins WHERE name = ?;', [name])
      persist()
      return { disabled: false }
    } else {
      db.run('INSERT OR IGNORE INTO disabled_plugins (name) VALUES (?);', [name])
      persist()
      return { disabled: true }
    }
  }
}

export default databaseApi
