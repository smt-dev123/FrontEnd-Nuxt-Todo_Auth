import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    return navigateTo("/admin/auth/login");
  }

  const requiredRole = to.meta.role;
  if (requiredRole && auth.user?.role !== requiredRole) {
    return navigateTo("/admin/dashboard");
  }
});
