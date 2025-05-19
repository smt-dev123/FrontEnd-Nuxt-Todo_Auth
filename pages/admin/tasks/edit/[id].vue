<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "auth",
});

const tasksStroe = useTasksStore();
const id = useRoute().params.id as string;
onMounted(async () => {
  await tasksStroe.getOneTask(id);
});

const formState = reactive({
  title: "",
  description: "",
  status: "pending",
  image: null,
});

watchEffect(() => {
  if (tasksStroe.tasks) {
    formState.title = tasksStroe.task?.title;
    formState.description = tasksStroe.task?.description;
    formState.status = tasksStroe.task?.status;
    formState.image = tasksStroe.task?.image;
  }
  useSeoMeta({
    title: `Edit task: ${tasksStroe.task?.title}`,
  });
});

const inputImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files && target.files.length > 0) {
    formState.image = target.files[0];
  } else {
    formState.image = null;
  }
};

const handleUpdate = async () => {
  try {
    const { title, description, status, image } = formState;
    if (!title || !description) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }

    await tasksStroe.updateTasks(id, formData);

    navigateTo("/admin/tasks");
    resetForm();
    message.success("Task updated successfully.");
  } catch {
    message.error("Task not update.");
  }
};

const resetForm = () => {
  formState.title = "";
  formState.description = "";
  formState.status = "pending";
};
const labelCol = { style: { width: "110px" } };
</script>

<template>
  <a-form :model="formState" :label-col="labelCol">
    <!-- {{ formState }} -->
    <a-form-item label="Image" name="image">
      <input type="file" class="mb-2" @change="inputImage" />
    </a-form-item>

    <a-form-item
      label="Title"
      name="title"
      :rules="[{ required: true, message: 'Please input your title!' }]"
    >
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item
      label="Description"
      name="description"
      :rules="[{ required: true, message: 'Please input your description!' }]"
    >
      <a-input v-model:value="formState.description" />
    </a-form-item>

    <a-form-item label="Status" name="status">
      <a-select
        v-model:value="formState.status"
        style="width: 100%"
        placeholder="please select your status"
      >
        <a-select-option value="pending">Pending</a-select-option>
        <a-select-option value="success">Success</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 18, span: 16 }">
      <NuxtLink to="/admin/tasks">
        <a-button type="primary" danger class="mr-2">Cancel</a-button>
      </NuxtLink>
      <a-button type="primary" html-type="submit" @click.prevent="handleUpdate"
        >Update</a-button
      >
    </a-form-item>
  </a-form>
</template>
