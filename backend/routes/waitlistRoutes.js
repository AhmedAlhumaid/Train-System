const express = require('express');
const Train = require('../models/train');
const User = require("../models/user");
const Waitlist = require("../models/waitlist")
const Booking = require("../models/booking")
const router = express.Router();
const jwt = require("jwt-simple");
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"




router.post("/addToWaitlist",async (req,res)=>{
    if (!req.headers["x-auth"]) {
        return res.status(404).json({error: "Missing X-Auth header"});
     }
    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token, SECRET_KEY);
        const {id,num} = req.body; // id is the train id, and num is the number of passengers
        const waitlist = new Waitlist({
            userId:decoded.userId,
            trainId:id,
            numOfPassengers:num,
            joinedAt:new Date()
        });
        await waitlist.save();
        res.status(201).json({"message":"successfully added to the waitlist"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

router.get("/fetchEligibleWaitlists", async (req, res) => {
    try {
        // Fetch all waitlists and trains
        const waitlists = await Waitlist.find({});
        const eligible = [];
        for(const waitlist of waitlists){
            const train  = await Train.findOne({"_id":waitlist.trainId});
            if(train){
                if(train.currentCapacity>=waitlist.numOfPassengers){
                    eligible.push(waitlist)
                }
            }
            
        }
        
        // Send the filtered waitlists
        res.status(200).json(eligible);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/promote-waitlist",async (req,res)=>{
    try{
        console.log("enterd")
        const {id} = req.query;
        console.log(id)
        console.log("after query")
        const waitlist = await Waitlist.findOne({"userId":id});
        console.log(waitlist)
        const train = await Train.findOne({"_id":waitlist.trainId});
        const user = await User.findOne({"_id":id})
        console.log(user,"user found")
        const numOfSeats = waitlist.numOfPassengers;
        const reservedSeats = []; // Array to store reserved seat numbers
        for (const [key, value] of train.seats.entries()) { // Use .entries() for Map
            if (value === true || value === "true") { // Check for boolean or string "true"
                train.seats.set(key, false); // Update the Map: Reserve the seat
                console.log("Changed seat:", key);
                reservedSeats.push(String(key)); // Add seat number to reservedSeats array
                if (reservedSeats.length === numOfSeats) {
                    break; // Stop once we've reserved the required number of seats
                }
            }
        }
        train.users.push(user.firstName);
        user.miles = user.miles+500;
        train.currentCapacity = train.currentCapacity-numOfSeats;
        const booking = new Booking({
            "userId":id,
            "trainId":waitlist.trainId,
            "from":train.from,
            "to":train.to,
            "travelDate":train.date,
            "comparableDate":new Date(),
            "email":user.email,
            "price":train.price,
            "seats":reservedSeats,
            "status":"paid"
        });
        await train.save();
        await user.save();
        await booking.save();
        await Waitlist.deleteOne({"userId":id});
        res.status(200).json({message:"promoted successfully"});
       
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
});

module.exports = router;
