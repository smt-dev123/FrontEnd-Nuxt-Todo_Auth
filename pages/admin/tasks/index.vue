<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});
const tasksStore = useTasksStore();
onMounted(() => {
  tasksStore.getTasks();
});

const handleDelete = async (id: number) => {
  try {
    await tasksStore.deleteTasks(id);
    message.success("Task deleted successfully.");
  } catch {
    message.success("Task not delete.");
  }
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 8,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 10,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
    width: 35,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 35,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 10,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 15,
  },
];

const data = computed(() => tasksStore.tasks ?? []);
useSeoMeta({
  title: "Tasks",
});
</script>

<template>
  <NuxtLink to="tasks/create">
    <a-button type="primary" class="mb-2">Add</a-button>
  </NuxtLink>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record, text }">
      <template v-if="column.key === 'image'">
        <a-image
          :height="40"
          :src="`http://localhost:4000/public/${text}`"
          :alt="record.title"
        />
      </template>
      <template v-else-if="column.key === 'status'">
        <span>
          <a-tag
            :color="
              record.status === 'pending'
                ? 'success'
                : record.status.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ record.status.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <div class="flex gap-2">
          <NuxtLink
            :to="`tasks/edit/${record.id}`"
            class="text-green-500 hover:text-green-600"
            >Edit</NuxtLink
          >
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDelete(record.id)"
          >
            <button class="text-red-500">Delete</button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>
