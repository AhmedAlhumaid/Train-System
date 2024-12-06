import React, { useState, useEffect } from "react";
import styles from "../assets/styles/TrainCard.module.css";

const TrainCard = ({ train }) => {
  const [editedData, setEditedData] = useState({
    passengers: [],
  });

  useEffect(() => {
    const fetchBookingData = async () => {
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
            console.log("Error fetching user name:", error.message);
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
    };

    fetchBookingData();
  }, [train._id]);

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
      </div>
    </div>
  );
};

export default TrainCard;








