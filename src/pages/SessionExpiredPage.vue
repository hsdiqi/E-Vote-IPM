<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="mx-auto mb-8 w-32 h-32 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
        <svg class="w-16 h-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">Sesi Habis</h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8">Sesi login kamu sudah berakhir. Silakan login kembali.</p>
      <router-link to="/login" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
        Login Kembali
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
onMounted(() => auth.logout())
</script>