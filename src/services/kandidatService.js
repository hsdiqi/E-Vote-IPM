import { delay, mockKandidat } from '@/utils/mockData'
import { generateId } from '@/utils/helpers'

let kandidatList = [...mockKandidat]

export const kandidatService = {
  async getAll(id_pemilu) {
    await delay()
    const list = id_pemilu ? kandidatList.filter(k => k.id_pemilu === id_pemilu) : [...kandidatList]
    return { data: list }
  },
  async getById(id) {
    await delay(200)
    const k = kandidatList.find(k => k.id === id)
    if (!k) throw { response: { data: { message: 'Kandidat tidak ditemukan' }, status: 404 } }
    return { data: k }
  },
  async create(payload) {
    await delay(500)
    const newK = {
      id: 'k-' + generateId(),
      id_pemilu: payload.id_pemilu,
      name: payload.name,
      photo_url: payload.photo_url || null,
      nomor_anggota: payload.nomor_anggota || null,
      created_at: new Date().toISOString(),
      updated_at: null
    }
    kandidatList.push(newK)
    return { data: newK }
  },
  async update(id, payload) {
    await delay(400)
    const idx = kandidatList.findIndex(k => k.id === id)
    if (idx < 0) throw { response: { data: { message: 'Kandidat tidak ditemukan' }, status: 404 } }
    kandidatList[idx] = { ...kandidatList[idx], ...payload, updated_at: new Date().toISOString() }
    return { data: kandidatList[idx] }
  },
  async delete(id) {
    await delay(400)
    const idx = kandidatList.findIndex(k => k.id === id)
    if (idx < 0) throw { response: { data: { message: 'Kandidat tidak ditemukan' }, status: 404 } }
    kandidatList.splice(idx, 1)
    return { data: { message: 'Kandidat berhasil dihapus' } }
  }
}
