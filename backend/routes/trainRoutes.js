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
    console.log(from, to, date)
    
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
    train.currentCapacity = train.currentCapacity-1;
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


module.exports = router;

