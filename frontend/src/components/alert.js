import React from 'react';
import styles from '../assets/styles/alert.module.css'; // Create a CSS file for styling

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className={styles.customAlertOverlay}>
      <div className={styles.customAlertBox}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomAlert;