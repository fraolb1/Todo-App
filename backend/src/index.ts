import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import todoRoutes from "./routes/todo.route";

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
