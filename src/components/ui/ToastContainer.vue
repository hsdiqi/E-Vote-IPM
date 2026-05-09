<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
    <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-soft-lg border text-sm font-medium backdrop-blur-sm"
        :class="toastClass(toast.type)"
      >
        <span class="text-base leading-none mt-0.5 flex-shrink-0">{{ toastIcon(toast.type) }}</span>
        <span class="flex-1">{{ toast.message }}</span>
        <button @click="toastStore.remove(toast.id)" class="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toast'
const toastStore = useToastStore()

const toastClass = (type) => ({
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/80 dark:border-emerald-700 dark:text-emerald-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/80 dark:border-red-700 dark:text-red-200',
  warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/80 dark:border-amber-700 dark:text-amber-200',
  info: 'bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/80 dark:border-indigo-700 dark:text-indigo-200',
}[type] || 'bg-white border-slate-200 text-slate-800')

const toastIcon = (type) => ({ success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }[type] || 'ℹ')
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from { opacity: 0; transform: translateX(100%) scale(0.9); }
.toast-leave-to { opacity: 0; transform: translateX(50%) scale(0.9); }
</style>
