// mockUsers.ts
import { defineStore } from "pinia";

interface TodoUser {
  username: string;
  password: string;
}

export const useMockStore = defineStore('mock', {
  state: () => ({
    users: [
      { username: 'มีนา', password: '123456' },
      { username: 'รานี', password: '111111' },
      { username: 'วาสนา', password: '414141' },
  ] as TodoUser[]
  }),
  actions: {
    fetchUsers() {
      this.users = users.map(u => ({ username: u.username, password: u.password }));
    }
  }
});

export default useMockStore;
