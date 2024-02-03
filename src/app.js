const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(express.json());

const zooRoutes = require("./routes/zooRoutes");

app.use("/animals", zooRoutes);

module.exports = app;
