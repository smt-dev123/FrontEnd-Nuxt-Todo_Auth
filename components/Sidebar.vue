<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo"></div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <NuxtLink to="/admin/dashboard">
        <a-menu-item key="1">
          <AppstoreAddOutlined />
          <span>Dashboard</span>
        </a-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/tasks">
        <a-menu-item key="2">
          <pie-chart-outlined />
          <span>Task</span>
        </a-menu-item>
      </NuxtLink>
      <NuxtLink to="/admin/users">
        <a-menu-item key="3">
          <UserOutlined />
          <span>User</span>
        </a-menu-item>
      </NuxtLink>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
</script>
