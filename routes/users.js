import express  from "express";
import User from "../models/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()


//authntication nonsese
//router.get("/getAuth", verifyToken, (req,res,next) => {
//    res.send("hello user")
//})

//router.get("/checkuser/:id", verifyUser, (req,res,next) => {
//    res.send("hello user you can delete your account")
//})

//router.get("/checkadmin/:id", verifyAdmin, (req,res,next) => {
//    res.send("hello admin you can delete your account")
//})




//another ends here auth nonsese
//update collection/document starts here
router.put("/:id", verifyUser, async (req,res,next) => {
    try{
    //savr user in database
    const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    res.status(200).json(updateUser)
    }catch(err){
        next(err)
    }
})
//update ends here


//delete user starts here
router.delete("/:id",verifyUser, async (req,res,next) => {
    try{
    //delete database
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
    }catch(err){
       next(err)
    }
})
//delete user ends here

//get user starts here
router.get("/:id",verifyUser, async (req,res,next) => {
    try{
    //savr user in database
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
    }catch(err){
        next(err)
    }
})
//get a user ends here


//get all users starts here
router.get("/",verifyAdmin, async (req,res,next) => {
    try{
    //savr user in database
    const users = await User.find()
    res.status(200).json(users)
    }catch(err){
        next(err)
    }
})
//get all users ends here
export default router