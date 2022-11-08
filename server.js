const http = require("http");

const {PORT = 8080} = process.env;

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`port ${PORT}`)
})

// require("dotenv").config();

// const express = require("express");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const {COOKIE_SECRET} = process.env;
// const {authRequired} = require("./routes/utils");
// const client = require("./db/client");

// const app = express();
// const PORT = 8080;

// client.connect();

// const router = require("./routes");
// const { server } = require("http");
// //Middleware

// app.use(morgan("dev"));
// app.use(cookieParser(COOKIE_SECRET));
// app.use(express.json());

// //routers
// app.use("/api", router);
// app.get("/test", authRequired, (req, res, next)=>{
//     res.send("You are auth")
// })
// console.log("server running")
// //EROR HANDLER
// app.use((err,req,res,next)=>{
//     res.status(500).send(err);
// })


// server.listen(PORT,()=>{
//     console.log(`APP LISTENING ON PORT ${PORT}`)
// })