<template>
  <nav class="flex items-center gap-1.5 text-sm">
    <template v-for="(crumb, i) in items" :key="i">
      <router-link v-if="crumb.to && i < items.length - 1" :to="crumb.to" class="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        {{ crumb.label }}
      </router-link>
      <span v-else class="text-slate-700 dark:text-slate-300 font-medium">{{ crumb.label }}</span>
      <svg v-if="i < items.length - 1" class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] }
})
</script>
