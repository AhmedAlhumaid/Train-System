import styles from "../assets/styles/booking.module.css";
import backIcon from "../assets/images/back-icon.png";
import Ticket from "../components/ticket";
import logo from "../assets/images/logo.png";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

function Booking() {
    const [booking, setBooking] = useState(null); // State for train data
    const [error,setError] = useState("");
    const [isLoading,setLoading] = useState(true);
    // Fetch train info from the database
    useEffect(() => {
        console.log("Fetching Booking data...");
        const fetchBookingInfo = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`/api/bookings/getBooking`,{
                    headers:{"x-auth":token}
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    setBooking(null);
                    setLoading(false);
                    throw new Error(errorData.error);
                }
                else{
                    const bookingData = await response.json();
                    setLoading(false)
                    setBooking(bookingData); // Update state with fetched train data
                    
                }
               
            } catch (err) {
                console.error("Error fetching booking info:", err.message);
                setLoading(false)
                setError(err.message);
            }
        };

    
            fetchBookingInfo();
    }, [booking]); // Dependency array ensures this effect only runs when `id` changes



    // If train data is still loading, show a loader
    if (isLoading) {
        return (
            <div className={styles.container}>
               <Spinner></Spinner>
            </div>
        );
    }
    if(error){ // 
        console.log("error")
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
                <p className={styles.oops}>Oops! Looks like you dont have a current booking</p>
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
            <Ticket booking = {booking} />
        </div>
    );
}

export default Booking;