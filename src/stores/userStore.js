import { writable } from 'svelte/store';

const user = writable('');

const userStore = {
  subscribe: user.subscribe,

  setUser: (data) => {
    user.set(data);
    return data;
  },

};

export default userStore;
