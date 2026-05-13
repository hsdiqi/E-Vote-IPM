import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

export function setupInterceptors(apiPrivate) {
  apiPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const auth = useAuthStore();

      const originalRequest = error.config;

      // kalau tidak ada response (network error)
      if (!error.response) {
        return Promise.reject(error);
      }

      // kalau unauthorized dan belum pernah retry
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // coba refresh token
          await apiPrivate.post("/_auth/refresh");

          // ulang request yang gagal
          return apiPrivate(originalRequest);
        } catch (refreshError) {
          // refresh gagal = session mati
          await auth.logout();

          router.push({
            name: "Login",
            query: { redirect: router.currentRoute.value.fullPath },
          });

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}