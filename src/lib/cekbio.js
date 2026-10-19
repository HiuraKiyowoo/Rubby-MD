import fs from 'node:fs'

export function getJamPercentage(bioData, setAt, isBusiness) {
  let score = 50
  if (bioData) score += 20
  if (setAt) score += 15
  if (isBusiness) score += 15
  return Math.min(100, score)
}

export function createProgressBar(current, total) {
  const percent = total > 0 ? Math.floor((current / total) * 10) : 0
  const pctNum = total > 0 ? Math.floor((current / total) * 100) : 0
  return '█'.repeat(percent) + '░'.repeat(Math.max(0, 10 - percent)) + ` ${pctNum}%`
}

export async function checkMetaBusiness(conn, jid) {
  try {
    const profile = await conn.getBusinessProfile?.(jid).catch(() => null)
    return { isBusiness: Boolean(profile) }
  } catch {
    return { isBusiness: false }
  }
}

export function createBioResultFile(results, total, source) {
  const tmpPath = `/tmp/cekbio_${Date.now()}.txt`
  const text = (results || []).map(r => `${r.number} | ${r.status || r.bio || '-'}`).join('\n')
  fs.writeFileSync(tmpPath, text, 'utf8')
  return tmpPath
}

export async function parseNumbersFromBuffer(buffer, fileName = '') {
  try {
    const text = buffer.toString('utf8')
    const matches = text.match(/\b\d{10,15}\b/g)
    return matches ? Array.from(new Set(matches)) : []
  } catch {
    return []
  }
}

export default {
  getJamPercentage,
  createProgressBar,
  checkMetaBusiness,
  createBioResultFile,
  parseNumbersFromBuffer
}
