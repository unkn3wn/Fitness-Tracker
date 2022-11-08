const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { client } = require("./db/client");
const { Router } = require("express");
const { COOKIE_SECRET } = process.env;
const app = express();
const PORT = 8080;

require("dotenv").config();
client.connect();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use("routes", Router);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log(`PORT is ${PORT}`);
});
