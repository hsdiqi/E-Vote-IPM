<template>
  <div class="w-full max-w-2xl mx-auto space-y-6">
    <div v-if="loading" class="space-y-4">
      <div class="skeleton h-8 w-64 rounded-xl mx-auto" />
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i" class="skeleton h-48 rounded-2xl" />
      </div>
    </div>
    <div v-else-if="!session" class="card p-8 text-center">
      <p class="text-slate-600 dark:text-slate-400">Sesi voting tidak ditemukan.</p>
      <router-link to="/vote" class="btn-primary mt-4 inline-flex">Kembali</router-link>
    </div>
    <template v-else>
      <div class="card p-6 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-3">
          <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse-slow" />
          <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Sesi Voting Aktif</span>
        </div>
        <h2 class="text-xl font-display font-bold text-slate-900 dark:text-white">{{ pemiluInfo?.name }}</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
          Pilih <strong class="text-indigo-600 dark:text-indigo-400">{{ pemiluInfo?.max_choices }}</strong> kandidat pilihanmu
        </p>
        <div class="mt-3 flex items-center justify-center gap-2">
          <span class="text-xs text-slate-400">Terpilih: </span>
          <span class="font-display font-bold text-indigo-600 dark:text-indigo-400">{{ selected.length }}</span>
          <span class="text-xs text-slate-400">/ {{ pemiluInfo?.max_choices }}</span>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <button
          v-for="k in kandidats" :key="k.id"
          @click="toggleSelect(k.id)"
          class="card p-5 text-center transition-all duration-200 hover:shadow-soft-lg relative overflow-hidden"
          :class="isSelected(k.id) ? 'ring-2 ring-indigo-500 shadow-glow bg-indigo-50/50 dark:bg-indigo-900/10' : 'hover:border-indigo-200'"
          :disabled="!isSelected(k.id) && selected.length >= (pemiluInfo?.max_choices || 1)"
        >
          <div v-if="isSelected(k.id)" class="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow">
            <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
          </div>
          <div class="relative inline-block mb-4">
            <img v-if="k.photo_url" :src="k.photo_url" class="w-20 h-20 rounded-full object-cover mx-auto ring-4" :class="isSelected(k.id) ? 'ring-indigo-300' : 'ring-slate-100 dark:ring-slate-700'" />
            <div v-else class="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mx-auto ring-4" :class="isSelected(k.id) ? 'ring-indigo-300' : 'ring-slate-100 dark:ring-slate-700'">
              <span class="text-3xl font-display font-bold text-white">{{ k.name.charAt(0) }}</span>
            </div>
            <div class="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-display font-bold shadow-md">{{ k.nomor_anggota }}</div>
          </div>
          <p class="font-display font-bold text-slate-900 dark:text-white">{{ k.name }}</p>
          <p class="text-xs text-slate-400 mt-1">No. {{ k.nomor_anggota }}</p>
        </button>
      </div>
      <div class="card p-5">
        <div v-if="selected.length > 0" class="flex flex-wrap items-center gap-2 mb-4">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Dipilih:</span>
          <span v-for="id in selected" :key="id" class="badge-info">{{ getKandidatName(id) }}</span>
        </div>
        <button @click="handleSubmit" :disabled="selected.length === 0 || submitting" class="btn-primary w-full justify-center py-3 text-base">
          <span v-if="submitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ submitting ? 'Mengirim Suara...' : 'Kirim Suara' }}
        </button>
        <p class="text-xs text-slate-400 text-center mt-3">Pastikan pilihanmu sudah benar sebelum mengirim.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { votingService } from '@/services/votingService'
import { kandidatService } from '@/services/kandidatService'
import { pemiluService } from '@/services/pemiluService'

const router = useRouter()
const session = ref(null)
const kandidats = ref([])
const pemiluInfo = ref(null)
const selected = ref([])
const loading = ref(true)
const submitting = ref(false)

const isSelected = (id) => selected.value.includes(id)
const getKandidatName = (id) => kandidats.value.find(k => k.id === id)?.name || id
const toggleSelect = (id) => {
  if (isSelected(id)) { selected.value = selected.value.filter(s => s !== id) }
  else if (selected.value.length < (pemiluInfo.value?.max_choices || 1)) { selected.value.push(id) }
}
const handleSubmit = async () => {
  if (!session.value || selected.value.length === 0) return
  submitting.value = true
  try {
    await votingService.submitVote({ token: session.value.token, id_pemilu: session.value.id_pemilu, kandidat_ids: selected.value })
    sessionStorage.removeItem('voteSession')
    router.push('/vote/success')
  } catch (err) { alert(err?.response?.data?.message || 'Gagal mengirim suara') }
  finally { submitting.value = false }
}
onMounted(async () => {
  const raw = sessionStorage.getItem('voteSession')
  if (!raw) { loading.value = false; return }
  session.value = JSON.parse(raw)
  const [k, p] = await Promise.all([kandidatService.getAll(session.value.id_pemilu), pemiluService.getById(session.value.id_pemilu)])
  kandidats.value = k.data; pemiluInfo.value = p.data; loading.value = false
})
</script>
