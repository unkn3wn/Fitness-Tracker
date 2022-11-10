const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const { Routine } = require("../db/adapters/index");
const { authRequired } = require("./utils");
const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {
  try {
    const all = await Routine.getAllPublicRoutines();
    res.send(all);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { is_public, name, goal } = req.body;
    const { id } = req.user;
    //my data = mD = my routine data so a new one
    const mD = {
      creator_id: id,
      is_public,
      name,
      goal,
    };
    const theRoutine = await Routine.createRoutine(mD);
    if (theRoutine) {
      res.send(theRoutine);
    } else {
      res.status(400);
      next({ message: "NOT ABLE TO MAKE ROUTINE" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

//what we will update
routinesRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  const { is_public, name, goal } = req.body;
  const updateFields = {};

  if (is_public) {
    updateFields.is_public = is_public;
  }

  if (name) {
    updateFields.name = name;
  }

  if (goal) {
    updateFields.goal = goal;
  }
  try {
    const oR = await Routine.getRoutineById(routineId);
    console.log(oR);
    if (oR.creator_id === req.user.id) {
      const uR = await Routine.updateRoutine(routineId, updateFields);
      res.send({ routine: uR });
    } else {
      next({
        name: "UNAUTH",
        message:
          "YOU CAN UPDATE THIS ONE BECAUSE ITS NOT YOUR OR PLEASE CREATE OR REGISTER AN ACCOUNT",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  console.log("made to delete");
  try {
    const { routineId } = req.params;
    console.log(routineId);

    const routi = await Routine.getRoutineById(req.params.routineId);
    console.log(routi);
    if (routi && routi.creator_id === req.user.id) {
      const uR = await Routine.destroyRoutine(routi.id);
      res.send({ routine: uR });
    } else {
      next(
        routine
          ? {
              name: "UNAUTH",
              message: "NOT ABLE TO DELETE",
            }
          : {
              name: "ROUT NOT FOUND",
              message: "NOT ABLE TO FIND",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routinesRouter;
