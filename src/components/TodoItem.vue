<template>
  <div class="todo-item" :class="{ 'todo-item--completed': task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="toggleTask"
      class="todo-item__checkbox"
    />
    <span class="todo-item__title">{{ task.title }}</span>
    <button @click="deleteTask" class="todo-item__delete">×</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import type { Task } from '../types/task';
import type { State } from '../store';

export default defineComponent({
  name: 'TodoItem',
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  setup(props) {
    const store = useStore<State>();

    const toggleTask = async () => {
      await store.dispatch('updateTask', {
        ...props.task,
        completed: !props.task.completed,
      });
    };

    const deleteTask = async () => {
      await store.dispatch('deleteTask', props.task.id);
    };

    return {
      toggleTask,
      deleteTask,
    };
  },
});
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;
}

.todo-item:hover {
  background-color: #f9f9f9;
}

.todo-item--completed .todo-item__title {
  text-decoration: line-through;
  color: #888;
}

.todo-item__checkbox {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-item__title {
  flex: 1;
  font-size: 16px;
}

.todo-item__delete {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 24px;
  cursor: pointer;
  padding: 0 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.todo-item:hover .todo-item__delete {
  opacity: 1;
}

.todo-item__delete:hover {
  color: #cc0000;
}
</style> 