const express = require('express');
const mongoose = require("mongoose");
const Booking = require('../models/booking');
const Train = require('../models/train');
const User = require("../models/user")
const jwt = require("jwt-simple");
const router = express.Router();
const sendMail = require("../mailer.js");
const { lchown } = require('fs');
const ObjectId = mongoose.Types.ObjectId;

//JWT secret key
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"

router.post("/newBooking", async (req,res)=>{
    const {trainObject,seats} = req.body;
    
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
        //if query is empty means the user paid, else the user did not pay
        const status = Object.keys(req.query.status || {}).length === 0 ? "paid" : "not paid";
        if(status=="not paid"){
            const recipientEmail = user.email; 
            //send email to the recipient 
            await sendMail(recipientEmail,
                "Ticket Payment Reminder",
                "Hi, you have not paid for your ticket yet!"
            )
            console.log("Reminder email sent to:", recipientEmail);
        }
         // Parse travelDate (yyyymmdd) and departureTime into a Date object
         const travelDate = trainObject.date; // Example: "20250101"
         const departureTime = trainObject.departureTime; // Example: "11:43 PM"
         const formattedDate = `${travelDate.substring(0, 4)}-${travelDate.substring(4, 6)}-${travelDate.substring(6, 8)}`;
         const combinedDateTime = `${formattedDate} ${departureTime}`;
         const comparableDate = new Date(combinedDateTime);

        const newBooking = new Booking({
            "userId":user._id,
            "trainId":trainObject._id,
            "from":trainObject.from,
            "to":trainObject.to,
            "travelDate":trainObject.date,
            "comparableDate":comparableDate,
            "email":user.email,
            "price": trainObject.price,
            "seats":seats,
            "status":status
        });
        user.miles = user.miles+500;
        await user.save();
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
router.delete("/cancelBooking",async(req,res)=>{ //this is for the passenger 
    if (!req.headers["x-auth"]) {
        return res.status(404).json({error: "Missing X-Auth header"});
     }
    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token, SECRET_KEY);
        const booking = await Booking.findOne({"userId":decoded.userId});
        await Booking.deleteOne({"userId":decoded.userId});
        res.status(200).json(booking);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});


/**
 * ==========================
 * ADMIN-SPECIFIC ENDPOINTS
 * ==========================
 */

// get all Booking for admin
router.get("/allBooking", async (req, res) => {
    try {
      const booking = await Booking.find();
      res.status(200).json(booking);
    } catch (err) {
      console.error("Error fetching booking data:", err);
      res.status(500).json({ error: "Failed to fetch booking data" });
    }
  });

  router.post("/addBooking", async (req, res) => {
    const { userId, trainId, seatNumber } = req.body;
    console.log("here1")
  
    try {
      // Validate input
      if (!userId || !trainId || !seatNumber) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      console.log("here2")

      // Fetch train data
      const train = await Train.findById(trainId);
      if (!train) {
        return res.status(404).json({ error: "Train not found" });
        console.log("hereERROR")

      }
      console.log("here3")

      // Fetch user data
      const user = await User.findById(userId);
      if (!user) {
        console.log("hereERROR1")

        return res.status(404).json({ error: "User not found" });

      }
   
      // Add the user to the train's user list and update capacity
      train.users.push(user.firstName);
      train.currentCapacity -= 1;
  
      // Mark the seat as reserved
      train.seats.set(seatNumber, false);
      console.log("here4")

      // Save updated train data
      await train.save();
      
      // Check if the seat is already booked
      const existingBooking = await Booking.findOne({
        trainId: new ObjectId(trainId),
        seats: { $in: [seatNumber] },
      });
  
      if (existingBooking) {
        console.log("hereERROR")
        return res.status(400).json({ error: "Seat already booked" });
      }
  
      // Create a new booking
      const newBooking = new Booking({
        userId: userId,
        trainId: trainId,
        from: train.from,
        to: train.to,
        travelDate: train.date, // Assuming train.date exists
        comparableDate: new Date(parseDateFromString(train.date)), // Convert travelDate to a Date object
        email: user.email, // Assuming user has an email field
        price: train.price, // Assuming train has a price field
        seats: [seatNumber],
        status: "Paid", // Default status
      });
  
      // Save booking to the database
      await newBooking.save();
      console.log("here5")

      res.status(201).json({
        message: "Booking created successfully",
        booking: newBooking,
      });
    } catch (error) {
      console.error("Error adding booking:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

 router.delete("/deleteBooking",async (req,res)=>{
    try{
        const {userId} = req.query;
        const booking = await Booking.findOne({"userId":userId});
        const trainId = booking.trainId;
        const bookedSeats = booking.seats;
        const train = await Train.findOne({"_id":trainId});
        const user = await User.findOne({"_id":userId});
        const name = user.firstName;
        train.currentCapacity = train.currentCapacity+ bookedSeats.length; 
        const index = train.users.findIndex(user=> user === name);
        if(index!==-1){
            train.users.splice(index,1); //delete the user
            }
        for(const seat of bookedSeats){
                train.seats.set(seat, true); 
              }    
        await Booking.deleteOne({"userId":userId});// delete the booking      
        await train.save();// save the modifications
        return res.status(200).json({message:"Updated Successfully After Cancel"});
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
 }) 
  
const parseDateFromString = (dateString) => {
    const year = parseInt(dateString.slice(0, 4), 10); // Extract year
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // Extract month (0-based index)
    const day = parseInt(dateString.slice(6, 8), 10); // Extract day
    return new Date(year, month, day); // Create a new Date object
  };

module.exports = router;




/// Admin End-Points