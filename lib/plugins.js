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
import { pathToFileURL } from 'node:url'
import logger from './logger.js'

function extractCommandsFromHandler(handler, defaultName) {
  const result = new Set()

  if (typeof handler.command === 'string' && handler.command.trim()) {
    result.add(handler.command.toLowerCase().trim())
  } else if (Array.isArray(handler.command)) {
    for (const item of handler.command) {
      if (typeof item === 'string' && item.trim()) {
        result.add(item.toLowerCase().trim())
      } else if (item instanceof RegExp) {
        const clean = item.source.replace(/^[\^\(\)]+|[\$\(\)]+$/g, '')
        clean.split('|').forEach(s => {
          const w = s.replace(/[\\]/g, '').toLowerCase().trim()
          if (w) result.add(w)
        })
      }
    }
  } else if (handler.command instanceof RegExp) {
    const clean = handler.command.source.replace(/^[\^\(\)]+|[\$\(\)]+$/g, '')
    clean.split('|').forEach(s => {
      const w = s.replace(/[\\]/g, '').toLowerCase().trim()
      if (w) result.add(w)
    })
  }

  if (Array.isArray(handler.help)) {
    for (const h of handler.help) {
      const firstWord = String(h).split(/\s+/)[0].replace(/^\./, '').toLowerCase().trim()
      if (firstWord) result.add(firstWord)
    }
  }

  if (result.size === 0) {
    result.add(defaultName.toLowerCase())
  }

  return Array.from(result)
}

function getPrimaryCommand(handler, extractedCommands, defaultName) {
  if (Array.isArray(handler.help) && handler.help.length > 0) {
    const firstHelp = String(handler.help[0]).split(/\s+/)[0].replace(/^\./, '').toLowerCase().trim()
    if (firstHelp) return firstHelp
  }
  if (typeof handler.help === 'string' && handler.help.trim()) {
    const firstHelp = handler.help.split(/\s+/)[0].replace(/^\./, '').toLowerCase().trim()
    if (firstHelp) return firstHelp
  }
  return extractedCommands[0] || defaultName.toLowerCase()
}

export class PluginRegistry {
  constructor(pluginsDir) {
    this.pluginsDir = pluginsDir
    this.plugins = new Map()
    this.commands = new Map()
    this.categories = new Map()
  }

  async loadAll() {
    this.plugins.clear()
    this.commands.clear()
    this.categories.clear()

    if (!fs.existsSync(this.pluginsDir)) {
      fs.mkdirSync(this.pluginsDir, { recursive: true })
    }

    const files = this.scanDir(this.pluginsDir)
    let loadedCount = 0

    for (const filePath of files) {
      const success = await this.loadPlugin(filePath)
      if (success) loadedCount++
    }

    logger.plugin(`${loadedCount} plugins loaded`)
  }

