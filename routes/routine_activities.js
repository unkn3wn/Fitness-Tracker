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
} = require("../db/adapters/routine_activities");
const { authRequired } = require("./utils");
const routineActivitiesRouter = express.Router();
routineActivitiesRouter.post("/", async (req, res, next) => {
  try {
    const rA = await addActivityToRoutine(req.body);
    if (rA) {
      res.send(rA);
    } else {
      res.status(400);
      next({ message: "Routine activity causing error" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

routineActivitiesRouter.patch(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;
    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }
    if (duration) {
      updateFields.duration = duration;
    }
    try {
      const oRa = await getRoutineActivtyByid(routineActivityId);
      const oR = await getRoutineById(oRa.routine_id);
      if (oR.creator_id === req.user.id) {
        const uRa = await updateRoutineActivity(
          routineActivityId,
          updateFields
        );
        res.send({ routine: uRa });
      } else {
        next({
          name: "User error unauthorized",
          message: "You cannot update routine_activity through this user",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      const dRa = await getRoutineActivtyByid(req.params.routineActivityId);
      console.log(dRa);
      const rO = await getRoutineById(dRa.routine_id);
      if(dRa && rO.creator_id === req.user.id){
        destroyRoutineActivity(req.params.routineActivityId)
        res.send({Deleted: dRa})
      }else{
        next(routine 
          ?{
            name:"NOT AUTH", 
            message:"cant edit post", 
           }
          :{
            name:"NOT FOUND",
            message:"CANT DELETE POST THAT DOESNT EXIT "
           }
          );
      }

    }catch({name, message}){
      next({name, message})
    }

  });

module.exports = routineActivitiesRouter;
