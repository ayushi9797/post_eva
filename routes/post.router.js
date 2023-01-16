const { response } = require("express");
const express=require("express");
const { postModel } = require("../models/post.model")
const app = express();
const postRouter=express.Router();
app.use(express.json());

postRouter.get("/",async(req,res)=>{
    let userId=req.body.userID;
   try {
    let data = await postModel.find({userID:userId});
    res.send({data:data});
    
   } catch (error) {
    res.send({error:error.message})
   }
})
postRouter.post("/add",async(req,res)=>{
     
    try {
        let data = await new postModel(req.body);
        await data.save();
        res.send("post has been added");
    } catch (error) {
        console.log({error:error.message})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    try {
        let id = req.params.id;
        let data = await postModel.findOne({_id:id});
        let user_Id=req.body.userID;
        let post_userid=data.userID;
        if(user_Id==post_userid){
            await postModel.findByIdAndUpdate({_id:id},req.body);
            
            res.send("post has been updated")
        }else{
            res.send({message:"not authorised"})
        }
       
        await data.save();
        res.send("post has been updated");
        
    } catch (error) {
        console.log({error:error.message})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data = await postModel.find({_id:id});
        if(data.length>0){
            let post_userid=data[0].userID;
            let user_Id=req.body.userID;
            if(post_userid==user_Id){
                await postModel.findByIdAndDelete({_id:id});
                res.send("post has been deleted");
            }else{
                res.send({message:"You are not authorised"})
            }
        }else{
            res.send({message:"no id found"})
        }
        
    } catch (error) {
        console.log({error:error.message})
    }
})

module.exports={postRouter}