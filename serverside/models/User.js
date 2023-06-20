const mongoose=require("mongoose");
const express=require("express");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const userModel=mongoose.model("users",userSchema);

module.exports=userModel;