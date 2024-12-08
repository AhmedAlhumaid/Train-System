import React, { useState, useEffect, useCallback } from "react";
import styles from "../assets/styles/TrainCard.module.css";
import AddBookingModal from "./AddBookingModal";

const TrainCard = ({
  train,
  isCancelPage = false,
  deleteTrain,
  isAddPage = false,
  refreshTrains,
}) => {
  const [editedData, setEditedData] = useState({
    passengers: [],
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  // Fetch booking data logic as a reusable function
  const fetchBookingData = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings/allBooking"
      );
      if (!response.ok) throw new Error("Failed to fetch booking data");
      const allBookings = await response.json();

      // Filter bookings for the current train
      const trainBookings = allBookings.filter(
        (booking) => booking.trainId === train._id
      );

      // Fetch user names for each userId
      const fetchUserName = async (userId) => {
        try {
          const userResponse = await fetch(
            `http://localhost:5000/api/users/getUsername?userId=${userId}`
          );
          if (!userResponse.ok)
            throw new Error(`Failed to fetch user data for ${userId}`);
          const userData = await userResponse.json();
          return userData.name;
        } catch (error) {
          console.error("Error fetching user name:", error.message);
          return "Unknown User";
        }
      };

      // Extract passengers and seats with user names
      const passengers = await Promise.all(
        trainBookings.map(async (booking) => {
          const userName = await fetchUserName(booking.userId);
          return booking.seats.map((seat) => ({
            name: userName,
            seat,
          }));
        })
      );

      setEditedData((prev) => ({
        ...prev,
        passengers: passengers.flat(),
      }));
    } catch (error) {
      console.error("Error fetching booking data:", error.message);
    }
  }, [train._id]);

  // Fetch data on component mount
  useEffect(() => {
    fetchBookingData();
  }, [fetchBookingData]);

  const handleAddBooking = () => {
    if (!userId || !seatNumber) {
      alert("Please fill in both User ID and Seat Number.");
      return;
    }

    // Check if the seat is already taken
    const isSeatTaken = editedData.passengers.some((p) => p.seat === seatNumber);
    if (isSeatTaken) {
      alert("This seat is already reserved. Please choose another seat.");
      return;
    }

    // Call backend API to add booking
    fetch("http://localhost:5000/api/bookings/addBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trainId: train._id, userId, seatNumber }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add booking");
        return response.json();
      })
      .then(() => {
        alert("Booking added successfully!");
        setShowBookingModal(false); // Close the modal
        setUserId(""); // Reset form
        setSeatNumber(""); // Reset form
        fetchBookingData(); // Re-fetch booking data to refresh passengers
        refreshTrains(); // Optionally refresh the parent component
      })
      .catch((error) => {
        console.error("Error adding booking:", error.message);
      });
  };

  return (
    <div className={styles.trainCard}>
      <div className={styles.cardHeader}>
        <h3>{train.name}</h3>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.infoGroup}>
          <div className={styles.infoRow}>
            <i className={`fas fa-map-marker-alt ${styles.icon}`}></i>
            <span className={styles.label}>📍 From:</span>
            <span>{train.from}</span>
          </div>
          <div className={styles.infoRow}>
            <i className={`fas fa-flag-checkered ${styles.icon}`}></i>
            <span className={styles.label}>📍 To:</span>
            <span>{train.to}</span>
          </div>
        </div>
        <div className={styles.infoGroup}>
          <div className={styles.infoRow}>
            <i className={`fas fa-clock ${styles.icon}`}></i>
            <span className={styles.label}>🕒 Departure:</span>
            <span>{train.departureTime}</span>
          </div>
          <div className={styles.infoRow}>
            <i className={`fas fa-clock ${styles.icon}`}></i>
            <span className={styles.label}>🕒 Arrival:</span>
            <span>{train.arrivalTime}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <i className={`fas fa-dollar-sign ${styles.icon}`}></i>
          <span className={styles.label}>💵 Price:</span>
          <span className={styles.price}>${train.price}</span>
        </div>
        <div className={styles.infoRow}>
          <i className={`fas fa-user-tie ${styles.icon}`}></i>
          <span className={styles.label}>🧑‍✈️ Driver:</span>
          <span>{train.driver}</span>
        </div>
        <div className={styles.passengerSection}>
          <div className={styles.passengerHeader}>
            <i className={`fas fa-users ${styles.passengerIcon}`}></i>
            <span className={styles.label}>🚂 Passengers:</span>
          </div>
          {editedData.passengers.length > 0 ? (
            <ul className={styles.passengerList}>
              {editedData.passengers.map((p, i) => (
                <li key={i} className={styles.passengerItem}>
                  <i className={`fas fa-user-circle ${styles.userIcon}`}></i>
                  <span className={styles.passengerName}>👤 {p.name}</span>
                  <i className={`fas fa-chair ${styles.seatIcon}`}></i>
                  <span className={styles.seatNumber}>Seat {p.seat}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className={styles.noPassengers}>No passengers</span>
          )}
        </div>
        {isAddPage && (
          <button
            className={styles.addButton}
            onClick={() => setShowBookingModal(true)}
          >
            Add New Booking
          </button>
        )}
        {showBookingModal && (
          <AddBookingModal
            onClose={() => setShowBookingModal(false)}
            userId={userId}
            setUserId={setUserId}
            seatNumber={seatNumber}
            setSeatNumber={setSeatNumber}
            onConfirm={handleAddBooking}
          />
        )}
        {isCancelPage && (
          <div className={styles.deleteSection}>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTrain(train._id)}
            >
              Cancel Train
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainCard;











