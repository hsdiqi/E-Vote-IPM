<template>
  <div class="space-y-5 animate-fade-in">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="page-title">Manajemen Pemilih</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Kelola daftar pemilih dan token akses
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
        Tambah Pemilih
      </button>
    </div>

    <!-- Filter -->
    <div class="card p-4 flex flex-wrap gap-3 items-center">
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
        Filter:
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
      <div class="relative ml-auto">
        <svg
          class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          v-model="searchQ"
          placeholder="Cari pemilih..."
          class="input-field pl-9 py-1.5 text-sm w-56"
        />
      </div>
    </div>

    <BaseTable
      :columns="columns"
      :data="filteredList"
      :loading="loading"
      empty-title="Belum ada pemilih"
      empty-desc="Tambahkan pemilih untuk mulai voting"
    >
      <template #default="{ row }">
        <td class="px-4 py-3">
          <div class="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            {{ row.name }}
          </div>
          <div class="text-xs text-slate-400">
            No. {{ row.nomor_anggota || "-" }}
          </div>
        </td>
        <td class="px-4 py-3 text-xs text-slate-500">
          {{ getPemiluName(row.id_pemilu) }}
        </td>
        <td class="px-4 py-3">
          <span :class="row.is_used ? 'badge-success' : 'badge-warning'">
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="row.is_used ? 'bg-emerald-500' : 'bg-amber-400'"
            />
            {{ row.is_used ? "Sudah Voting" : "Belum Voting" }}
          </span>
        </td>
        <td class="px-4 py-3 text-xs text-slate-400">
          {{ formatDate(row.expired_at) }}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-1">
            <button
              class="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-600 transition-colors"
              @click="openGenerateToken(row)"
              title="Generate Token"
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
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </button>
            <button
              class="p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-400 hover:text-indigo-600 transition-colors"
              @click="openEdit(row)"
              title="Edit"
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-colors"
              @click="confirmDelete(row)"
              title="Hapus"
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </td>
      </template>
    </BaseTable>

    <!-- Create/Edit Modal -->
    <BaseModal
      v-model="showModal"
      :title="editItem ? 'Edit Pemilih' : 'Tambah Pemilih'"
    >
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <BaseSelect
          v-model="form.id_pemilu"
          label="Pemilu"
          id="pm-pemilu"
          :options="pemiluOptions"
          placeholder="Pilih Pemilu"
          required
          :error="errors.id_pemilu"
        />
        <BaseInput
          v-model="form.name"
          label="Nama Pemilih"
          id="pm-name"
          placeholder="Nama lengkap"
          required
          :error="errors.name"
        />
        <BaseInput
          v-model.number="form.nomor_anggota"
          label="Nomor Anggota (opsional)"
          id="pm-nomor"
          type="number"
        />
        <BaseInput
          v-model="form.expired_at"
          label="Kadaluarsa Token (opsional)"
          id="pm-expired"
          type="datetime-local"
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
          {{ editItem ? "Simpan" : "Tambah & Generate Token" }}
        </button>
      </template>
    </BaseModal>

    <!-- Token Result Modal -->
    <BaseModal v-model="showToken" title="Token Voting" size="sm">
      <div v-if="tokenResult" class="text-center space-y-4">
        <!-- Icon sukses -->
        <div
          class="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto"
        >
          <svg
            class="w-6 h-6 text-emerald-600 dark:text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Nama -->
        <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {{ tokenResult.name }}
        </p>

        <!-- QR CODE -->
        <div v-if="tokenResult.qrcode" class="flex justify-center">
          <img
            :src="`data:image/png;base64,${tokenResult.qrcode}`"
            alt="QR Code Token"
            class="w-52 h-52 rounded-xl border border-slate-200 dark:border-slate-700 bg-white p-2"
          />
        </div>

        <!-- Token -->
        <div
          class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 font-mono text-sm text-indigo-600 dark:text-indigo-400 font-bold tracking-widest break-all"
        >
          {{ tokenResult.token }}
        </div>

        <!-- Button copy -->
        <button
          @click="copyToken"
          class="btn-secondary mt-2 w-full text-xs py-2"
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
          Salin Token
        </button>
        <!-- Button download qr code -->
        <button
          @click="downloadQr(tokenResult.qrcode, tokenResult.token)"
          class="btn-secondary w-full text-xs py-2 flex items-center justify-center gap-2"
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
              d="M12 3v12m0 0l3-3m-3 3l-3-3M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            />
          </svg>
          Download QR Code
        </button>

        <p class="text-xs text-slate-400">
          Simpan token ini dan bagikan kepada pemilih yang bersangkutan
        </p>
      </div>
    </BaseModal>

    <ConfirmDialog
      v-model="showDelete"
      title="Hapus Pemilih"
      :message="`Hapus pemilih '${deleteTarget?.name}'?`"
      confirm-text="Hapus"
      :loading="deleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import { pemilihService } from "@/services/pemilihService";
