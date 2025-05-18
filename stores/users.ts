import { defineStore } from "pinia";
import type { User } from "~/types/Types";

export const useUsersStore = defineStore("usersStore", {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
  }),

  actions: {
    async getUser() {
      const token = useCookie("token").value;
      try {
        const data: User[] = await $fetch("http://localhost:4000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users = data;
      } catch (error) {
        console.error(error);
      }
    },

    async getOneUser(id: string) {
      const token = useCookie("token").value;
      try {
        const data: User = await $fetch(`http://localhost:4000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = data;
      } catch (error) {
        console.error(error);
      }
    },

    async createUser(userInput: User) {
      const token = useCookie("token").value;
      try {
        const data: User[] = await $fetch("http://localhost:4000/user", {
          method: "POST",
          body: userInput,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.users.pop(data);
      } catch (error) {
        console.error(error);
      }
    },

    async updateUser(id: string, userInput: User) {
      const token = useCookie("token").value;
      try {
        const data: User[] = await $fetch(`http://localhost:4000/user/${id}`, {
          method: "PUT",
          body: userInput,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getUser();
      } catch (error) {
        console.error(error);
      }
    },

    async deleteUser(id: number) {
      const token = useCookie("token").value;
      try {
        const alert = confirm("Are you sure you want to delete this user?");
        if (alert) {
          await $fetch(`http://localhost:4000/user/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          this.users = this.users.filter((user) => user.id !== id);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
