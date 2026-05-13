import { delay, mockPemilih } from "@/utils/mockData";
import { generateId } from "@/utils/helpers";
import { apiPrivate } from "./api";

let pemilihList = [...mockPemilih];

export const pemilihService = {
  async getAll(id_pemilu) {
    try {
      const res = await apiPrivate.get("/pemilih");
      return res.data.data;
    } catch (err) {
      throw err;
    }
  },
  async getById(id) {
    try {
      const res = await apiPrivate.get(`/pemilih/${id}`);
      return res.data.data;
    } catch (err) {}
    throw err;
  },
  async create(payload) {
    try {
      console.log("insert pemilih")
      const res = await apiPrivate.post(`/pemilih`, payload);
      console.log("response create: ",res)
      return res.data.data;
    } catch (err) {
      console.log(err)
      throw err;
    }
  },
  async update(id, payload) {
    try {
      const res = await apiPrivate(`/pemilih/${id}`, payload);
      return res;
    } catch (err) {
      throw err;
    }
  },
  async delete(id) {
    const res = await apiPrivate(`/pemilih/${id}`);
    if (res !== 200) return null;
    return res;
  },
  // async generateToken(id) {
  //   await delay(500);
  //   const p = pemilihList.find((p) => p.id === id);
  //   if (!p)
  //     throw {
  //       response: { data: { message: "Pemilih tidak ditemukan" }, status: 404 },
  //     };
  //   const token = "TOKEN-" + generateId().toUpperCase();
  //   return { data: { pemilih_id: id, token, expired_at: p.expired_at } };
  // },
};