import { pemiluService } from "@/services/pemiluService";
import { useToastStore } from "@/stores/toast";
import { formatDate } from "@/utils/helpers";
// import { data } from "autoprefixer";

const toast = useToastStore();
const list = ref([]);
const pemiluList = ref([]);
const loading = ref(true);
const filterPemilu = ref("");
const searchQ = ref("");
const showModal = ref(false);
const showToken = ref(false);
const showDelete = ref(false);
const editItem = ref(null);
const deleteTarget = ref(null);
const tokenResult = ref(null);
const submitting = ref(false);
const deleting = ref(false);
const errors = ref({});

const form = reactive({
  id_pemilu: "",
  name: "",
  nomor_anggota: null,
  expired_at: "",
});
const columns = [
  { key: "name", label: "Pemilih" },
  { key: "pemilu", label: "Pemilu" },
  { key: "status", label: "Status" },
  { key: "expired", label: "Kadaluarsa" },
  { key: "actions", label: "Aksi", class: "w-28" },
];

const pemiluOptions = computed(() =>
  pemiluList.value.map((p) => ({ value: p.id, label: p.name })),
);
const filteredList = computed(() => {
  let items = filterPemilu.value
    ? list.value.filter((p) => p.id_pemilu === filterPemilu.value)
    : list.value;
  if (searchQ.value)
    items = items.filter((p) =>
      p.name.toLowerCase().includes(searchQ.value.toLowerCase()),
    );
  return items;
});
const getPemiluName = (id) =>
  pemiluList.value.find((p) => p.id === id)?.name || id;

const resetForm = () => {
  Object.assign(form, {
    id_pemilu: "",
    name: "",
    nomor_anggota: null,
    expired_at: "",
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
    nomor_anggota: item.nomor_anggota,
    expired_at: item.expired_at ? item.expired_at.slice(0, 16) : "",
  });
  errors.value = {};
  showModal.value = true;
};
const confirmDelete = (item) => {
  deleteTarget.value = item;
  showDelete.value = true;
};

// const openGenerateToken = async (item) => {
//   try {
//     const { data } = await pemilihService.generateToken(item.id);
//     tokenResult.value = { name: item.name, token: data.token };
//     showToken.value = true;
//   } catch (err) {
//     toast.error("Gagal generate token");
//   }
// };

const copyToken = () => {
  navigator.clipboard.writeText(tokenResult.value.token);
  toast.success("Token disalin!");
};

const handleSubmit = async () => {
  errors.value = {};
  if (!form.id_pemilu) {
    errors.value.id_pemilu = "Wajib dipilih";
    return;
  }
  if (!form.name.trim()) {
    errors.value.name = "Wajib diisi";
    return;
  }
  submitting.value = true;

  try {
    if (editItem.value) {
      const { data } = await pemilihService.update(editItem.value.id, {
        name: form.name || null,
        nomor_anggota: form.nomor_anggota,
        expired_at: toRFC3339(form.expired_at) || null,
      });
      const idx = list.value.findIndex((p) => p.id === editItem.value.id);
      if (idx > -1) list.value[idx] = data;
      toast.success("Pemilih berhasil diperbarui");
      showModal.value = false;
    } else {
      const payload = {
        id_pemilu: form.id_pemilu,
        name: form.name,
        nomor_anggota: form.nomor_anggota || null,
        // expired_at: expired_at? toRFC3339(form.expired_at) : null,
      }
      const data  = await pemilihService.create(payload);
      console.log("file vue response: ", data)
      await fetchPemilih();
      tokenResult.value = {
        name: data.name,
        token: data.token,
        qrcode: data.qrcode,
      };
      showModal.value = false;
      showToken.value = true;
      toast.success("Pemilih berhasil ditambahkan");
    }
  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.message || "Terjadi kesalahan");
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await pemilihService.delete(deleteTarget.value.id);
    list.value = list.value.filter((p) => p.id !== deleteTarget.value.id);
    toast.success("Pemilih berhasil dihapus");
    showDelete.value = false;
  } catch (err) {
    toast.error("Gagal menghapus");
  } finally {
    deleting.value = false;
  }
};

