import React from "react";
import styles from "../assets/styles/waitlistPromotion.module.css";

function EligibleWaitlistCard({ waitlist, onPromote }) {
  return (
    <div className={styles.card}>
      <h3>Waitlist ID: {waitlist.userId}</h3>
      <p><strong>Train ID:</strong> {waitlist.trainId}</p>
      <p><strong>Number of Passengers:</strong> {waitlist.numOfPassengers}</p>
      <button 
        className={styles.promoteButton} 
        onClick={() => onPromote(waitlist.userId)}
      >
        Promote
      </button>
    </div>
  );
}

export default EligibleWaitlistCard;
