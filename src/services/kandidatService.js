import { delay, mockKandidat } from '@/utils/mockData'
import { generateId } from '@/utils/helpers'

import { apiPrivate, apiPublic } from './api'

let kandidatList = [...mockKandidat]

export const kandidatService = {
  async getAll(id_pemilu) {
    try{
      const res = await apiPrivate.get('/kandidat')
      return res.data.data
    } catch(err){
      console.log(err)
      throw err
    }
  },
  async getById(id) {
    try{
      const res = await apiPrivate.get(`/kandidat/${id}`)
      return res.data.data
    } catch(err){
      console.log(err)
      throw err
    }
  },
  async create(payload) {
    const res = await apiPrivate.post("/kandidat", payload)
    if (res.status !== 201 && res.status !== 200) return null
    return res
  },
  async update(id, payload) {
    const res = await apiPrivate.patch(`/kandidat/${id}`, payload)
    if (res.status !== 200) null
    return res
  },
  async delete(id) {
    const res = await apiPrivate.delete(`/kandidat/${id}`)
    return res
  }
}
