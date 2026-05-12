<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Pemilu"
        :value="stats.totalPemilu"
        desc="Pemilu terdaftar"
        :loading="loading"
      >
        <template #icon>
          <svg
            class="w-5 h-5 text-indigo-600 dark:text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </template>
      </StatCard>
      <StatCard
        label="Pemilu Aktif"
        :value="stats.aktivPemilu"
        desc="Sedang berlangsung"
        :loading="loading"
        icon-bg="bg-emerald-50 dark:bg-emerald-900/30"
      >
        <template #icon>
          <svg
            class="w-5 h-5 text-emerald-600 dark:text-emerald-400"
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
        </template>
      </StatCard>
      <StatCard
        label="Total Kandidat"
        :value="stats.totalKandidat"
        desc="Di semua pemilu"
        :loading="loading"
        icon-bg="bg-sky-50 dark:bg-sky-900/30"
      >
        <template #icon>
          <svg
            class="w-5 h-5 text-sky-600 dark:text-sky-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
        </template>
      </StatCard>
      <StatCard
        label="Total Pemilih"
        :value="stats.totalPemilih"
        desc="Terdaftar di sistem"
        :loading="loading"
        icon-bg="bg-amber-50 dark:bg-amber-900/30"
      >
        <template #icon>
          <svg
            class="w-5 h-5 text-amber-600 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        </template>
      </StatCard>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Recent Pemilu -->
      <div class="card">
        <div
          class="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between"
        >
          <h3
            class="font-display font-bold text-slate-900 dark:text-white text-sm"
          >
            Pemilu Terbaru
          </h3>
          <router-link
            to="/admin/pemilu"
            class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >Lihat Semua</router-link
          >
        </div>
        <div v-if="loading" class="p-4 space-y-3">
          <div v-for="i in 3" :key="i" class="flex gap-3">
            <div class="skeleton h-10 w-10 rounded-xl flex-shrink-0" />
            <div class="flex-1 space-y-2">
              <div class="skeleton h-4 rounded w-3/4" />
              <div class="skeleton h-3 rounded w-1/2" />
            </div>
          </div>
        </div>
        <div v-else class="divide-y divide-slate-50 dark:divide-slate-800/50">
          <!-- EMPTY STATE -->
          <div
            v-if="!Array.isArray(pemiluList)"
            class="px-6 py-10 flex flex-col items-center justify-center text-center gap-3"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
            >
              <svg
                class="w-7 h-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h6m-6 4h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H9l-2 2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <p
                class="text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Belum ada pemilu
              </p>
              <p class="text-xs text-slate-400 mt-1 max-w-xs">
                Kamu belum bikin data pemilu. Tambahin dulu biar voting system
                kamu gak jadi pajangan.
              </p>
            </div>

            <router-link
              to="/admin/pemilu"
              class="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
            >
              <span class="text-lg leading-none">+</span>
              Tambah Pemilu
            </router-link>
          </div>

          <!-- Kalau data ada -->
          <div
            v-else
            v-for="p in pemiluList.slice(0, 4)"
            :key="p.id"
            class="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
          >
            <div
              class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              :class="
                p.is_active
                  ? 'bg-emerald-50 dark:bg-emerald-900/30'
                  : 'bg-slate-100 dark:bg-slate-800'
              "
            >
              <div
                class="w-2 h-2 rounded-full"
                :class="p.is_active ? 'bg-emerald-500' : 'bg-slate-400'"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate"
              >
                {{ p.name }}
              </p>
              <p class="text-xs text-slate-400 truncate">
                {{ p.prefix }} · max {{ p.max_choices }} pilihan
              </p>
            </div>
            <span :class="p.is_active ? 'badge-success' : 'badge-neutral'">
              {{ p.is_active ? "Aktif" : "Nonaktif" }}
            </span>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="card">
        <div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3
            class="font-display font-bold text-slate-900 dark:text-white text-sm"
          >
            Aksi Cepat
          </h3>
        </div>
        <div class="p-5 grid grid-cols-2 gap-3">
          <router-link
            v-for="action in quickActions"
            :key="action.label"
            :to="action.to"
            class="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="action.color"
            >
              <span v-html="action.icon" class="[&>svg]:w-5 [&>svg]:h-5" />
            </div>
            <span
              class="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-center"
              >{{ action.label }}</span
            >
          </router-link>
        </div>

        <!-- Vote link -->
        <div class="px-5 pb-5">
          <a
            href="/vote"
            target="_blank"
            class="flex items-center justify-between w-full p-3.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl transition-colors group"
          >
            <div class="flex items-center gap-2.5">
              <div
                class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="text-xs font-bold text-indigo-700 dark:text-indigo-300"
                >
                  Buka Halaman Voting
                </p>
                <p class="text-[10px] text-indigo-400">/vote</p>
              </div>
            </div>
            <svg
              class="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import StatCard from "@/components/ui/StatCard.vue";
import { pemiluService } from "@/services/pemiluService";
import { kandidatService } from "@/services/kandidatService";
import { pemilihService } from "@/services/pemilihService";

const loading = ref(true);
const pemiluList = ref([]);
const kandidatList = ref([]);
const pemilihList = ref([]);

const stats = computed(() => ({
  totalPemilu: pemiluList.value.length,
  aktivPemilu: pemiluList.value.filter((p) => p.is_active).length,
  totalKandidat: kandidatList.value.length,
  totalPemilih: pemilihList.value.length,
}));

const quickActions = [
  {
    label: "Tambah Pemilu",
    to: "/admin/pemilu",
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>',
    color:
      "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Tambah Kandidat",
    to: "/admin/kandidat",
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg>',
    color: "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Tambah Pemilih",
    to: "/admin/pemilih",
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/></svg>',
    color:
      "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Lihat Rekap",
    to: "/admin/rekapitulasi",
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>',
    color:
      "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
];

onMounted(async () => {
  const [p, k, pm] = await Promise.all([
    pemiluService.getAll(),
    kandidatService.getAll(),
    pemilihService.getAll(),
  ]);
  pemiluList.value = p;
  kandidatList.value = k.data;
  pemilihList.value = pm.data;
  loading.value = false;
});
</script>
