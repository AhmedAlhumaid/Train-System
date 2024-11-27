
import React from "react";
import styles from  "../assets/styles/home.module.css"; 
import logo from "../assets/images/logo.png";
function Home(){
    return (
        <div className={styles.container}>
          {/* Logo Section */}
          <div className={styles.logoContainer}>
            <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
            <img src={logo} alt="Train Logo" className={styles.logo} />
          </div>
    
          {/* Register Button */}
          <button className={styles.registerButton}>REGISTER</button>
    
          {/* Footer Links */}
          <div className={styles.footerLinks}>
            <span>
              Already a user? <b>Log In</b>
            </span>
          </div>
        </div>
      );
}

export default Home;