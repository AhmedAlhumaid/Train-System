import styles from "../assets/styles/payment.module.css"
import backIcon from "../assets/images/back-icon.png";
import visaIcon from "../assets/images/visa-icon.png";
import cardIcon from "../assets/images/card-icon.png";
import logo from "../assets/images/logo.png";
import CustomAlert from "../components/alert";
import { useEffect, useState } from "react";
import { useNavigate,useLocation,useParams} from "react-router-dom";
import { Link } from "react-router-dom";
function Payment(){
    const location = useLocation(); // Access the location object
    const { selectedSeats,num } = location.state || {};
    // Extract selectedSeats from state
    const {id} = useParams() // get the train id 
    const navigate = useNavigate();
    const [train, setTrain] = useState(null); // State for train data
    const [cardNum,setCardNum] = useState("");
    const [name,setName] = useState("");
    const [expiryDate,setExpiryDate] = useState("")
    const [CVV,setCVV] = useState("");
    const [isPaid,setPaid] = useState(true)
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        const fetchTrainInfo = async () => {
            try {
                const response = await fetch(`/api/trains/train?id=${id}`);
                if (!response.ok) {
                    setTrain(null);
                
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                else{
                    const trainData = await response.json();
                    setTrain(trainData); // Update state with fetched train data
                }
               
            } catch (err) {
                console.error("Error fetching train info:", err);
            }
        };

        if (id) {
            fetchTrainInfo();
        }
    }, [id]); // Dependency array ensures this effect only runs when `id` changes

    async function handlePayNow(){
        try{
            const token = localStorage.getItem("token")
            const response = await fetch("/api/bookings/newBooking",
            {
                method :"POST",
                headers:{"x-auth":token,
                        "Content-Type":"application/json"
                },
                body: JSON.stringify({"trainObject":train,"seats":selectedSeats})
            }

        );
        if(!response.ok){
            const errorData = await response.json();
            alert(errorData.error)
            throw new Error(errorData.error);
        }
           addPassenger(); //add passenger to the train in the database
           navigate("/main")
           alert("paid successfully")
        }
        catch(err){
            console.error("Error!!", err.message);
        }
    }
    async function handlePayLater(){
        try{
            setPaid(false);
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/bookings/newBooking?status=${isPaid}`,
            {
                method :"POST",
                headers:{"x-auth":token,
                        "Content-Type":"application/json"
                },
                body: JSON.stringify({"trainObject":train,"seats":selectedSeats})
            }

        );
        if(!response.ok){
            const errorData = await response.json();
            alert(errorData.error)
            throw new Error(errorData.error || "Failed to pay");
        }
        addPassenger(); //add passenger to the train in the database
        navigate("/main")
        alert("booking was made successfully")
        }
        catch(err){
            console.log(err.message);
        }
    }

    //add a passenger function 
    async function addPassenger(){
        const token = localStorage.getItem("token")
        try{
            const response = await fetch("/api/trains/addPassenger",{
                method:"POST",
                headers:{
                    "x-auth":token,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({"trainID":id,"selectedSeats":selectedSeats})
            });
            if(!response.ok){
               const  errorData = response.json();
                throw new Error("an error occured in adding a passenger",errorData.error);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }   
    return(
        <div className={styles.container}>
             <div className={styles.logoContainer}>
                    <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
                    <img src={logo} alt="Train Logo" className={styles.logo} />
                </div>
            <div className={styles.backButton}>
            <Link to = {`/seats/${id}/${num}`}>
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
            <button className={styles.payButton} onClick={handlePayNow}
                >Pay!</button>
             <div className={styles.footerLinks}>
            <span onClick={handlePayLater}>
            
              <b>Pay later?</b>
            </span>
          </div>   
        </div>
    );
}

export default Payment;