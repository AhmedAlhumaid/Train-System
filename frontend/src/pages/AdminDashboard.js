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

  const [selectedTrainForWaitlist, setSelectedTrainForWaitlist] = useState("");
  const [waitlistData, setWaitlistData] = useState([]);

  const trains = ["Train A", "Train B", "Train C", "Train D", "Train E", "Train F"];

  const fetchLoadFactor = () => setLoadFactor(75); // Dummy implementation

  const fetchWaitlistData = () =>
    setWaitlistData([
      { class: "Economy", passenger: "Alice Johnson" },
      { class: "Business", passenger: "Bob Smith" },
      { class: "First", passenger: "Charlie Davis" },
    ]);

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
          onClick={() => navigate("/admin/train-management")}
        />

        <DashboardCard
          icon="👨‍🔧"
          title="Assign Staff"
          description="Assign drivers and engineers to trains for specific dates."
          buttonText="Go to Staff Assignment"
          onClick={() => navigate("/admin/assign-staff")}
        />
        <DashboardCard
          icon="📋"
          title="Promote Waitlisted Passengers"
          description="Promote waitlisted passengers to confirmed reservations."
          buttonText="Go to Waitlist Management"
          onClick={() => navigate("/admin/promote-waitlist")}
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
            {trains.map((train, index) => (
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
          <button className={styles.cardButton} onClick={fetchLoadFactor}>
            View Load Factor
          </button>
          {loadFactor && <p className={styles.resultText}>Load Factor: {loadFactor}%</p>}
        </SectionCard>

        {/* Waitlisted Loyalty Passengers Section */}
        <SectionCard icon="🎟️" title="Waitlisted Loyalty Passengers">
          <label className={styles.selectLabel}>Select Train</label>
          <select
            className={styles.selectInput}
            value={selectedTrainForWaitlist}
            onChange={(e) => setSelectedTrainForWaitlist(e.target.value)}
          >
            <option value="" disabled>
              Select Train
            </option>
            {trains.map((train, index) => (
              <option key={index} value={train}>
                {train}
              </option>
            ))}
          </select>
          <button className={styles.cardButton} onClick={fetchWaitlistData}>
            View Waitlist
          </button>
          {waitlistData.length > 0 && (
            <ul className={styles.resultList}>
              {waitlistData.map((item, index) => (
                <li key={index}>
                  {item.class}: {item.passenger}
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

export default AdminDashboard;

