<template>
  <main>
    <!-- heading -->
    <header>
      <img
        src="https://pinia.vuejs.org/logo.svg"
        alt="pinia logo"
      />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- New Task form-->

    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!--Loading-->
    <div class="loading" v-if="isLoading">
      <p>Loading...</p>
    </div>
    <!-- task list -->
    <div
      class="task-list"
      v-if="filter === 'all'"
    >
      <p>You have {{ totalCount }} tasks left to do.</p>
      <div
        v-for="task in tasks"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>

    <div
      class="task-list"
      v-if="filter === 'favs'"
    >
      <p>You have {{ favCount }} tasks in your favs list.</p>
      <div
        v-for="task in favs"
        :key="task.id"
      >
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="$reset">Reset State</button>
  </main>
</template>

<script>
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import { useTaskStore } from './store/TaskStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, isLoading, favs, favCount, totalCount } = storeToRefs(taskStore);

    taskStore.getTasks();

    const filter = ref('all');
    return { taskStore, filter, tasks, isLoading, favs, favCount, totalCount  };
  },
};
</script>
