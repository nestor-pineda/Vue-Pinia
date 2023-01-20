<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="I need to..."
      v-model="name"
    />
    <input
      type="text"
      placeholder="I need to..."
      v-model="surname"
    />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../store/TaskStore';

export default {
  setup() {
    const taskStore = useTaskStore();

    const name = ref('');
    const surname = ref('');

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          first_name: name.value,
          last_name: surname.value,
          isFav: false,
          id: Math.floor(Math.random() * 1000000),
        });
        newTask.value = '';
      }
    };
    return { handleSubmit, name, surname };
  },
};
</script>
