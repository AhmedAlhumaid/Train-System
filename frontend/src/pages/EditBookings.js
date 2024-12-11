import { Link } from "react-router-dom";
import styles from "../assets/styles/EditBookings.module.css";
import backIcon from "../assets/images/back-icon.png";
import logo from "../assets/images/logo.png";
import Spinner from "../components/spinner";
import CustomAlert from "../components/alert";
import { useEffect, useState } from "react";
import Ticket from "../components/ticket";

function EditBookings() {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        from: "",
        to: "",
        date: "",
        status: ""
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [editForm, setEditForm] = useState({
        price: "",
        status: "",
        seats: []
    });

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

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredBookings = bookings?.filter((booking) => {
        return (
            (!filters.from || booking.from.includes(filters.from)) &&
            (!filters.to || booking.to.includes(filters.to)) &&
            (!filters.date || booking.date.includes(filters.date)) &&
            (!filters.status || booking.status === filters.status)
        );
    });

    const openModal = (booking) => {
        setCurrentBooking(booking);
        setEditForm({
            price: booking.price,
            status: booking.status,
            seats: booking.seats
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentBooking(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSeatsChange = (e, index) => {
        const updatedSeats = [...editForm.seats];
        updatedSeats[index] = e.target.value;
        setEditForm((prev) => ({ ...prev, seats: updatedSeats }));
    };

    const addSeat = () => {
        setEditForm((prev) => ({ ...prev, seats: [...prev.seats, ""] }));
    };

    const removeSeat = (index) => {
        setEditForm((prev) => ({
            ...prev,
            seats: prev.seats.filter((_, i) => i !== index)
        }));
    };

    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/bookings/editBooking?bookingId=${currentBooking._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editForm)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.userId === currentBooking.userId
                        ? { ...booking, ...editForm }
                        : booking
                )
            );
            closeModal();
            setLoading(false);
        } catch (err) {
            setError(`Failed to edit booking: ${err.message}`);
            setLoading(false);
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
    <div className={styles.filtersContainer}>
        <div className={styles.searchBar}>
            <input
                type="text"
                name="from"
                placeholder="From"
                className={styles.searchInput}
                value={filters.from}
                onChange={handleFilterChange}
            />
            <input
                type="text"
                name="to"
                placeholder="To"
                className={styles.searchInput}
                value={filters.to}
                onChange={handleFilterChange}
            />
            <input
                type="date"
                name="date"
                className={styles.searchInput}
                value={filters.date}
                onChange={handleFilterChange}
            />
            <select
                name="status"
                className={styles.searchSelect}
                value={filters.status}
                onChange={handleFilterChange}
            >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
            </select>
            <button
                className={styles.clearButton}
                onClick={() => setFilters({ from: "", to: "", date: "", status: "" })}
            >
                Clear Filters
            </button>
        </div>
    </div>
            <div>
                {filteredBookings && filteredBookings.length > 0 ? (
                    filteredBookings.map((booking, index) => (
                        <div key={index} className={styles.bookingItem}>
                            <Ticket booking={booking} />
                            <button
                                className={styles.editButton}
                                onClick={() => openModal(booking)}
                            >
                                Edit
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
            {isModalOpen && (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Edit Booking</h2>
            <div className={styles.modalForm}>
                <label className={styles.modalLabel}>Price:</label>
                <input
                    type="number"
                    name="price"
                    className={styles.modalInput}
                    value={editForm.price}
                    onChange={handleFormChange}
                />
                <label className={styles.modalLabel}>Status:</label>
                <select
                    name="status"
                    className={styles.modalSelect}
                    value={editForm.status}
                    onChange={handleFormChange}
                >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                </select>
                <label className={styles.modalLabel}>Seats:</label>
                {editForm.seats.map((seat, index) => (
                    <div key={index} className={styles.seatRow}>
                        <input
                            type="text"
                            className={styles.modalInput}
                            value={seat}
                            onChange={(e) => handleSeatsChange(e, index)}
                        />
                        <button
                            className={styles.removeButton}
                            onClick={() => removeSeat(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button className={styles.addSeatButton} onClick={addSeat}>
                    + Add Seat
                </button>
                <div className={styles.modalActions}>
                    <button className={styles.saveButton} onClick={handleFormSubmit}>
                        Save
                    </button>
                    <button className={styles.cancelButton} onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
)}

        </div>
    );
}

export default EditBookings;

