import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  
  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            Travel<span className="logo-accent">Pro</span>
          </Link>
        </div>
        
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        </div>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link to="/destinations" 
            className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Destinations
          </Link>
          <Link to="/bookings" 
            className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Bookings
          </Link>
          <Link to="/account" 
            className={`nav-link btn-account ${isActive('/account') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="icon-user">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            My Account
          </Link>
        </div>
      </div>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)}></div>}
    </nav>
  );
}

export default Navbar; 