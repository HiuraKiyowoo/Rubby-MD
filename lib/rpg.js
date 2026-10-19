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
┇        ♡ DEVELOPER INFO ♡
┇  ──────── ୨୧ ────────
┇   ↳ Creator  : Kyuu
┇   ↳ GitHub   : github.com/KyuuX444
┇   ↳ YouTube  : MommyKyuu
┇   ↳ Website  : https://api.kyzzz.xyz
┇
┇  ════════ ◇ ════════
┇        ⚔️ TEXT RPG ENGINE
┇  ════════ ◇ ════════
┇   ↳ Modular Classes, Combat, Dungeon, Boss, Crafting & Quests
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import databaseApi from './database.js'
import logger from './logger.js'
import { formatCurrency, formatDuration, getCleanNumber } from './economy.js'

export const RPG_CLASSES = {
  novice: {
    id: 'novice',
    name: 'Novice',
    emoji: '🌱',
    description: 'Petualang pemula yang baru memulai perjalanan.',
    baseHp: 100,
    baseStamina: 100,
    baseAtk: 10,
    baseDef: 5
  },
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    emoji: '⚔️',
    description: 'Pendekar pedang dengan ketahanan fisik tinggi dan serangan seimbang.',
    baseHp: 260,
    baseStamina: 120,
    baseAtk: 38,
    baseDef: 28
  },
  assassin: {
    id: 'assassin',
    name: 'Assassin',
    emoji: '🗡️',
    description: 'Pembunuh bayangan lincah dengan serangan kritikal mematikan.',
    baseHp: 170,
    baseStamina: 150,
    baseAtk: 58,
    baseDef: 14
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    emoji: '🔮',
    description: 'Penyihir agung yang menguasai elemen magis berkekuatan dahsyat.',
    baseHp: 190,
    baseStamina: 180,
    baseAtk: 62,
    baseDef: 12
  },
  tank: {
    id: 'tank',
    name: 'Tank',
    emoji: '🛡️',
    description: 'Benteng baja tak tertembus dengan HP raksasa dan pertahanan kokoh.',
    baseHp: 380,
    baseStamina: 130,
    baseAtk: 26,
    baseDef: 48
  },
  archer: {
    id: 'archer',
    name: 'Archer',
    emoji: '🏹',
    description: 'Pemanah jitu dengan akurasi tinggi dan tembakan jarak jauh.',
    baseHp: 210,
    baseStamina: 140,
    baseAtk: 50,
    baseDef: 20
  }
}

export const RPG_ITEMS = {
  // Consumables
  potion_heal: { id: 'potion_heal', name: 'Potion Darah (HP)', type: 'consumable', price: 1000, healHp: 60, desc: 'Memulihkan 60 HP.' },
  potion_stamina: { id: 'potion_stamina', name: 'Potion Stamina', type: 'consumable', price: 1500, healStamina: 50, desc: 'Memulihkan 50 Stamina.' },
  elixir_full: { id: 'elixir_full', name: 'Elixir Kehidupan', type: 'consumable', price: 5000, fullHeal: true, desc: 'Memulihkan 100% HP dan Stamina seketika.' },

  // Materials
  wood: { id: 'wood', name: 'Kayu Rimba', type: 'material', price: 150, desc: 'Material dasar pertukangan.' },
  stone: { id: 'stone', name: 'Batu Granit', type: 'material', price: 200, desc: 'Batu keras untuk tempaan.' },
  iron_ore: { id: 'iron_ore', name: 'Bijih Besi', type: 'material', price: 600, desc: 'Logam kokoh penempa senjata.' },
  ruby_gem: { id: 'ruby_gem', name: 'Batu Delima Merah', type: 'material', price: 2500, desc: 'Kristal berharga dengan aura mistis.' },
  monster_meat: { id: 'monster_meat', name: 'Daging Monster', type: 'material', price: 300, desc: 'Daging hasil buruan hewan liar.' },
  dragon_scale: { id: 'dragon_scale', name: 'Sisik Naga Kuno', type: 'material', price: 8000, desc: 'Sisik legendaris yang sangat langka.' },

  // Weapons
  wooden_sword: { id: 'wooden_sword', name: 'Pedang Kayu Pemula', type: 'weapon', bonusAtk: 12, desc: '+12 Serangan Fisik' },
  iron_blade: { id: 'iron_blade', name: 'Pedang Baja Tempa', type: 'weapon', bonusAtk: 35, desc: '+35 Serangan Fisik' },
  ruby_katana: { id: 'ruby_katana', name: 'Katana Kristal Delima', type: 'weapon', bonusAtk: 80, desc: '+80 Serangan Magis & Fisik' },
  dragon_slayer: { id: 'dragon_slayer', name: 'Pedang Pembantai Naga', type: 'weapon', bonusAtk: 160, desc: '+160 Serangan Legendaris' },

  // Armors
  leather_vest: { id: 'leather_vest', name: 'Rompi Kulit Monster', type: 'armor', bonusDef: 10, desc: '+10 Pertahanan' },
  iron_armor: { id: 'iron_armor', name: 'Zirah Besi Ksatria', type: 'armor', bonusDef: 30, desc: '+30 Pertahanan' },
  ruby_shield: { id: 'ruby_shield', name: 'Perisai Kristal Delima', type: 'armor', bonusDef: 70, desc: '+70 Pertahanan Tangguh' },
  dragon_mail: { id: 'dragon_mail', name: 'Zirah Sisik Naga Purba', type: 'armor', bonusDef: 140, desc: '+140 Pertahanan Legendaris' }
}

