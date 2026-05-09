<template>
  <header class="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
    <!-- Page info -->
    <div>
      <h1 class="text-base font-display font-bold text-slate-900 dark:text-white leading-none">{{ title }}</h1>
      <Breadcrumb v-if="breadcrumbs?.length" :items="breadcrumbs" class="mt-1" />
    </div>

    <!-- Right section -->
    <div class="flex items-center gap-3">
      <!-- Notification bell (decorative) -->
      <button class="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
      </button>

      <!-- Admin profile -->
      <div class="flex items-center gap-2.5 pl-3 border-l border-slate-100 dark:border-slate-800">
        <div class="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
          {{ adminInitial }}
        </div>
        <div class="hidden sm:block">
          <p class="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-none">{{ auth.admin?.username }}</p>
          <p class="text-[10px] text-slate-400 mt-0.5 capitalize">{{ auth.admin?.role || 'Admin' }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

const props = defineProps({
  title: String,
  breadcrumbs: Array,
})

const auth = useAuthStore()
const adminInitial = computed(() => (auth.admin?.username || 'A').charAt(0).toUpperCase())
</script>
