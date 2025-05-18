<template>
  <a-layout-header style="background: #fff; padding: 0">
    <nav class="flex items-center justify-between mx-4">
      <h1>Logo</h1>
      <a-popover v-model:open="visible" trigger="click" placement="bottomRight">
        <template #content>
          <div class="flex flex-col w-24">
            <NuxtLink to="/admin/profile">Profile</NuxtLink>
            <span @click="logout" class="cursor-pointer hover:text-red-500"
              >Log Out</span
            >
          </div>
        </template>
        <div
          class="flex items-center justify-center p-4rounded-lg w-fit cursor-pointer"
        >
          <img
            class="w-10 h-10 rounded-full object-cover border"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile"
          />
        </div>
      </a-popover>
    </nav>
  </a-layout-header>
</template>

<script lang="ts" setup>
const auth = useAuthStore();
const visible = ref<boolean>(false);

const logout = async () => {
  try {
    await auth.logout();
    navigateTo("/admin/auth/login");
  } catch (err) {
    console.log("Log Out: ", err);
  }
};
</script>
