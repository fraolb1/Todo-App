import { create } from "zustand";
import axios from "axios";
import { z } from "zod";

const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  completed: z.boolean(),
  createdAt: z.string(),
});

type Todo = z.infer<typeof todoSchema>;

interface TodoState {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, description: string) => Promise<void>;
  updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  fetchTodos: async () => {
    const response = await axios.get("http://backend:5000/api/todos");
    set({ todos: response.data });
  },
  addTodo: async (title, description) => {
    const response = await axios.post("http://backend:5000/api/todos", {
      title,
      description,
    });
    set((state) => ({ todos: [...state.todos, response.data] }));
  },
  updateTodo: async (id, updates) => {
    const response = await axios.put(
      `http://backend:5000/api/todos/${id}`,
      updates
    );
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? response.data : todo)),
    }));
  },
  deleteTodo: async (id) => {
    await axios.delete(`http://backend:5000/api/todos/${id}`);
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  },
}));
