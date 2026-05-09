<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="relative mx-auto mb-8 w-48 h-48">
        <div class="absolute inset-0 rounded-full bg-amber-100 dark:bg-amber-900/30"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-8xl font-black text-amber-200 dark:text-amber-800 select-none">403</span>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-24 h-24 text-amber-400 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">Akses Ditolak</h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        Kamu tidak memiliki izin untuk mengakses halaman ini. Hubungi administrator jika kamu merasa ini adalah kesalahan.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button @click="router.back()"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        <router-link to="/login"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
