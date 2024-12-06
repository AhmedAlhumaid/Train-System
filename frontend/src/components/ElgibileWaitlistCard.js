import React from "react";
import styles from "../assets/styles/waitlistPromotion.module.css";
import waitlist_train_logo from  "../assets/images/railwayExpress.jpg";

function EligibleWaitlistCard({ waitlist, onPromote }) {
  return (
    <div className={styles.card}>
        <img className = {styles.poster}src ={waitlist_train_logo}></img>
     <h3>Waitlist ID: {waitlist._id}</h3>
  <h3>Train ID: {waitlist.trainId}</h3>
  <h3>Number of Passengers: {waitlist.numOfPassengers}</h3>
  <button className={styles.promoteButton} onClick={() => onPromote(waitlist.userId)}>
    Promote
  </button>
    </div>
  );
}

export default EligibleWaitlistCard;
