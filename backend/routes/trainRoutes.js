const express = require('express');
const Train = require('../models/train');
const router = express.Router();

// Get trains based on search criteria
router.get('/', async (req, res) => {
  try {
    const { from, to, tdate } = req.query;

    if (!from || !to ) {
      return res.status(400).json({ error: 'From, To, and Quota fields are required' });
    }

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



module.exports = router;

