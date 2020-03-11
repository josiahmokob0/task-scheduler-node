const express = require("express");
const dotenv = require("dotenv");
const cronJob = require("cron");

const Models = require("./models");
const Tasks = require("./lib/tasks/index");
const server = require("./server");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const context = {
  app,
  cronJob,
  db: Models,
}

Tasks(context);
server(app, PORT);