export const CRAFT_RECIPES = {
  wooden_sword: {
    resultId: 'wooden_sword',
    materials: [{ id: 'wood', count: 10 }]
  },
  iron_blade: {
    resultId: 'iron_blade',
    materials: [{ id: 'iron_ore', count: 15 }, { id: 'wood', count: 5 }]
  },
  ruby_katana: {
    resultId: 'ruby_katana',
    materials: [{ id: 'ruby_gem', count: 3 }, { id: 'iron_ore', count: 20 }]
  },
  dragon_slayer: {
    resultId: 'dragon_slayer',
    materials: [{ id: 'dragon_scale', count: 5 }, { id: 'ruby_gem', count: 10 }, { id: 'iron_ore', count: 30 }]
  },
  leather_vest: {
    resultId: 'leather_vest',
    materials: [{ id: 'monster_meat', count: 10 }, { id: 'wood', count: 5 }]
  },
  iron_armor: {
    resultId: 'iron_armor',
    materials: [{ id: 'iron_ore', count: 20 }, { id: 'stone', count: 10 }]
  },
  ruby_shield: {
    resultId: 'ruby_shield',
    materials: [{ id: 'ruby_gem', count: 4 }, { id: 'iron_ore', count: 15 }]
  },
  dragon_mail: {
    resultId: 'dragon_mail',
    materials: [{ id: 'dragon_scale', count: 5 }, { id: 'iron_ore', count: 25 }, { id: 'ruby_gem', count: 5 }]
  }
}

export const MONSTERS = [
  { name: 'Slime Hutan', hp: 50, atk: 12, def: 4, minExp: 50, maxExp: 120, minMoney: 400, maxMoney: 900, drops: [{ id: 'wood', chance: 0.8 }, { id: 'monster_meat', chance: 0.5 }] },
  { name: 'Serigala Rimba', hp: 90, atk: 22, def: 8, minExp: 100, maxExp: 220, minMoney: 800, maxMoney: 1600, drops: [{ id: 'monster_meat', chance: 0.9 }, { id: 'wood', chance: 0.6 }] },
  { name: 'Goblin Penjarah', hp: 140, atk: 32, def: 14, minExp: 180, maxExp: 350, minMoney: 1500, maxMoney: 2800, drops: [{ id: 'stone', chance: 0.8 }, { id: 'iron_ore', chance: 0.4 }] },
  { name: 'Orc Pengembara', hp: 220, atk: 45, def: 22, minExp: 300, maxExp: 550, minMoney: 2500, maxMoney: 4500, drops: [{ id: 'iron_ore', chance: 0.7 }, { id: 'stone', chance: 0.6 }, { id: 'ruby_gem', chance: 0.1 }] }
]

