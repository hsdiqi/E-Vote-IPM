import { delay, mockAdmins } from '@/utils/mockData'
import { generateId } from '@/utils/helpers'

let admins = [...mockAdmins]

export const adminService = {
  async getAll() {
    await delay()
    return { data: [...admins] }
  },
  async getById(id) {
    await delay(200)
    const admin = admins.find(a => a.id === id)
    if (!admin) throw { response: { data: { message: 'Admin tidak ditemukan' }, status: 404 } }
    return { data: admin }
  },
  async create(payload) {
    await delay(500)
    const exists = admins.find(a => a.username === payload.username)
    if (exists) throw { response: { data: { message: 'Username sudah digunakan' }, status: 400 } }
    const newAdmin = {
      id: 'admin-' + generateId(),
      username: payload.username,
      role: payload.role || 'operator',
      password_hash: null,
      created_at: new Date().toISOString(),
      updated_at: null
    }
    admins.push(newAdmin)
    return { data: newAdmin }
  },
  async update(id, payload) {
    await delay(400)
    const idx = admins.findIndex(a => a.id === id)
    if (idx < 0) throw { response: { data: { message: 'Admin tidak ditemukan' }, status: 404 } }
    admins[idx] = { ...admins[idx], ...payload, updated_at: new Date().toISOString() }
    return { data: admins[idx] }
  },
  async delete(id) {
    await delay(400)
    const idx = admins.findIndex(a => a.id === id)
    if (idx < 0) throw { response: { data: { message: 'Admin tidak ditemukan' }, status: 404 } }
    admins.splice(idx, 1)
    return { data: { message: 'Admin berhasil dihapus' } }
  }
}
