const express = require("express");
const healthRouter = express.Router();

healthRouter.use((req, res, next) => {
  console.log("A request is being made to /health");

  res.send({ message: "A message from /health" });
});

module.exports = healthRouter;
