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
      updateFields.duration = count;
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
      const { routineActivityId } = req.params;
      const routine = await getRoutineActivtyByid(routine);
      const oR = await getRoutineById(routineActivityId.routine_id);
      if (oR.creator_id === req.user.id) {
        destroyRoutineActivity(routineActivityId);
        res.send({ Deleted: routine });
      } else {
        next(
          routine
            ? {
                name: "User error Unauthorized",
                message: "You cannot delete routine_activity through this user",
              }
            : {
                name: "Error, routine_activity not found",
                message: "Routine_activity does not exist",
              }
        );
      }
    } catch ({ message, name }) {
      next({ name, message });
    }
  }
);

module.exports = routineActivitiesRouter;
