import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function BookingCard({ booking, onReviewSubmit }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(booking.reviews || []);
  const [showReviews, setShowReviews] = useState(false);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);

    if (onReviewSubmit) {
      onReviewSubmit(booking.id, newReview);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3>{booking.title}</h3>
        <span className={`booking-status ${booking.status}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      <div className="booking-details">
        <div className="booking-info">
          <div className="booking-info-item">
            <span className="info-label">Destination</span>
            <span className="info-value">{booking.destination}</span>
          </div>
          <div className="booking-info-item">
            <span className="info-label">Date</span>
            <span className="info-value">
              {formatDate(booking.date)} - {formatDate(booking.endDate)}
            </span>
          </div>
          <div className="booking-info-item">
            <span className="info-label">Cost</span>
            <span className="info-value">${booking.cost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="booking-actions">
        {booking.status === "completed" && (
          <div className="review-actions">
            {reviews.length > 0 ? (
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="btn btn-outline"
              >
                {showReviews
                  ? "Hide Reviews"
                  : `Show Reviews (${reviews.length})`}
              </button>
            ) : (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn btn-outline"
              >
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Leave a Review
              </button>
            )}
          </div>
        )}

        <button className="btn btn-secondary">
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
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          View Details
        </button>
      </div>

      {showReviewForm && (
        <div className="review-form-container">
          <ReviewForm
            bookingId={booking.id}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
      )}

      {showReviews && (
        <div className="reviews-container">
          <ReviewList reviews={reviews} />
        </div>
      )}
    </div>
  );
}

export default BookingCard;
