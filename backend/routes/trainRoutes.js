const express = require('express');
const Train = require('../models/train');
const router = express.Router();

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
    console.log(train)
    res.status(200).json(train)
  }
  catch(err){
    console.log(err)
  }
});

// Fetch trains without assigned staff
router.get('/IncompletetrainList', async (req, res) => {
  try {
    const incompleteTrains = await Train.find({
      $or: [{ driver: null }, { engineer: null }], // Find trains missing driver or engineer
    });
    res.json(incompleteTrains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assign staff to a train
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

    res.status(200).json({ message: "Staff assigned successfully!", train });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;

