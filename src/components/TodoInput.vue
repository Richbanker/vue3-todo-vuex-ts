<template>
  <div class="todo-input">
    <input
      v-model="newTaskTitle"
      aria-label="Название новой задачи"
      @keyup.enter="addTask"
      placeholder="Что нужно сделать?"
      class="todo-input__field"
    />
    <button type="button" @click="addTask" :disabled="isAdding || !newTaskTitle.trim()" class="todo-input__button">Добавить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import type { State } from '../store';

export default defineComponent({
  name: 'TodoInput',
  setup() {
    const store = useStore<State>();
    const newTaskTitle = ref('');
    const isAdding = ref(false);

    const addTask = async () => {
      if (isAdding.value) return;
      const title = newTaskTitle.value.trim();
      if (!title) return;
      isAdding.value = true;
      try {
        await store.dispatch('addTask', title);
        if (newTaskTitle.value.trim() === title) newTaskTitle.value = '';
      } finally {
        isAdding.value = false;
      }
    };

    return {
      newTaskTitle,
      isAdding,
      addTask,
    };
  },
});
</script>

<style scoped>
.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input__field {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.todo-input__button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.todo-input__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.todo-input__button:hover:not(:disabled) {
  background-color: #45a049;
}
</style> 