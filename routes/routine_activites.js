const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const { getRoutineById } = require("../db/adapters/routines");
const {
  addActivityToRoutine,
  getRoutineActivtyByid,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activites");
const { authRequired } = require("./utils");
const routineActivitiesRouter = express.Router();

routineActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const rA = await addActivityToRoutine(req.body);
    if (rA) {
      res.send({ rA });
    } else {
      res.status(400);
      next({ message: "Routine activity causing error" });
    }
  } catch ({ message }) {
    next({ message });
  }
});
