import express from "express";
import env from "dotenv";
import path from "path";
import cors from "cors";
import { connectToMongoDB } from "./config/dbconfig";

const app = express();

env.config();

connectToMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

