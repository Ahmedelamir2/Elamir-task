import { useState } from 'react';

function Rating({ initialRating = 0, maxStars = 5, onRatingChange }) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="rating">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <span
            key={index}
            className={`star ${starValue <= (hoverRating || rating) ? 'filled' : 'empty'}`}
            onClick={() => handleRatingClick(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              cursor: 'pointer',
              color: starValue <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9',
              fontSize: '24px',
              marginRight: '5px',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default Rating; 