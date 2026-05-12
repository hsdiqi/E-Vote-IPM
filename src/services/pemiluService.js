import { generateId } from "@/utils/helpers";
import {apiPrivate, apiPublic} from "./api";

export const pemiluService = {
  async getAll() {
    try {
      const res = await apiPrivate.get("/pemilu");
      if (res.status !== 200) return [];
      return res.data.data ?? [];
    } catch (err) {
      console.log("error brader: ", err)
      if (err.response?.status === 404) return [];
      throw err;
    } 
  },
  async getById(id) {
    const res = await apiPrivate.get(`/pemilu/${id}`)
    return res.data.data
  },
  async create(payload) {
    const res = await apiPrivate.post("/pemilu", payload)
    if (res.status !== 201 && res.status !== 200) return null
    return res
  },
  async update(id, payload) {
    const res = await apiPrivate.patch(`/pemilu/${id}`, payload)
    return res
  },
  async delete(id) {
    const res = await apiPrivate.delete(`/pemilu/${id}`)
    return res
  },
};
