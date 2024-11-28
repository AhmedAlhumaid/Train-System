const express = require("express");
const connectDB = require('./db.js');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors")
const app = express();
const PORT = 5000; // specify the port

// connect to the database
app.use(express.json()); // parsing the json before the routing
app.use(cors()); // Enable CORS

connectDB();
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:5000`);
});