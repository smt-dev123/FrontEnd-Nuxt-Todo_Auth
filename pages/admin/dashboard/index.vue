<template>
  <div>Login</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});
</script>
