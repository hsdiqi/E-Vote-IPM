import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const admin = ref(JSON.parse(localStorage.getItem('admin') || 'null'))
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value && !!admin.value)

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const { data } = await authService.login(credentials)
      token.value = data.token
      admin.value = data.admin
      localStorage.setItem('token', data.token)
      localStorage.setItem('adminId', data.admin.id)
      localStorage.setItem('admin', JSON.stringify(data.admin))
      return data
    } catch (err) {
      error.value = err?.response?.data?.message || 'Login gagal'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    admin.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('adminId')
    localStorage.removeItem('admin')
  }

  return { token, admin, loading, error, isAuthenticated, login, logout }
})
