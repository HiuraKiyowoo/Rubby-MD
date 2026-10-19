import axios from 'axios'
import FormData from 'form-data'

export async function uploadPomf(buffer) {
  try {
    const form = new FormData()
    form.append('files[]', buffer, { filename: 'upload.jpg' })
    const res = await axios.post('https://pomf2.lain.la/upload.php', form, {
      headers: form.getHeaders(),
      timeout: 20000
    })
    return res.data?.files?.[0]?.url || ''
  } catch {
    const form = new FormData()
    form.append('reqtype', 'fileupload')
    form.append('fileToUpload', buffer, { filename: 'upload.jpg' })
    const res = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
      timeout: 20000
    })
    return String(res.data).trim()
  }
}

export async function uploadMedia(buffer) {
  return await uploadPomf(buffer)
}

export const pomf = uploadPomf
export default { uploadPomf, uploadMedia, pomf }
