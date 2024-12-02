import styles from "../assets/styles/payment.module.css"
import backIcon from "../assets/images/back-icon.png";
import visaIcon from "../assets/images/visa-icon.png";
import cardIcon from "../assets/images/card-icon.png";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useNavigate,useLocation,useParams} from "react-router-dom";
import { Link } from "react-router-dom";
function Payment(){
    const location = useLocation(); // Access the location object
    const { selectedSeats } = location.state || {}; // Extract selectedSeats from state
    const param = useParams()
    const [cardNum,setCardNum] = useState("");
    const [name,setName] = useState("");
    const [expiryDate,setExpiryDate] = useState("")
    const [CVV,setCVV] = useState("");
    return(
        <div className={styles.container}>
             <div className={styles.logoContainer}>
                    <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
                    <img src={logo} alt="Train Logo" className={styles.logo} />
                </div>
            <div className={styles.backButton}>
            <Link to = "/seats">
             <img src={backIcon} alt="Back" />
            </Link>
            </div>
            <h1 className={styles.title}>Payment</h1>
            <div className={styles.inputField}>
                <img src={cardIcon} alt="card icon" className={styles.icon} />
                <input
                    type="text"
                    placeholder="1223-233-234-2313"
                    className={styles.input}
                    onChange={(e)=>{
                        setCardNum(e.target.value);
                    }}
                    value={cardNum}
                />
                 <img src={visaIcon} alt="card icon" className={styles.visaIcon} />
            </div>
            <div className={styles.inputField}>
                <input
                    type="text"
                    placeholder="Cardholder Name"
                    className={styles.input}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    value={name}
                />
            </div>
            <div className={styles.inputField}>
                <input
                    type="text"
                    placeholder="Expiry Date mm/yy"
                    className={styles.input}
                    onChange={(e)=>{
                        setExpiryDate(e.target.value);
                    }}
                    value={expiryDate}
                />
            </div>
            <div className={styles.inputField}>
                <input
                    type="text"
                    placeholder="CVV"
                    className={styles.input}
                    onChange={(e)=>{
                        setCVV(e.target.value);
                    }}
                    value={CVV}
                />
            </div>
            <button className={styles.payButton}
                >Pay!</button>

        </div>
    );
}

export default Payment;