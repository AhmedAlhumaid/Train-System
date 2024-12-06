const express = require('express');
const jwt = require("jwt-simple");
const User = require("../models/user");
const router = express.Router();
//JWT secret key
const SECRET_KEY = "qs3h6z0JUN9wgTy1j2Cl54gB6yzG"
// Register a new user
router.post('/register', async (req, res) => {
    try {
      const { fName, lName, email, password, type, phoneNum } = req.body;
      if(await User.findOne({email})){
        return res.status(404).json({error:"email already exists"})
      }
      // Create a new user
      const newUser = new User({
        firstName:fName,
        lastName:lName,
        email:email,
        password: password,
        type:type,
        phoneNum:phoneNum,
      });
    
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
//login api handling 
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if(password!= user.password){
        return res.status(404).json({error:"Please check that you entered a correct password"})
      }
      const payload = {
        userId: user._id,
      };
      const token = jwt.encode(payload,SECRET_KEY); //generate a string token for the user
      
      // Authentication successful
      res.json({
        message: 'Authentication successful',
        token,
        type: user.type, // Include the user type (admin/normal)
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  //fetch the info of a user
  router.get("/info",async(req,res)=>{
    console.log("got request")
    console.log(req.headers)
    if (!req.headers["x-auth"]) {

      return res.status(401).json({error: "Missing X-Auth header"});
   }
   const token = req.headers["x-auth"]
   console.log("after token line")
   try{
    const decoded = jwt.decode(token, SECRET_KEY);
    const user = await User.find({_id:decoded.userId});
    res.json(user);
   }
   catch(error){
    console.error(error);
    res.status(500).json({ error: error.message }); // status code of 500 means an internal error
   }
  });


  /**
 * ==========================
 * ADMIN-SPECIFIC ENDPOINTS
 * ==========================
 */
// Get username by userId
router.get("/getUsername", async (req, res) => {
  try {
    const { userId } = req.query; // Extract userId from query parameters
    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    console.log(user)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const fullName = user.firstName +" "+user.lastName
    // Respond with the user's name
    res.status(200).json({ name: fullName });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

module.exports = router;