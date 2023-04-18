import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)


    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id},})
        }catch(err){
            next(err)
        }
    res.status(200).json(savedRoom)
    }catch(err){

    }
}