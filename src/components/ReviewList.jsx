import React from 'react';

function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p className="no-reviews">No reviews yet</p>;
  }

  return (
    <div className="review-list">
      <h4 className="section-title">Reviews</h4>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-rating">
            {[...Array(5)].map((_, index) => (
              <span 
                key={index}
                className={`star ${index < review.rating ? 'filled' : 'empty'}`}
              >
                ★
              </span>
            ))}
            <span className="review-date">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          
          {review.comment && (
            <p className="review-comment">
              {review.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList; 