import styles from "../assets/styles/booking.module.css";
import backIcon from "../assets/images/back-icon.png";
import Ticket from "../components/ticket";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

function Booking() {
    const [train, setTrain] = useState(null); // State for train data
    const location = useLocation();
    const { id } = useParams(); // Extract train ID from the route
    const { selectedSeats } = location.state;

    // Fetch train info from the database
    useEffect(() => {
        console.log("Fetching train data...");
        const fetchSeatingInfo = async () => {
            try {
                const response = await fetch(`/api/trains/train?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const trainData = await response.json();
                setTrain(trainData); // Update state with fetched train data
            } catch (err) {
                console.error("Error fetching train info:", err);
            }
        };

        if (id) {
            fetchSeatingInfo();
        }
    }, [id]); // Dependency array ensures this effect only runs when `id` changes

    // Memoize the transformed train data
    const memoizedTrainData = useMemo(() => {
        if (!train) return null;

        // Add any transformations or derived values if needed
        return {
            ...train,
            displayName: `${train.name} - ${train.number}`,
            seatCount: train.seats?.length || 0,
        };
    }, [train]);

    // If train data is still loading, show a loader
    if (!memoizedTrainData) {
        return (
            <div className={styles.container}>
                <p>Loading train data...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
                <img src={logo} alt="Train Logo" className={styles.logo} />
            </div>
            <div className={styles.backButton}>
                <Link to="/main">
                    <img src={backIcon} alt="Back" />
                </Link>
            </div>
            <Ticket seats={selectedSeats} train={memoizedTrainData} />
        </div>
    );
}

export default Booking;