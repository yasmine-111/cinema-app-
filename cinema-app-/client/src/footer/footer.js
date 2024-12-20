import React from "react";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li><a href="/home" className="footer-link">Home</a></li>
            <li><a href="/movies" className="footer-link">Movies</a></li>
            <li><a href="/contact" className="footer-link">Contact Us</a></li>
            <li><a href="/about" className="footer-link">About Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-list">
            <li><span className="footer-icon">📞</span> +216 123 456 789</li>
            <li><span className="footer-icon">✉️</span> contact@thegrandcinema.com</li>
            <li><span className="footer-icon">📍</span> Avenue de la République, Tunis</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">Twitter</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        &copy; 2024 The Grand Cinema. Designed by <span className="footer-designer">Yasmine</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
