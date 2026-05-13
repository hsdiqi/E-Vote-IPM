<template>
  <div class="space-y-5 animate-fade-in">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="page-title">Manajemen Kandidat</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Kelola kandidat untuk setiap pemilu
        </p>
      </div>
      <button class="btn-primary" @click="openCreate">
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Tambah Kandidat
      </button>
    </div>

    <!-- Filter -->
    <div class="card p-4 flex flex-wrap gap-3">
      <div
        class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
        Filter Pemilu:
      </div>
      <select
        v-model="filterPemilu"
        class="input-field max-w-xs py-1.5 text-sm"
      >
        <option value="">Semua Pemilu</option>
        <option v-for="p in pemiluList" :key="p.id" :value="p.id">
          {{ p.name }}
        </option>
      </select>
    </div>

    <!-- Grid view for candidates -->
    <div
      v-if="loading"
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div v-for="i in 6" :key="i" class="card p-4 space-y-3">
        <div class="skeleton w-16 h-16 rounded-full mx-auto" />
        <div class="skeleton h-4 rounded w-3/4 mx-auto" />
        <div class="skeleton h-3 rounded w-1/2 mx-auto" />
      </div>
    </div>

    <div
      v-else-if="filteredList.length === 0"
      class="card flex flex-col items-center justify-center py-16 text-center"
    >
      <div
        class="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4"
      >
        <svg
          class="w-8 h-8 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </div>
      <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Belum ada kandidat
      </p>
      <p class="text-xs text-slate-400 mt-1">
        Tambahkan kandidat untuk pemilu ini
      </p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="k in filteredList"
        :key="k.id"
        class="card p-5 text-center hover:shadow-soft-lg transition-shadow group"
      >
        <div class="relative inline-block mb-3">
          <img
            v-if="k.photo_url"
            :src="k.photo_url"
            class="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-slate-100 dark:ring-slate-700"
          />
          <div
            v-else
            class="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto ring-2 ring-slate-100 dark:ring-slate-700"
          >
            <span
              class="text-2xl font-display font-bold text-indigo-600 dark:text-indigo-400"
              >{{ k.name.charAt(0) }}</span
            >
          </div>
          <div
            class="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow"
          >
            {{ k.nomor_anggota || "#" }}
          </div>
        </div>
        <p
          class="font-display font-bold text-sm text-slate-900 dark:text-white"
        >
          {{ k.name }}
        </p>
        <p class="text-xs text-slate-400 mt-1">
          {{ getPemiluName(k.id_pemilu) }}
        </p>
        <div
          class="flex items-center justify-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button class="btn-secondary py-1 px-3 text-xs" @click="openEdit(k)">
            Edit
          </button>
          <button
            class="btn-danger py-1 px-3 text-xs"
            @click="confirmDelete(k)"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <BaseModal
      v-model="showModal"
      :title="editItem ? 'Edit Kandidat' : 'Tambah Kandidat'"
    >
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseSelect
          v-model="form.id_pemilu"
          label="Pemilu"
          id="k-pemilu"
          :options="pemiluOptions"
          placeholder="Pilih Pemilu"
          required
          :error="errors.id_pemilu"
        />
        <BaseInput
          v-model="form.name"
          label="Nama Kandidat"
          id="k-name"
          placeholder="Nama lengkap kandidat"
          required
          :error="errors.name"
        />
        <BaseInput
          v-model="form.photo_url"
          label="URL Foto"
          id="k-photo"
          placeholder="https://..."
          hint="Link gambar kandidat (opsional)"
        />
        <BaseInput
          v-model.number="form.nomor_anggota"
          label="Nomor Anggota"
          id="k-nomor"
          type="number"
          placeholder="Nomor urut kandidat"
        />
      </form>
      <template #footer>
        <button class="btn-secondary" @click="showModal = false">Batal</button>
        <button
          class="btn-primary"
          @click="handleSubmit"
          :disabled="submitting"
        >
          <span
            v-if="submitting"
            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          />
          {{ editItem ? "Simpan" : "Tambah" }}
        </button>
      </template>
    </BaseModal>

    <ConfirmDialog
      v-model="showDelete"
      title="Hapus Kandidat"
      :message="`Hapus kandidat '${deleteTarget?.name}'?`"
      confirm-text="Hapus"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import { kandidatService } from "@/services/kandidatService";
