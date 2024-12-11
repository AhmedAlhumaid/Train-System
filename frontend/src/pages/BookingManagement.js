import React from "react";
import styles from "../assets/styles/TrainManagement.module.css";
import Logo from "../components/Logo";
import {useNavigate } from "react-router-dom";


const BookingManagement = () => {
const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Logo />
      <h1 className={styles.title}>Booking Management</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Add New Booking 🎟️</h2>
          <p className={styles.cardDescription}>Create a new booking.</p>
          <button
            className={styles.cardButton}
            onClick={() => navigate("/admin/Booking-management/add")}
          >
            Add Booking
          </button>
        </div>
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Edit Booking ✏️</h2>
          <p className={styles.cardDescription}>
            Edit and search an existing booking.
          </p>
          <button
            className={styles.cardButton}
            onClick={() => navigate("/admin/booking-management/edit")}
          >
            View Booking
          </button>
        </div>
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Cancel Booking ❌</h2>
          <p className={styles.cardDescription}>
            Delete an existing booking.
          </p>
          <button
            className={styles.cardButton}
            onClick={() => navigate("/admin/booking-management/delete")}
          >
            Cancel Booking
          </button>
        </div>
        <button
      className={styles.backButton}
      onClick={() => navigate("/admin")}
    >
      ←
    </button>
      </div>
    </div>
  );
};

export default BookingManagement;