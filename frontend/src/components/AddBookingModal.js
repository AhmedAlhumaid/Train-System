import React from "react";
import styles from "../assets/styles/AddBookingModal.module.css";

const AddBookingModal = ({
    trainId,
    passengers,
    onClose,
    onConfirm,
    userId,
    setUserId,
    seatNumber,
    setSeatNumber,
  }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Add Booking</h2>
          <div className={styles.inputWrapper}>
            <label className={styles.animatedLabel}>User ID:</label>
            <input
              className={styles.animatedInput}
              type="text"
              value={userId} // Bind to userId state
              onChange={(e) => setUserId(e.target.value)} // Update userId state
              placeholder="Enter User ID"
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.animatedLabel}>Seat Number:</label>
            <input
              className={styles.animatedInput}
              type="text"
              value={seatNumber} // Bind to seatNumber state
              onChange={(e) => setSeatNumber(e.target.value)} // Update seatNumber state
              placeholder="Enter Seat Number"
            />
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.animatedButton} onClick={onConfirm}>
              Confirm
            </button>
            <button className={styles.animatedButtonCancel} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default AddBookingModal;
