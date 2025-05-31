import { Router } from "express";
import { prisma } from "../index";
import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema";
import { createTodo, getTodoById, getTodos } from "../controller/todos.controller";

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.put("/:id", getTodoById);

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.todo.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
});

export default router;
