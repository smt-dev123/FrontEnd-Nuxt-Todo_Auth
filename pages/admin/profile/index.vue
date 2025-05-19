<template>
  <a-form :model="formState" :label-col="labelCol">
    <a-form-item label="User Name">
      <a-input v-model:value="formState.username" autocomplete="username" />
    </a-form-item>
    <a-form-item label="Email">
      <a-input v-model:value="formState.email" autocomplete="email" />
    </a-form-item>
    <a-form-item label="Old Password">
      <a-input-password
        v-model:value="formState.oldPassword"
        autocomplete="old-password"
      />
    </a-form-item>
    <a-form-item label="New Password">
      <a-input-password
        v-model:value="formState.password"
        autocomplete="current-password"
      />
    </a-form-item>
    <a-form-item label="Confirm Password">
      <a-input-password
        v-model:value="formState.password"
        autocomplete="current-password"
      />
    </a-form-item>
    <a-form-item label="Role">
      <a-radio-group v-model:value="formState.role" :disabled="isDisabled">
        <a-radio value="admin">Admin</a-radio>
        <a-radio value="user">User</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
      <a-button type="primary" @click="onSubmit">Save</a-button>
      <NuxtLink to="/admin/dashboard">
        <a-button style="margin-left: 10px">Cancel</a-button>
      </NuxtLink>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});

interface User {
  username?: string;
  email: string;
  role: string;
  oldPassword: string;
  password: string;
  profile?: string | null;
}

const isDisabled = ref<boolean>(true);
// const isDisabled = computed(() => !authStore.isAdmin);

const formState = reactive<User>({
  username: "",
  email: "",
  role: "",
  oldPassword: "",
  password: "",
  profile: null,
});

const authStore = useAuthStore();
onMounted(async () => {
  await authStore.fetchUser();
});
watchEffect(() => {
  if (authStore.user) {
    formState.username = authStore.user.username ?? "";
    formState.email = authStore.user.email ?? "";
    formState.role = authStore.user.role ?? "";
  }
});

const onSubmit = () => {
  console.log("submit!", toRaw(formState));
};
const labelCol = { style: { width: "130px" } };
useSeoMeta({
  title: "Profile",
});
</script>
