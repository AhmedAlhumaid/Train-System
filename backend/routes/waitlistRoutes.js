const express = require('express');
const Train = require('../models/train');
const User = require("../models/user");
const Waitlist = require("../models/waitlist")
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
module.exports = router;