  scanDir(dir) {
    let results = []
    const list = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of list) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        results = results.concat(this.scanDir(fullPath))
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        results.push(fullPath)
      }
    }
    return results
  }

  validatePermissions(handler) {
    if (handler.group === true && handler.private === true) {
      return {
        valid: false,
        error: 'Plugin cannot have both "group = true" and "private = true"'
      }
    }
    return { valid: true }
  }

  async loadPlugin(filePath) {
    try {
      const relativePath = path.relative(this.pluginsDir, filePath)
      const pathSegments = relativePath.split(path.sep)
      const category = pathSegments.length > 1 ? pathSegments[0].toLowerCase() : 'other'
      const baseName = path.basename(filePath, '.js')

      const fileUrl = `${pathToFileURL(filePath).href}?update=${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
      const module = await import(fileUrl)
      const handler = module.default

      if (!handler || typeof handler !== 'function') {
        logger.warn(`Plugin ${relativePath} skipped: default export is not a function`)
        return false
      }

      const validation = this.validatePermissions(handler)
      if (!validation.valid) {
        logger.warn(`Plugin ${relativePath} invalid: ${validation.error}`)
        return false
      }

      this.unloadPlugin(filePath, false)

      const commands = extractCommandsFromHandler(handler, baseName)
      const validCommands = []

      for (const cmd of commands) {
        if (this.commands.has(cmd)) {
          const existing = this.commands.get(cmd)
          if (existing.filePath !== filePath) {
            logger.warn(`Duplicate command conflict: '.${cmd}' in '${relativePath}' conflicts with '${existing.relativePath}'. Registration canceled for '.${cmd}'.`)
          }
        } else {
          validCommands.push(cmd)
        }
      }

      const primaryCommand = getPrimaryCommand(handler, validCommands.length > 0 ? validCommands : commands, baseName)

      const pluginData = {
        filePath,
        relativePath,
        category,
        handler,
        primaryCommand,
        commands: validCommands,
        allCommands: commands,
        owner: Boolean(handler.owner),
        premium: Boolean(handler.premium),
        group: Boolean(handler.group),
        private: Boolean(handler.private),
        admin: Boolean(handler.admin),
        botadmin: Boolean(handler.botadmin),
        noJadiBot: Boolean(handler.noJadiBot),
        hidden: Boolean(handler.hidden || handler.hideMenu || handler.noMenu)
      }

      this.plugins.set(filePath, pluginData)

      for (const cmd of validCommands) {
        this.commands.set(cmd, pluginData)
      }

      if (!this.categories.has(category)) {
        this.categories.set(category, new Map())
      }
      this.categories.get(category).set(filePath, pluginData)

      return true
    } catch (err) {
      logger.error(`Failed to load plugin: ${path.relative(this.pluginsDir, filePath)}`, err)
      return false
    }
  }

  unloadPlugin(filePath, logAction = true) {
    if (!this.plugins.has(filePath)) return

    const pluginData = this.plugins.get(filePath)
    for (const cmd of pluginData.commands) {
      if (this.commands.get(cmd)?.filePath === filePath) {
        this.commands.delete(cmd)
      }
    }

    if (this.categories.has(pluginData.category)) {
      this.categories.get(pluginData.category).delete(filePath)
      if (this.categories.get(pluginData.category).size === 0) {
        this.categories.delete(pluginData.category)
      }
    }

    this.plugins.delete(filePath)
    if (logAction) {
      logger.hotreload(`Plugin unloaded: ${pluginData.relativePath}`)
    }
  }

  getCommand(commandName) {
    if (!commandName) return null
    const lower = commandName.toLowerCase()
    if (this.commands.has(lower)) {
      return this.commands.get(lower)
    }

    for (const pluginData of this.plugins.values()) {
      const handler = pluginData.handler
      if (!handler) continue

      if (handler.command instanceof RegExp) {
        if (handler.command.test(commandName)) {
          this.commands.set(lower, pluginData)
          return pluginData
        }
      } else if (Array.isArray(handler.command)) {
        for (const cmd of handler.command) {
          if (cmd instanceof RegExp && cmd.test(commandName)) {
            this.commands.set(lower, pluginData)
            return pluginData
          }
          if (typeof cmd === 'string' && cmd.toLowerCase() === lower) {
            this.commands.set(lower, pluginData)
            return pluginData
          }
        }
      } else if (typeof handler.command === 'string' && handler.command.toLowerCase() === lower) {
        this.commands.set(lower, pluginData)
        return pluginData
      }
    }

    return null
  }

  getMenuStructure() {
    const menu = {}
    const sortedCategories = Array.from(this.categories.keys()).sort()

    for (const cat of sortedCategories) {
      const pluginsMap = this.categories.get(cat)
      const list = []
      for (const pluginData of pluginsMap.values()) {
        if (pluginData.hidden) continue
        list.push({
          name: pluginData.primaryCommand,
          owner: pluginData.owner,
          premium: pluginData.premium,
          admin: pluginData.admin,
          group: pluginData.group,
          private: pluginData.private
        })
      }
      list.sort((a, b) => a.name.localeCompare(b.name))
      if (list.length > 0) {
        menu[cat] = list
      }
    }

    return {
      totalPlugins: this.plugins.size,
      totalCommands: this.commands.size,
      categories: menu
    }
  }
}

export class PluginWatcher {
  constructor(registry, pluginsDir) {
    this.registry = registry
    this.pluginsDir = pluginsDir
    this.watcher = null
    this.debounceTimers = new Map()
  }

  start() {
    if (!fs.existsSync(this.pluginsDir)) {
      fs.mkdirSync(this.pluginsDir, { recursive: true })
    }

    try {
      this.watcher = fs.watch(
        this.pluginsDir,
        { recursive: true },
        (eventType, filename) => {
          if (!filename || !filename.endsWith('.js')) return

          const filePath = path.resolve(this.pluginsDir, filename)

          if (this.debounceTimers.has(filePath)) {
            clearTimeout(this.debounceTimers.get(filePath))
          }

          const timer = setTimeout(async () => {
            this.debounceTimers.delete(filePath)
            await this.handleFileChange(filePath)
          }, 250)

          this.debounceTimers.set(filePath, timer)
        }
      )
    } catch (err) {
      logger.error('Failed to start plugin watcher', err)
    }
  }

  async handleFileChange(filePath) {
    const relativePath = path.relative(this.pluginsDir, filePath)
    const exists = fs.existsSync(filePath)

    if (exists) {
      const isNew = !this.registry.plugins.has(filePath)
      const success = await this.registry.loadPlugin(filePath)
      if (success) {
        logger.hotreload(`plugins/${relativePath} ${isNew ? 'loaded' : 'updated'}`)
      }
    } else {
      this.registry.unloadPlugin(filePath, true)
    }
  }

  close() {
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer)
    }
    this.debounceTimers.clear()

    if (this.watcher) {
      this.watcher.close()
      this.watcher = null
    }
  }
}

export default {
  PluginRegistry,
  PluginWatcher
}
