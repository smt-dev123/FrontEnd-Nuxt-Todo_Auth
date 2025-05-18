import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: number;
  role: "admin" | "user";
  exp: number;
  iat: number;
}

export const useAuthStore = defineStore("authStore", () => {
  const token = useCookie<string | null>("token", { default: () => null });
  const user = ref<JwtPayload | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const isUser = computed(() => user.value?.role === "user");

  const init = () => {
    if (token.value) {
      try {
        const decoded = jwtDecode<JwtPayload>(token.value);
        user.value = decoded;
      } catch (e) {
        console.error("Invalid token");
        logout();
      }
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    const { data, error } = await useFetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: credentials,
    });

    if (error.value)
      throw createError({ statusCode: 401, statusMessage: "Login failed" });

    token.value = data.value.access_token;
    const decoded = jwtDecode<JwtPayload>(data.value.access_token);
    user.value = decoded;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  const me = async () => {
    const { data, error } = await useFetch("http://localhost:4000/auth/me", {
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : "",
      },
    });

    if (error.value) {
      console.log("Error fetching user info");
      return null;
    }
    user.value = data.value; // <-- update user state
    return data.value;
  };

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    logout,
    init,
    me,
  };
});
