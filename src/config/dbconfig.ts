import mongoose from "mongoose";
import env from "dotenv";

env.config();

export const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.urhy5rh.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    );
    console.log("Database Connected");
  } catch (error) {
    console.error("Error while connecting to the database:", error);
  }
};