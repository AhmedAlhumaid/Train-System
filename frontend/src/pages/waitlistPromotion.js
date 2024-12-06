import React, { useEffect, useState } from "react";
import EligibleWaitlistCard from "../components/ElgibileWaitlistCard";
import logo from "../assets/images/logo.png";
import Spinner from "../components/spinner";
import styles from "../assets/styles/waitlistPromotion.module.css";
import backIcon from "../assets/images/back-icon.png";
import { Link } from "react-router-dom";
import CustomAlert from "../components/alert";

function WaitlistPromotion() {
  const [eligibleWaitlists, setEligibleWaitlists] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const fetchEligibleBookings = async () => {
      try {
        const response = await fetch("/api/waitlists/fetchEligibleWaitlists");
        const data = await response.json();
        setEligibleWaitlists(data); // Store waitlists in state
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchEligibleBookings();
  }, []);

  async function handlePromote(waitlistId){
    try {
        setLoading(true);
        const response = await fetch (`/api/waitlists/promote-waitlist?id=${waitlistId}`,{
            method:"DELETE",
        });
    
        if (!response.ok) {
         console.log("here")
          throw new Error(`HTTP error!${response.message}`);
        }
        setEligibleWaitlists((prevWaitlists) =>
            prevWaitlists.filter((waitlist) => waitlist.userId !== waitlistId)
        );
        setLoading(false);
        handleShowAlert()
      } catch (err) {
        console.log(err.message);
        setLoading(false); // Ensure loading state is reset on error
      }
  };
  
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
   
  if(isLoading){
        return (
            <div className={styles.container}>
               <Spinner></Spinner>
            </div>
        );
  }

  return (
    <div className={styles.dashboardContainer}>
         <div>
                    {showAlert && <CustomAlert message= {`Passenger promoted successfully`} onClose={handleCloseAlert} />}
            </div>
        <div className={styles.backButton}>
                <Link to="/admin">
                    <img src={backIcon} alt="Back" />
                </Link>
            </div>
        <div className={styles.logoContainer}>
                <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
                <img src={logo} alt="Train Logo" className={styles.logo} />
            </div>
      {eligibleWaitlists.length === 0 ? (
        <p>No eligible waitlists found.</p>
      ) : (
        eligibleWaitlists.map((waitlist) => (

          <EligibleWaitlistCard
            key={waitlist.userId}
            waitlist={waitlist}
            onPromote={handlePromote}
          />
        ))
      )}
    </div>
  );

}
export default WaitlistPromotion;
