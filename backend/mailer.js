
const nodemailer = require("nodemailer");

const pass = "xtmp dcba unku yncv"; // App-specific password
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail as the email service
  auth: {
    user: "humaidakah@gmail.com", // Replace with your email
    pass: pass, // Use app-specific password
  },
});

async function sendMail(to, subject, text) {
  const mailOptions = {
    from: "humaidakah@gmail.com", // Sender address
    to: to, // Receiver address (dynamic)
    subject: subject, // Subject line
    text: text, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error while sending mail:", error);
    throw error;
  }
}

module.exports = sendMail;
