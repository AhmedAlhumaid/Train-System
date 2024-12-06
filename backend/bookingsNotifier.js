
const Booking = require("./models/booking.js"); // Replace with the correct path to your Booking model
const sendMail = require("./mailer.js"); // Import the sendMail function
const THREE_HOURS_IN_MS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const FIVE_MINUTE_IN_MS = 60 * 1000*5; // 1 minute in milliseconds

// Store already notified bookings to avoid duplicate emails
const notifiedBookings = new Set();

async function notifyUpcomingBookings() {
  try {
    const now = new Date(); // Current time
    const threeHoursAndFiveMinutesFromNow = new Date(now.getTime() + THREE_HOURS_IN_MS + FIVE_MINUTE_IN_MS); // 3 hours + 5 minute
    console.log(threeHoursAndFiveMinutesFromNow,"3 hours from now")
    //console.log(new Date()< new Date("2024-12-05T18:15:52.240447Z"));

    // Query MongoDB for bookings within the next 3 hours + 1 minute
    const upcomingBookings = await Booking.find({});
    console.log(upcomingBookings)
    for (const booking of upcomingBookings){
        if(booking.comparableDate>new Date() && booking.comparableDate<threeHoursAndFiveMinutesFromNow){
            const passengerEmail = booking.email; // Ensure the Booking model has an `email` field
            const travelTime = booking.comparableDate.toLocaleString(); // Format the date for email
            await sendMail(
              passengerEmail,
              "Upcoming Train Journey Reminder",
              `Hi, this is a reminder that your train journey is scheduled for ${travelTime}. Please ensure you're ready to board.`
            );
            console.log(`Reminder email sent to ${passengerEmail} for booking at ${travelTime}`);
      
        }
    }

    if (upcomingBookings.length === 0) {
      console.log("No upcoming bookings within the next 3 hours.");
      return;
    }
  } catch (error) {
    console.error("Error while notifying upcoming bookings:", error);
  }
}

module.exports = notifyUpcomingBookings;
