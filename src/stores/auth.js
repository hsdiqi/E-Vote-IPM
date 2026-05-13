import { defineStore } from "pinia";
import { ref } from "vue";
import { authService } from "@/services/authService";

export const useAuthStore = defineStore("auth", () => {
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = ref(false);
  const user = ref(null);

  const checked = ref(false); // biar ga request me terus2an

  async function login(credentials) {
    loading.value = true;
    error.value = null;

    try {
      await authService.login(credentials);

      // setelah login, ambil data user
      const me = await authService.me();
      user.value = me.data; // tergantung response backend kamu
      isAuthenticated.value = true;
      checked.value = true;

      return true;
    } catch (err) {
      error.value = err?.response?.data?.message || "Login gagal";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function checkAuth() {
    if (checked.value) return;

    loading.value = true;
    try {
      const me = await authService.me();
      user.value = me.data;
      isAuthenticated.value = true;
    } catch (err) {
      user.value = null;
      isAuthenticated.value = false;
    } finally {
      checked.value = true;
      loading.value = false;
    }
  }

  async function logout() {
    try {
      await authService.logout();
    } finally {
      user.value = null;
      isAuthenticated.value = false;
      checked.value = true;
    }
  }

  return {
    loading,
    error,
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
});