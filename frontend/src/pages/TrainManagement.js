import React from "react";
import styles from "../assets/styles/TrainManagement.module.css";
import Logo from "../components/Logo";
import {useNavigate } from "react-router-dom";


const TrainManagement = () => {
const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Logo />
      <h1 className={styles.title}>Train Management</h1>
      <div className={styles.cardsContainer}>
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Add Train Trip 🚆</h2>
          <p className={styles.cardDescription}>Create a new train trip.</p>
          <button
            className={styles.cardButton}
            onClick={() => navigate("/admin/train-management/add")}
          >
            Add Train
          </button>
        </div>
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>View Train Trip 🔍</h2>
          <p className={styles.cardDescription}>
            Search an existing train trip.
          </p>
          <button
            className={styles.cardButton}
            onClick={() => navigate("/admin/train-management/view")}
          >
            View Train
          </button>
        </div>
        <div className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Cancel Train Trip ❌</h2>
          <p className={styles.cardDescription}>
            Delete an existing train trip.
          </p>
          <button
            className={styles.cardButton}
            onClick={() => navigate("/admin/train-management/delete")}
          >
            Cancel Train 
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

export default TrainManagement;


