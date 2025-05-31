import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTodoStore } from "@/store/todoStore";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, description)
        .then(() => toast.success("Todo created successfully"))
        .catch(() => toast.error("Failed to create todo"));
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mb-8 w-full max-w-2xl mx-auto"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="bg-white text-black border-black border-2 rounded-lg px-4 py-3 text-lg shadow-sm"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="bg-white text-black border-black border-2 rounded-lg px-4 py-3 text-base shadow-sm"
      />
      <Button
        type="submit"
        className="bg-black text-white hover:bg-gray-900 px-8 py-4 text-lg font-medium rounded-lg border-2 border-black"
      >
        Add
      </Button>
    </form>
  );
}
