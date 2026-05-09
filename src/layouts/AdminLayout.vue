<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <Sidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <!-- Main content -->
    <div class="transition-all duration-300" :class="sidebarCollapsed ? 'pl-[68px]' : 'pl-[260px]'">
      <Topbar :title="pageTitle" :breadcrumbs="breadcrumbs" />

      <main class="p-6">
        <RouterView v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" @update-title="updateTitle" @update-breadcrumbs="updateBreadcrumbs" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/admin/Sidebar.vue'
import Topbar from '@/components/admin/Topbar.vue'

const route = useRoute()
const sidebarCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true')
const pageTitle = ref('Dashboard')
const breadcrumbs = ref([])

watch(sidebarCollapsed, (v) => localStorage.setItem('sidebarCollapsed', v))

watch(() => route.meta.title, (title) => {
  if (title) pageTitle.value = title
}, { immediate: true })

const updateTitle = (title) => pageTitle.value = title
const updateBreadcrumbs = (items) => breadcrumbs.value = items
</script>
