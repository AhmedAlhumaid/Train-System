import React from "react";
import styles from "../assets/styles/register.module.css";
import backIcon from "../assets/images/back-icon.png";
import userIcon from "../assets/images/user-icon.png";
import phoneIcon from "../assets/images/phone-icon.png";
import lockIcon from "../assets/images/lock-icon.png";
import eyeIcon from "../assets/images/eye-icon.png";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function Register(){ 
  const [fName,setFname] = useState("");
  const [lName,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNum,setPhoneNum] = useState("");
    const [confirmedPassword,setConfirmedPassword] = useState("")
    const [visible,setVisible] = useState(false);
    const[validEmail,setValidEmail] = useState(false);
    const[validPassword,setValidPassword]= useState(false);
    const[validPhoneNum,setValidPhoneNum] = useState(false);
    const [error, setError] = useState(""); // To display error messages
    const navigate = useNavigate();

    function onFirstNameChange(e){
      setFname(e.target.value);
    }

    function onLastNameChange(e){
      setLname(e.target.value);
    }

    function onEmailChange(e){
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.includes("@") && newEmail.endsWith(".com")) {
      setValidEmail(true);
      console.log("Valid email:", newEmail);
    } else {
      console.log("Invalid email:", newEmail);
    }
    }

    function onPasswordChange(e){
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length < 8) {
          console.log("Password too short. Must be at least 8 characters.");
        } else {
          setValidPassword(true)  
          console.log("Password is valid.");
        }
    }

    function onConfirmingChange(e){
        const newPassword = e.target.value;
        setConfirmedPassword(newPassword);
        if (newPassword.length < 8) {
          console.log("Password too short. Must be at least 8 characters.");
        } else {
          console.log("Password is valid.");
        }
    }
    function onPhoneNumChange(e){
        const newPhoneNum = e.target.value;
    setPhoneNum(newPhoneNum);

    if (/^\d{10}$/.test(newPhoneNum)) {
      setValidPhoneNum(true)  
      console.log("Valid phone number:", newPhoneNum);
    } else {
      console.log("Invalid phone number. Must be 10 digits.");
    }

    }

    function onToggleVisibilty(){
        setVisible(!visible);
    }
   async function handleSubmit(){
    const type = "normal"
     if(!validEmail||!validPassword||!validPhoneNum){
        console.log("check your credentials")
     }

     else{
      try{
        const response  = await fetch("http://localhost:5000/api/users/register",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({fName,lName,email,password,phoneNum,type})
        });

        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to register");
        }
        const data = await response.json()
        console.log("registered successfully ", data)
        navigate("/")
      }
      catch(err){
        console.error("Error in registering:", err.message);
        setError(err.message); // Display error to the user
      }
       
     }  
    }
  return (
    <div className={styles.container}>
      {/* Back Button */}
      <div className={styles.backButton}>
        <Link to = "/">
        <img src={backIcon} alt="Back" />
        </Link>
        
      </div>

      <div className={styles.logoContainer}>
            <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
            <img src={logo} alt="Train Logo" className={styles.logo} />
      </div>

      {/* Title */}
      <h1 className={styles.title}>Create</h1>
      <h1 className={styles.title}>an account</h1>

      {/* Input Fields */}
      <div className={styles.inputField}>
        <img src={userIcon} alt="User Icon" className={styles.icon} />
        <input
          type="text"
          placeholder="First name"
          className={styles.input}
          onChange={onFirstNameChange}
          value={fName}
        />
      </div>
      <div className={styles.inputField}>
        <img src={userIcon} alt="User Icon" className={styles.icon} />
        <input
          type="text"
          placeholder="Last name"
          className={styles.input}
          onChange={onLastNameChange}
          value={lName}

        />
      </div>
      <div className={styles.inputField}>
        <img src={userIcon} alt="User Icon" className={styles.icon} />
        <input
          type="text"
          placeholder="Email"
          className={styles.input}
          onChange={onEmailChange}
          value={email}
        />
      </div>
      <div className={styles.inputField}>
        <img src={phoneIcon} alt="Phone Icon" className={styles.icon} />
        <input
          type="text"
          placeholder="Phone Number"
          className={styles.input}
          onChange={onPhoneNumChange}
          value={phoneNum}

        />
      </div>
      <div className={styles.inputField}>
        <img src={lockIcon} alt="Lock Icon" className={styles.icon} />
        <input
          type={visible?"text":"password"}
          placeholder="Password"
          className={styles.input}
          onChange={onPasswordChange}
          value={password}
        />
        <img src={eyeIcon} alt="Show Password" className={styles.eyeIcon}
        onClick={onToggleVisibilty}
         />
      </div>
      <div className={styles.inputField}>
        <img src={lockIcon} alt="Lock Icon" className={styles.icon} />
        <input
          type={visible?"text":"password"}
          placeholder="Confirm Password"
          className={styles.input}
          value={confirmedPassword}
          onChange={onConfirmingChange}
        />
        <img src={eyeIcon} alt="Show Password" className={styles.eyeIcon} 
        onClick={onToggleVisibilty}
        />
      </div>
      <div className={styles.footerLinks}>
            <span>
              Already have an account? <b>Log In</b>
            </span>
          </div>
    {error && <p className={styles.errorMessage}>{error}</p>} {/* Display error message */}
      {/* Submit Button */}
      <button className={styles.createButton}
       onClick={handleSubmit}
      >Create Account</button>
    </div>
  );
};

export default Register;
