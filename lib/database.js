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
import logger from './logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_FILE = path.resolve(__dirname, '../database/database.sqlite')
const BACKUP_DIR = path.resolve(__dirname, '../database/backups')

let SQL = null
let db = null
let initPromise = null
let persistTimeout = null
let periodicBackupTimer = null
let transactionDepth = 0

function ensureDbDir() {
  const dir = path.dirname(DB_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
  }
}

export function flushPersist() {
  if (persistTimeout) {
    clearTimeout(persistTimeout)
    persistTimeout = null
  }
  if (!db) return false
  ensureDbDir()
  try {
    const data = db.export()
    const buffer = Buffer.from(data)
    const tmpFile = `${DB_FILE}.tmp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    fs.writeFileSync(tmpFile, buffer)
    fs.renameSync(tmpFile, DB_FILE)
    return true
  } catch (err) {
    logger.error('Failed to atomically persist SQLite database:', err)
    return false
  }
}

function persist(immediate = false) {
  if (immediate) {
    return flushPersist()
  }
  if (!persistTimeout) {
    persistTimeout = setTimeout(() => {
      persistTimeout = null
      flushPersist()
    }, 250)
    if (typeof persistTimeout.unref === 'function') {
      persistTimeout.unref()
    }
  }
  return true
}

export function createBackup(customName = null) {
  if (!db) return null
  ensureDbDir()
  try {
    const data = db.export()
    const buffer = Buffer.from(data)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = customName || `backup_${timestamp}.sqlite`
    const backupPath = path.join(BACKUP_DIR, filename)
    fs.writeFileSync(backupPath, buffer)
    rotateBackups(5)
    return backupPath
  } catch (err) {
    logger.error('Failed to create database backup:', err)
    return null
  }
}

export function rotateBackups(maxBackups = 5) {
  try {
    if (!fs.existsSync(BACKUP_DIR)) return
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('backup_') && f.endsWith('.sqlite'))
      .map(f => {
        const full = path.join(BACKUP_DIR, f)
        let mtime = 0
        try { mtime = fs.statSync(full).mtimeMs } catch {}
        return { name: f, full, mtime }
      })
      .sort((a, b) => b.mtime - a.mtime)

    if (files.length > maxBackups) {
      for (let i = maxBackups; i < files.length; i++) {
        try { fs.unlinkSync(files[i].full) } catch {}
      }
    }
  } catch {}
}

function getLatestValidBackup() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) return null
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('backup_') && f.endsWith('.sqlite'))
      .map(f => {
        const full = path.join(BACKUP_DIR, f)
        let mtime = 0
        try { mtime = fs.statSync(full).mtimeMs } catch {}
        return { name: f, full, mtime }
      })
      .sort((a, b) => b.mtime - a.mtime)

    for (const b of files) {
      try {
        const buf = fs.readFileSync(b.full)
        if (buf && buf.length > 0 && SQL) {
          const testDb = new SQL.Database(buf)
          testDb.close()
          return b.full
        }
      } catch {}
    }
  } catch {}
  return null
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
      balance INTEGER DEFAULT 0,
      bank INTEGER DEFAULT 0,
      total_earned INTEGER DEFAULT 0,
      total_spent INTEGER DEFAULT 0,
      last_daily INTEGER DEFAULT 0,
      daily_streak INTEGER DEFAULT 0,
      last_work INTEGER DEFAULT 0,
      last_beg INTEGER DEFAULT 0,
      health INTEGER DEFAULT 100,
      max_health INTEGER DEFAULT 100,
      stamina INTEGER DEFAULT 100,
      max_stamina INTEGER DEFAULT 100,
      attack INTEGER DEFAULT 10,
      defense INTEGER DEFAULT 5,
      job TEXT DEFAULT 'Novice',
      equipped_weapon TEXT DEFAULT '',
      equipped_armor TEXT DEFAULT '',
      last_hunt INTEGER DEFAULT 0,
      last_adventure INTEGER DEFAULT 0,
      last_dungeon INTEGER DEFAULT 0,
      last_boss INTEGER DEFAULT 0,
      rpg_wins INTEGER DEFAULT 0,
      rpg_losses INTEGER DEFAULT 0,
      boss_kills INTEGER DEFAULT 0,
      dungeon_floor INTEGER DEFAULT 1,
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

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      amount INTEGER NOT NULL,
      balance_after INTEGER DEFAULT 0,
      target_id TEXT DEFAULT '',
      description TEXT DEFAULT '',
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      count INTEGER DEFAULT 1,
      durability INTEGER DEFAULT 100,
      extra TEXT DEFAULT '{}',
      UNIQUE(user_id, item_id)
    );

    CREATE TABLE IF NOT EXISTS quests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      quest_id TEXT NOT NULL,
      progress INTEGER DEFAULT 0,
      target INTEGER DEFAULT 1,
      completed INTEGER DEFAULT 0,
      claimed INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL,
      UNIQUE(user_id, quest_id)
    );

    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      achievement_id TEXT NOT NULL,
      unlocked_at INTEGER NOT NULL,
      UNIQUE(user_id, achievement_id)
    );

    CREATE INDEX IF NOT EXISTS idx_users_premium ON users(premium);
    CREATE INDEX IF NOT EXISTS idx_users_registered ON users(registered);
    CREATE INDEX IF NOT EXISTS idx_groups_mute ON groups(mute);
    CREATE INDEX IF NOT EXISTS idx_trans_user ON transactions(user_id);
    CREATE INDEX IF NOT EXISTS idx_trans_created ON transactions(created_at);
    CREATE INDEX IF NOT EXISTS idx_inv_user ON inventory(user_id);
    CREATE INDEX IF NOT EXISTS idx_quests_user ON quests(user_id);
    CREATE INDEX IF NOT EXISTS idx_achieve_user ON achievements(user_id);
  `)

  // Check columns in users table and add any missing ones dynamically
  try {
    const tableInfo = db.exec('PRAGMA table_info(users);')
    if (tableInfo && tableInfo[0]?.values) {
      const existingCols = new Set(tableInfo[0].values.map(v => v[1]))
      const expectedCols = [
        { name: 'balance', type: 'INTEGER DEFAULT 0' },
        { name: 'bank', type: 'INTEGER DEFAULT 0' },
        { name: 'total_earned', type: 'INTEGER DEFAULT 0' },
        { name: 'total_spent', type: 'INTEGER DEFAULT 0' },
        { name: 'last_daily', type: 'INTEGER DEFAULT 0' },
        { name: 'daily_streak', type: 'INTEGER DEFAULT 0' },
        { name: 'last_work', type: 'INTEGER DEFAULT 0' },
        { name: 'last_beg', type: 'INTEGER DEFAULT 0' },
        { name: 'health', type: 'INTEGER DEFAULT 100' },
        { name: 'max_health', type: 'INTEGER DEFAULT 100' },
        { name: 'stamina', type: 'INTEGER DEFAULT 100' },
        { name: 'max_stamina', type: 'INTEGER DEFAULT 100' },
        { name: 'attack', type: 'INTEGER DEFAULT 10' },
        { name: 'defense', type: 'INTEGER DEFAULT 5' },
        { name: 'job', type: "TEXT DEFAULT 'Novice'" },
        { name: 'equipped_weapon', type: "TEXT DEFAULT ''" },
        { name: 'equipped_armor', type: "TEXT DEFAULT ''" },
        { name: 'last_hunt', type: 'INTEGER DEFAULT 0' },
        { name: 'last_adventure', type: 'INTEGER DEFAULT 0' },
        { name: 'last_dungeon', type: 'INTEGER DEFAULT 0' },
        { name: 'last_boss', type: 'INTEGER DEFAULT 0' },
        { name: 'rpg_wins', type: 'INTEGER DEFAULT 0' },
        { name: 'rpg_losses', type: 'INTEGER DEFAULT 0' },
        { name: 'boss_kills', type: 'INTEGER DEFAULT 0' },
        { name: 'dungeon_floor', type: 'INTEGER DEFAULT 1' }
      ]

      for (const col of expectedCols) {
        if (!existingCols.has(col.name)) {
          db.run(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type};`)
        }
      }
    }
  } catch (err) {
    logger.error('Error migrating users columns:', err)
  }

  try {
    const res = db.exec('PRAGMA user_version;')
    const version = res && res[0]?.values?.[0]?.[0] ? Number(res[0].values[0][0]) : 0
    if (version < 2) {
      db.run('PRAGMA user_version = 2;')
    }
  } catch {}
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
      try {
        const fileBuffer = fs.readFileSync(DB_FILE)
        if (fileBuffer.length > 0) {
          db = new SQL.Database(fileBuffer)
        } else {
          throw new Error('Database file is 0 bytes')
        }
      } catch (err) {
        logger.error(`Database corruption detected at ${DB_FILE}: ${err?.message || err}. Attempting backup restoration...`)
        const backupFile = getLatestValidBackup()
        if (backupFile) {
          logger.system(`Restoring database from valid backup: ${path.basename(backupFile)}`)
          const backupBuf = fs.readFileSync(backupFile)
          db = new SQL.Database(backupBuf)
          flushPersist()
        } else {
          const corruptQuarantine = `${DB_FILE}.corrupt_${Date.now()}`
          try {
            if (fs.existsSync(DB_FILE)) {
              fs.renameSync(DB_FILE, corruptQuarantine)
              logger.warn(`Corrupted database quarantined to: ${corruptQuarantine}`)
            }
          } catch {}
          db = new SQL.Database()
        }
      }
    } else {
      db = new SQL.Database()
    }

    initTables()
    migrateOldJson()
    flushPersist()

    // Create a safety backup on successful initialization
    createBackup()

    // Periodic backup every 1 hour (unref'd so it doesn't block process exit)
    if (!periodicBackupTimer) {
      periodicBackupTimer = setInterval(() => {
        try {
          createBackup()
        } catch {}
      }, 60 * 60 * 1000)
      if (typeof periodicBackupTimer.unref === 'function') {
        periodicBackupTimer.unref()
      }
    }

    global.db = databaseApi
    return db
  })()

  return initPromise
}

export const databaseApi = {
  getSql: () => db,

  save: (immediate = false) => persist(immediate),

  flush: () => flushPersist(),

  backup: (name) => createBackup(name),

  restore(backupPath) {
    if (!SQL || !backupPath || !fs.existsSync(backupPath)) return false
    try {
      const buf = fs.readFileSync(backupPath)
      const newDb = new SQL.Database(buf)
      if (db) {
        try { db.close() } catch {}
      }
      db = newDb
      flushPersist()
      return true
    } catch (err) {
      logger.error('Failed to restore database from path:', err)
      return false
    }
  },

  close() {
    flushPersist()
    if (periodicBackupTimer) {
      clearInterval(periodicBackupTimer)
      periodicBackupTimer = null
    }
    if (db) {
      try {
        db.close()
      } catch {}
      db = null
    }
    initPromise = null
  },

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

  withTransaction(fn) {
    if (!db) return null
    if (transactionDepth > 0) {
      return fn(db)
    }
    transactionDepth++
    db.run('BEGIN TRANSACTION;')
    try {
      const res = fn(db)
      db.run('COMMIT;')
      persist()
      return res
    } catch (err) {
      try { db.run('ROLLBACK;') } catch {}
      throw err
    } finally {
      transactionDepth--
    }
  },

  getUser(jidOrNumber) {
    if (!db) return null
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return null
    const res = db.exec('SELECT * FROM users WHERE id = ?;', [num])
    const defaultUser = {
      id: num,
      name: '',
      limit_count: global.settings?.registration?.startingLimit ?? 25,
      exp: 0,
      level: 0,
      role: 'Beginner',
      premium: 0,
      premium_time: 0,
      registered: 0,
      reg_time: 0,
      balance: 0,
      bank: 0,
      total_earned: 0,
      total_spent: 0,
      last_daily: 0,
      daily_streak: 0,
      last_work: 0,
      last_beg: 0,
      health: 100,
      max_health: 100,
      stamina: 100,
      max_stamina: 100,
      attack: 10,
      defense: 5,
      job: 'Novice',
      equipped_weapon: '',
      equipped_armor: '',
      last_hunt: 0,
      last_adventure: 0,
      last_dungeon: 0,
      last_boss: 0,
      rpg_wins: 0,
      rpg_losses: 0,
      boss_kills: 0,
      dungeon_floor: 1,
      data: {}
    }
    if (!res || !res.length || !res[0].values || !res[0].values.length) {
      db.run('INSERT OR IGNORE INTO users (id) VALUES (?);', [num])
      persist()
      return defaultUser
    }
    const cols = res[0].columns
    const row = res[0].values[0]
    const user = { ...defaultUser }
    cols.forEach((col, idx) => {
      user[col] = row[idx]
    })
    try {
      user.data = typeof user.data === 'string' ? JSON.parse(user.data || '{}') : (user.data || {})
    } catch {
      user.data = {}
    }
    return user
  },

  updateUser(jidOrNumber, fields = {}) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false

    // Ensure user row exists before updating
    db.run('INSERT OR IGNORE INTO users (id) VALUES (?);', [num])

    const allowed = [
      'name', 'limit_count', 'exp', 'level', 'role', 'premium', 'premium_time',
      'registered', 'reg_time', 'balance', 'bank', 'total_earned', 'total_spent',
      'last_daily', 'daily_streak', 'last_work', 'last_beg', 'health', 'max_health',
      'stamina', 'max_stamina', 'attack', 'defense', 'job', 'equipped_weapon',
      'equipped_armor', 'last_hunt', 'last_adventure', 'last_dungeon', 'last_boss',
      'rpg_wins', 'rpg_losses', 'boss_kills', 'dungeon_floor'
    ]
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

  isRegistered(jidOrNumber) {
    const user = databaseApi.getUser(jidOrNumber)
    return Boolean(user && user.registered === 1)
  },

  registerUser(jidOrNumber, name = '') {
    if (!db) return { success: false, reason: 'no_db' }
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return { success: false, reason: 'invalid_user' }

    return databaseApi.withTransaction(() => {
      const existing = databaseApi.getUser(num)
      if (existing && existing.registered === 1) {
        return { success: false, reason: 'already_registered', user: existing }
      }

      const startingLimit = global.settings?.registration?.startingLimit ?? 25
      const startingBalance = global.settings?.registration?.startingBalance ?? 10000
      const startingExp = global.settings?.registration?.startingExp ?? 100
      const now = Date.now()
      const finalName = (name || existing?.name || '').trim().slice(0, 50)

      db.run(
        `UPDATE users SET
          registered = 1,
          reg_time = ?,
          name = ?,
          limit_count = ?,
          balance = ?,
          total_earned = ?,
          exp = ?
        WHERE id = ?;`,
        [now, finalName, startingLimit, startingBalance, startingBalance, startingExp, num]
      )

      databaseApi.addTransaction(num, 'credit', 'limit', startingLimit, startingLimit, '', 'Bonus Registrasi Akun')
      databaseApi.addTransaction(num, 'credit', 'money', startingBalance, startingBalance, '', 'Bonus Modal Awal Registrasi')

      const updated = databaseApi.getUser(num)
      return { success: true, user: updated, bonuses: { limit: startingLimit, balance: startingBalance, exp: startingExp } }
    })
  },

  unregUser(jidOrNumber) {
    if (!db) return { success: false, reason: 'no_db' }
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return { success: false, reason: 'invalid_user' }
    db.run('UPDATE users SET registered = 0 WHERE id = ?;', [num])
    persist()
    return { success: true }
  },

  getLimit(jidOrNumber) {
    const user = databaseApi.getUser(jidOrNumber)
    return Number(user?.limit_count ?? 0)
  },

  hasLimit(jidOrNumber, amount = 1) {
    return databaseApi.getLimit(jidOrNumber) >= Math.max(1, parseInt(amount, 10) || 1)
  },

  addLimit(jidOrNumber, amount, reason = '', targetId = '') {
    if (!db) return 0
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = Math.max(0, parseInt(amount, 10) || 0)
    if (!num || qty <= 0) return databaseApi.getLimit(num)

    return databaseApi.withTransaction(() => {
      const user = databaseApi.getUser(num)
      const newLimit = (user.limit_count || 0) + qty
      db.run('UPDATE users SET limit_count = ? WHERE id = ?;', [newLimit, num])
      databaseApi.addTransaction(num, 'credit', 'limit', qty, newLimit, targetId, reason || 'Penambahan Limit')
      return newLimit
    })
  },

  deductLimit(jidOrNumber, amount = 1, reason = '', targetId = '') {
    if (!db) return { success: false, reason: 'no_db' }
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = Math.max(0, parseInt(amount, 10) || 0)
    if (!num) return { success: false, reason: 'invalid_user' }
    if (qty === 0) return { success: true, limit: databaseApi.getLimit(num), deducted: 0 }

    return databaseApi.withTransaction(() => {
      const user = databaseApi.getUser(num)
      const current = user?.limit_count || 0
      if (current < qty) {
        return { success: false, reason: 'insufficient_limit', currentLimit: current, required: qty }
      }
      const newLimit = current - qty
      db.run('UPDATE users SET limit_count = ? WHERE id = ?;', [newLimit, num])
      databaseApi.addTransaction(num, 'debit', 'limit', qty, newLimit, targetId, reason || 'Penggunaan Limit')
      return { success: true, limit: newLimit, deducted: qty }
    })
  },

  setLimit(jidOrNumber, amount, reason = '') {
    if (!db) return 0
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const val = Math.max(0, parseInt(amount, 10) || 0)
    if (!num) return 0

    return databaseApi.withTransaction(() => {
      db.run('INSERT OR IGNORE INTO users (id) VALUES (?);', [num])
      db.run('UPDATE users SET limit_count = ? WHERE id = ?;', [val, num])
      databaseApi.addTransaction(num, 'set', 'limit', val, val, '', reason || 'Set Limit Manual')
      return val
    })
  },

  getBalance(jidOrNumber) {
    const user = databaseApi.getUser(jidOrNumber)
    return Number(user?.balance ?? 0)
  },

  hasBalance(jidOrNumber, amount = 1) {
    return databaseApi.getBalance(jidOrNumber) >= Math.max(0, parseInt(amount, 10) || 0)
  },

  addBalance(jidOrNumber, amount, reason = '', targetId = '') {
    if (!db) return 0
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = Math.max(0, parseInt(amount, 10) || 0)
    if (!num || qty <= 0) return databaseApi.getBalance(num)

    return databaseApi.withTransaction(() => {
      const user = databaseApi.getUser(num)
      const newBalance = (user.balance || 0) + qty
      const newTotalEarned = (user.total_earned || 0) + qty
      db.run('UPDATE users SET balance = ?, total_earned = ? WHERE id = ?;', [newBalance, newTotalEarned, num])
      databaseApi.addTransaction(num, 'credit', 'money', qty, newBalance, targetId, reason || 'Pemasukan Saldo')
      return newBalance
    })
  },

  deductBalance(jidOrNumber, amount, reason = '', targetId = '') {
    if (!db) return { success: false, reason: 'no_db' }
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = Math.max(0, parseInt(amount, 10) || 0)
    if (!num) return { success: false, reason: 'invalid_user' }
    if (qty === 0) return { success: true, balance: databaseApi.getBalance(num), deducted: 0 }

    return databaseApi.withTransaction(() => {
      const user = databaseApi.getUser(num)
      const current = user?.balance || 0
      if (current < qty) {
        return { success: false, reason: 'insufficient_balance', currentBalance: current, required: qty }
      }
      const newBalance = current - qty
      const newTotalSpent = (user.total_spent || 0) + qty
      db.run('UPDATE users SET balance = ?, total_spent = ? WHERE id = ?;', [newBalance, newTotalSpent, num])
      databaseApi.addTransaction(num, 'debit', 'money', qty, newBalance, targetId, reason || 'Pengeluaran Saldo')
      return { success: true, balance: newBalance, deducted: qty }
    })
  },

  setBalance(jidOrNumber, amount, reason = '') {
    if (!db) return 0
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const val = Math.max(0, parseInt(amount, 10) || 0)
    if (!num) return 0

    return databaseApi.withTransaction(() => {
      db.run('INSERT OR IGNORE INTO users (id) VALUES (?);', [num])
      db.run('UPDATE users SET balance = ? WHERE id = ?;', [val, num])
      databaseApi.addTransaction(num, 'set', 'money', val, val, '', reason || 'Set Saldo Manual')
      return val
    })
  },

  transferBalance(senderJid, recipientJid, amount, taxRate = 0.05, reason = 'Transfer Saldo') {
    if (!db) return { success: false, reason: 'no_db' }
    const sender = String(senderJid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const recipient = String(recipientJid || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = Math.max(0, parseInt(amount, 10) || 0)

    if (!sender || !recipient) return { success: false, reason: 'invalid_target' }
    if (sender === recipient) return { success: false, reason: 'self_transfer' }
    if (qty <= 0) return { success: false, reason: 'invalid_amount' }

    return databaseApi.withTransaction(() => {
      const senderUser = databaseApi.getUser(sender)
      if ((senderUser.balance || 0) < qty) {
        return { success: false, reason: 'insufficient_balance', currentBalance: senderUser.balance || 0 }
      }

      const recipientUser = databaseApi.getUser(recipient)
      const tax = Math.floor(qty * Math.max(0, taxRate))
      const netReceive = qty - tax

      const senderNew = (senderUser.balance || 0) - qty
      const senderSpent = (senderUser.total_spent || 0) + qty
      const recipientNew = (recipientUser.balance || 0) + netReceive
      const recipientEarned = (recipientUser.total_earned || 0) + netReceive

      db.run('UPDATE users SET balance = ?, total_spent = ? WHERE id = ?;', [senderNew, senderSpent, sender])
      db.run('UPDATE users SET balance = ?, total_earned = ? WHERE id = ?;', [recipientNew, recipientEarned, recipient])

      databaseApi.addTransaction(sender, 'debit', 'money', qty, senderNew, recipient, `${reason} ke @${recipient} (Pajak: ${tax})`)
      databaseApi.addTransaction(recipient, 'credit', 'money', netReceive, recipientNew, sender, `${reason} dari @${sender}`)

      return {
        success: true,
        amount: qty,
        tax,
        netReceive,
        senderBalance: senderNew,
        recipientBalance: recipientNew,
        sender,
        recipient
      }
    })
  },

  addTransaction(userId, type, category, amount, balanceAfter = 0, targetId = '', description = '') {
    if (!db) return false
    const num = String(userId || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false
    try {
      db.run(
        `INSERT INTO transactions (user_id, type, category, amount, balance_after, target_id, description, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [num, type, category, parseInt(amount, 10) || 0, parseInt(balanceAfter, 10) || 0, String(targetId || ''), String(description || ''), Date.now()]
      )
      return true
    } catch (err) {
      logger.error('Failed to insert transaction:', err)
      return false
    }
  },

  getTransactions(jidOrNumber, limit = 10) {
    if (!db) return []
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return []
    const res = db.exec('SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT ?;', [num, Math.max(1, limit)])
    if (!res || !res.length || !res[0].values) return []
    const cols = res[0].columns
    return res[0].values.map(row => {
      const item = {}
      cols.forEach((col, idx) => { item[col] = row[idx] })
      return item
    })
  },

  getInventory(jidOrNumber) {
    if (!db) return []
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return []
    const res = db.exec('SELECT * FROM inventory WHERE user_id = ? AND count > 0 ORDER BY type ASC, item_id ASC;', [num])
    if (!res || !res.length || !res[0].values) return []
    const cols = res[0].columns
    return res[0].values.map(row => {
      const item = {}
      cols.forEach((col, idx) => { item[col] = row[idx] })
      try { item.extra = JSON.parse(item.extra || '{}') } catch { item.extra = {} }
      return item
    })
  },

  getItem(jidOrNumber, itemId) {
    if (!db) return null
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num || !itemId) return null
    const res = db.exec('SELECT * FROM inventory WHERE user_id = ? AND item_id = ?;', [num, itemId])
    if (!res || !res.length || !res[0].values || !res[0].values.length) return null
    const cols = res[0].columns
    const row = res[0].values[0]
    const item = {}
    cols.forEach((col, idx) => { item[col] = row[idx] })
    try { item.extra = JSON.parse(item.extra || '{}') } catch { item.extra = {} }
    return item
  },

  addItem(jidOrNumber, itemId, name, type, count = 1, durability = 100, extra = {}) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = parseInt(count, 10) || 1
    if (!num || !itemId || qty <= 0) return false

    return databaseApi.withTransaction(() => {
      const existing = databaseApi.getItem(num, itemId)
      if (existing) {
        const newCount = (existing.count || 0) + qty
        db.run('UPDATE inventory SET count = ? WHERE user_id = ? AND item_id = ?;', [newCount, num, itemId])
      } else {
        db.run(
          `INSERT INTO inventory (user_id, item_id, name, type, count, durability, extra)
           VALUES (?, ?, ?, ?, ?, ?, ?);`,
          [num, itemId, name || itemId, type || 'material', qty, durability, JSON.stringify(extra || {})]
        )
      }
      return true
    })
  },

  removeItem(jidOrNumber, itemId, count = 1) {
    if (!db) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    const qty = parseInt(count, 10) || 1
    if (!num || !itemId || qty <= 0) return false

    return databaseApi.withTransaction(() => {
      const existing = databaseApi.getItem(num, itemId)
      if (!existing || (existing.count || 0) < qty) return false
      const newCount = existing.count - qty
      if (newCount <= 0) {
        db.run('DELETE FROM inventory WHERE user_id = ? AND item_id = ?;', [num, itemId])
      } else {
        db.run('UPDATE inventory SET count = ? WHERE user_id = ? AND item_id = ?;', [newCount, num, itemId])
      }
      return true
    })
  },

  getLeaderboard(category = 'balance', limit = 10) {
    if (!db) return []
    const validCols = {
      balance: 'balance',
      money: 'balance',
      limit: 'limit_count',
      level: 'level',
      exp: 'exp',
      rpg_wins: 'rpg_wins',
      wins: 'rpg_wins',
      boss_kills: 'boss_kills'
    }
    const orderCol = validCols[category.toLowerCase()] || 'balance'
    const res = db.exec(`SELECT id, name, balance, limit_count, level, exp, role, rpg_wins, boss_kills FROM users WHERE registered = 1 ORDER BY ${orderCol} DESC LIMIT ?;`, [Math.max(1, limit)])
    if (!res || !res.length || !res[0].values) return []
    const cols = res[0].columns
    return res[0].values.map(row => {
      const item = {}
      cols.forEach((col, idx) => { item[col] = row[idx] })
      return item
    })
  },

  getQuests(jidOrNumber) {
    if (!db) return []
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return []
    const res = db.exec('SELECT * FROM quests WHERE user_id = ?;', [num])
    if (!res || !res.length || !res[0].values) return []
    const cols = res[0].columns
    return res[0].values.map(row => {
      const item = {}
      cols.forEach((col, idx) => { item[col] = row[idx] })
      return item
    })
  },

  updateQuestProgress(jidOrNumber, questId, increment = 1, target = 1) {
    if (!db || !questId) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false

    return databaseApi.withTransaction(() => {
      const res = db.exec('SELECT progress, target, completed, claimed FROM quests WHERE user_id = ? AND quest_id = ?;', [num, questId])
      let progress = 0
      let completed = 0
      let claimed = 0
      const tgt = target || 1

      if (res && res.length && res[0].values && res[0].values.length) {
        progress = res[0].values[0][0] || 0
        completed = res[0].values[0][2] || 0
        claimed = res[0].values[0][3] || 0
        if (completed && claimed) return false // Already claimed
        progress += increment
        if (progress >= tgt) completed = 1
        db.run('UPDATE quests SET progress = ?, completed = ? WHERE user_id = ? AND quest_id = ?;', [progress, completed, num, questId])
      } else {
        progress = increment
        if (progress >= tgt) completed = 1
        db.run(
          `INSERT INTO quests (user_id, quest_id, progress, target, completed, claimed, created_at)
           VALUES (?, ?, ?, ?, ?, 0, ?);`,
          [num, questId, progress, tgt, completed, Date.now()]
        )
      }
      return { progress, target: tgt, completed: Boolean(completed) }
    })
  },

  claimQuest(jidOrNumber, questId) {
    if (!db || !questId) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false

    return databaseApi.withTransaction(() => {
      const res = db.exec('SELECT completed, claimed FROM quests WHERE user_id = ? AND quest_id = ?;', [num, questId])
      if (!res || !res.length || !res[0].values || !res[0].values.length) return false
      const [completed, claimed] = res[0].values[0]
      if (!completed || claimed) return false
      db.run('UPDATE quests SET claimed = 1 WHERE user_id = ? AND quest_id = ?;', [num, questId])
      return true
    })
  },

  getAchievements(jidOrNumber) {
    if (!db) return []
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return []
    const res = db.exec('SELECT achievement_id, unlocked_at FROM achievements WHERE user_id = ?;', [num])
    if (!res || !res.length || !res[0].values) return []
    return res[0].values.map(([id, time]) => ({ achievement_id: id, unlocked_at: time }))
  },

  unlockAchievement(jidOrNumber, achievementId) {
    if (!db || !achievementId) return false
    const num = String(jidOrNumber || '').split('@')[0].split(':')[0].replace(/[^0-9]/g, '')
    if (!num) return false

    return databaseApi.withTransaction(() => {
      const res = db.exec('SELECT id FROM achievements WHERE user_id = ? AND achievement_id = ?;', [num, achievementId])
      if (res && res.length && res[0].values && res[0].values.length) return false
      db.run('INSERT INTO achievements (user_id, achievement_id, unlocked_at) VALUES (?, ?, ?);', [num, achievementId, Date.now()])
      return true
    })
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
