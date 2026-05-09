<template>
  <div class="card overflow-hidden">
    <!-- Table Header Slot -->
    <div v-if="$slots.header" class="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
      <slot name="header" />
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="p-4 space-y-3">
      <div v-for="i in skeletonRows" :key="i" class="flex gap-4">
        <div v-for="j in columns.length" :key="j" class="skeleton h-8 flex-1" :style="{ maxWidth: j === 1 ? '40px' : 'auto' }" />
      </div>
    </div>

    <!-- Table Content -->
    <div v-else-if="data && data.length > 0" class="overflow-x-auto">
      <table class="table-base">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" :class="col.class">{{ col.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in data" :key="row.id || idx">
            <slot :row="row" :index="idx" />
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
      </div>
      <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">{{ emptyTitle || 'Belum ada data' }}</p>
      <p class="text-xs text-slate-400 mt-1">{{ emptyDesc || 'Data akan muncul setelah ditambahkan' }}</p>
      <slot name="empty-action" />
    </div>

    <!-- Footer slot (pagination etc) -->
    <div v-if="$slots.footer && data && data.length > 0" class="px-5 py-3 border-t border-slate-100 dark:border-slate-800">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  loading: Boolean,
  skeletonRows: { type: Number, default: 5 },
  emptyTitle: String,
  emptyDesc: String,
})
</script>
