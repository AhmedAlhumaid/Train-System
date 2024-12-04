import React, { useState } from "react";
import styles from "../assets/styles/AdminDashboard.module.css";

const DashboardCard = ({ icon, title, description, buttonText, onClick }) => {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  const handleMouseEnter = () => {
    if (title === "Manage Reservations") {
      setShowExtraButtons(true);
    }
  };

  const handleMouseLeave = () => {
    if (title === "Manage Reservations") {
      setShowExtraButtons(false);
    }
  };

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.dashboardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>

      {!showExtraButtons ? (
        <button
          className={styles.cardButton}
          onMouseEnter={handleMouseEnter}
          onClick = {onClick}
        >
          {buttonText}
        </button>
      ) : (
        title === "Manage Reservations" && (
          <div
            className={styles.extraButtonsContainer}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.extraButton}
              onClick={() => onClick("/admin/train-management")}
            >
              Go to Train
            </button>
            <button
              className={styles.extraButton}
              onClick={() => onClick("/admin/booking-management")}
            >
              Go to Booking
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default DashboardCard;


