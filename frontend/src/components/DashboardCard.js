import React from "react";
import styles from "../assets/styles/AdminDashboard.module.css";

const DashboardCard = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <div className={styles.dashboardCard}>
      <div className={styles.dashboardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <button className={styles.cardButton} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardCard;
