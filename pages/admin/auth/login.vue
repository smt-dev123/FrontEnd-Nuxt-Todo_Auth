<template>
  <main class="w-full h-screen">
    <div class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <a-form :model="formState" name="basic" :label-col="labelCol">
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

        <span class="text-red-500">{{ error }}</span>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @click="handleLogin"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </main>
</template>

<script lang="ts" setup>
interface FormState {
  email: string;
  password: string;
}

const auth = useAuthStore();

const formState = reactive<FormState>({
  email: "",
  password: "",
});

const error = ref("");

const handleLogin = async () => {
  try {
    await auth.login({ email: formState.email, password: formState.password });
    message.success("Login successfully");
    navigateTo("/admin/dashboard");
  } catch (e) {
    error.value = "Login failed. Please check your credentials.";
  }
};
const labelCol = { style: { width: "100px" } };
</script>
