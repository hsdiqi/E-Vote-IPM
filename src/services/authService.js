import {apiPublic, apiPrivate} from "./api";

export const authService = {
  async login(payload) {
    const res = await apiPrivate.post("/_auth/login", payload);
    return res.data; // return JSON backend
  },

  async me() {
    const res = await apiPrivate.get("/_auth/me");
    return res.data;
  },

  async refresh() {
    const res = await apiPrivate.post("/_auth/refresh")
  },

  async logout() {
    const res = await apiPrivate.post("/_auth/logout");
    return res;
  }
};