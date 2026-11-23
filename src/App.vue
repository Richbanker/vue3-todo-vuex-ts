<template>
  <main class="app">
    <h1>Список задач</h1>
    <p v-if="isLoading" role="status">Загрузка задач...</p>
    <div v-else-if="loadError" role="alert">
      <p>Не удалось загрузить задачи.</p>
      <button type="button" @click="loadTasks">Повторить</button>
    </div>
    <template v-else>
      <TodoInput />
      <TodoFilters />
      <TodoList />
    </template>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFilters from './components/TodoFilters.vue';
import type { State } from './store';

export default defineComponent({
  name: 'App',
  components: {
    TodoInput,
    TodoList,
    TodoFilters,
  },
  setup() {
    const store = useStore<State>();

    const isLoading = ref(true);
    const loadError = ref(false);
    const loadTasks = async () => {
      isLoading.value = true;
      loadError.value = false;
      try {
        await store.dispatch('fetchTasks');
      } catch {
        loadError.value = true;
      } finally {
        isLoading.value = false;
      }
    };
    onMounted(loadTasks);
    return { isLoading, loadError, loadTasks };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}
</style> 