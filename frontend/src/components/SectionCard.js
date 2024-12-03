import React from "react";
import styles from "../assets/styles/AdminDashboard.module.css";

const SectionCard = ({ icon, title, children }) => {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionIcon}>{icon}</div>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
};

export default SectionCard;
