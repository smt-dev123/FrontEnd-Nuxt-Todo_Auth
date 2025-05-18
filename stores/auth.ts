import { defineStore } from "pinia";

interface User {
  userId: number;
  role: "admin" | "user";
  email?: string;
  username?: string;
}

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: useCookie<string | null>("token", { default: () => null }),
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
    isUser: (state) => state.user?.role === "user",
  },

  actions: {
    async init() {
      if (this.token && !this.user) {
        await this.fetchUser();
      }
    },

    async login(credentials: { email: string; password: string }) {
      try {
        const res = await $fetch("http://localhost:4000/auth/login", {
          method: "POST",
          body: credentials,
        });

        this.token = res.access_token;
        useCookie("token").value = res.access_token;

        await this.fetchUser();
      } catch (error) {
        throw createError({ statusCode: 401, statusMessage: "Login failed" });
      }
    },

    async fetchUser() {
      if (!this.token) return;
      try {
        const user = await $fetch("http://localhost:4000/auth/me", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = user;
      } catch (error) {
        this.user = null;
        this.token = null;
        useCookie("token").value = null;
        console.error("Unable to fetch user:", error);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      useCookie("token").value = null;
    },
  },
});
