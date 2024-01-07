import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import blogsRoutes from "./routes/blogs";
import usersRoutes from "./routes/users";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

//user routes
app.use("/api/users", usersRoutes);

// blogs routes
app.use("/api/blogs", blogsRoutes);

// handle undefined endpoints
app.use((req, res, next) => {
  next(Error("Route not found"));
});

// error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = "An unknown error occured";
  if (error instanceof Error) errorMsg = error.message;
  res.status(500).json({ error: errorMsg });
});

export default app;
