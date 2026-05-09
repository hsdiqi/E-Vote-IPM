<template>
  <div class="w-full max-w-md mx-auto">
    <div class="card p-8 animate-slide-up">
      <!-- Icon -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4">
          <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
          </svg>
        </div>
        <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white">Verifikasi Token</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1.5">Masukkan token voting yang telah diberikan kepada Anda</p>
      </div>

      <form @submit.prevent="handleVerify" class="space-y-5">
        <div>
          <label class="label">Token Voting</label>
          <div class="relative">
            <input
              v-model="token"
              type="text"
              placeholder="Masukkan token voting..."
              class="input-field font-mono tracking-widest text-center text-sm uppercase"
              :class="error ? 'border-red-400 focus:ring-red-400' : ''"
              required
            />
          </div>
          <p v-if="error" class="mt-2 text-sm text-red-500 text-center">{{ error }}</p>
        </div>

        <button type="submit" :disabled="loading || !token.trim()" class="btn-primary w-full justify-center py-3">
          <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ loading ? 'Memverifikasi...' : 'Verifikasi & Mulai Voting' }}
        </button>
      </form>

      <div class="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p class="text-xs text-slate-500 dark:text-slate-400 text-center">
          <span class="font-semibold">Butuh bantuan?</span> Hubungi panitia untuk mendapatkan token voting Anda.
        </p>
      </div>

      <div class="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
        <p class="text-xs text-indigo-600 dark:text-indigo-400 text-center font-mono">
          Demo token: <strong>TOKEN-ABC12</strong> (token apapun akan diterima)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { votingService } from '@/services/votingService'

const router = useRouter()
const token = ref('')
const loading = ref(false)
const error = ref('')

const handleVerify = async () => {
  error.value = ''
  loading.value = true
  try {
    const { data } = await votingService.verifyToken(token.value)
    // Store verify result
    sessionStorage.setItem('voteSession', JSON.stringify({
      id_pemilih: data.id_pemilih,
      id_pemilu: data.id_pemilu,
      token: token.value,
      token_hash: data.token_hash
    }))
    router.push('/vote/ballot')
  } catch (err) {
    error.value = err?.response?.data?.message || 'Token tidak valid atau sudah digunakan'
  } finally {
    loading.value = false
  }
}
</script>
