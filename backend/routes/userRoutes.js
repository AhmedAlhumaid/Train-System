const express = require('express');
const User = require("../models/user");
const router = express.Router();

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
      
      // Authentication successful
      res.json({ message: 'Authentication successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;