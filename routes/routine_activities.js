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

routineActivitiesRouter.post("/", authRequired, async (req, res, next) => {
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
  "/:routineId/:activityId",
  async (req, res, next) => {
    const { routineId } = req.params;
    const { activityId } = req.params;
    const { count } = req.body;
    const { duration } = req.body;
    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }

    if (duration) {
      updateFields.duration = duration;
    }

    try {
      const uRA = updateRoutineActivity(
        routineId,
        activityId,
        updateFields.count,
        updateFields.duration
      );
      res.send({ routAct: uRA });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineId/:activityId",
  authRequired,
  async (req, res, next) => {
    try {
      const dRA = destroyRoutineActivity(
        req.params.routineId,
        req.params.activityId
      );
      res.send({ rActivities: dRA });

      next(
        rActivities
          ? {
              name: "NOT AUTH",
              message: "CANT DELETE A ROUTINE THAT IS NOT YOURS",
            }
          : {
              name: "NO ROUTINE FOUND",
              message: "ROUTINE ACTIVITY DOES NOT EXIST",
            }
      );
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = routineActivitiesRouter;
