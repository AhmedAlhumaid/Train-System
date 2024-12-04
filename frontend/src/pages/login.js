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
    const [error, setError] = useState(""); // To display error messages
    const navigate = useNavigate();
    function onEmailChange(e){
        setEmail(e.target.value);
    }
    function onPasswordChange(e){
        setPassword(e.target.value)
    }

    async function handleSubmit() {
      try {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // { email: "example.com", password: "pass" }
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to login");
        }
    
        const data = await response.json();
        console.log("Login successful:", data);
        console.log(data.token);
    
        // Store the token and user data on the browser for future API requests
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.type); // Assuming the API response includes user type
    
        setError("");
    
        // Navigate based on user type
        if (data.type === "Admin") {
          navigate("/admin");
        } else if (data.type === "normal") {
          navigate("/main");
        } else {
          throw new Error("Unknown user type");
        }
      } catch (err) {
        console.error("Error logging in:", err.message);
        setError(err.message); // Display error to the user
      }
    }
    
    return(

        <div className={styles.container}>
            
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
         {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}
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