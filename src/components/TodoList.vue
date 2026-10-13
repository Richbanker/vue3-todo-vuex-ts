<template>
  <div class="todo-list">
    <p v-if="filteredTasks.length === 0" role="status" class="todo-list__empty">Нет задач для выбранного фильтра.</p>
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
.todo-list__empty {
  padding: 16px;
  text-align: center;
  color: #666;
}

.todo-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
</style> 