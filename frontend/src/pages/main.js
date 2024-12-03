import { useEffect,useState } from "react";
import styles from "../assets/styles/main.module.css";
import TrainSelector from "../components/train_selector";
import logo from "../assets/images/logo.png";
import backIcon from "../assets/images/back-icon.png";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
function Main(){
    const navigate = useNavigate();
    function handleClick(){
       
        navigate("/booking");
    }
    return (
        <div className={styles.container}>
            <div className={styles.backButton}>
        <Link to = "/">
        <img src={backIcon} alt="Back" />
        </Link>
            </div>
              <div className={styles.logoContainer}>
            <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
            <img src={logo} alt="Train Logo" className={styles.logo} />
      </div>
            <TrainSelector></TrainSelector>
            <button className={styles.viewTicketBtn}
                onClick={handleClick}
                >View My Ticket</button>
        </div>
    )
}

export default Main;