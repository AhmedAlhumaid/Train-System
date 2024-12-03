const express = require('express');
const Booking = require('../models/booking');
const jwt = require("jwt-simple");
const router = express.Router();
//JWT secret key
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"

router.post("/newBooking", async (req,res)=>{
    const {trainObject,seats} = req.body;
    console.log(trainObject,seats)
    
});

router.get("/getBooking",async (req,res)=>{

});