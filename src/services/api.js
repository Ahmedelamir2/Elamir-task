// Mock user data
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  membershipTier: "Gold",
  joinDate: "2021-05-10"
};

// Mock bookings data
const mockBookings = [
  {
    id: 1,
    title: "Beach Resort Vacation",
    destination: "Maldives",
    date: "2023-06-15",
    endDate: "2023-06-22",
    cost: 1299.99,
    status: "completed",
    reviews: [
      { id: 1, rating: 4, comment: "Beautiful place, great service!" }
    ]
  },
  {
    id: 2,
    title: "Mountain Hiking Trip",
    destination: "Switzerland",
    date: "2023-08-10",
    endDate: "2023-08-17",
    cost: 899.50,
    status: "completed",
    reviews: []
  },
  {
    id: 3,
    title: "City Exploration",
    destination: "Paris",
    date: "2023-10-05",
    endDate: "2023-10-10",
    cost: 750.00,
    status: "completed",
    reviews: []
  },
  {
    id: 4,
    title: "Safari Adventure",
    destination: "Kenya",
    date: "2024-01-20",
    endDate: "2024-01-27",
    cost: 1599.99,
    status: "upcoming",
    reviews: []
  }
];

// Get user data
export const getUserData = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500);
  });
};

// Get user bookings
export const getUserBookings = async (userId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBookings);
    }, 700);
  });
};

// Submit a review
export const submitReview = async (bookingId, reviewData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the booking to update
      const booking = mockBookings.find(b => b.id === bookingId);
      
      if (booking) {
        // Create a new review
        const newReview = {
          id: Math.floor(Math.random() * 1000) + 1, // Generate a random ID
          ...reviewData
        };
        
        // Add the review to the booking
        booking.reviews.push(newReview);
        
        resolve({ success: true, review: newReview });
      } else {
        resolve({ success: false, error: "Booking not found" });
      }
    }, 600);
  });
}; 