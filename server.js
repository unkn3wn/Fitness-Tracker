require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { client } = require("./db/client");

const { COOKIE_SECRET } = process.env;
const app = express();
const PORT = 8495;
client.connect();


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.get("/test",(req,res)=>{
  res.send("hello");
})

const routes = require('./routes')
app.use("/routes", routes);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log(`PORT is ${PORT}`);
});
