import React from 'react';
import styles from '../assets/styles/spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;