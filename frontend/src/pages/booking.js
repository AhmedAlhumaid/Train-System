import styles from "../assets/styles/booking.module.css";
import backIcon from "../assets/images/back-icon.png";
import Ticket from "../components/ticket";
import logo from "../assets/images/logo.png";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


function Booking(){
    const [train, setTrain] = useState({}); 
    const location = useLocation()
    const { id } = useParams(); // Extract train ID from the route
    console.log(id,"heeeere");
    const { selectedSeats } = location.state;
    console.log("inbooking",selectedSeats)

    // Fetch seating info from the database
    useEffect(() => {
        console.log("useEffect running with ID:", id);
        const fetchSeatingInfo = async () => {
            try {
                const response = await fetch(`/api/trains/train?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const trainData = await response.json();
                console.log("Fetched train data:", trainData);
                setTrain(trainData); // Update state with fetched train data
            } catch (err) {
                console.error("Error fetching seating info:", err);
            }
        };
    
        if (id) { // Ensure `id` is available before making the fetch call
            fetchSeatingInfo();
        }
    }, [id]); // Dependency array ensures this effect only runs when `id` changes
    
              // Dependency array ensures fetchSeatingInfo runs only when `id` changes
    return(
        <div className={styles.container}>
              <div className={styles.logoContainer}>
                    <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
                    <img src={logo} alt="Train Logo" className={styles.logo} />
                </div>
            <div className={styles.backButton}>
                <Link to = "/main">
                <img src={backIcon} alt="Back" />
                </Link>
            </div>
            <Ticket seats = {selectedSeats} train ={train}></Ticket>
         
        </div>
    );
}

export default Booking;