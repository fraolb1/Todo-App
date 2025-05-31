import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const { title, completed } = createTodoSchema.parse(req.body);
    const todo = await prisma.todo.create({
      data: { title, completed },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
});

router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, completed } = updateTodoSchema.parse(req.body);
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid input or Todo not found" });
  }
});

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
