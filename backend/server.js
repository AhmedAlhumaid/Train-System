const express = require('express');
const connectDB = require('./db.js');
const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require("./routes/bookingRoutes");
const waitlistRoutes = require("./routes/waitlistRoutes");
const cors = require('cors');
const notifyUpcomingBookings = require("./bookingsNotifier.js"); // Notify bookings that are within 3 hours

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/waitlists', waitlistRoutes);

// Start the server only after connecting to the database
const startServer = async () => {
  try {
    await connectDB(); // Ensure the database connection is established
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);

      // Periodic task: Check for upcoming bookings
      setInterval(async () => {
        try {
          console.log("Checking for upcoming bookings...");
          await notifyUpcomingBookings();
        } catch (error) {
          console.error("Error in notifyUpcomingBookings:", error);
        }
      },60*1000*5); // Runs every 60 seconds
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

startServer();
