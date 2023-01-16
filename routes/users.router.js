const { response } = require("express");
const express=require("express");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const app = express();
const {Usermodel}=require("../models/user.model");
let jwt = require("jsonwebtoken")
const userRouter=express.Router();
app.use(express.json());
userRouter.post("/register",async(req,res)=>{
    let {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password, 7, async(err, secure_password)=> {
            // Store hash in your password DB.
            if(err){
                res.send({err:err})
            }else{
                let user=await new Usermodel({name,email,gender,password:secure_password});
                await user.save();
                res.send({message:`user has successfully registered`});
            }

        });
    } catch (error) {
        res.send({message:error.message})
    }

});
userRouter.post("/login",async(req,res)=>{
    
    try {
        let {email,password}=req.body;
        // console.log(email,password)
        let data = await Usermodel.find({email});
        // console.log(data)
        
        // console.log(userID)
        // console.log(data);
        if(data.length>0){
            let dec_password=data[0].password;
            let userID=data[0]._id
            bcrypt.compare(password, dec_password, (err, result) =>{
                // result == true
                if(err){
                    res.send({message:err})
                }else{
                    if(result){
                        let token=jwt.sign({userID},"admin");
                        res.send({message:"Logged in",token,userdata:data});
                    }else{
                        res.send({message:"Wrong Credentials"})
                    }
                }
            });
        }else{
            res.send({message:"Please do registration first"})
        }
        

        
    } catch (error) {
        res.send({error:error.message})
    }
})

module.exports={userRouter}