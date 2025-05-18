<template>
  <div>
    <NuxtLink to="/admin/auth/login">Login</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
</script>
