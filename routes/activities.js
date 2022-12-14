const express = require("express");

const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Activity, Routine } = require("../db/adapters/index");

const { authRequired } = require("./utils");
const { getActivityById } = require("../db/adapters/activities");
const actRouter = express.Router();

//getting all activities

actRouter.get("/", async (req, res, next) => {
  console.log("made it into get all activities");
  try {
    const aA = await Activity.getAllActivities();
    res.send(aA);
  } catch (error) {
    next(error);
  }
});

actRouter.get("/:activityId", async(req,res,next)=>{
  const {activityId} = req.params;
  try{
    const oneActivity = await Activity.getActivityById(activityId);
    res.send(oneActivity);
  }catch(error){
    next(error);
  }
} )

//creating a new activity so we use the authRequired

actRouter.post("/", authRequired, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const ardb = { name, description };
    const acti = await Activity.createActivities(ardb);
    if (acti) {
      res.send(acti);
    } else {
      //else if bad connection we send error 400 for bad connection
      res.status(400);
      next({ message: "CANT MAKE ACTIVITY" });
    }
  } catch ({ message }) {
    next({message:"SIGN IN TO UPDATE OR CREATE AND ACTIVITY"});
  }
});

actRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }

  try {
    const oA = await Activity.getActivityById(activityId);
    if (oA.creator_id === req.user.id) {
      const uA = await Activity.updateActivity(activityId, updateFields);
      res.send({ activity: uA });
    } else {
      next({
        name: "not auth",
        message: "cannt update activity that is not yours",
      });
    }
  } catch ({message}) {
    next({message:"cannt update activity that is not yours"})
  }
});

// //public routines which feature that activty
actRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const rB = await Routine.getPublicRoutinesByActivity(activityId);

    if (rB) {
      res.send({ routines: rB });
    } else {
      next({
        name: "there isn't any routines",
        message: "there is no link with activity and routine",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = actRouter;
