// Mock data store
import { v4 as uuidv4 } from 'uuid'

const now = new Date().toISOString()
const yesterday = new Date(Date.now() - 86400000).toISOString()
const tomorrow = new Date(Date.now() + 86400000).toISOString()
const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString()

export const mockAdmins = [
  { id: 'admin-1', username: 'superadmin', role: 'superadmin', password_hash: null, created_at: yesterday, updated_at: null },
  { id: 'admin-2', username: 'operator1', role: 'operator', password_hash: null, created_at: yesterday, updated_at: null },
]

export const mockPemilu = [
  {
    id: 'pemilu-1', name: 'Pemilihan Ketua BEM 2025', prefix: 'BEM2025',
    start_time: yesterday, end_time: tomorrow, is_active: true,
    max_choices: 1, created_at: yesterday, updated_at: null
  },
  {
    id: 'pemilu-2', name: 'Pemilihan Ketua OSIS 2025', prefix: 'OSIS2025',
    start_time: now, end_time: nextWeek, is_active: false,
    max_choices: 1, created_at: now, updated_at: null
  },
  {
    id: 'pemilu-3', name: 'Pemilihan Ketua RT 2025', prefix: 'RT2025',
    start_time: null, end_time: null, is_active: false,
    max_choices: 2, created_at: now, updated_at: null
  },
]

export const mockKandidat = [
  { id: 'k1', id_pemilu: 'pemilu-1', name: 'Ahmad Fauzi', photo_url: 'https://i.pravatar.cc/150?img=1', nomor_anggota: 1, created_at: yesterday, updated_at: null },
  { id: 'k2', id_pemilu: 'pemilu-1', name: 'Siti Rahayu', photo_url: 'https://i.pravatar.cc/150?img=2', nomor_anggota: 2, created_at: yesterday, updated_at: null },
  { id: 'k3', id_pemilu: 'pemilu-1', name: 'Budi Santoso', photo_url: 'https://i.pravatar.cc/150?img=3', nomor_anggota: 3, created_at: yesterday, updated_at: null },
  { id: 'k4', id_pemilu: 'pemilu-2', name: 'Dewi Kusuma', photo_url: 'https://i.pravatar.cc/150?img=4', nomor_anggota: 1, created_at: yesterday, updated_at: null },
  { id: 'k5', id_pemilu: 'pemilu-2', name: 'Rizki Pratama', photo_url: 'https://i.pravatar.cc/150?img=5', nomor_anggota: 2, created_at: yesterday, updated_at: null },
]

export const mockPemilih = [
  { id: 'p1', id_pemilu: 'pemilu-1', name: 'Andi Wijaya', photo_url: null, nomor_anggota: 101, token_hash: 'hash1', is_used: true, used_at: now, expired_at: tomorrow, created_at: yesterday, updated_at: null },
  { id: 'p2', id_pemilu: 'pemilu-1', name: 'Benny Kurnia', photo_url: null, nomor_anggota: 102, token_hash: 'hash2', is_used: false, used_at: null, expired_at: tomorrow, created_at: yesterday, updated_at: null },
  { id: 'p3', id_pemilu: 'pemilu-1', name: 'Citra Lestari', photo_url: null, nomor_anggota: 103, token_hash: 'hash3', is_used: false, used_at: null, expired_at: tomorrow, created_at: yesterday, updated_at: null },
  { id: 'p4', id_pemilu: 'pemilu-1', name: 'Dian Permata', photo_url: null, nomor_anggota: 104, token_hash: 'hash4', is_used: true, used_at: now, expired_at: tomorrow, created_at: yesterday, updated_at: null },
  { id: 'p5', id_pemilu: 'pemilu-1', name: 'Eko Setiawan', photo_url: null, nomor_anggota: 105, token_hash: 'hash5', is_used: false, used_at: null, expired_at: tomorrow, created_at: yesterday, updated_at: null },
]

export const mockVotes = [
  { id: 'v1', id_pemilu: 'pemilu-1', id_pemilih: 'p1', id_kandidat: 'k1', created_at: now },
  { id: 'v2', id_pemilu: 'pemilu-1', id_pemilih: 'p4', id_kandidat: 'k2', created_at: now },
]

export const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms))
