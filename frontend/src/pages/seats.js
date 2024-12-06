import React, { useEffect, useState } from "react";
import styles from "../assets/styles/seats.module.css";
import backIcon from "../assets/images/back-icon.png";
import seatsLogo from "../assets/images/seats.png";
import Spinner from "../components/spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/alert";
import { useParams } from "react-router-dom";

function Seats() {
    const { id, num } = useParams(); // Extract train ID and max number of seats from the route
    const [seats, setSeats] = useState({}); // Initialize seats as an empty object
    const [isFull, setFull] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    // Fetch seating info from the database
    useEffect(() => {
        const fetchSeatingInfo = async () => {
            try {
                const response = await fetch(`/api/trains/train?id=${id}`);
                const trainData = await response.json();
                setSeats(trainData.seats); // Assume `trainData.seats` is an object like {1: true, 2: false}
                setLoading(false);
                // Check if all seats are reserved
                const allSeatsReserved = Object.values(trainData.seats).every(
                    (status) => status === false
                );
                setFull(allSeatsReserved);
            } catch (err) {
                console.error("Error fetching seating info:", err);
            }
        };
        fetchSeatingInfo();
    }, [id]); // Dependency array ensures fetchSeatingInfo runs only when `id` changes

    const title = "Pick Your Seat!";

    // Handle seat click to toggle selection
    const handleSeatClick = (seatNumber) => {
        const selectedSeatsCount = Object.values(seats).filter(
            (status) => status === "selected"
        ).length;

        if (seats[seatNumber] === false) {
            // If the seat is reserved, do nothing
            return;
        }

        if (
            seats[seatNumber] !== "selected" &&
            selectedSeatsCount >= parseInt(num, 10)
        ) {
            // Prevent selecting more seats than allowed
            setShowAlert(true)
            return;
        }

        // Toggle "selected" status for available seats
        setSeats((seats) => ({
            ...seats,
            [seatNumber]: seats[seatNumber] === "selected" ? true : "selected",
        }));
    };

    function handleSubmit() {
        const selectedSeats = Object.keys(seats).filter(
            (seatNumber) => seats[seatNumber] === "selected"
        );
        navigate(`/payment/${id}`, { state: { selectedSeats,num } });
    }

    async function handleJoinWaitlist() {
        try{
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch("/api/waitlists/addToWaitlist",{
                method:"POST",
                headers:{
                    "x-auth":token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id,num})
            });
            alert("You have joined the waitlist!");
            setLoading(false);
            navigate("/main")
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        }

        catch(err){
            console.log(err.message);
        }
      
       
    }
    const handleShowAlert = () => {
        setShowAlert(true);
      };
    
      const handleCloseAlert = () => {
        setShowAlert(false);
      };
    



    if (isLoading) {
        return (
            <div className={styles.container}>
                <Spinner></Spinner>
            </div>
        );
    }

    return (
        
        <div className={styles.container}>
            <div>
                    <button onClick={handleShowAlert}>Show Custom Alert</button>
                    {showAlert && <CustomAlert message= {`You cannot select more than ${num} seat`} onClose={handleCloseAlert} />}
            </div>
            <img className={styles.topImage} src={seatsLogo} alt="Seats Logo" />
            <div className={styles.backButton}>
                <Link to="/main">
                    <img src={backIcon} alt="Back" />
                </Link>
            </div>
            <div className={styles.legend}>
                <div className={styles.legendRow}>
                    <span className={styles.blueDot}></span>
                    <span className={styles.span}>Available</span>
                </div>
                <div className={styles.legendRow}>
                    <span className={styles.grayDot}></span>
                    <span className={styles.span}>Reserved</span>
                </div>
                <div className={styles.legendRow}>
                    <span className={styles.redDot}></span>
                    <span className={styles.span}>Selected</span>
                </div>
            </div>
            <h1 className={styles.h1}>
                {title.split("").map((letter, index) => (
                    <span
                        key={index}
                        className={styles.animatedLetter}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                ))}
            </h1>
            <div className={styles.seatsContainer}>
                {/* Left side seats */}
                <div className={styles.seatColumn}>
                    {[1, 2, 3, 4, 5].map((seatNumber) => (
                        <div
                            key={seatNumber}
                            className={`${styles.seat} ${
                                seats[seatNumber] === true
                                    ? styles.available
                                    : seats[seatNumber] === "selected"
                                    ? styles.selected
                                    : styles.reserved
                            }`}
                            onClick={() => handleSeatClick(seatNumber)}
                        >
                            {seatNumber}
                        </div>
                    ))}
                </div>
                {/* Right side seats */}
                <div className={styles.seatColumn}>
                    {[6, 7, 8, 9, 10].map((seatNumber) => (
                        <div
                            key={seatNumber}
                            className={`${styles.seat} ${
                                seats[seatNumber] === true
                                    ? styles.available
                                    : seats[seatNumber] === "selected"
                                    ? styles.selected
                                    : styles.reserved
                            }`}
                            onClick={() => handleSeatClick(seatNumber)}
                        >
                            {seatNumber}
                        </div>
                    ))}
                </div>
            </div>
            {isFull && (
                <button
                    className={styles.waitlistButton}
                    onClick={handleJoinWaitlist}
                >
                    Join Waitlist?
                </button>
            )}
            {!isFull &&
            <button
            className={styles.payButton}
            onClick={handleSubmit}
                >
               Checkout!
            </button>
            }
            
        </div>
    );
}

export default Seats;
