const express = require("express");
const dotenv = require("dotenv");
const cronJob = require("cron");

const Models = require("./models");
const router = require('./lib/index');
const server = require("./server");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const context = {
  app,
  cronJob,
  db: Models,
}

router(context);

server(app, PORT);
