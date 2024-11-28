
import React from "react";
import styles from  "../assets/styles/home.module.css"; 
import logo from "../assets/images/logo.png";
import {Link} from "react-router-dom";
function Home(){
    return (
        <div className={styles.container}>
          {/* Logo Section */}
          <div className={styles.logoContainer}>
            <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
            <img src={logo} alt="Train Logo" className={styles.logo} />
          </div>
    
          {/* Register Button */}
          <Link to = "/register" style={{ textDecoration: 'none' }}>
          <button className={styles.registerButton}>REGISTER</button>
          </Link>
          
    
          {/* Footer Links */}
          <div className={styles.footerLinks}>
            
            <span>
              Already a user? <Link to = "/login">
              <b>Log In</b>
              </Link>
            </span>
          </div>
        </div>
      );
}

export default Home;