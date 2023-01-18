const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = require("express").Router();
const { Users } = require("../db/adapters/index");
const { JWT_SECRET } = process.env;
const { authRequired } = require("./utils");
//salt  round is the cost faactor is needed a single BCRPy hash
const SALT_ROUNDS = 10;

authRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await Users.createUser({ username, password: hashedPassword });
    console.log(user);
    const token = jwt.sign(user, JWT_SECRET);
    delete user.password;

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({ user, message: "Failed to register" });
  } catch ({ message }) {
    next({ message: "Failed to register" });
  }
});

authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    
    const user = await Users.getUserByUsername(username);
    console.log(user);
    const vP = await bcrypt.compare(password, user.password);
    delete user.password;

    if (vP) {
      const token = jwt.sign(user, JWT_SECRET);
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      delete user.password;
      res.send({ user });
    } else {
      next({ message: "WRONG USERNAME OR PASSWORD TRY AGAIN" });
    }
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "YOU ARE LOGGED OUT",
    });
  } catch ({ message }) {
    next({ message: "YOU ARE LOGGED OUT" });
  }
});



authRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
