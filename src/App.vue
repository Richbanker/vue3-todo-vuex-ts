<template>
  <div class="app">
    <h1>Список задач</h1>
    <TodoInput />
    <TodoFilters />
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
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

    onMounted(async () => {
      await store.dispatch('fetchTasks');
    });
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