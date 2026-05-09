export const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(dateStr))
}

export const formatDateShort = (dateStr) => {
  if (!dateStr) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(dateStr))
}

export const isExpired = (dateStr) => {
  if (!dateStr) return false
  return new Date(dateStr) < new Date()
}

export const isActive = (pemilu) => {
  if (!pemilu.is_active) return false
  const now = new Date()
  if (pemilu.start_time && new Date(pemilu.start_time) > now) return false
  if (pemilu.end_time && new Date(pemilu.end_time) < now) return false
  return true
}

export const truncate = (str, len = 30) => {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '...' : str
}

export const generateId = () => Math.random().toString(36).slice(2, 10)
