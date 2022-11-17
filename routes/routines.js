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

routinesRouter.get("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const oneRoutine = await Routine.getRoutineById(routineId);
    res.send(oneRoutine);
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
  try {
    const routine = await Routine.getRoutineById(req.params.routineId);

    if(routine && routine.creator_id === req.user.id){

      const uR = await Routine.destroyRoutine(routine.id,{
        is_public:false,
      });
      res.send(uR);
    }else{
      next(
        routine
        ?{
          name: "YOU ARE NOT AUTH",
          message:"CANT DELTE WHATS NOT YOURS",
         }
        :{
          name:"ROUTE NOT FOUND",
          message:"DOES NOT EXIST"
        }
      )
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routinesRouter;
