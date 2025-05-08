import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import "./App.css";

function Home() {
  return (
    <div className="home-page" style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to TravelPro</h1>
      <p>Your perfect travel companion. Book your next adventure with us!</p>
    </div>
  );
}

function Destinations() {
  return (
    <div
      className="destinations-page"
      style={{ padding: "20px", textAlign: "center" }}
    >
      <h1>Popular Destinations</h1>
      <p>Explore our most popular travel destinations.</p>
    </div>
  );
}

function Bookings() {
  return (
    <div
      className="bookings-page"
      style={{ padding: "20px", textAlign: "center" }}
    >
      <h1>Make a Booking</h1>
      <p>Book your next adventure here.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
