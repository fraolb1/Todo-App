import { createTodoSchema, updateTodoSchema } from "../schemas/todoSchema";
import { prisma } from "../index";
import { Request, Response } from "express";
export const createTodo = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description, completed } = createTodoSchema.parse(req.body);
    const todo = await prisma.todo.create({
      data: { title, description, completed },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
};

export const getTodos = async (
  req: Request,
  res: Response
) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export const getTodoById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = updateTodoSchema.parse(req.body);
    const todo = await prisma.todo.update({
      where: { id },
      data: { title, description, completed },
    });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: "Invalid input or Todo not found" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.todo.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Todo not found" });
  }
};
