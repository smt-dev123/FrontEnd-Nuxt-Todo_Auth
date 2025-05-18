<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
    :width="200"
    :style="{ background: '#001529' }"
  >
    <div
      class="logo"
      :style="{
        height: '32px',
        margin: '16px',
        background: 'rgba(255, 255, 255, 0.2)',
      }"
    ></div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      @click="handleMenuClick"
    >
      <a-menu-item key="dashboard">
        <appstore-add-outlined />
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="tasks">
        <pie-chart-outlined />
        <span>Tasks</span>
      </a-menu-item>
      <a-menu-item key="users">
        <user-outlined />
        <span>Users</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([]);
const router = useRouter();
const route = useRoute();

// Map routes to menu keys
const routeToKeyMap: Record<string, string> = {
  "/admin/dashboard": "dashboard",
  "/admin/tasks": "tasks",
  "/admin/users": "users",
};

// Initialize and update selectedKeys based on current route
const updateSelectedKey = () => {
  const path = route.path;
  selectedKeys.value = [routeToKeyMap[path] || "dashboard"];
};

// Watch for route changes to update selected menu item
watch(() => route.path, updateSelectedKey, { immediate: true });

// Handle menu item click for navigation
const handleMenuClick = ({ key }: { key: string }) => {
  const keyToRouteMap: Record<string, string> = {
    dashboard: "/admin/dashboard",
    tasks: "/admin/tasks",
    users: "/admin/users",
  };
  router.push(keyToRouteMap[key]);
};
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}
</style>
