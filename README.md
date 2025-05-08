# TravelPro - Account Page

This project implements an Account/Profile page for a travel booking application. Users can view their profile information, booking history, and leave reviews for completed trips.

## Features

- User profile section showing name, email, membership tier and join date
- List of past bookings with detailed information
- Review system allowing users to rate and comment on completed bookings
- Responsive design following modern UI/UX principles

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components including the Account page
- `/src/services` - API service layer for data fetching and manipulation

## Integration with Backend

The application is currently using mocked data for the Account page. To integrate with the real backend API:

1. **Update API Endpoints**: Modify the API service files in `src/services/api.js` to call the actual endpoints:
   - Replace `getUserData()` with a real API call to fetch user information
   - Replace `getUserBookings()` with a call to the actual bookings endpoint
   - Update `submitReview()` to post to the real review submission endpoint

2. **API Response Handling**:
   - Make sure the shape of your API responses matches the expected format in the UI components
   - If the API response format differs, update the components accordingly or create adapters

3. **Authentication**:
   - Implement proper authentication when making API calls
   - Add token handling if the backend uses JWT or similar authentication methods

4. **Error Handling**:
   - Implement proper error handling for API calls
   - Show appropriate error messages to users

## Additional Notes

- The styling is currently implemented with inline styles and a basic CSS file. For a larger application, consider using a more robust styling solution like styled-components or a CSS framework.
- For production deployment, run `npm run build` to create an optimized build

## Backend Endpoints Required

The application expects the following backend endpoints:

- `GET /api/user/{id}` - Get user profile information
- `GET /api/bookings/user/{id}` - Get all bookings for a user
- `POST /api/bookings/{id}/reviews` - Submit a review for a booking
