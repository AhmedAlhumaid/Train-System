const express = require('express');
const Booking = require('../models/booking');
const User = require("../models/user")
const jwt = require("jwt-simple");
const router = express.Router();
//JWT secret key
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"

router.post("/newBooking", async (req,res)=>{
    const {trainObject,seats} = req.body;
    console.log(trainObject,seats)
    if (!req.headers["x-auth"]) {

        return res.status(404).json({error: "Missing X-Auth header"});
     }
    const token = req.headers["x-auth"]
    try{
        
        const decoded = jwt.decode(token, SECRET_KEY);
        if(await Booking.findOne({"userId":decoded.userId})){
            return res.status(404).json({error:"You have an available booking"})
        }
        const user = await User.findOne({"_id":decoded.userId});
        
        const newBooking = new Booking({
            "userId":user._id,
            "trainId":trainObject._id,
            "from":trainObject.from,
            "to":trainObject.to,
            "travelDate":trainObject.date,
            "price": trainObject.price,
            "seats":seats,
            "status":"paid"
        });
        await newBooking.save();
        res.status(201).json({message:"booking created successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:err.message})

    }
});

router.get("/getBooking",async (req,res)=>{
    if (!req.headers["x-auth"]) {
        return res.status(404).json({error: "Missing X-Auth header"});
     }
    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token, SECRET_KEY);
        const booking = await Booking.findOne({"userId":decoded.userId});

        if(!booking){
            return res.status(404).json({error:"no booking exists with the given ID"})
        }
        res.status(200).json(booking);
    }
    catch(err){
        console.log(err);
       return res.status(500).json({error:err.message})
    }
});
module.exports = router;
