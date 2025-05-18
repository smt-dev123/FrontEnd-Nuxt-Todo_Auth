import { defineStore } from "pinia";
import type { Tasks } from "~/types/Types";

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    tasks: [] as Tasks[] | null,
    task: null as Tasks | null,
  }),

  actions: {
    async getTasks() {
      try {
        const token = useCookie("token").value;
        const data: Tasks[] = await $fetch("http://localhost:4000/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.tasks = data;
      } catch (err) {
        console.log(err);
      }
    },

    async getOneTask(id: string) {
      try {
        const token = useCookie("token").value;
        const data: Tasks = await $fetch(`http://localhost:4000/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.task = data;
      } catch (err) {
        console.log(err);
      }
    },

    async createTasks(inputTask: Tasks) {
      try {
        const token = useCookie("token").value;
        const data: Tasks[] = await $fetch("http://localhost:4000/task", {
          method: "POST",
          body: inputTask,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getTasks();
      } catch (err) {
        console.log(err);
      }
    },

    async updateTasks(id: string, inputTask: Tasks) {
      try {
        const token = useCookie("token").value;
        const data: Tasks[] = await $fetch(`http://localhost:4000/task/${id}`, {
          method: "PUT",
          body: inputTask,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getTasks();
      } catch (err) {
        console.log(err);
      }
    },

    async deleteTasks(id: number) {
      try {
        const token = useCookie("token").value;
        const response = await $fetch<{ status: number }>(
          `http://localhost:4000/task/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // if (response.status === 200) {
        this.getTasks();
        //   this.tasks = this.tasks?.filter((task) => task.id !== id);
        // }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
