import { delay, mockPemilu } from '@/utils/mockData'
import { generateId } from '@/utils/helpers'

let pemiluList = [...mockPemilu]

export const pemiluService = {
  async getAll() {
    await delay()
    return { data: [...pemiluList] }
  },
  async getById(id) {
    await delay(200)
    const pemilu = pemiluList.find(p => p.id === id)
    if (!pemilu) throw { response: { data: { message: 'Pemilu tidak ditemukan' }, status: 404 } }
    return { data: pemilu }
  },
  async create(payload) {
    await delay(500)
    const exists = pemiluList.find(p => p.prefix === payload.prefix)
    if (exists) throw { response: { data: { message: 'Prefix sudah digunakan' }, status: 400 } }
    const newPemilu = {
      id: 'pemilu-' + generateId(),
      name: payload.name,
      prefix: payload.prefix,
      start_time: payload.start_time || null,
      end_time: payload.end_time || null,
      is_active: false,
      max_choices: payload.max_choices || 1,
      created_at: new Date().toISOString(),
      updated_at: null
    }
    pemiluList.push(newPemilu)
    return { data: newPemilu }
  },
  async update(id, payload) {
    await delay(400)
    const idx = pemiluList.findIndex(p => p.id === id)
    if (idx < 0) throw { response: { data: { message: 'Pemilu tidak ditemukan' }, status: 404 } }
    pemiluList[idx] = { ...pemiluList[idx], ...payload, updated_at: new Date().toISOString() }
    return { data: pemiluList[idx] }
  },
  async delete(id) {
    await delay(400)
    const idx = pemiluList.findIndex(p => p.id === id)
    if (idx < 0) throw { response: { data: { message: 'Pemilu tidak ditemukan' }, status: 404 } }
    pemiluList.splice(idx, 1)
    return { data: { message: 'Pemilu berhasil dihapus' } }
  }
}
