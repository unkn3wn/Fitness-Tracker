const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = require("express").Router();
const {User} = require("../db/models");
const {JWT_SECRET} = require("../secrets");
const {authRequired} = require("./utils");
//salt  round is the cost faactor is needed a single BCRPy hash
const SALT_ROUNDS = 10;

authRouter.post("/register", async(req, res, next)=>{
    try{
        const {username, password} = req.body;

        const hasedPawwd = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.createUser({username, password:hashedPassword});

        delete user.password;
        const token = jwt.sign(user, JWT_SECRET);

        res.cookie("token", token,{
            sameSite:"strict",
            httpOnly:true,
            signed:true,
        });
        res._construct.send({user});


    }catch(error){
        next(error)
    }
})

authRouter.post("/logout", async(req, res, next)=>{
    try{
        res.clearCookie("token", {
            sameSite:"strict",
            httpOnly:true,
            signed: true,
        });
    }catch(error){
        next(error);
    }
})
authRouter.get("/me", authRequried, async(req, res, next)=>{
    try{
        res.send(req.user);
    }catch(error){
        next(error)
    }
})

module.exports = authRouter;