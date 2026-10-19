import axios from 'axios'
import FormData from 'form-data'

export async function reminiHD(buffer) {
  try {
    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', buffer, { filename: 'remini.jpg' })
    const { data } = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
      timeout: 20000
    })
    const url = String(data).trim()
    return {
      output: { url },
      input: { size: buffer.length, width: 720, height: 720 },
      upscale: '4x'
    }
  } catch (err) {
    return { error: err?.message || 'Gagal memproses gambar.' }
  }
}

export default { reminiHD }
