import styles from "../assets/styles/login.module.css";
import { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import backIcon from "../assets/images/back-icon.png";
import userIcon from "../assets/images/user-icon.png";
import lockIcon from "../assets/images/lock-icon.png";
function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    function onEmailChange(e){
        setEmail(e.target.value);
    }
    function onPasswordChange(e){
        setPassword(e.target.value)
    }

    function handleSubmit(){

    }
    return(

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

            <div className={styles.inputField}>
            <img src={userIcon} alt="User Icon" className={styles.icon} />
            <input
            type="text"
            placeholder="Email"
            className={styles.input}
            onChange={onEmailChange}
            value={email}
            required
            />
            </div>   
          <div className={styles.inputField}>
                <img src={lockIcon} alt="Lock Icon" className={styles.icon} />
                <input
                type="password"
                placeholder="Password"
                className={styles.input}
                onChange={onPasswordChange}
                value={password}
                required
                />
         </div>
         <div className={styles.footerLinks}>
            <span>
              don't have an account? <Link to = "/register"><b>Register</b></Link>
            </span>
          </div>
         <button className={styles.createButton}
       onClick={handleSubmit}
            >Login</button>
        </div>
    )
}

export default Login;