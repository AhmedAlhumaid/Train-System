import { Link } from "react-router-dom";
import styles from "../assets/styles/deleteBookings.module.css";
import backIcon from "../assets/images/back-icon.png";
import logo from "../assets/images/logo.png";
import Spinner from "../components/spinner";
import CustomAlert from "../components/alert";
import { useEffect, useState } from "react";
import Ticket from "../components/ticket";

function DeleteBookings() {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                const response = await fetch("/api/bookings/allBooking");
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }
                const bookingsData = await response.json();
                setLoading(false);
                setBookings(bookingsData);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };
        fetchAllBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/bookings/deleteBooking?userId=${bookingId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            // Remove the canceled booking from the bookings array
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.userId !== bookingId)
            );
            setLoading(false)
        } catch (err) {
            setError(`Failed to cancel booking: ${err.message}`);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <CustomAlert message={error} type="error" />
            </div>
        );
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.backButton}>
                <Link to="/admin/booking-management">
                    <img src={backIcon} alt="Back" />
                </Link>
            </div>
            <div className={styles.logoContainer}>
                <span className={styles.tagline}>TRAIN TICKET BOOKING</span>
                <img src={logo} alt="Train Logo" className={styles.logo} />
            </div>
            <div>
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div key={index} className={styles.bookingItem}>
                            <Ticket booking={booking} />
                            <button
                                className={styles.cancelButton}
                                onClick={() => handleCancel(booking.userId)}
                            >
                                Cancel
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
}

export default DeleteBookings;
