<template>
  <div class="todo-input">
    <input
      v-model="newTaskTitle"
      @keyup.enter="addTask"
      placeholder="Что нужно сделать?"
      class="todo-input__field"
    />
    <button @click="addTask" class="todo-input__button">Добавить</button>
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

    const addTask = async () => {
      if (newTaskTitle.value.trim()) {
        await store.dispatch('addTask', newTaskTitle.value.trim());
        newTaskTitle.value = '';
      }
    };

    return {
      newTaskTitle,
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

.todo-input__button:hover {
  background-color: #45a049;
}
</style> 