<template>
  <div class="todo-filters">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="setFilter(filter.value)"
      :class="['todo-filters__button', { 'todo-filters__button--active': currentFilter === filter.value }]"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import type { State } from '../store';

type Filter = {
  label: string;
  value: 'all' | 'active' | 'completed';
};

export default defineComponent({
  name: 'TodoFilters',
  setup() {
    const store = useStore<State>();
    const currentFilter = computed(() => store.state.filter);

    const filters: Filter[] = [
      { label: 'Все', value: 'all' },
      { label: 'Активные', value: 'active' },
      { label: 'Завершенные', value: 'completed' },
    ];

    const setFilter = (filter: 'all' | 'active' | 'completed') => {
      store.commit('setFilter', filter);
    };

    return {
      filters,
      currentFilter,
      setFilter,
    };
  },
});
</script>

<style scoped>
.todo-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-filters__button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.todo-filters__button:hover {
  background-color: #e9e9e9;
}

.todo-filters__button--active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.todo-filters__button--active:hover {
  background-color: #45a049;
}
</style> 