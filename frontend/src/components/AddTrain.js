import React, { useState } from "react";
import Logo from "../components/Logo";
import styles from "../assets/styles/AddTrain.module.css";
import backIcon from "../assets/images/back-icon.png";
import { useNavigate } from "react-router-dom";


const AddTrain = () => {
  const [formData, setFormData] = useState({
    name: "Train A", // Default value
    departureTime: "",
    arrivalTime: "",
    from: "",
    to: "",
    date: "",
    price: "",
    driver: "",
    engineer: "",
    duration: "",
  });
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false); // State for success modal
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Calculate the duration if departure and arrival times are provided
    if (name === "departureTime" || name === "arrivalTime") {
      calculateDuration(
        name === "departureTime" ? value : formData.departureTime,
        name === "arrivalTime" ? value : formData.arrivalTime
      );
    }
  };

  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return;

    const [depHours, depMinutes] = departure.split(":").map(Number);
    const [arrHours, arrMinutes] = arrival.split(":").map(Number);

    const departureInMinutes = depHours * 60 + depMinutes;
    const arrivalInMinutes = arrHours * 60 + arrMinutes;

    let durationInMinutes = arrivalInMinutes - departureInMinutes;
    if (durationInMinutes < 0) {
      // Handle overnight trips
      durationInMinutes += 24 * 60;
    }

    const durationInHours = Math.ceil(durationInMinutes / 60); // Round up to the nearest hour
    setFormData((prevData) => ({
      ...prevData,
      duration: `${durationInHours} hrs`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData)

    try {
      const response = await fetch("http://localhost:5000/api/trains/addTrain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Train added successfully:", data);
        setShowModal(true); // Show success modal
        setFormData({
          name: "Train A",
          departureTime: "",
          arrivalTime: "",
          duration: "",
          from: "",
          to: "",
          date: "",
          price: "",
          driver: "",
          engineer: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding train:", error);
    } finally {
      setLoading(false);
    }
  };

  const trainNames = ["Train A", "Train B", "Train C", "Train D", "Train E", "Train F"];
  const fromAndTo = ["1","2","3","4"];

  return (
    <div className={styles.addTrainContainer}>
      <Logo />
      <h2 className={styles.title}>Add Train</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.inputWrapper}>
            <select
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.selectField}
              required
            >
              {trainNames.map((train) => (
                <option key={train} value={train}>
                  {train}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
           <div className={styles.inputWrapper}>
           Departure Time
            <input
              type="time"
              name="departureTime"
              placeholder="Departure Time"
              value={formData.departureTime}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
            </div>

           <div className={styles.inputWrapper}>
             Arrival Time
            <input
              type="time"
              name="arrivalTime"
              placeholder="Arrival Time"
              value={formData.arrivalTime}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
        <div className={styles.inputWrapper}>
            From
            <select
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              className={styles.selectField}
              required
            >
              {fromAndTo.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputWrapper}>
            To 
            <select
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className={styles.selectField}
              required
            >
              {fromAndTo.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>

            <div className={styles.inputWrapper}>
                <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                className={styles.inputField}
                disabled
                />
            </div>

          <div className={styles.inputWrapper}>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="driver"
              placeholder="Driver Name"
              value={formData.driver}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="engineer"
              placeholder="Engineer Name"
              value={formData.engineer}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Add Train 🚆
        </button>
      </form>
      <button
      className={styles.backButton}
      onClick={() => navigate("/admin/train-management")}
    >
      ←
    </button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Train Added Successfully</h3>
            <button onClick={() => setShowModal(false)} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AddTrain;



