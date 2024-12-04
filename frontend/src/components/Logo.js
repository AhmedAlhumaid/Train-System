import React from "react";
import styles from "../assets/styles/AdminDashboard.module.css";
import logoImage from "../assets/images/logo.png"; // Replace with your actual logo path

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={logoImage} alt="Train Logo" className={`${styles.logoImage} ${styles.animatedLogo}`} />
      <h1 className={styles.title}>
        TRAIN TICKET BOOKING <span className={styles.highlight}>EXPRESS</span>
      </h1>
    </div>
  );
};

export default Logo;