export const QUESTS_CONFIG = [
  { id: 'daily_claim', title: 'Klaim Harian', target: 1, rewardLimit: 5, rewardMoney: 2500, desc: 'Klaim bonus daily harian 1x' },
  { id: 'work_times', title: 'Pekerja Keras', target: 3, rewardLimit: 5, rewardMoney: 3500, desc: 'Bekerja sebanyak 3 kali' },
  { id: 'hunt_monsters', title: 'Pemburu Rimba', target: 3, rewardLimit: 8, rewardMoney: 4500, desc: 'Menangkan perburuan monster 3 kali' },
  { id: 'dungeon_run', title: 'Penjelajah Dungeon', target: 1, rewardLimit: 10, rewardMoney: 6000, desc: 'Selesaikan tantangan dungeon 1 kali' }
]

export const ACHIEVEMENTS_CONFIG = [
  { id: 'first_win', title: 'Prajurit Pertama', desc: 'Menangkan pertempuran RPG pertama kali' },
  { id: 'boss_conqueror', title: 'Penakluk Naga', desc: 'Kalahkan Boss Dunia Naga Purba' },
  { id: 'crafter_master', title: 'Pandai Besi Sejati', desc: 'Berhasil membuat perlengkapan dari bahan mentah' },
  { id: 'streak_7_days', title: 'Disiplin Sultan', desc: 'Mencapai daily streak 7 hari tanpa henti' }
]

export function calculateEffectiveStats(user) {
  const jobKey = String(user.job || 'novice').toLowerCase()
  const classData = RPG_CLASSES[jobKey] || RPG_CLASSES.novice

  let effectiveAtk = classData.baseAtk + Math.floor((user.level || 0) * 3)
  let effectiveDef = classData.baseDef + Math.floor((user.level || 0) * 2)

  if (user.equipped_weapon && RPG_ITEMS[user.equipped_weapon]) {
    effectiveAtk += RPG_ITEMS[user.equipped_weapon].bonusAtk || 0
  }
  if (user.equipped_armor && RPG_ITEMS[user.equipped_armor]) {
    effectiveDef += RPG_ITEMS[user.equipped_armor].bonusDef || 0
  }

  return {
    classData,
    maxHp: user.max_health || classData.baseHp,
    currentHp: Math.min(user.health ?? classData.baseHp, user.max_health || classData.baseHp),
    maxStamina: user.max_stamina || classData.baseStamina,
    currentStamina: Math.min(user.stamina ?? classData.baseStamina, user.max_stamina || classData.baseStamina),
    effectiveAtk,
    effectiveDef,
    level: user.level || 0,
    exp: user.exp || 0
  }
}

export function simulateBattle(playerStats, monster) {
  let playerHp = playerStats.currentHp
  let monsterHp = monster.hp
  const logs = []
  let rounds = 0

  while (playerHp > 0 && monsterHp > 0 && rounds < 10) {
    rounds++
    // Player attacks
    const isCrit = Math.random() < 0.2
    const variance = (Math.random() * 0.4) + 0.8
    let pDmg = Math.max(5, Math.floor(((playerStats.effectiveAtk - (monster.def / 2)) * variance)))
    if (isCrit) pDmg = Math.floor(pDmg * 1.5)

    monsterHp = Math.max(0, monsterHp - pDmg)
    logs.push(`🗡️ Kamu menyerang *${monster.name}* [${pDmg} DMG${isCrit ? ' 💥 CRIT!' : ''}] (Sisa HP Monster: ${monsterHp})`)

    if (monsterHp <= 0) break

    // Monster attacks
    const mDmg = Math.max(3, Math.floor((monster.atk - (playerStats.effectiveDef / 2)) * ((Math.random() * 0.4) + 0.8)))
    playerHp = Math.max(0, playerHp - mDmg)
    logs.push(`🩸 *${monster.name}* membalas menyerangmu! [${mDmg} DMG] (Sisa HP Kamu: ${playerHp})`)
  }

  const isWin = monsterHp <= 0 && playerHp > 0
  return {
    isWin,
    playerFinalHp: playerHp,
    monsterFinalHp: monsterHp,
    rounds,
    logs
  }
}

