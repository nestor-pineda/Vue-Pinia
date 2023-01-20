import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter(t => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: state => {
      return state.tasks.length;
    },
  },
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(item => {
        return item.id !== id;
      });
    },
    toggleFav(id) {
      const task = this.tasks.find(item => item.id === id);
      task.isFav = !task.isFav;
    },
    async getTasks() {
      this.isLoading = true;
      const res = await fetch('http://localhost:3000/data');
      const data = await res.json();
      this.tasks = data;
      this.isLoading = false;
    }
  },
});
