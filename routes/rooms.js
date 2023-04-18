import express  from "express";
import { createRoom } from "../controllers/room.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()
//create room

router.post("/:hotelId", verifyAdmin, createRoom) 


//update collection/document starts here
router.put("/:id", verifyAdmin, async (req,res,next) => {
    try{
    //savr room in database
    const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    res.status(200).json(updateRoom)
    }catch(err){
        next(err)
    }
})
//update ends here


//update collection or room for the reserving purposes
router.put("/availability/:id", async (req,res,next) => {
    try {
        await Room.updateOne(
          { "roomNumbers._id": req.params.id },
          {
            $push: {
              "roomNumbers.$.unavailableDates": req.body.dates
            },
          }
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
})
//update room reserve ends here


//delete room starts here
router.delete("/:id/:hotelId", verifyAdmin, async (req,res,next) => {
    const hotelId = req.params.hotelId;

    //delete from hotel database
    try{
        await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id},})
    }catch(err){
        next(err)
    }
    try{
    //delete database
    await Room.findByIdAndDelete(req.params.id)
    res.status(200).json("Room has been deleted")
    }catch(err){
       next(err)
    }
})
//delete room ends here

//get room starts here
router.get("/:id", async (req,res,next) => {
    try{
    //savr room in database
    const room = await Room.findById(req.params.id)
    res.status(200).json(room)
    }catch(err){
        next(err)
    }
})
//get a room ends here


//get all rooms starts here
router.get("/", async (req,res,next) => {
    try{
    //savr room in database
    const rooms = await Room.find()
    res.status(200).json(rooms)
    }catch(err){
        next(err)
    }
})
//get all rooms ends here
export default router

