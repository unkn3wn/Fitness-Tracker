const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
} = require("../db/adapters/routines");
const { testRoutines } = require("../db/seedData");
const { authRequired } = require("./utils");
const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {
  try {
    const all = await getAllPublicRoutines();
    res.send(all);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { is_public, name, goal } = req.body;
    const { id } = req.user;
    const testRoutines = {
      creator_id: id,
      is_public,
      name,
      goal,
    };

    const pR = await createRoutine(testRoutines);
    if (pR) {
      res.send({ pR });
    } else {
      res.status(400);
      next({ message: "Error!" });
    }
  } catch ({ message }) {
    next({ message });
  }
});

routinesRouter.patch("/:routineId", async (req, res, next) => {});

// routinesRouter.delete("/routineId", authRequired, async (req, res, next) => {
//   try {
//     const deleteP = await getRoutineById(req.params.routineId);

//     if (deleteP && deleteP.creator_id === req.user.id) {
//       const updatedR = await updateRoutine(routine.id, {
//         is_public: false,
//       });

//       res.send(updateR);
//     } else {
//       next(
//         deleteP
//           ? {
//               name: "UnauthorizedUserError",
//               message: "You cannot delete a routine which is not yours",
//             }
//           : {
//               name: "RoutinetNotFoundError",
//               message: "This routine does not exist",
//             }
//       );
//     }
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

module.exports = routinesRouter;
