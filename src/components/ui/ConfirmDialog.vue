<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" :title="title || 'Konfirmasi'" size="sm">
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" :class="iconBg">
        <svg class="w-5 h-5" :class="iconColor" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-600 dark:text-slate-400">{{ message }}</p>
      </div>
    </div>
    <template #footer>
      <button class="btn-secondary" @click="emit('update:modelValue', false)">Batal</button>
      <button :class="variant === 'danger' ? 'btn-danger' : 'btn-primary'" @click="onConfirm" :disabled="loading">
        <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {{ confirmText || 'Konfirmasi' }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  confirmText: String,
  variant: { type: String, default: 'danger' },
  loading: Boolean
})
const emit = defineEmits(['update:modelValue', 'confirm'])

const iconBg = computed(() => props.variant === 'danger' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-amber-50 dark:bg-amber-900/30')
const iconColor = computed(() => props.variant === 'danger' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400')

function onConfirm() {
  emit('confirm')
}
</script>
