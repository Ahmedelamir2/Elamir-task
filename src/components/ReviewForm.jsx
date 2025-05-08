import { useState } from 'react';
import Rating from './Rating';
import { submitReview } from '../services/api';

function ReviewForm({ bookingId, onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const reviewData = {
        rating,
        comment,
        date: new Date().toISOString()
      };
      
      const response = await submitReview(bookingId, reviewData);
      
      if (response.success) {
        setSuccess('Review submitted successfully!');
        setComment('');
        setRating(0);
        
        // Notify parent component
        if (onReviewSubmit) {
          onReviewSubmit(response.review);
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } else {
        setError(response.error || 'Failed to submit review');
      }
    } catch (err) {
      setError('An error occurred while submitting your review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4 className="form-title">Leave a Review</h4>
      
      <div className="form-group">
        <label className="form-label">Your Rating</label>
        <Rating initialRating={rating} onRatingChange={handleRatingChange} />
        {rating === 0 && error && (
          <div className="rating-helper-text">Please select a rating to continue</div>
        )}
      </div>
      
      <div className="form-group">
        <label className="form-label">Your Comment (optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share details of your experience..."
          rows={3}
          className="form-control"
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="form-actions">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`btn btn-primary ${isSubmitting ? 'is-loading' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="spinner-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm; 