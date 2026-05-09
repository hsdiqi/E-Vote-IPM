<template>
  <div class="w-full max-w-md mx-auto">
    <div class="card p-10 text-center animate-slide-up">
      <div class="relative inline-block mb-6">
        <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-10 h-10 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div class="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs">🎉</div>
      </div>
      <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Suara Berhasil Dikirim!</h2>
      <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
        Terima kasih telah berpartisipasi dalam pemilihan. Suara Anda telah tercatat dan akan dihitung dalam rekapitulasi.
      </p>
      <div class="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800 mb-6">
        <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">✓ Suara Anda telah tersimpan dengan aman</p>
      </div>
      <router-link to="/vote" class="btn-secondary w-full justify-center">Kembali ke Halaman Voting</router-link>
    </div>
  </div>
</template>
