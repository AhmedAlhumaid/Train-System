import styles from "../assets/styles/ticket.module.css"
import barcode from "../assets/images/barcode.png"
function Ticket(){

    return (
        <div className={styles.ticketContainer}>
          <img src = {barcode} className = {styles.barcode}></img>  
          <div className={styles.ticket}>
            <div className={styles.pianoBlackHeader}></div>
            <div className={styles.ticketContent}>
              <div className={styles.leftSection}>
                <div className={styles.title}>Train Ticket</div>
                <div className={styles.route}>
                  <span className={styles.from}>Rome</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.to}>Paris</span>
                </div>
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <strong>Date:</strong> 24 April
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Time:</strong> 7:00 PM
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Class:</strong> STD
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Number:</strong> 12686755
                  </div>
                </div>
              </div>
              <div className={styles.rightSection}>
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <strong>Coach:</strong> B3
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Seat:</strong> 58
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Train:</strong> 7056
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Price:</strong> €20.00
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.pianoBlackFooter}></div>
          </div>
        </div>
      );}

export default Ticket;