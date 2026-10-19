export function isBotMessage(msg, client) {
  const id = msg?.key?.id || ''
  const isBaileys = id.startsWith('BAE5') || id.length === 16 || id.length === 12
  const isBot = Boolean(isBaileys || msg?.isBot)
  return {
    isBot,
    score: isBot ? 95 : 5,
    indicators: isBot ? ['Baileys ID pattern detected'] : ['Official client signature']
  }
}

export default { isBotMessage }
