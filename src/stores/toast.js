import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function add(message, type = 'success', duration = 3500) {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    setTimeout(() => remove(id), duration)
  }

  function remove(id) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx > -1) toasts.value.splice(idx, 1)
  }

  const success = (msg) => add(msg, 'success')
  const error = (msg) => add(msg, 'error', 5000)
  const warning = (msg) => add(msg, 'warning')
  const info = (msg) => add(msg, 'info')

  return { toasts, add, remove, success, error, warning, info }
})
