<script lang="ts" setup>
import type { User } from "~/types/Types";
const userStore = useUsersStore();
definePageMeta({
  middleware: "auth",
  layout: "auth",
  role: "admin",
});
useHead({
  title: "Create User",
});
const formState = reactive<User>({
  username: "",
  email: "",
  password: "",
  role: "User",
});

const handleSubmit = async () => {
  // const { username, email, password, role } = formState;
  await userStore.createUser(formState);

  navigateTo("/admin/users");
  resetForm();
};

const resetForm = () => {
  formState.username = "";
  formState.email = "";
  formState.password = "";
  formState.role = "User";
};
const labelCol = { style: { width: "110px" } };
</script>

<template>
  <a-form :model="formState" :label-col="labelCol">
    <!-- {{ formState }} -->
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" autocomplete="username" />
    </a-form-item>

    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" autocomplete="email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password
        v-model:value="formState.password"
        autocomplete="current-password"
      />
    </a-form-item>

    <a-form-item label="Role" name="role">
      <a-select
        v-model:value="formState.role"
        style="width: 100%"
        placeholder="please select your role"
      >
        <a-select-option value="user">User</a-select-option>
        <a-select-option value="admin">Admin</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 18, span: 16 }">
      <NuxtLink to="/admin/users">
        <a-button type="primary" danger class="mr-2">Cancel</a-button>
      </NuxtLink>
      <a-button type="primary" html-type="submit" @click.prevent="handleSubmit"
        >Create</a-button
      >
    </a-form-item>
  </a-form>
</template>
