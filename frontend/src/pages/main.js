import { useEffect,useState } from "react";
import styles from "../assets/styles/main.module.css";
import TrainSelector from "../components/train_selector";
import logo from "../assets/images/logo.png";
function Main(){
   

    return (
        <div className={styles.container}>
              <div className={styles.logoContainer}>
            <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
            <img src={logo} alt="Train Logo" className={styles.logo} />
      </div>
            <TrainSelector></TrainSelector>
        </div>
    )
}

export default Main;