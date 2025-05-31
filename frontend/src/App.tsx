import { useEffect } from "react";
import { useTodoStore } from "./store/todoStore";
import TodoForm from "./components/custom/TodoForm";
import TodoItem from "./components/custom/TodoItem";
import { toast, Toaster } from "sonner";

export default function App() {
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos()
      .then(() => toast.success("Todos loaded"))
      .catch(() => toast.error("Failed to fetch todos"));
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-black tracking-tight">
            Todo List
          </h1>
          <p className="text-gray-600">What will you accomplish today?</p>
        </header>

        <div className="space-y-6">
          <TodoForm />

          <div className="space-y-4">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">
                  No todos yet. Add one to get started!
                </p>
              </div>
            )}
          </div>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            className: "border-2 border-black shadow-lg",
            style: {
              background: "white",
              color: "black",
            },
          }}
        />
      </div>
    </div>
  );
}
