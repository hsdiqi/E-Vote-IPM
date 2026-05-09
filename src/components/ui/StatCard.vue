<template>
  <div class="card p-5 flex items-start gap-4">
    <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" :class="iconBg">
      <slot name="icon" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{{ label }}</p>
      <div v-if="loading" class="skeleton h-7 w-16 mt-1 rounded-lg" />
      <p v-else class="text-2xl font-display font-bold text-slate-900 dark:text-white mt-0.5">{{ value }}</p>
      <p v-if="desc" class="text-xs text-slate-400 mt-0.5 truncate">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  desc: String,
  loading: Boolean,
  iconBg: { type: String, default: 'bg-indigo-50 dark:bg-indigo-900/30' }
})
</script>
