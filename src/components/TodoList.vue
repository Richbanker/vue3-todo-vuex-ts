<template>
  <div class="todo-list">
    <TodoItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import TodoItem from './TodoItem.vue';
import type { State } from '../store';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
  },
  setup() {
    const store = useStore<State>();
    const filteredTasks = computed(() => store.getters.filteredTasks);

    return {
      filteredTasks,
    };
  },
});
</script>

<style scoped>
.todo-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
</style> 