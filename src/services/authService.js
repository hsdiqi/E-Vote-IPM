import { delay, mockAdmins } from '@/utils/mockData'

export const authService = {
  async login(payload) {
    await delay(600)
    const admin = mockAdmins.find(a => a.username === payload.username)
    if (!admin || payload.password !== 'password123') {
      throw { response: { data: { message: 'Username atau password salah' }, status: 401 } }
    }
    return {
      data: {
        token: 'mock-jwt-token-' + admin.id,
        token_refresh: 'mock-refresh-' + admin.id,
        admin
      }
    }
  },

  async me() {
    await delay(300)
    const adminId = localStorage.getItem('adminId')
    const admin = mockAdmins.find(a => a.id === adminId)
    if (!admin) throw { response: { status: 401 } }
    return { data: admin }
  }
}
