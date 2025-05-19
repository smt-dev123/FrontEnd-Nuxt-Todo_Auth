<script lang="ts" setup>
const auth = useAuthStore();
definePageMeta({
  middleware: "auth",
  layout: "auth",
});
useHead({
  title: "Users",
});
// Fetch Data
const userStore = useUsersStore();
onMounted(async () => {
  await userStore.getUser();
});

const handleDelete = async (id: number) => {
  await userStore.deleteUser(id);
};

const columns = computed(() => {
  const base = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 8,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      width: 35,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: 35,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ellipsis: true,
      width: 20,
    },
  ];

  if (auth.isAdmin) {
    base.push({
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 15,
    });
  }

  return base;
});

const data = computed(() => userStore.users ?? []);
</script>

<template>
  <NuxtLink v-if="auth.isAdmin" to="users/create">
    <a-button type="primary" class="mb-2">Add</a-button>
  </NuxtLink>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <div class="flex gap-2">
          <NuxtLink
            :to="`/admin/users/edit/${record.id}`"
            class="text-green-500 hover:text-green-600"
            >Edit</NuxtLink
          >
          <button @click.prevent="handleDelete(record.id)" class="text-red-500">
            Delete
          </button>
        </div>
      </template>
    </template>
  </a-table>
</template>
