import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';  // Added FaSearch icon
import Card from '../card/Card';
import './header.css';

const Header = ({ userInfo, handleLogout }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsCardVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header bg-dark-charcoal flex items-center justify-between px-8 py-4 shadow-xl">
      <div className="logo text-gold text-4xl font-serif font-extrabold tracking-wide">
        The Grand Cinema
      </div>
      <nav className="nav-links flex gap-8 text-velvet-red text-lg font-semibold">
        <Link to="/" className="hover:text-gold transition duration-300">
          Home
        </Link>
        <Link to="/planning" className="hover:text-gold transition duration-300">
          Planning
        </Link>
        <Link to="/favorites" className="hover:text-gold transition duration-300">
          Favorites
        </Link>
        <a href="#membership" className="hover:text-gold transition duration-300">
          Membership
        </a>
        <a href="#contact" className="hover:text-gold transition duration-300">
          Contact Us
        </a>
        {/* Search Icon added */}
        <Link to="/search">
          <button className="search-button">
            <FaSearch size={20} />
          </button>
        </Link>
      </nav>
      <div className="auth-actions relative">
        {!userInfo ? (
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        ) : (
          <div className="icon-container relative">
            <button
              className="icon-button"
              onClick={() => setIsCardVisible((prev) => !prev)}
            >
              <FaUserCircle size={40} className="user-icon" />
            </button>
            {isCardVisible && (
              <div className="user-card" ref={cardRef}>
                <Card
                  userInfo={userInfo}
                  onLogout={handleLogout}
                  onManageAccount={() => (window.location.href = '/manage')}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
