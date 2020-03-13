const express = require("express");
const dotenv = require("dotenv");
const CronJob = require("cron").CronJob;
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { db, sequelize, Op } = require("./models");
const router = require('./lib/index');

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());


const context = {
  app,
  CronJob,
  db,
  PORT,
  sequelize,
  Op,
  passport,
  LocalStrategy,
}

router(context);

module.exports = {
  context,
}
