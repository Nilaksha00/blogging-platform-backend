import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING!)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
