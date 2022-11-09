const jwt = require("jsonwebtoken");
const {JWT_SECRET}= process.env;

const authRequired = (req, res, next)=>{
    const token = req.signedCookies.token;
    console.log("cookie token:", token)
    try{
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
    }catch(error){
    res.status(401).send({
        loggedIn: false,
        message:"not auth",
    });
    return;       
}
next();
}

module.exports ={
    authRequired
}