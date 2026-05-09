<template>
  <div class="space-y-5 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="page-title">Manajemen Pemilu</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Kelola data pemilihan umum</p>
      </div>
      <button class="btn-primary" @click="openCreate">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Tambah Pemilu
      </button>
    </div>

    <!-- Table -->
    <BaseTable :columns="columns" :data="list" :loading="loading" empty-title="Belum ada pemilu" empty-desc="Klik tombol Tambah Pemilu untuk memulai">
      <template #default="{ row }">
        <td class="px-4 py-3">
          <div class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ row.name }}</div>
          <div class="text-xs text-slate-400 font-mono mt-0.5">{{ row.prefix }}</div>
        </td>
        <td class="px-4 py-3">
          <span :class="row.is_active ? 'badge-success' : 'badge-neutral'">
            <span class="w-1.5 h-1.5 rounded-full" :class="row.is_active ? 'bg-emerald-500' : 'bg-slate-400'" />
            {{ row.is_active ? 'Aktif' : 'Nonaktif' }}
          </span>
        </td>
        <td class="px-4 py-3 text-xs text-slate-500">
          <div>{{ formatDate(row.start_time) }}</div>
          <div class="text-slate-400">s/d {{ formatDate(row.end_time) }}</div>
        </td>
        <td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{{ row.max_choices }}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-1.5">
            <button class="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-600 transition-colors" @click="openEdit(row)" title="Edit">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/></svg>
            </button>
            <button class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-colors" @click="confirmDelete(row)" title="Hapus">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
            </button>
          </div>
        </td>
      </template>
    </BaseTable>

    <!-- Create/Edit Modal -->
    <BaseModal v-model="showModal" :title="editItem ? 'Edit Pemilu' : 'Tambah Pemilu'" size="md">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput v-model="form.name" label="Nama Pemilu" id="pemilu-name" placeholder="contoh: Pemilihan Ketua BEM 2025" required :error="errors.name" />
        <BaseInput v-if="!editItem" v-model="form.prefix" label="Prefix" id="pemilu-prefix" placeholder="contoh: BEM2025" required :error="errors.prefix" hint="Prefix unik untuk identifikasi pemilu" />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="form.start_time" label="Waktu Mulai" id="start-time" type="datetime-local" />
          <BaseInput v-model="form.end_time" label="Waktu Selesai" id="end-time" type="datetime-local" />
        </div>
        <BaseInput v-model.number="form.max_choices" label="Maksimal Pilihan" id="max-choices" type="number" min="1" required />
        <div v-if="editItem" class="flex items-center gap-3">
          <button type="button" @click="form.is_active = !form.is_active" class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0" :class="form.is_active ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'">
            <div class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform" :class="form.is_active ? 'translate-x-6' : 'translate-x-1'" />
          </button>
          <span class="text-sm text-slate-700 dark:text-slate-300 font-medium">{{ form.is_active ? 'Pemilu Aktif' : 'Pemilu Nonaktif' }}</span>
        </div>
      </form>
      <template #footer>
        <button class="btn-secondary" @click="showModal = false">Batal</button>
        <button class="btn-primary" @click="handleSubmit" :disabled="submitting">
          <span v-if="submitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {{ editItem ? 'Simpan Perubahan' : 'Tambah Pemilu' }}
        </button>
      </template>
    </BaseModal>

    <!-- Confirm Delete -->
    <ConfirmDialog
      v-model="showDelete"
      title="Hapus Pemilu"
      :message="`Apakah kamu yakin ingin menghapus pemilu '${deleteTarget?.name}'? Tindakan ini tidak dapat dibatalkan.`"
      confirm-text="Hapus"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { pemiluService } from '@/services/pemiluService'
import { useToastStore } from '@/stores/toast'
import { formatDate } from '@/utils/helpers'

const toast = useToastStore()
const list = ref([])
const loading = ref(true)
const showModal = ref(false)
const showDelete = ref(false)
const editItem = ref(null)
const deleteTarget = ref(null)
const submitting = ref(false)
const deleting = ref(false)
const errors = ref({})

const form = reactive({
  name: '', prefix: '', start_time: '', end_time: '',
  max_choices: 1, is_active: false
})

const columns = [
  { key: 'name', label: 'Nama Pemilu' },
  { key: 'is_active', label: 'Status' },
  { key: 'time', label: 'Waktu' },
  { key: 'max_choices', label: 'Max Pilihan' },
  { key: 'actions', label: 'Aksi', class: 'w-24' },
]

const resetForm = () => {
  Object.assign(form, { name: '', prefix: '', start_time: '', end_time: '', max_choices: 1, is_active: false })
  errors.value = {}
}

const openCreate = () => {
  editItem.value = null
  resetForm()
  showModal.value = true
}

const openEdit = (item) => {
  editItem.value = item
  Object.assign(form, {
    name: item.name, prefix: item.prefix,
    start_time: item.start_time ? item.start_time.slice(0, 16) : '',
    end_time: item.end_time ? item.end_time.slice(0, 16) : '',
    max_choices: item.max_choices, is_active: item.is_active
  })
  errors.value = {}
  showModal.value = true
}

const confirmDelete = (item) => {
  deleteTarget.value = item
  showDelete.value = true
}

const handleSubmit = async () => {
  errors.value = {}
  if (!form.name.trim()) { errors.value.name = 'Nama wajib diisi'; return }
  if (!editItem.value && !form.prefix.trim()) { errors.value.prefix = 'Prefix wajib diisi'; return }
  submitting.value = true
  try {
    if (editItem.value) {
      const { data } = await pemiluService.update(editItem.value.id, {
        name: form.name || null, start_time: form.start_time || null,
        end_time: form.end_time || null, is_active: form.is_active, max_choices: form.max_choices
      })
      const idx = list.value.findIndex(p => p.id === editItem.value.id)
      if (idx > -1) list.value[idx] = data
      toast.success('Pemilu berhasil diperbarui')
    } else {
      const { data } = await pemiluService.create({
        name: form.name, prefix: form.prefix,
        start_time: form.start_time || null, end_time: form.end_time || null,
        max_choices: form.max_choices
      })
      list.value.unshift(data)
      toast.success('Pemilu berhasil ditambahkan')
    }
    showModal.value = false
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
  } finally {
    submitting.value = false
  }
}

const handleDelete = async () => {
  deleting.value = true
  try {
    await pemiluService.delete(deleteTarget.value.id)
    list.value = list.value.filter(p => p.id !== deleteTarget.value.id)
    toast.success('Pemilu berhasil dihapus')
    showDelete.value = false
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Gagal menghapus')
  } finally {
    deleting.value = false
  }
}

onMounted(async () => {
  const { data } = await pemiluService.getAll()
  list.value = data
  loading.value = false
})
</script>
