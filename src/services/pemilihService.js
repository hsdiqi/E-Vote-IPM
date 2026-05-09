import { delay, mockPemilih } from '@/utils/mockData'
import { generateId } from '@/utils/helpers'

let pemilihList = [...mockPemilih]

export const pemilihService = {
  async getAll(id_pemilu) {
    await delay()
    const list = id_pemilu ? pemilihList.filter(p => p.id_pemilu === id_pemilu) : [...pemilihList]
    return { data: list }
  },
  async getById(id) {
    await delay(200)
    const p = pemilihList.find(p => p.id === id)
    if (!p) throw { response: { data: { message: 'Pemilih tidak ditemukan' }, status: 404 } }
    return { data: p }
  },
  async create(payload) {
    await delay(600)
    const token = 'TOKEN-' + generateId().toUpperCase()
    const newP = {
      id: 'p-' + generateId(),
      id_pemilu: payload.id_pemilu,
      name: payload.name,
      photo_url: payload.photo_url || null,
      nomor_anggota: payload.nomor_anggota || null,
      token_hash: btoa(token),
      is_used: false,
      used_at: null,
      expired_at: payload.expired_at || null,
      created_at: new Date().toISOString(),
      updated_at: null
    }
    pemilihList.push(newP)
    return {
      data: {
        id_pemilih: newP.id,
        name: newP.name,
        token: token,
        qrcode: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`
      }
    }
  },
  async update(id, payload) {
    await delay(400)
    const idx = pemilihList.findIndex(p => p.id === id)
    if (idx < 0) throw { response: { data: { message: 'Pemilih tidak ditemukan' }, status: 404 } }
    pemilihList[idx] = { ...pemilihList[idx], ...payload, updated_at: new Date().toISOString() }
    return { data: pemilihList[idx] }
  },
  async delete(id) {
    await delay(400)
    const idx = pemilihList.findIndex(p => p.id === id)
    if (idx < 0) throw { response: { data: { message: 'Pemilih tidak ditemukan' }, status: 404 } }
    pemilihList.splice(idx, 1)
    return { data: { message: 'Pemilih berhasil dihapus' } }
  },
  async generateToken(id) {
    await delay(500)
    const p = pemilihList.find(p => p.id === id)
    if (!p) throw { response: { data: { message: 'Pemilih tidak ditemukan' }, status: 404 } }
    const token = 'TOKEN-' + generateId().toUpperCase()
    return { data: { pemilih_id: id, token, expired_at: p.expired_at } }
  }
}
