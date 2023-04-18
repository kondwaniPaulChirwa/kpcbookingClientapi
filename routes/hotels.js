import express  from "express";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import Room from "../models/Room.js";

const router = express.Router()

//create hotel
router.post("/", verifyAdmin, async (req,res,next) => {

    //getting data about hotel
    const newHotel = Hotel(req.body)
    try{
    //savr hotel in database
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
})
//create ends here

//update collection/document starts here
router.put("/:id", verifyAdmin, async (req,res,next) => {
    try{
    //savr hotel in database
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    res.status(200).json(updateHotel)
    }catch(err){
        next(err)
    }
})
//update ends here


//delete hotel starts here
router.delete("/:id", verifyAdmin, async (req,res,next) => {
    try{
    //delete database
    await Hotel.findByIdAndDelete(req.params.id)
    res.status(200).json("Hotel has been deleted")
    }catch(err){
       next(err)
    }
})
//delete hotel ends here

//get hotel starts here
router.get("/find/:id", async (req,res,next) => {
    try{
    //savr hotel in database
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
})
//get a hotel ends here


//get all hotels starts here
router.get("/", async (req,res,next) => {
    try{
    //savr hotel in database
    const hotels = await Hotel.find(req.query).limit(3)
    res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
})
//get all hotels ends here


//get hotels by city starts here
router.get("/countByCity", async (req,res,next) => {
    const cities = req.query.cities.split(",")
    try{
    const list = await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city})
    }))
    res.status(200).json(list)
    }catch(err){
        next(err)
    }
})
//get hotels by City ends here




//get hotels by city starts here
router.get("/countByType", async (req,res,next) => {

    try{
        const hotelCount = await Hotel.countDocuments({type:"Hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resoltCount = await Hotel.countDocuments({type:"resolt"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
    res.status(200).json([
        {type:"hotel", count:hotelCount},
        {type:"apartment", count:apartmentCount},
        {type:"resort", count:resoltCount},
        {type:"villa", count:villaCount}
    ])




    }catch(err){
        next(err)
    }
})
//get hotels by City ends here


//get searched hotels starts here
router.get("/findhotels/", async (req,res,next) => {
    const {min,max,city} = req.query
    try{
    //savr hotel in database
    const hotels = await Hotel.find({city, cheapestPrice:{$gt:min || 0, $lt:max || 2000000}})
    res.status(200).json(hotels)
    }catch(err){
        next(err)
    }
})
//get searched hotels ends here

//get specific hotel to fetch a specific room
router.get("/room/:id", async (req,res,next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }catch(err){
        next("noooo")
    }
})
//get searched hotels ends here
export default router