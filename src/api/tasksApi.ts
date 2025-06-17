import { Task } from '../types/task';

let tasks: Task[] = [
  { id: 1, title: 'Изучить Vue 3', completed: false },
  { id: 2, title: 'Сделать тестовое', completed: false },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const tasksApi = {
  async get(): Promise<Task[]> {
    await delay(500);
    return [...tasks];
  },
  async add(title: string): Promise<Task> {
    await delay(500);
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    tasks.push(newTask);
    return newTask;
  },
  async delete(id: number): Promise<void> {
    await delay(500);
    tasks = tasks.filter(task => task.id !== id);
  },
  async update(updatedTask: Task): Promise<Task> {
    await delay(500);
    tasks = tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    return updatedTask;
  },
}; 