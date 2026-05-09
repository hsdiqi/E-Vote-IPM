import { delay, mockPemilih, mockKandidat, mockVotes, mockPemilu } from '@/utils/mockData'
import { generateId } from '@/utils/helpers'

let votes = [...mockVotes]
let pemilihList = mockPemilih

export const votingService = {
  async verifyToken(token) {
    await delay(700)
    // Mock: token format TOKEN-XXXX matches pemilih by token_hash
    const pemilih = pemilihList.find(p => !p.is_used)
    if (!pemilih) throw { response: { data: { message: 'Token tidak valid atau sudah digunakan' }, status: 400 } }
    return {
      data: {
        id_pemilih: pemilih.id,
        id_pemilu: pemilih.id_pemilu,
        token_hash: pemilih.token_hash
      }
    }
  },

  async submitVote(payload) {
    await delay(800)
    const pemilih = pemilihList.find(p => p.id_pemilu === payload.id_pemilu && !p.is_used)
    if (!pemilih) throw { response: { data: { message: 'Token tidak valid atau sudah digunakan' }, status: 400 } }

    const newVotes = payload.kandidat_ids.map(kandidat_id => ({
      id: 'v-' + generateId(),
      id_pemilu: payload.id_pemilu,
      id_pemilih: pemilih.id,
      id_kandidat: kandidat_id,
      created_at: new Date().toISOString()
    }))

    votes.push(...newVotes)
    pemilih.is_used = true
    pemilih.used_at = new Date().toISOString()

    return { data: newVotes[0] }
  }
}

export const rekapService = {
  async getRekap(id_pemilu) {
    await delay(500)
    const pemilu = mockPemilu.find(p => p.id === id_pemilu)
    if (!pemilu) throw { response: { data: { message: 'Pemilu tidak ditemukan' }, status: 404 } }

    const kandidats = mockKandidat.filter(k => k.id_pemilu === id_pemilu)
    const totalPemilih = pemilihList.filter(p => p.id_pemilu === id_pemilu).length
    const pemiluVotes = votes.filter(v => v.id_pemilu === id_pemilu)
    const totalSuara = new Set(pemiluVotes.map(v => v.id_pemilih)).size

    const dataKandidat = kandidats.map(k => {
      const suara = pemiluVotes.filter(v => v.id_kandidat === k.id).length
      return {
        id_kandidat: k.id,
        name: k.name,
        nomor_anggota: k.nomor_anggota || 0,
        photo_url: k.photo_url || '',
        total_suara: suara,
        persentase: totalSuara > 0 ? ((suara / totalSuara) * 100).toFixed(1) + '%' : '0%'
      }
    }).sort((a, b) => b.total_suara - a.total_suara)

    return {
      data: {
        id_pemilu,
        pemilu_name: pemilu.name,
        total_suara: totalSuara,
        total_pemilih: totalPemilih,
        data_kandidat: dataKandidat
      }
    }
  },

  async getAll() {
    await delay(500)
    return { data: mockPemilu.map(p => ({ ...p })) }
  }
}
