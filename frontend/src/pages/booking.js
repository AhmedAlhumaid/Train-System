import styles from "../assets/styles/booking.module.css";
import backIcon from "../assets/images/back-icon.png";
import Ticket from "../components/ticket";
import logo from "../assets/images/logo.png";
import {Link} from "react-router-dom";
function Booking(){
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
            <Ticket></Ticket>
         
        </div>
    );
}

export default Booking;