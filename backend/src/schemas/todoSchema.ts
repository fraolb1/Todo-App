import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z
    .string()
    .max(500, "Description too long")
    .optional()
    .default(""),
  completed: z.boolean().optional().default(false),
});

export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title too long")
    .optional(),
  description: z.string().max(500, "Description too long").optional(),
  completed: z.boolean().optional(),
});
