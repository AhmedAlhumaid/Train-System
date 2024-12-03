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
    console.log("here in train");
    if(!train){
     return res.status(404).json({message:"no train with the given id is found"})
    }
    res.status(200).json(train)
  }
  catch(err){
    console.log(err)
  }
});



module.exports = router;

