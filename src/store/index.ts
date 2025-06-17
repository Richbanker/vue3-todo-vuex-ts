import { createStore } from 'vuex';
import type { Task } from '../types/task';
import { tasksApi } from '../api/tasksApi';

export interface State {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
}

const state: State = {
  tasks: [],
  filter: 'all',
};

const store = createStore<State>({
  state,
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    deleteTask(state, id: number) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTask(state, updatedTask: Task) {
      state.tasks = state.tasks.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
    },
    setFilter(state, filter: 'all' | 'active' | 'completed') {
      state.filter = filter;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const tasks = await tasksApi.get();
      commit('setTasks', tasks);
    },
    async addTask({ commit }, title: string) {
      const task = await tasksApi.add(title);
      commit('addTask', task);
    },
    async deleteTask({ commit }, id: number) {
      await tasksApi.delete(id);
      commit('deleteTask', id);
    },
    async updateTask({ commit }, updatedTask: Task) {
      await tasksApi.update(updatedTask);
      commit('updateTask', updatedTask);
    },
  },
  getters: {
    filteredTasks(state): Task[] {
      if (state.filter === 'active') {
        return state.tasks.filter(task => !task.completed);
      }
      if (state.filter === 'completed') {
        return state.tasks.filter(task => task.completed);
      }
      return state.tasks;
    },
  },
});

export default store;
export type { State }; 