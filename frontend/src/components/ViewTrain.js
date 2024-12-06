import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import TrainCard from "./TrainCard"; // Import TrainCard
import styles from "../assets/styles/ViewTrain.module.css";

const ViewTrain = () => {
    const navigate = useNavigate();
    const [searchCriteria, setSearchCriteria] = useState({
      name: "",
      from: "",
      to: "",
      date: "",
    });
  
    const [trainData, setTrainData] = useState([]);
    const [filteredTrains, setFilteredTrains] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state


  
    // Fetch train data from the backend
    useEffect(() => {
      const fetchTrainData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/trains/allTrains");
          if (!response.ok) throw new Error("Failed to fetch train data");
          const data = await response.json();
          setTrainData(data);
          setFilteredTrains(data); // Initially display all trains
          setLoading(false); // Set loading to false when data is fetched

        } catch (error) {
          console.error("Error fetching train data:", error.message);
          setLoading(false); // Set loading to false in case of an error

        }
      };
  
      fetchTrainData();
    }, []);
  
    const handleSearchChange = (e) => {
      const { name, value } = e.target;
      setSearchCriteria((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSearch = () => {
      const filtered = trainData.filter(
        (train) =>
          (searchCriteria.name ? train.name === searchCriteria.name : true) &&
          (searchCriteria.from ? train.from === searchCriteria.from : true) &&
          (searchCriteria.to ? train.to === searchCriteria.to : true) &&
          (searchCriteria.date ? train.date === searchCriteria.date.replace(/-/g, "") : true)
      );
      setFilteredTrains(filtered);
    };


    if (loading) {
        // Show a loading message or spinner while fetching data
        return <div className={styles.loading}>Loading trains...</div>;
      }
      
  return (
    <div className={styles.editTrainContainer}>
      <div className={styles.sidebar}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/admin/train-management")}
        >
          ← Back
        </button>
        <Logo />
      </div>
      <div className={styles.mainContent}>
        <h2 className={styles.title}>View Train Trips 🔍</h2>
        <div className={styles.searchSection}>
          <div className={styles.inputRow}>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">Train Name</label>
              <select
                name="name"
                value={searchCriteria.name}
                onChange={handleSearchChange}
                className={styles.inputField}
              >
                <option value="">All Trains</option>
                <option value="Train A">Train A</option>
                <option value="Train B">Train B</option>
                <option value="Train C">Train C</option>
                <option value="Train D">Train D</option>
                <option value="Train E">Train E</option>
                <option value="Train F">Train F</option>
              </select>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="from">From</label>
              <select
                name="from"
                value={searchCriteria.from}
                onChange={handleSearchChange}
                className={styles.inputField}
              >
                <option value="">All Locations</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputWrapper}>
              <label htmlFor="to">To</label>
              <select
                name="to"
                value={searchCriteria.to}
                onChange={handleSearchChange}
                className={styles.inputField}
              >
                <option value="">All Locations</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={searchCriteria.date}
                onChange={handleSearchChange}
                className={styles.inputField}
              />
            </div>
          </div>
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className={styles.trainResults}>
          {filteredTrains.map((train, index) => (
            <TrainCard
              key={index}
              train={train}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTrain;





