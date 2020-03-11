import express from "express";
import dotenv from "dotenv"
import cronJob from "cron";
import Models from "./models";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const context = {
  app,
  cronJob,
  db: Models,
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
