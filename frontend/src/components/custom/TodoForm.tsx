import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTodoStore } from "@/store/todoStore";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title)
        .then(() => toast.success("Todo created successfully"))
        .catch(() => toast.error("Failed to create todo"));
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-8 w-full max-w-2xl mx-auto"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 bg-white text-black border-black border-2 rounded-lg px-4 py-6 text-lg shadow-sm hover:shadow-md transition-shadow focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      />
      <Button
        type="submit"
        className="bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg font-medium rounded-lg border-2 border-black shadow-sm hover:shadow-md transition-all transform hover:scale-105 active:scale-95"
      >
        Add
      </Button>
    </form>
  );
}
