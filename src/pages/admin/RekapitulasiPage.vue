<template>
  <div class="space-y-5 animate-fade-in">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="page-title">Rekapitulasi Voting</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Hasil penghitungan suara secara real-time</p>
      </div>
    </div>

    <!-- Select pemilu -->
    <div class="card p-4">
      <BaseSelect v-model="selectedPemilu" label="" id="rekap-pemilu" :options="pemiluOptions" placeholder="Pilih Pemilu untuk melihat hasil..." />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid sm:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="card p-5 space-y-3">
        <div class="skeleton h-4 w-24 rounded" />
        <div class="skeleton h-8 w-16 rounded" />
      </div>
    </div>

    <!-- Results -->
    <template v-if="rekap && !loading">
      <!-- Summary Stats -->
      <div class="grid grid-cols-3 gap-4">
        <div class="card p-5 text-center">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Suara Masuk</p>
          <p class="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">{{ rekap.total_suara }}</p>
        </div>
        <div class="card p-5 text-center">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Pemilih</p>
          <p class="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">{{ rekap.total_pemilih }}</p>
        </div>
        <div class="card p-5 text-center">
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Partisipasi</p>
          <p class="text-3xl font-display font-bold mt-2" :class="partisipasi >= 75 ? 'text-emerald-600 dark:text-emerald-400' : partisipasi >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'">
            {{ partisipasi }}%
          </p>
        </div>
      </div>

      <!-- Candidates results -->
      <div class="card">
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 class="font-display font-bold text-slate-900 dark:text-white">Hasil Per Kandidat</h3>
          <p class="text-xs text-slate-400 mt-0.5">{{ rekap.pemilu_name }}</p>
        </div>
        <div class="p-5 space-y-4">
          <div v-for="(k, i) in rekap.data_kandidat" :key="k.id_kandidat" class="flex items-center gap-4">
            <!-- Rank -->
            <div class="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-display font-bold"
              :class="i === 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'">
              {{ i + 1 }}
            </div>
            <!-- Photo -->
            <img v-if="k.photo_url" :src="k.photo_url" class="w-10 h-10 rounded-xl object-cover flex-shrink-0 ring-2 ring-slate-100 dark:ring-slate-700" />
            <div v-else class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold flex-shrink-0">
              {{ k.name.charAt(0) }}
            </div>
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1.5">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ k.name }}</span>
                  <span v-if="i === 0" class="badge-warning text-[10px]">👑 Terdepan</span>
                </div>
                <div class="text-right flex-shrink-0">
                  <span class="text-sm font-display font-bold text-slate-900 dark:text-white">{{ k.total_suara }}</span>
                  <span class="text-xs text-slate-400 ml-1">suara</span>
                  <span class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold ml-2">({{ k.persentase }})</span>
                </div>
              </div>
              <!-- Progress bar -->
              <div class="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="i === 0 ? 'bg-indigo-500' : 'bg-slate-400 dark:bg-slate-500'"
                  :style="{ width: k.persentase }"
                />
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div v-if="rekap.data_kandidat.length === 0" class="text-center py-8 text-slate-400 text-sm">
            Belum ada suara masuk
          </div>
        </div>
      </div>
    </template>

    <!-- No pemilu selected -->
    <div v-if="!selectedPemilu && !loading" class="card flex flex-col items-center justify-center py-20 text-center">
      <div class="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
      </div>
      <p class="font-display font-bold text-slate-700 dark:text-slate-300">Pilih Pemilu</p>
      <p class="text-sm text-slate-400 mt-1">Pilih pemilu di atas untuk melihat hasil rekapitulasi</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import { pemiluService } from '@/services/pemiluService'
import { rekapService } from '@/services/votingService'

const pemiluList = ref([])
const selectedPemilu = ref('')
const rekap = ref(null)
const loading = ref(false)

const pemiluOptions = computed(() => pemiluList.value.map(p => ({ value: p.id, label: p.name })))
const partisipasi = computed(() => {
  if (!rekap.value || !rekap.value.total_pemilih) return 0
  return Math.round((rekap.value.total_suara / rekap.value.total_pemilih) * 100)
})

watch(selectedPemilu, async (id) => {
  if (!id) { rekap.value = null; return }
  loading.value = true
  try {
    const { data } = await rekapService.getRekap(id)
    rekap.value = data
  } catch { rekap.value = null }
  finally { loading.value = false }
})

onMounted(async () => {
  const { data } = await pemiluService.getAll()
  pemiluList.value = data
  if (data.length > 0) selectedPemilu.value = data[0].id
})
</script>
