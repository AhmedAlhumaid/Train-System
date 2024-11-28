import React, { useState } from "react";
import styles from "../assets/styles/train_selector.module.css";
import trainRightIcon from "../assets/images/train-right.png";
import trainLeftIcon from "../assets/images/train-left.png";
import calendarIcon from "../assets/images/calendar.png";

function TrainSelector() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [travelers, setTravelers] = useState("1");
  
    const stations = ["1", "2", "3", "4"];
    const travelerOptions = [1, 2, 3]; // Maximum number of passengers
  
    const handleSearch = () => {
      alert(`Searching trains from ${from} to ${to} on ${departureDate} for ${travelers} traveler(s).`);
    };
  
    return (
    <div className={styles.trainSelector}>
      {/* From Field */}
      <div className={styles.field}>
        <div className={styles.labelContainer}>
          <label>From</label>
          <img src={trainRightIcon} alt="Train Right Icon" className={styles.icon} />
        </div>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={styles.input}
        >
          <option value="" disabled>
            Select Origin
          </option>
          {stations.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </select>
      </div>

      {/* To Field */}
      <div className={styles.field}>
        <div className={styles.labelContainer}>
          <label>To</label>
          <img src={trainLeftIcon} alt="Train Left Icon" className={styles.icon} />
        </div>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={styles.input}
        >
          <option value="" disabled>
            Select Destination
          </option>
          {stations.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </select>
      </div>

      {/* Departure Date */}
      <div className={styles.field}>
        <div className={styles.labelContainer}>
          <label>Departure</label>
          <img src={calendarIcon} alt="Calendar Icon" className={styles.icon} />
        </div>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* Traveller Dropdown */}
      <div className={styles.field}>
        <label>Traveller</label>
        <select
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          className={styles.input}
        >
          {travelerOptions.map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "Passenger" : "Passengers"}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button className={styles.searchButton}>Search Trains</button>
    </div>
  );
  }
  
  export default TrainSelector;
