import { useState, useEffect } from "react";
import { getUserData, getUserBookings } from "../services/api";
import BookingCard from "../components/BookingCard";

function Account() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const userData = await getUserData();
        setUser(userData);

        const bookingsData = await getUserBookings(userData.id);
        setBookings(bookingsData);
      } catch (err) {
        setError("Failed to load account data. Please try again later.");
        console.error("Error fetching account data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleReviewSubmit = (bookingId, newReview) => {
    setBookings(
      bookings.map((booking) => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            reviews: [...booking.reviews, newReview],
          };
        }
        return booking;
      })
    );
  };

  const formatJoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="account-page loading-state">
        <div className="loading-spinner">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
          <p>Loading account information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="account-page error-state">
        <h2>My Account</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="account-page">
      {/* User Profile Section */}
      <div className="user-profile-card">
        <div className="user-profile-header">
          <h2>My Account</h2>
          <button className="btn btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="user-profile-content">
          <div className="user-avatar">
            <div className="avatar-placeholder">{user.name.charAt(0)}</div>
          </div>

          <div className="user-info">
            <h3 className="user-name">{user.name}</h3>
            <div className="user-details">
              <div className="user-detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="user-detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {formatJoinDate(user.joinDate)}
                </span>
              </div>
              <div className="user-detail-item">
                <span className="detail-label">Membership</span>
                <span className="detail-value">
                  <span className="membership-badge">
                    {user.membershipTier}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="bookings-section">
        <div className="section-header">
          <h2>My Bookings</h2>
          <div className="booking-filters">
            <select className="form-control select-sm">
              <option value="all">All Bookings</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="6" width="20" height="14" rx="2"></rect>
              <path d="M2 10h20"></path>
              <path d="M6 14h4"></path>
              <path d="M14 14h4"></path>
              <path d="M6 18h8"></path>
            </svg>
            <p>You have no bookings yet.</p>
            <button className="btn btn-primary">Book a Trip</button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onReviewSubmit={handleReviewSubmit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
