import React, { useState, useEffect } from "react";
import styles from "../assets/styles/AssignStaff.module.css";

const AssignStaff = () => {
  const [trains, setTrains] = useState([]);
  const [staff, setStaff] = useState({});
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [assigning, setAssigning] = useState(false); // Separate loading state for assigning staff

  // Fetch incomplete train list
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/trains/IncompletetrainList`);
        const data = await response.json();
        setTrains(data);
        // Initialize staff states for each train
        const initialStaff = {};
        data.forEach((train) => {
          initialStaff[train._id] = { driver: train.driver || "", engineer: train.engineer || "" };
        });
        setStaff(initialStaff);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching incomplete train list:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchTrains();
  }, []);

  // Handle input changes
  const handleInputChange = (trainId, field, value) => {
    setStaff((prev) => ({
      ...prev,
      [trainId]: {
        ...prev[trainId],
        [field]: value,
      },
    }));
  };

  // Handle staff assignment
  const handleAssignStaff = async (trainId) => {
    try {
      setAssigning(true);
      const { driver, engineer } = staff[trainId];
      const response = await fetch(`http://localhost:5000/api/trains/assignStaff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainId, driver, engineer }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Staff assigned successfully!");
        setTrains(trains.filter((train) => train._id !== trainId)); // Remove the assigned train from the list
      } else {
        alert(`Error: ${data.error}`);
      }
      setAssigning(false);
    } catch (error) {
      console.error("Error assigning staff:", error);
      setAssigning(false);
    }
  };

  function convertToRegularDate(yyyymmdd) {
    const year = yyyymmdd.substring(0, 4);
    const month = yyyymmdd.substring(4, 6);
    const day = yyyymmdd.substring(6, 8);
    return `${year}-${month}-${day}`;
  }

  // Show a loading spinner or message until data is loaded
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.assignStaffContainer}>
      <h2 className={styles.title}>Assign Staff</h2>
      <div className={styles.trainList}>
        {trains.length > 0 ? (
          trains.map((train) => (
            <div key={train._id} className={styles.trainCard}>
              <h3>{train.name}</h3>
              <p>From: {train.from} at {train.departureTime}</p>
              <p>To: {train.to} at {train.arrivalTime}</p>
              <p>Date: {convertToRegularDate(train.date)}</p>

              {/* Driver Input */}
              <p>
                Driver:{"No Driver"}
                {train.driver ? (
                  <strong>{train.driver}</strong>
                ) : (
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      placeholder="Enter Driver Name"
                      value={staff[train._id]?.driver || ""}
                      onChange={(e) => handleInputChange(train._id, "driver", e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                )}
              </p>

              {/* Engineer Input */}
              <p>
                Engineer:{"No Engineer"}
                {train.engineer ? (
                  <strong>{train.engineer}</strong>
                ) : (
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      placeholder="Enter Engineer Name"
                      value={staff[train._id]?.engineer || ""}
                      onChange={(e) => handleInputChange(train._id, "engineer", e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                )}
              </p>

              {/* Assign Button */}
              <button
                onClick={() => handleAssignStaff(train._id)}
                className={styles.assignButton}
                disabled={assigning || !staff[train._id]?.driver || !staff[train._id]?.engineer}
              >
                {assigning ? "Assigning..." : "Assign Staff"}
              </button>
            </div>
          ))
        ) : (
          <p className={styles.noTrains}>No incomplete trains found.</p>
        )}
      </div>
    </div>
  );
};

export default AssignStaff;




