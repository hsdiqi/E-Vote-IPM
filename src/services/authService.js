import {apiPublic, apiPrivate} from "./api";

export const authService = {
  async login(payload) {
    const res = await apiPublic.post("/_auth/login", payload);
    return res.data; // return JSON backend
  },

  // async me() {
  //   const res = await api.get("/_auth/me"); // atau "/_admin/me"
  //   return res.data;
  // },

  async logout() {
    const res = await apiPrivate.post("/_auth/logout");
    return res;
  }
};