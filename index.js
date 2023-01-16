const express = require("express");
const mongoose = require("mongoose");
const { connection } = require("./config/db");
const { auth } = require("./middlewares/auth.middleware");


const  cors=require("cors");
const { postRouter } = require("./routes/post.router");
const { userRouter } = require("./routes/users.router");
require("dotenv").config();
connection
const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to db");
        
    } catch (error) {
        console.log({message:error.message});
    }
    console.log("server has started")
})