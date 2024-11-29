import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../assets/styles/trains.module.css";
import trainTopIcon from "../assets/images/trainTicktMain.png"; // Top train icon
import trainCardIcon from "../assets/images/trainTickt.png"; // Train ticket image
import backIcon from "../assets/images/back-icon.png"; // Back button icon
import calendarIcon from "../assets/images/ticktCalendar.png"; // Calendar icon
import passengerIcon from "../assets/images/user-icon.png"; // Passenger icon
import {Link} from "react-router-dom";


function TrainsList() {
  const location = useLocation();
  const { from, to, departureDate, travelers } = location.state;

  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");

  // Format the date
  const formattedDate = new Date(departureDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/trains?from=${from}&to=${to}&quota=General`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trains.");
        }

        const data = await response.json();
        setTrains(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrains();
  }, [from, to]);

  const handleSelectTrain = (train) => {
    alert(`You selected: ${train.name}`);
  };

  return (
    <div className={styles.resultsContainer}>
      {/* Back Button */}
      <div className={styles.backButton}>
            <Link to = "/main">
             <img src={backIcon} alt="Back" />
            </Link>
        
            </div>
      {/* Page Header */}
      <h2 className={styles.pageHeader}>Select Your Train</h2>

      {/* Journey Summary */}
      <div className={styles.journeySummary}>
        <div className={styles.stationCircle}>{from}</div>
        <div className={styles.dashedLine}></div>
        <img src={trainTopIcon} alt="Train" className={styles.trainTopIcon} />
        <div className={styles.dashedLine}></div>
        <div className={styles.stationCircle}>{to}</div>
      </div>

      {/* Date and Passenger Section */}
      <div className={styles.datePassengers}>
        <div className={styles.date}>
          <img src={calendarIcon} alt="Calendar" />
          {formattedDate}
        </div>
        <div className={styles.passengers}>
          <img src={passengerIcon} alt="Passengers" />
          {travelers} Passenger(s)
        </div>
      </div>

      {/* Class Section */}
      <div className={styles.classQuota}>General Quota</div>

      {/* Train Tickets */}
      <div className={styles.trainList}>
  {trains.length > 0 ? (
    trains.map((train) => (
      <div
        key={train._id}
        className={styles.trainCard}
        onClick={() => handleSelectTrain(train)}
      >
        <div className={styles.ticketShape}>
          {/* Left and Right Ticket Cuts */}
          <div className={styles.ticketCutLeft}></div>
          <div className={styles.ticketCutRight}></div>

          {/* Card Header */}
          <div className={styles.cardHeader}>
            <p className={styles.departureTime}>{train.departureTime}</p>
            <p className={styles.stationCode}>{from}</p>
            <div className={styles.trainDurationContainer}>
              <p className={styles.trainDuration}>{train.duration}</p>
            </div>
            <p className={styles.arrivalTime}>{train.arrivalTime}</p>
            <p className={styles.stationCode}>{to}</p>
          </div>

          {/* Train Image */}
          <div className={styles.trainImageContainer}>
            <img src={trainCardIcon} alt="Train" className={styles.trainCardIcon} />
          </div>

          {/* Card Footer */}
          <div className={styles.cardFooter}>
            <span className={styles.trainName}>
              Seats Available: {train.currentCapacity}
            </span>
            <span className={styles.trainPrice}>$ {train.price}</span>
          </div>
        </div>
      </div>
    ))
  ): (
          <p className={styles.noTrains}>No trains available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}
export default TrainsList;
