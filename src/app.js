const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("combined"));

const zooRoutes = require("./routes/zooRoutes");

app.use(zooRoutes);

module.exports = app;
