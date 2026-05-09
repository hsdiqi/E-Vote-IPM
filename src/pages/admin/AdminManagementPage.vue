<template>
  <div class="space-y-5 animate-fade-in">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="page-title">Manajemen Admin</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Kelola akun administrator sistem</p>
      </div>
      <button class="btn-primary" @click="openCreate">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        Tambah Admin
      </button>
    </div>

    <BaseTable :columns="columns" :data="list" :loading="loading">
      <template #default="{ row }">
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm flex-shrink-0">
              {{ row.username.charAt(0).toUpperCase() }}
            </div>
            <span class="font-semibold text-slate-800 dark:text-slate-200 text-sm">{{ row.username }}</span>
          </div>
        </td>
        <td class="px-4 py-3">
          <span :class="row.role === 'superadmin' ? 'badge-info' : 'badge-neutral'" class="capitalize">
            {{ row.role || 'operator' }}
          </span>
        </td>
        <td class="px-4 py-3 text-xs text-slate-400">{{ formatDate(row.created_at) }}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-1.5">
            <button class="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-600 transition-colors" @click="openEdit(row)">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg>
            </button>
            <button class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-colors" @click="confirmDelete(row)">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
            </button>
          </div>
        </td>
      </template>
    </BaseTable>

    <BaseModal v-model="showModal" :title="editItem ? 'Edit Admin' : 'Tambah Admin'" size="sm">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseInput v-if="!editItem" v-model="form.username" label="Username" id="a-username" required :error="errors.username" />
        <BaseInput v-model="form.password" label="Password" id="a-password" type="password" :placeholder="editItem ? 'Kosongkan jika tidak ingin diubah' : ''" :required="!editItem" />
        <BaseSelect v-model="form.role" label="Role" id="a-role" :options="roleOptions" placeholder="Pilih role" />
      </form>
      <template #footer>
        <button class="btn-secondary" @click="showModal = false">Batal</button>
        <button class="btn-primary" @click="handleSubmit" :disabled="submitting">
          <span v-if="submitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {{ editItem ? 'Simpan' : 'Tambah' }}
        </button>
      </template>
    </BaseModal>

    <ConfirmDialog v-model="showDelete" title="Hapus Admin" :message="`Hapus admin '${deleteTarget?.username}'?`" confirm-text="Hapus" :loading="deleting" @confirm="handleDelete" />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { adminService } from '@/services/adminService'
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
const form = reactive({ username: '', password: '', role: 'operator' })
const columns = [
  { key: 'username', label: 'Username' },
  { key: 'role', label: 'Role' },
  { key: 'created_at', label: 'Dibuat' },
  { key: 'actions', label: 'Aksi', class: 'w-20' },
]
const roleOptions = [
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'operator', label: 'Operator' },
]

const resetForm = () => { Object.assign(form, { username: '', password: '', role: 'operator' }); errors.value = {} }
const openCreate = () => { editItem.value = null; resetForm(); showModal.value = true }
const openEdit = (item) => { editItem.value = item; Object.assign(form, { username: item.username, password: '', role: item.role || 'operator' }); errors.value = {}; showModal.value = true }
const confirmDelete = (item) => { deleteTarget.value = item; showDelete.value = true }

const handleSubmit = async () => {
  errors.value = {}
  if (!editItem.value && !form.username.trim()) { errors.value.username = 'Wajib diisi'; return }
  submitting.value = true
  try {
    if (editItem.value) {
      const payload = { role: form.role || null }
      if (form.password) payload.password = form.password
      const { data } = await adminService.update(editItem.value.id, payload)
      const idx = list.value.findIndex(a => a.id === editItem.value.id)
      if (idx > -1) list.value[idx] = data
      toast.success('Admin berhasil diperbarui')
    } else {
      const { data } = await adminService.create({ username: form.username, password: form.password, role: form.role || null })
      list.value.unshift(data)
      toast.success('Admin berhasil ditambahkan')
    }
    showModal.value = false
  } catch (err) { toast.error(err?.response?.data?.message || 'Terjadi kesalahan') }
  finally { submitting.value = false }
}

const handleDelete = async () => {
  deleting.value = true
  try {
    await adminService.delete(deleteTarget.value.id)
    list.value = list.value.filter(a => a.id !== deleteTarget.value.id)
    toast.success('Admin berhasil dihapus'); showDelete.value = false
  } catch (err) { toast.error('Gagal menghapus') }
  finally { deleting.value = false }
}

onMounted(async () => {
  const { data } = await adminService.getAll(); list.value = data; loading.value = false
})
</script>
