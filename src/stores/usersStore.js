import { writable } from 'svelte/store';

const users = writable('');
const usersStore = {
  subscribe: users.subscribe,
  setUsers: (data) => {
    users.set(data);
    return data;
  },
};

export default usersStore;
