import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const admin = ref(JSON.parse(localStorage.getItem('admin') || 'null'))
  const loading = ref(false)
  const error = ref(null)

  // const isAuthenticated = computed(() => !!token.value && !!admin.value)
  const isAuthenticated = ref(false)

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const res = await authService.login(credentials)
      if (res.status_code === 200 || res.status === 200) {
        isAuthenticated.value = true
      } 
      
      return true
    } catch (err) {
      error.value = err?.response?.data?.message || 'Login gagal'
      throw err
    } finally {
      loading.value = false
    }
  }

  return { token, admin, loading, error, isAuthenticated, login }
})
