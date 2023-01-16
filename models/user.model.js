const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{required:true,type:String},
    email:{required:true,type:String},
    gender:{required:true,type:String},
    password:{required:true,type:String}

})

const Usermodel=mongoose.model("users",userSchema);
module.exports={Usermodel}