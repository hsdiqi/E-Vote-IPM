<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex flex-col">
    <!-- Header -->
    <header class="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-glow">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-display font-bold text-slate-900 dark:text-white leading-none">E-Vote</p>
          <p class="text-[10px] text-slate-400">Sistem Pemungutan Suara Digital</p>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse-slow" />
        Sistem Aktif
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 flex items-center justify-center p-4 sm:p-8">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="py-4 text-center text-xs text-slate-400 dark:text-slate-600">
      E-Vote &copy; {{ new Date().getFullYear() }} &mdash; Sistem Pemungutan Suara Digital yang Aman & Transparan
    </footer>
  </div>
</template>