const fetchPemilih = async () => {
  try {
    const pm = await pemilihService.getAll();
    list.value = pm || [];
  } catch (err) {
    list.value = [];
    toast.error(err?.response?.data?.message || "Gagal mengambil data pemilih");
  }
};

const fetchPemilu = async () => {
  try {
    const p = await pemiluService.getAll();
    pemiluList.value = p || [];
  } catch (err) {
    pemiluList.value = [];
    toast.error(err?.response?.data?.message || "Gagal mengambil data pemilu");
  }
};

const toRFC3339 = (val) => {
  if (!val) return null;
  return new Date(val).toISOString();
};

// function downloadQr(qrBase64, token) {
//   const img = new Image();
//   img.src = `data:image/png;base64,${qrBase64}`;

//   img.onload = () => {
//     const padding = 20;
//     const textHeight = 60;
//     const width = img.width + padding * 2;
//     const height = img.height + padding * 2 + textHeight;

//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;

//     const ctx = canvas.getContext("2d");

//     // background putih
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, width, height);

//     // draw QR
//     ctx.drawImage(img, padding, padding);

//     // draw token text
//     ctx.fillStyle = "black";
//     ctx.font = "12px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText(token, width / 2, img.height + padding + 40);

//     // export jadi PNG
//     const link = document.createElement("a");
//     link.download = `qrcode-${token}.png`;
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   };
// }

const downloadQr = () => {
  if (!tokenResult.value?.qrcode || !tokenResult.value?.token) {
    toast.error("QR Code atau token tidak tersedia");
    return;
  }

  const qrBase64 = tokenResult.value.qrcode;
  const token = tokenResult.value.token;

  const img = new Image();
  img.src = `data:image/png;base64,${qrBase64}`;

  img.onload = () => {
    const padding = 20;
    const gap = 20;
    const fontSize = 18;
    const lineHeight = 24;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // set font dulu biar bisa measure text
    ctx.font = `${fontSize}px Arial`;

    // maksimal lebar area teks
    const minWidth = img.width + padding * 2;
    const maxTextWidth = Math.max(minWidth - padding * 2, 260);

    // fungsi wrap text
    const wrapText = (text, maxWidth) => {
      const words = text.split(/([_-])/); // biar token bisa pecah di "_" atau "-"
      const lines = [];
      let currentLine = "";

      for (const part of words) {
        const testLine = currentLine + part;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = part;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) lines.push(currentLine);
      return lines;
    };

    const lines = wrapText(token, 260);

    // cari lebar teks terpanjang
    const longestLineWidth = Math.max(
      ...lines.map((line) => ctx.measureText(line).width),
      0,
    );

    // canvas width = paling besar antara QR atau teks
    const width = Math.max(
      img.width + padding * 2,
      Math.ceil(longestLineWidth) + padding * 2,
    );

    const textBlockHeight = lines.length * lineHeight;
    const height = padding + img.height + gap + textBlockHeight + padding;

    canvas.width = width;
    canvas.height = height;

    // background putih
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // gambar QR di tengah
    const qrX = (width - img.width) / 2;
    const qrY = padding;
    ctx.drawImage(img, qrX, qrY);

    // teks token
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    let textY = qrY + img.height + gap;
    for (const line of lines) {
      ctx.fillText(line, width / 2, textY);
      textY += lineHeight;
    }

    // download
    const link = document.createElement("a");
    link.download = `qrcode-${token}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  img.onerror = () => {
    toast.error("Gagal memuat QR Code");
  };
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchPemilih(), fetchPemilu()]);
  loading.value = false;
});
</script>
