import { useTodoStore } from "@/store/todoStore";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoItem({ id, title, completed }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleUpdate = () => {
    updateTodo(id, { title: newTitle, completed })
      .then(() => {
        toast.success("Todo updated successfully");
        setIsEditing(false);
      })
      .catch(() => toast.error("Failed to update todo"));
  };

  const toggleComplete = () => {
    updateTodo(id, { completed: !completed })
      .then(() => toast("Todo status updated", { icon: "✅" }))
      .catch(() => toast.error("Failed to update todo status"));
  };

  return (
    <Card className="mb-4 border-2 border-black shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardContent className="flex items-center justify-between p-6">
        {isEditing ? (
          <div className="flex gap-3 w-full mr-4">
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 bg-white text-black border-2 border-black rounded-lg px-4 py-3 text-base focus-visible:ring-2 focus-visible:ring-black"
              autoFocus
            />
            <Button
              onClick={handleUpdate}
              className="bg-black text-white hover:bg-gray-900 px-6 py-3 border-2 border-black"
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={toggleComplete}
              className={`w-6 h-6 rounded border-2 border-black flex items-center justify-center mr-2 transition-colors ${
                completed ? "bg-black" : "bg-white"
              }`}
            >
              {completed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span
              className={`text-lg ${
                completed ? "line-through text-gray-600" : "text-black"
              }`}
            >
              {title}
            </span>
          </div>
        )}
        <div className="flex gap-2 ml-4">
          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="border-2 border-black bg-white text-black hover:bg-gray-100 px-4 py-2 hover:shadow-sm"
            >
              Edit
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={() =>
              deleteTodo(id)
                .then(() => toast.error("Todo deleted", { icon: "🗑️" }))
                .catch(() => toast.error("Failed to delete todo"))
            }
            className="bg-white text-red-600 hover:bg-red-50 border-2 border-red-600 px-4 py-2 hover:shadow-sm"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