export const RPG = {
  selectJob(userId, jobKey) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }
    const key = String(jobKey || '').toLowerCase()
    const targetClass = RPG_CLASSES[key]
    if (!targetClass) {
      return { success: false, reason: 'invalid_class', available: Object.keys(RPG_CLASSES) }
    }

    return databaseApi.withTransaction(() => {
      const user = databaseApi.getUser(num)
      databaseApi.updateUser(num, {
        job: targetClass.name,
        max_health: targetClass.baseHp,
        health: Math.max(user.health || 0, targetClass.baseHp),
        max_stamina: targetClass.baseStamina,
        stamina: Math.max(user.stamina || 0, targetClass.baseStamina),
        attack: targetClass.baseAtk,
        defense: targetClass.baseDef
      })
      const updated = databaseApi.getUser(num)
      return { success: true, targetClass, user: updated }
    })
  },

  heal(userId) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }

    const user = databaseApi.getUser(num)
    if (!user) return { success: false, reason: 'user_not_found' }

    const stats = calculateEffectiveStats(user)
    if (stats.currentHp >= stats.maxHp && stats.currentStamina >= stats.maxStamina) {
      return { success: false, reason: 'already_full', stats }
    }

    const potionItem = databaseApi.getItem(num, 'potion_heal')
    const hasPotion = potionItem && potionItem.count > 0

    if (hasPotion) {
      return databaseApi.withTransaction(() => {
        databaseApi.removeItem(num, 'potion_heal', 1)
        const newHp = Math.min(stats.maxHp, stats.currentHp + 60)
        databaseApi.updateUser(num, { health: newHp })
        return {
          success: true,
          method: 'potion',
          healedAmount: newHp - stats.currentHp,
          currentHp: newHp,
          maxHp: stats.maxHp
        }
      })
    }

    // Natural rest heal with cooldown
    const cooldown = global.settings?.rpg?.healCooldown ?? 60000
    const now = Date.now()
    const lastHeal = user.data?.last_rest_heal || 0
    const elapsed = now - lastHeal
    if (elapsed < cooldown) {
      return { success: false, reason: 'cooldown', remainingMs: cooldown - elapsed }
    }

    return databaseApi.withTransaction(() => {
      const healAmount = Math.floor(stats.maxHp * 0.3)
      const staminaAmount = Math.floor(stats.maxStamina * 0.4)
      const newHp = Math.min(stats.maxHp, stats.currentHp + healAmount)
      const newStamina = Math.min(stats.maxStamina, stats.currentStamina + staminaAmount)

      const mergedData = { ...(user.data || {}), last_rest_heal: now }
      databaseApi.updateUser(num, {
        health: newHp,
        stamina: newStamina,
        data: mergedData
      })

      return {
        success: true,
        method: 'rest',
        healedHp: newHp - stats.currentHp,
        healedStamina: newStamina - stats.currentStamina,
        currentHp: newHp,
        currentStamina: newStamina
      }
    })
  },

  hunt(userId) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }

    const user = databaseApi.getUser(num)
    if (!user) return { success: false, reason: 'user_not_found' }

    const now = Date.now()
    const cooldown = global.settings?.rpg?.huntCooldown ?? 180000
    const lastHunt = user.last_hunt || 0
    const elapsed = now - lastHunt
    if (elapsed < cooldown) {
      return { success: false, reason: 'cooldown', remainingMs: cooldown - elapsed }
    }

    const stats = calculateEffectiveStats(user)
    if (stats.currentHp <= 15) {
      return { success: false, reason: 'too_weak', stats }
    }
    if (stats.currentStamina < 15) {
      return { success: false, reason: 'out_of_stamina', stats }
    }

    const monster = MONSTERS[Math.floor(Math.random() * MONSTERS.length)]
    const battle = simulateBattle(stats, monster)

    return databaseApi.withTransaction(() => {
      const staminaUsed = 15
      const newStamina = Math.max(0, stats.currentStamina - staminaUsed)

      if (battle.isWin) {
        const expGain = Math.floor(Math.random() * (monster.maxExp - monster.minExp + 1)) + monster.minExp
        const moneyGain = Math.floor(Math.random() * (monster.maxMoney - monster.minMoney + 1)) + monster.minMoney

        databaseApi.addBalance(num, moneyGain, `Hasil Berburu: ${monster.name}`)
        const newWins = (user.rpg_wins || 0) + 1
        const newExp = (user.exp || 0) + expGain
        const newLevel = Math.floor(newExp / 500)

        const droppedItems = []
        if (monster.drops) {
          for (const d of monster.drops) {
            if (Math.random() <= d.chance) {
              const it = RPG_ITEMS[d.id]
              if (it) {
                databaseApi.addItem(num, it.id, it.name, it.type, 1)
                droppedItems.push(it.name)
              }
            }
          }
        }

        databaseApi.updateUser(num, {
          health: battle.playerFinalHp,
          stamina: newStamina,
          exp: newExp,
          level: newLevel,
          rpg_wins: newWins,
          last_hunt: now
        })

        databaseApi.updateQuestProgress(num, 'hunt_monsters', 1, 3)
        databaseApi.unlockAchievement(num, 'first_win')

        return {
          success: true,
          isWin: true,
          monster: monster.name,
          battle,
          expGain,
          moneyGain,
          droppedItems,
          newLevel,
          currentHp: battle.playerFinalHp
        }
      } else {
        const newLosses = (user.rpg_losses || 0) + 1
        databaseApi.updateUser(num, {
          health: battle.playerFinalHp,
          stamina: newStamina,
          rpg_losses: newLosses,
          last_hunt: now
        })

        return {
          success: true,
          isWin: false,
          monster: monster.name,
          battle,
          currentHp: battle.playerFinalHp
        }
      }
    })
  },

  adventure(userId) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }

    const user = databaseApi.getUser(num)
    if (!user) return { success: false, reason: 'user_not_found' }

    const now = Date.now()
    const cooldown = global.settings?.rpg?.adventureCooldown ?? 600000
    const lastAdv = user.last_adventure || 0
    const elapsed = now - lastAdv
    if (elapsed < cooldown) {
      return { success: false, reason: 'cooldown', remainingMs: cooldown - elapsed }
    }

    const stats = calculateEffectiveStats(user)
    if (stats.currentStamina < 25) {
      return { success: false, reason: 'out_of_stamina', stats }
    }

    const adventures = [
      {
        place: 'Kuil Kuno Terbengkalai',
        desc: 'Kamu menjelajahi reruntuhan mistis dan menemukan peti harta karun!',
        money: 5000,
        exp: 300,
        items: ['ruby_gem', 'stone']
      },
      {
        place: 'Gua Kristal Azure',
        desc: 'Kamu menyusuri kedalaman gua bercahaya dan menambang mineral berharga.',
        money: 4000,
        exp: 250,
        items: ['iron_ore', 'stone']
      },
      {
        place: 'Hutan Belantara Lembah Hijau',
        desc: 'Kamu berkemah dan mengumpulkan kayu rimba serta tanaman herbal langka.',
        money: 3500,
        exp: 200,
        items: ['wood', 'monster_meat']
      }
    ]

    const selected = adventures[Math.floor(Math.random() * adventures.length)]

    return databaseApi.withTransaction(() => {
      databaseApi.addBalance(num, selected.money, `Petualangan ke ${selected.place}`)
      const newExp = (user.exp || 0) + selected.exp
      const newLevel = Math.floor(newExp / 500)
      const newStamina = Math.max(0, stats.currentStamina - 25)

      const collected = []
      for (const itId of selected.items) {
        const itemObj = RPG_ITEMS[itId]
        if (itemObj) {
          databaseApi.addItem(num, itemObj.id, itemObj.name, itemObj.type, 1)
          collected.push(itemObj.name)
        }
      }

      databaseApi.updateUser(num, {
        stamina: newStamina,
        exp: newExp,
        level: newLevel,
        last_adventure: now
      })

      return {
        success: true,
        place: selected.place,
        desc: selected.desc,
        money: selected.money,
        exp: selected.exp,
        collected
      }
    })
  },

  dungeon(userId) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }

    const user = databaseApi.getUser(num)
    if (!user) return { success: false, reason: 'user_not_found' }

    const now = Date.now()
    const cooldown = global.settings?.rpg?.dungeonCooldown ?? 1800000
    const lastDungeon = user.last_dungeon || 0
    const elapsed = now - lastDungeon
    if (elapsed < cooldown) {
      return { success: false, reason: 'cooldown', remainingMs: cooldown - elapsed }
    }

    const stats = calculateEffectiveStats(user)
    if (stats.currentHp <= 30) {
      return { success: false, reason: 'too_weak', stats }
    }
    if (stats.currentStamina < 30) {
      return { success: false, reason: 'out_of_stamina', stats }
    }

    const currentFloor = user.dungeon_floor || 1
    const floorBoss = {
      name: `Penjaga Menara Lantai ${currentFloor}`,
      hp: 150 + (currentFloor * 50),
      atk: 35 + (currentFloor * 10),
      def: 20 + (currentFloor * 5)
    }

    const battle = simulateBattle(stats, floorBoss)

    return databaseApi.withTransaction(() => {
      const newStamina = Math.max(0, stats.currentStamina - 30)

      if (battle.isWin) {
        const expGain = 400 + (currentFloor * 150)
        const moneyGain = 4000 + (currentFloor * 1200)
        const nextFloor = currentFloor + 1

        databaseApi.addBalance(num, moneyGain, `Dungeon Lantai ${currentFloor} Selesai`)
        const newExp = (user.exp || 0) + expGain
        const newLevel = Math.floor(newExp / 500)
        const newWins = (user.rpg_wins || 0) + 1

        // Loot
        databaseApi.addItem(num, 'ruby_gem', 'Batu Delima Merah', 'material', 1)
        databaseApi.addItem(num, 'iron_ore', 'Bijih Besi', 'material', 2)

        databaseApi.updateUser(num, {
          health: battle.playerFinalHp,
          stamina: newStamina,
          exp: newExp,
          level: newLevel,
          rpg_wins: newWins,
          dungeon_floor: nextFloor,
          last_dungeon: now
        })

        databaseApi.updateQuestProgress(num, 'dungeon_run', 1, 1)

        return {
          success: true,
          isWin: true,
          floor: currentFloor,
          nextFloor,
          battle,
          expGain,
          moneyGain,
          loot: ['1x Batu Delima Merah', '2x Bijih Besi']
        }
      } else {
        const newLosses = (user.rpg_losses || 0) + 1
        databaseApi.updateUser(num, {
          health: battle.playerFinalHp,
          stamina: newStamina,
          rpg_losses: newLosses,
          last_dungeon: now
        })

        return {
          success: true,
          isWin: false,
          floor: currentFloor,
          battle
        }
      }
    })
  },

  boss(userId) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }

    const user = databaseApi.getUser(num)
    if (!user) return { success: false, reason: 'user_not_found' }

    const now = Date.now()
    const cooldown = global.settings?.rpg?.bossCooldown ?? 3600000
    const lastBoss = user.last_boss || 0
    const elapsed = now - lastBoss
    if (elapsed < cooldown) {
      return { success: false, reason: 'cooldown', remainingMs: cooldown - elapsed }
    }

    const stats = calculateEffectiveStats(user)
    if (stats.currentHp <= 50) {
      return { success: false, reason: 'too_weak', stats }
    }
    if (stats.currentStamina < 40) {
      return { success: false, reason: 'out_of_stamina', stats }
    }

    const worldBoss = {
      name: 'Naga Purba Merah (Ancient Fire Drake)',
      hp: 550,
      atk: 90,
      def: 45
    }

    const battle = simulateBattle(stats, worldBoss)

    return databaseApi.withTransaction(() => {
      const newStamina = Math.max(0, stats.currentStamina - 40)

      if (battle.isWin) {
        const expGain = 2000
        const moneyGain = 25000

        databaseApi.addBalance(num, moneyGain, 'Menaklukkan World Boss Naga Purba')
        const newExp = (user.exp || 0) + expGain
        const newLevel = Math.floor(newExp / 500)
        const newBossKills = (user.boss_kills || 0) + 1
        const newWins = (user.rpg_wins || 0) + 1

        databaseApi.addItem(num, 'dragon_scale', 'Sisik Naga Kuno', 'material', 2)
        databaseApi.addItem(num, 'ruby_gem', 'Batu Delima Merah', 'material', 3)

        databaseApi.updateUser(num, {
          health: battle.playerFinalHp,
          stamina: newStamina,
          exp: newExp,
          level: newLevel,
          rpg_wins: newWins,
          boss_kills: newBossKills,
          last_boss: now
        })

        databaseApi.unlockAchievement(num, 'boss_conqueror')

        return {
          success: true,
          isWin: true,
          boss: worldBoss.name,
          battle,
          expGain,
          moneyGain,
          loot: ['2x Sisik Naga Kuno', '3x Batu Delima Merah'],
          totalKills: newBossKills
        }
      } else {
        const newLosses = (user.rpg_losses || 0) + 1
        databaseApi.updateUser(num, {
          health: battle.playerFinalHp,
          stamina: newStamina,
          rpg_losses: newLosses,
          last_boss: now
        })

        return {
          success: true,
          isWin: false,
          boss: worldBoss.name,
          battle
        }
      }
    })
  },

  craft(userId, recipeKey) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }
    const key = String(recipeKey || '').toLowerCase()
    const recipe = CRAFT_RECIPES[key]
    if (!recipe) {
      return { success: false, reason: 'recipe_not_found', availableRecipes: Object.keys(CRAFT_RECIPES) }
    }

    const user = databaseApi.getUser(num)
    if (!user) return { success: false, reason: 'user_not_found' }

    return databaseApi.withTransaction(() => {
      // Check materials
      for (const mat of recipe.materials) {
        const item = databaseApi.getItem(num, mat.id)
        if (!item || (item.count || 0) < mat.count) {
          return {
            success: false,
            reason: 'insufficient_materials',
            missing: mat.id,
            required: mat.count,
            available: item?.count || 0
          }
        }
      }

      // Deduct materials
      for (const mat of recipe.materials) {
        databaseApi.removeItem(num, mat.id, mat.count)
      }

      const resultItem = RPG_ITEMS[recipe.resultId]
      databaseApi.addItem(num, resultItem.id, resultItem.name, resultItem.type, 1)
      databaseApi.unlockAchievement(num, 'crafter_master')

      return {
        success: true,
        craftedItem: resultItem
      }
    })
  },

  equip(userId, itemId) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }
    const cleanId = String(itemId || '').toLowerCase()
    const itemDef = RPG_ITEMS[cleanId]
    if (!itemDef || (itemDef.type !== 'weapon' && itemDef.type !== 'armor')) {
      return { success: false, reason: 'not_equippable' }
    }

    const itemInInv = databaseApi.getItem(num, cleanId)
    if (!itemInInv || itemInInv.count <= 0) {
      return { success: false, reason: 'item_not_owned' }
    }

    return databaseApi.withTransaction(() => {
      const field = itemDef.type === 'weapon' ? 'equipped_weapon' : 'equipped_armor'
      databaseApi.updateUser(num, { [field]: itemDef.id })
      const updated = databaseApi.getUser(num)
      return {
        success: true,
        item: itemDef,
        equippedSlot: itemDef.type,
        user: updated
      }
    })
  },

  buyRpgItem(userId, itemId, count = 1) {
    const num = getCleanNumber(userId)
    if (!num) return { success: false, reason: 'invalid_user' }
    const cleanId = String(itemId || '').toLowerCase()
    const itemDef = RPG_ITEMS[cleanId]
    if (!itemDef || !itemDef.price) {
      return { success: false, reason: 'item_not_buyable' }
    }

    const qty = Math.max(1, parseInt(count, 10) || 1)
    const totalPrice = itemDef.price * qty

    const user = databaseApi.getUser(num)
    if ((user.balance || 0) < totalPrice) {
      return {
        success: false,
        reason: 'insufficient_balance',
        currentBalance: user.balance || 0,
        requiredPrice: totalPrice,
        itemDef
      }
    }

    return databaseApi.withTransaction(() => {
      const deduct = databaseApi.deductBalance(num, totalPrice, `Beli ${qty}x ${itemDef.name}`)
      if (!deduct.success) return deduct
      databaseApi.addItem(num, itemDef.id, itemDef.name, itemDef.type, qty)
      const updated = databaseApi.getUser(num)
      return {
        success: true,
        item: itemDef,
        quantity: qty,
        totalPrice,
        newBalance: updated.balance
      }
    })
  }
}

export default RPG