import { pemiluService } from "@/services/pemiluService";
import { useToastStore } from "@/stores/toast";

const toast = useToastStore();
const list = ref([]);
const pemiluList = ref([]);
const loading = ref(true);
const filterPemilu = ref("");
const showModal = ref(false);
const showDelete = ref(false);
const editItem = ref(null);
const deleteTarget = ref(null);
const submitting = ref(false);
const deleting = ref(false);
const errors = ref({});

const form = reactive({
  id_pemilu: "",
  name: "",
  photo_url: "",
  nomor_anggota: null,
});

const pemiluOptions = computed(() =>
  pemiluList.value.map((p) => ({ value: p.id, label: p.name })),
);
const filteredList = computed(() =>
  filterPemilu.value
    ? list.value.filter((k) => k.id_pemilu === filterPemilu.value)
    : list.value,
);
const getPemiluName = (id) =>
  pemiluList.value.find((p) => p.id === id)?.name || id;

const resetForm = () => {
  Object.assign(form, {
    id_pemilu: "",
    name: "",
    photo_url: "",
    nomor_anggota: null,
  });
  errors.value = {};
};

const openCreate = () => {
  editItem.value = null;
  resetForm();
  showModal.value = true;
};
const openEdit = (item) => {
  editItem.value = item;
  Object.assign(form, {
    id_pemilu: item.id_pemilu,
    name: item.name,
    photo_url: item.photo_url || "",
    nomor_anggota: item.nomor_anggota,
  });
  errors.value = {};
  showModal.value = true;
};
const confirmDelete = (item) => {
  deleteTarget.value = item;
  showDelete.value = true;
};

const handleSubmit = async () => {
  errors.value = {};
  if (!form.id_pemilu) {
    errors.value.id_pemilu = "Pemilu wajib dipilih";
    return;
  }
  if (!form.name.trim()) {
    errors.value.name = "Nama wajib diisi";
    return;
  }
  submitting.value = true;
  try {
    if (editItem.value) {
      const data = await kandidatService.update(editItem.value.id, {
        name: form.name || null,
        photo_url: form.photo_url || null,
        nomor_anggota: form.nomor_anggota,
      });
      const idx = list.value.findIndex((k) => k.id === editItem.value.id);
      if (idx > -1) list.value[idx] = data;
      toast.success("Kandidat berhasil diperbarui");
    } else {
      const { data } = await kandidatService.create({
        id_pemilu: form.id_pemilu,
        name: form.name,
        photo_url: form.photo_url || null,
        nomor_anggota: form.nomor_anggota,
      });
      list.value.unshift(data);
      toast.success("Kandidat berhasil ditambahkan");
    }
    showModal.value = false;
  } catch (err) {
    toast.error(err?.response?.data?.message || "Terjadi kesalahan");
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await kandidatService.delete(deleteTarget.value.id);
    list.value = list.value.filter((k) => k.id !== deleteTarget.value.id);
    toast.success("Kandidat berhasil dihapus");
    showDelete.value = false;
  } catch (err) {
    toast.error(err?.response?.data?.message || "Gagal menghapus");
  } finally {
    deleting.value = false;
  }
};

const fetchKandidat = async () => {
  try {
    const k = await kandidatService.getAll();
    list.value = k || [];
  } catch (err) {
    list.value = [];
    toast.error(err?.response?.data?.message || "Gagal mengambil kandidat");
  }
};

const fetchPemilu = async () => {
  try {
    const p = await pemiluService.getAll();
    pemiluList.value = p || [];
  } catch (err) {
    pemiluList.value = [];
    toast.error(err?.response?.data?.message || "Gagal mengambil pemilu");
  }
};

const fetchKandidatByPemilu = async () => {
  try{

  }catch(err) {
    return 
  }
}

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchKandidat(), fetchPemilu()]);
  loading.value = false;
});
</script>
