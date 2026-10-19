import test from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import fs from 'node:fs'
import '../setting.js'
import { initDatabase, databaseApi } from '../lib/database.js'
import Economy from '../lib/economy.js'
import RPG, { RPG_CLASSES, RPG_ITEMS, CRAFT_RECIPES, calculateEffectiveStats, simulateBattle } from '../lib/rpg.js'

test('Comprehensive Economy & RPG System Test Suite', async (t) => {
  await initDatabase()

  const testUser1 = '6289900000001'
  const testUser2 = '6289900000002'

  await t.test('1. User Registration & Idempotency', () => {
    // Clean state
    databaseApi.unregUser(testUser1)
    databaseApi.setBalance(testUser1, 0)
    databaseApi.setLimit(testUser1, 0)

    // Register user
    const regRes = databaseApi.registerUser(testUser1, 'KyuuPlayer')
    assert.equal(regRes.success, true)
    assert.equal(regRes.user.registered, 1)
    assert.equal(regRes.user.name, 'KyuuPlayer')
    assert.equal(regRes.user.balance, global.settings.registration.startingBalance)
    assert.equal(regRes.user.limit_count, global.settings.registration.startingLimit)

    // Attempt double registration
    const doubleReg = databaseApi.registerUser(testUser1, 'AnotherName')
    assert.equal(doubleReg.success, false)
    assert.equal(doubleReg.reason, 'already_registered')
    // Balance shouldn't have doubled
    assert.equal(databaseApi.getBalance(testUser1), global.settings.registration.startingBalance)

    // Check isRegistered
    assert.equal(databaseApi.isRegistered(testUser1), true)
  })

  await t.test('2. Atomic Limit Operations & Negative Balance Protection', () => {
    databaseApi.setLimit(testUser1, 10, 'Test Setup')
    assert.equal(databaseApi.getLimit(testUser1), 10)
    assert.equal(databaseApi.hasLimit(testUser1, 5), true)
    assert.equal(databaseApi.hasLimit(testUser1, 15), false)

    // Add limit
    const afterAdd = databaseApi.addLimit(testUser1, 5, 'Bonus Test')
    assert.equal(afterAdd, 15)

    // Deduct limit
    const deductRes = databaseApi.deductLimit(testUser1, 10, 'Test Usage')
    assert.equal(deductRes.success, true)
    assert.equal(deductRes.limit, 5)

    // Attempt to deduct more than available (must fail and not become negative)
    const failDeduct = databaseApi.deductLimit(testUser1, 20, 'Overshoot')
    assert.equal(failDeduct.success, false)
    assert.equal(failDeduct.reason, 'insufficient_limit')
    assert.equal(databaseApi.getLimit(testUser1), 5)
  })

  await t.test('3. Atomic Balance & Transfer with Tax', () => {
    // Setup initial balances
    databaseApi.registerUser(testUser2, 'PlayerTwo')
    databaseApi.setBalance(testUser1, 50000, 'Test Base')
    databaseApi.setBalance(testUser2, 10000, 'Test Base')

    // Deduct and fail check
    const overDeduct = databaseApi.deductBalance(testUser1, 999999)
    assert.equal(overDeduct.success, false)
    assert.equal(overDeduct.reason, 'insufficient_balance')
    assert.equal(databaseApi.getBalance(testUser1), 50000)

    // Transfer 20,000 from user1 to user2 (5% tax = 1,000 tax, 19,000 net)
    const transferRes = Economy.transfer(testUser1, testUser2, 20000)
    assert.equal(transferRes.success, true)
    assert.equal(transferRes.amount, 20000)
    assert.equal(transferRes.tax, 1000)
    assert.equal(transferRes.netReceive, 19000)
    assert.equal(transferRes.senderBalance, 30000)
    assert.equal(transferRes.recipientBalance, 29000)

    // Self-transfer must fail
    const selfTransfer = Economy.transfer(testUser1, testUser1, 5000)
    assert.equal(selfTransfer.success, false)
    assert.equal(selfTransfer.reason, 'self_transfer')

    // Transaction history must record the events
    const txs = databaseApi.getTransactions(testUser1, 5)
    assert.ok(txs.length > 0)
    assert.equal(txs[0].category, 'money')
  })

  await t.test('4. Daily Claims, Streaks and Cooldowns', () => {
    // Force reset cooldown for testing
    databaseApi.updateUser(testUser1, { last_daily: 0, daily_streak: 0 })

    const claim1 = Economy.claimDaily(testUser1)
    assert.equal(claim1.success, true)
    assert.equal(claim1.streak, 1)
    assert.ok(claim1.limitReward > 0)
    assert.ok(claim1.moneyReward > 0)

    // Immediate second claim must fail due to cooldown
    const claim2 = Economy.claimDaily(testUser1)
    assert.equal(claim2.success, false)
    assert.equal(claim2.reason, 'cooldown')
    assert.ok(claim2.remainingMs > 0)
  })

  await t.test('5. Work and Beg Scenarios', () => {
    // Reset work and beg
    databaseApi.updateUser(testUser1, { last_work: 0, last_beg: 0 })

    const workRes = Economy.work(testUser1)
    assert.equal(workRes.success, true)
    assert.ok(workRes.pay > 0)
    assert.ok(workRes.job.length > 0)

    // Work cooldown
    const workFail = Economy.work(testUser1)
    assert.equal(workFail.success, false)
    assert.equal(workFail.reason, 'cooldown')

    // Beg
    const begRes = Economy.beg(testUser1)
    assert.equal(begRes.success, true)
    assert.ok(typeof begRes.story === 'string')

    // Beg cooldown
    const begFail = Economy.beg(testUser1)
    assert.equal(begFail.success, false)
    assert.equal(begFail.reason, 'cooldown')
  })

  await t.test('6. Limit Shop Purchases', () => {
    databaseApi.setBalance(testUser1, 50000)
    databaseApi.setLimit(testUser1, 10)

    // Buy package 1 (+5 limit for 5000)
    const buyRes = Economy.buyLimit(testUser1, '1')
    assert.equal(buyRes.success, true)
    assert.equal(buyRes.newLimit, 15)
    assert.equal(buyRes.newBalance, 45000)

    // Inexistent package
    const fakeBuy = Economy.buyLimit(testUser1, '999')
    assert.equal(fakeBuy.success, false)
    assert.equal(fakeBuy.reason, 'package_not_found')

    // Insufficient balance
    databaseApi.setBalance(testUser1, 100)
    const brokeBuy = Economy.buyLimit(testUser1, '1')
    assert.equal(brokeBuy.success, false)
    assert.equal(brokeBuy.reason, 'insufficient_balance')
  })

  await t.test('7. RPG Class Selection & Effective Stats', () => {
    const jobRes = RPG.selectJob(testUser1, 'warrior')
    assert.equal(jobRes.success, true)
    assert.equal(jobRes.targetClass.name, 'Warrior')

    const user = databaseApi.getUser(testUser1)
    assert.equal(user.job, 'Warrior')
    assert.equal(user.max_health, RPG_CLASSES.warrior.baseHp)

    const stats = calculateEffectiveStats(user)
    assert.equal(stats.maxHp, RPG_CLASSES.warrior.baseHp)
    assert.equal(stats.effectiveAtk, RPG_CLASSES.warrior.baseAtk)
    assert.equal(stats.effectiveDef, RPG_CLASSES.warrior.baseDef)
  })

  await t.test('8. Inventory, Items, Crafting and Equipment', () => {
    // Add materials
    databaseApi.addItem(testUser1, 'wood', 'Kayu Rimba', 'material', 15)
    assert.equal(databaseApi.getItem(testUser1, 'wood').count, 15)

    // Craft wooden sword (requires 10 wood)
    const craftRes = RPG.craft(testUser1, 'wooden_sword')
    assert.equal(craftRes.success, true)
    assert.equal(craftRes.craftedItem.id, 'wooden_sword')
    assert.equal(databaseApi.getItem(testUser1, 'wood').count, 5)

    // Equip wooden sword
    const equipRes = RPG.equip(testUser1, 'wooden_sword')
    assert.equal(equipRes.success, true)
    assert.equal(equipRes.equippedSlot, 'weapon')

    // Check stats with equipped weapon
    const user = databaseApi.getUser(testUser1)
    const stats = calculateEffectiveStats(user)
    assert.equal(stats.effectiveAtk, RPG_CLASSES.warrior.baseAtk + RPG_ITEMS.wooden_sword.bonusAtk)

    // Cannot craft without sufficient materials
    const failCraft = RPG.craft(testUser1, 'wooden_sword')
    assert.equal(failCraft.success, false)
    assert.equal(failCraft.reason, 'insufficient_materials')
  })

  await t.test('9. RPG Combat Simulation & Healing', () => {
    const dummyPlayer = {
      currentHp: 200,
      maxHp: 200,
      effectiveAtk: 45,
      effectiveDef: 20
    }
    const dummyMonster = {
      name: 'Goblin',
      hp: 50,
      atk: 10,
      def: 5
    }

    const battle = simulateBattle(dummyPlayer, dummyMonster)
    assert.equal(battle.isWin, true)
    assert.ok(battle.rounds > 0)
    assert.ok(battle.logs.length > 0)

    // Test heal with potion
    databaseApi.addItem(testUser1, 'potion_heal', 'Potion Darah', 'consumable', 1)
    databaseApi.updateUser(testUser1, { health: 50 })
    const healRes = RPG.heal(testUser1)
    assert.equal(healRes.success, true)
    assert.equal(healRes.method, 'potion')
    assert.equal(healRes.currentHp, 110)
  })

  await t.test('10. Quests, Achievements & Leaderboard', () => {
    // Update quest progress
    const qRes = databaseApi.updateQuestProgress(testUser1, 'daily_claim', 1, 1)
    assert.equal(qRes.completed, true)

    // Claim quest
    const claimQ = databaseApi.claimQuest(testUser1, 'daily_claim')
    assert.equal(claimQ, true)

    // Second claim fails
    const claimAgain = databaseApi.claimQuest(testUser1, 'daily_claim')
    assert.equal(claimAgain, false)

    // Achievements
    const achRes = databaseApi.unlockAchievement(testUser1, 'first_win')
    assert.equal(achRes, true)
    const achs = databaseApi.getAchievements(testUser1)
    assert.ok(achs.some(a => a.achievement_id === 'first_win'))

    // Leaderboard
    const lb = databaseApi.getLeaderboard('balance', 5)
    assert.ok(Array.isArray(lb))
    assert.ok(lb.length >= 2)
  })
})
