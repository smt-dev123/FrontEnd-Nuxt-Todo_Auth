<script setup lang="ts">
const auth = useAuthStore();
auth.init();
</script>

<template>
  <a-layout style="min-height: 100vh">
    <Sidebar />
    <a-layout>
      <Navbar />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Task</a-breadcrumb-item>
          <a-breadcrumb-item>Lists</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©2025 SMT-DEV
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
