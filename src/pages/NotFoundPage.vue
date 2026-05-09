<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="relative mx-auto mb-8 w-48 h-48">
        <div class="absolute inset-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-8xl font-black text-indigo-200 dark:text-indigo-800 select-none">404</span>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-24 h-24 text-indigo-400 dark:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">Halaman Tidak Ditemukan</h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button @click="router.back()"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        <router-link to="/admin"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
          Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
