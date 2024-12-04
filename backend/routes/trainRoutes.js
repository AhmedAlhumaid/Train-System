const express = require('express');
const Train = require('../models/train');
const User = require("../models/user");
const router = express.Router();
const jwt = require("jwt-simple");
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"
// Get trains based on search criteria
router.get('/trainList', async (req, res) => {
  try {
    const { from, to, date } = req.query;
  
    // Convert 'date' from 'yyyy-mm-dd' to 'yyyymmdd'
    const formattedDate = date.replace(/-/g, '');
    if (!from || !to || !date ) {
      return res.status(400).json({ error: 'From, To, and Quota fields are required' });
    }

    const trains = await Train.find({
      from: new RegExp(`^${from}$`, 'i'),
      to: new RegExp(`^${to}$`, 'i'),
      date:formattedDate,
    });

    if (trains.length === 0) {
      return res.status(404).json({ message: 'No trains found for the given criteria' });
    }

    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/train",async (req,res)=>{
  try{
    const {id} = req.query;
    const train = await Train.findOne({"_id":id});
    if(!train){
     return res.status(404).json({message:"no train with the given id is found"})
    }
    res.status(200).json(train)
  }
  catch(err){
    console.log(err)
  }
});

router.post("/addPassenger",async(req,res)=>{
  try{
    if (!req.headers["x-auth"]) {
      return res.status(404).json({error: "Missing X-Auth header"});
   }
    const {trainID,selectedSeats} = req.body; 
    const token = req.headers["x-auth"]
    const decoded = jwt.decode(token,SECRET_KEY);
    const user = await User.findOne({"_id":decoded.userId})
    const train = await Train.findOne({"_id":trainID});
    train.users.push(user.firstName);
    let numberOfSeats = selectedSeats.length;
    train.currentCapacity = train.currentCapacity-numberOfSeats;
    for(const seat of selectedSeats){
      train.seats.set(seat, false); 
    }

    await train.save();
    return res.status(200).json({message:"train updated successfully"})
  }
  catch(err){
    res.status(500).json({error:err.message});
  }
});

router.post("/updateAfterCancel",async (req,res)=>{
  try{
    const booking = req.body;
    const train = await Train.findOne({"_id":booking.trainId});
    const user = await User.findOne({"_id":booking.userId});
    const selectedSeats = booking.seats;
    const name = user.firstName;
    train.currentCapacity = train.currentCapacity+ selectedSeats.length; 
    const index = train.users.findIndex(user=> user === name);
    if(index!==-1){
      train.users.splice(index,1); //delete the user
    }
    for(const seat of selectedSeats){
      train.seats.set(seat, true); 
    }
    await train.save();// save the modifications
   return res.status(200).json({message:"Updated Successfully After Cancel"});

  }
  catch(err){
    res.status(500).json({error:err.message});
  }
})





/**
 * ==========================
 * ADMIN-SPECIFIC ENDPOINTS
 * ==========================
 */

// find trains 
router.get('/adminTrainList', async (req, res) => {
  try {
    const { from, to } = req.query;

    const trains = await Train.find({
      from: new RegExp(`^${from}$`, 'i'),
      to: new RegExp(`^${to}$`, 'i'),
    });

    if (trains.length === 0) {
      return res.status(404).json({ message: 'No trains found for the given criteria' });
    }

    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new train trip
router.post("/addTrain", async (req, res) => {
  try {
    const { name, departureTime, arrivalTime, from, to, date, price, driver, engineer } = req.body;

    // Validate and convert price
    const priceFloat = parseFloat(price);
    if (isNaN(priceFloat) || priceFloat <= 0) {
      return res.status(400).json({ error: "Price must be a positive number." });
    }

    // Validate time format for 24-hour input
    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // 24-hour format validation
    if (!timeRegex.test(departureTime)) {
      return res.status(400).json({ error: `${departureTime} is not a valid 24-hour time format!` });
    }
    if (!timeRegex.test(arrivalTime)) {
      return res.status(400).json({ error: `${arrivalTime} is not a valid 24-hour time format!` });
    }

    // Convert 24-hour format to 12-hour format
    const departureTime12 = convertTo12HourFormat(departureTime);
    const arrivalTime12 = convertTo12HourFormat(arrivalTime);

    // Convert time from 12-hour format to minutes
    const convertToMinutes = (time) => {
      const [hoursMinutes, meridiem] = time.split(" ");
      let [hours, minutes] = hoursMinutes.split(":").map(Number);

      if (meridiem.toUpperCase() === "PM" && hours !== 12) {
        hours += 12; // Convert PM hours to 24-hour format
      }
      if (meridiem.toUpperCase() === "AM" && hours === 12) {
        hours = 0; // Midnight case
      }

      return hours * 60 + minutes;
    };

    // Calculate duration
    const departureMinutes = convertToMinutes(departureTime12);
    const arrivalMinutes = convertToMinutes(arrivalTime12);

    const durationInMinutes =
      arrivalMinutes >= departureMinutes
        ? arrivalMinutes - departureMinutes
        : 1440 - (departureMinutes - arrivalMinutes); // Handle trips past midnight

    const duration = `${Math.ceil(durationInMinutes / 60)} hrs`; // Round up to hours

    // Format date to `yyyymmdd`
    const formattedDate = date.replace(/-/g, "");

        // Create seats Map
        const seats = new Map();
        for (let i = 1; i <= 10; i++) {
          seats.set(i.toString(), true); // Seat numbers as strings with initial availability `true`
        }

    // Create the train
    const newTrain = new Train({
      name,
      departureTime: departureTime12, // Store in 12-hour format
      arrivalTime: arrivalTime12, // Store in 12-hour format
      duration,
      price: priceFloat,
      from,
      to,
      date: formattedDate,
      driver,
      engineer,
      currentCapacity: 10,
      users: [],
      seats:seats
    });

    await newTrain.save();
    res.status(201).json({ message: "Train trip added successfully", train: newTrain });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Helper function to convert 24-hour format to 12-hour format
function convertTo12HourFormat(time24) {
  const [hours24, minutes] = time24.split(":").map(Number);

  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12; // Convert 0 hours to 12 for AM

  const hours12Str = hours12.toString(); // Convert hours to a string for length check

  if(hours12Str.length === 1){
    return `0${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
  else{

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  }
}



// Edit a train trip
router.put("/editTrain/:trainId", async (req, res) => {
  const { trainId } = req.params;
  try {
    const updates = req.body;

    const train = await Train.findByIdAndUpdate(trainId, updates, { new: true });
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    res.status(200).json({ message: "Train updated successfully", train });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a train trip
router.delete("/deleteTrain/:trainId", async (req, res) => {
  const { trainId } = req.params;
  try {
    const train = await Train.findByIdAndDelete(trainId);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    res.status(200).json({ message: "Train deleted successfully", train });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/assignStaff', async (req, res) => {
  try {
    const { trainId, driver, engineer } = req.body;

    // Validate request payload
    if (!trainId) {
      return res.status(400).json({ error: "Train ID is required!" });
    }
    if (!driver && !engineer) {
      return res.status(400).json({ error: "At least one staff member (Driver or Engineer) is required!" });
    }

    // Find the train by ID
    const train = await Train.findById(trainId);

    if (!train) {
      return res.status(404).json({ error: "Train not found!" });
    }

    // Update staff fields only if provided
    if (driver) train.driver = driver;
    if (engineer) train.engineer = engineer;

    // Save the updated train record
    await train.save();

    res.status(200).json({ message: "Staff assigned successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/IncompletetrainList', async (req, res) => {
  try {
    // Find trains with missing driver or engineer
    const incompleteTrains = await Train.find({
      $or: [{ driver: null }, { engineer: null }],
    });
    res.json(incompleteTrains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;

