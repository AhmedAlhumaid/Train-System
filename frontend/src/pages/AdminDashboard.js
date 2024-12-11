import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import DashboardCard from "../components/DashboardCard";
import SectionCard from "../components/SectionCard";
import styles from "../assets/styles/AdminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();


  const [selectedTrain, setSelectedTrain] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loadFactor, setLoadFactor] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");


  const trains = ["Train A", "Train B", "Train C", "Train D", "Train E", "Train F"];

  const fetchLoadFactor = async () => {
    if (!selectedTrain || !selectedDate || !from || !to) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await fetch(
        `/api/trains/loadFactor?train=${selectedTrain}&date=${selectedDate}&from=${from}&to=${to}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setLoadFactor(data.loadFactor);
    } catch (err) {
      console.error("Error fetching load factor:", err.message);
      alert("Failed to fetch load factor. Please try again.");
    }
  };


  return (
    <div className={styles.dashboardContainer}>
      <Logo />
      <h2 className={styles.dashboardTitle}>Admin Dashboard</h2>
      <div className={styles.cardsContainer}>
        
        <DashboardCard
          icon="📅"
          title="Manage Reservations"
          description="Add, edit, or cancel reservations and tickets."
          buttonText="Go to Reservations"
          onClick={() => console.log("Default Click Handled")}
        />

        <DashboardCard
          icon="👨‍🔧"
          title="Assign Staff"
          description="Assign drivers and engineers to trains for specific dates."
          buttonText="Go to Staff Assignment"
          onClick={() => navigate("/admin/assign-staff")}
        />
      </div>

      <div className={styles.sectionsContainer}>
        {/* Average Load Factor Section */}
        <SectionCard icon="📈" title="Average Load Factor">
          <label className={styles.selectLabel}>Select Train</label>
          <select
            className={styles.selectInput}
            value={selectedTrain}
            onChange={(e) => setSelectedTrain(e.target.value)}
          >
            <option value="" disabled>
              Select Train
            </option>
            {trains.map((train,index) => (
              <option key={index} value={train}>
                {train}
              </option>
            ))}
          </select>

          <label className={styles.selectLabel}>Select Date</label>
          <input
            type="date"
            className={styles.selectInput}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <label className={styles.selectLabel}>From</label>
          <select
            className={styles.selectInput}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="" disabled>
              Select From
            </option>
            {["1", "2", "3", "4"].map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>

          <label className={styles.selectLabel}>To</label>
          <select
            className={styles.selectInput}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="" disabled>
              Select To
            </option>
            {["1", "2", "3", "4"].map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>

          <button className={styles.cardButton} onClick={fetchLoadFactor}>
            View Load Factor
          </button>

          {loadFactor !== null && (
            <p className={styles.resultText}>Load Factor: {loadFactor}%</p>
          )}
        </SectionCard>

        {/* Waitlisted Loyalty Passengers Section */}
        <DashboardCard
          icon="📋"
          title="Promote Waitlisted Passengers"
          description="Promote waitlisted passengers to confirmed reservations."
          buttonText="Go to Waitlist Management"
          onClick={() => navigate("/admin/promote-waitlist")}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

