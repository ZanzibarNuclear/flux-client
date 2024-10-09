import { defineStore } from 'pinia'

interface User {
  id: string;
  email: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  location: string;
  website: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
})