import styles from "../assets/styles/ticket.module.css"
import barcode from "../assets/images/barcode.png"
function Ticket(props){
  const booking = props.booking;
  const seats = props.booking.seats.join(", ")
  const date = convertToRegularDate(booking.travelDate);
  function convertToRegularDate(yyyymmdd){
      // Extract year, month, and day from the yyyymmdd string
      const year = yyyymmdd.substring(0, 4);
      const month = yyyymmdd.substring(4, 6);
      const day = yyyymmdd.substring(6, 8);
    
      // Return the formatted string
      return `${year}-${month}-${day}`;
  }
    return (
        <div className={styles.ticketContainer}>
          <img src = {barcode} alt =".." className = {styles.barcode}></img>  
          <div className={styles.ticket}>
            <div className={styles.pianoBlackHeader}></div>
            <div className={styles.ticketContent}>
              <div className={styles.leftSection}>
                <div className={styles.title}>Train Ticket</div>
                <div className={styles.route}>
                  <span className={styles.from}>Station {booking.from}</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.to}>Station {booking.to}</span>
                </div>
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <strong>Date:</strong> {date}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Time:</strong>At noon 
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Class:</strong> Economy
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Number:</strong>{booking.trainId}
                  </div>
                </div>
              </div>
              <div className={styles.rightSection}>
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <strong>Status:</strong> {booking.status}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Seat:</strong> {seats}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>userID:</strong> {booking.userId}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Price:</strong> ${booking.price}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.pianoBlackFooter}></div>
          </div>
        </div>
      );}

export default Ticket;