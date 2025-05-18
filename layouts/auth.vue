<template>
  <a-layout style="min-height: 100vh">
    <Sidebar />
    <a-layout>
      <Navbar />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="index"
          >
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©2025 SMT-DEV
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
// Initialize auth store
const auth = useAuthStore();
auth.init();

// Dynamic breadcrumbs based on route
const route = useRoute();
const breadcrumbItems = computed(() => {
  const path = route.path.split("/").filter((segment) => segment);
  return path.map(
    (segment) => segment.charAt(0).toUpperCase() + segment.slice(1)
  );
});
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
