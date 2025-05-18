<template>
  <a-layout-header
    :style="{
      background: '#fff',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }"
  >
    <div class="logo" :style="{ fontSize: '20px', fontWeight: 'bold' }">
      Logo
    </div>
    <a-popover v-model:open="visible" trigger="click" placement="bottomRight">
      <template #content>
        <div
          :style="{
            width: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }"
        >
          <NuxtLink to="/admin/profile" @click="visible = false"
            >Profile</NuxtLink
          >
          <span
            @click="logout"
            :style="{ cursor: 'pointer', color: '#ff4d4f' }"
            @mouseover="(e) => (e.target.style.color = '#ff7875')"
            @mouseout="(e) => (e.target.style.color = '#ff4d4f')"
          >
            Log Out
          </span>
        </div>
      </template>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          cursor: 'pointer',
        }"
      >
        <img
          :style="{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid #d9d9d9',
          }"
          :src="
            auth.user?.avatar ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          "
          alt="User Profile"
        />
      </div>
    </a-popover>
  </a-layout-header>
</template>

<script lang="ts" setup>
const auth = useAuthStore();
const visible = ref<boolean>(false);

const logout = async () => {
  try {
    await auth.logout();
    visible.value = false;
    message.success("Logged out successfully");
    navigateTo("/admin/auth/login");
  } catch (err) {
    console.error("Logout failed:", err);
    message.error("Failed to log out. Please try again.");
  }
};
</script>

<style scoped>
.logo {
  color: #000;
}
</style>
