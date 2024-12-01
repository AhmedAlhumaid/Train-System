import React, { useState } from "react";
import styles from "../assets/styles/seats.module.css";
import backIcon from "../assets/images/back-icon.png";
import seatsLogo from "../assets/images/seats.png";
import { Link } from "react-router-dom";

function Seats() {
    // Seat data with status
    const [seats, setSeats] = useState({
        1: "available",
        2: "available",
        3: "available",
        4: "available",
        5: "available",
        6: "available",
        7: "available",
        8: "available",
        9: "available",
        10: "available",
    });
    
    const title = "Pick Your Seat!";
    // Handle seat click to toggle selection
    const handleSeatClick = (seatNumber) => {
        setSeats((prevSeats) => ({
            ...prevSeats,
            [seatNumber]: prevSeats[seatNumber] === "selected" ? "available" : "selected",
        }));
    };

    return (
        <div className={styles.container}>
            <img className={styles.topImage} src={seatsLogo} alt="Seats Logo" />
            <div className={styles.backButton}>
                <Link to="/">
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
                {title.split("").map((letter, index) => ( //wrapping each letter with a span to control the animation
                       <span
                       key={index}
                       className={styles.animatedLetter}
                       style={{ animationDelay: `${index * 0.1}s` }} >
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
                                seats[seatNumber] === "available"
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
                                seats[seatNumber] === "available"
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
        </div>
    );
}

export default Seats;
