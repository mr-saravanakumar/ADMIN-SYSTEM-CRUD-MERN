const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userModel=require("./models/User.js");
const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/Practice",
  {useNewUrlParser: true}
  );

 
  app.post("/adduser",async(req,res)=>{
    const {username,password} = req.body;
    const existing=await userModel.findOne({username: username})
    if(existing)
    {
      res.json({message: "user already exists..."});
    }  
    else{
      const user=new userModel({
        username: username,
        password:password,
      })
      await user.save();
      res.json({message: "user created"});
    }
    }
  )


  app.get("/fetchdata",async(req,res) => {
      try{
        const data=await userModel.find({});
        if(data.length>0) {
        res.json(data);
      }
      else{
        res.json({message:"no data found..."})
      }
    }
      catch(err) {
        res.send(err);
      }  
  })

  app.delete("/deleteuser/:id",(req,res)=>{
    const id=req.params.id;
    try{
      userModel.findByIdAndDelete(id).exec();
      res.json({message:"user deleted..."})
    }
    catch(err){
      res.json(err);
    }
  })


  app.put("/updateuser",async(req,res)=>{
    const {newusername,id}=req.body;
    try{
      // console.log(newusername+id);
       await userModel.findByIdAndUpdate(id,
      {username:newusername}
      );
      res.send({message:"user updated"})
    }
    catch(err){
      console.log(err)
    }
  });
    
  app.listen(3001,()=>{
   console.log("server started")
  });