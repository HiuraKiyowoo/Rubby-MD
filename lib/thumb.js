import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

let cachedThumb = null

export async function getActiveThumbBuffer(size = 300) {
  try {
    const thumbPath = path.resolve(process.cwd(), 'media/thumb.jpg')
    if (fs.existsSync(thumbPath)) {
      const raw = fs.readFileSync(thumbPath)
      const buffer = await sharp(raw)
        .resize(size, size, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toBuffer()
      return buffer
    }
    const allMenuPath = path.resolve(process.cwd(), 'media/allmenu.jpg')
    if (fs.existsSync(allMenuPath)) {
      const raw = fs.readFileSync(allMenuPath)
      const buffer = await sharp(raw)
        .resize(size, size, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toBuffer()
      return buffer
    }
  } catch (err) {
    console.error('[THUMB ERROR]:', err?.message || err)
  }
  return Buffer.alloc(0)
}

export default { getActiveThumbBuffer }
