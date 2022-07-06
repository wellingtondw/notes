var express = require("express");
var path = require("path");
var logger = require("morgan");

require("dotenv").config();
require("./src/config/database");

var indexRouter = require("./src/routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
