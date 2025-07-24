// Footer.jsx
import React from 'react'
import './Footer.css'
import { FiPhone, FiMail } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><FiPhone className="icon" /> +91‑7304733943</p>
          <p><FiMail className="icon" /> farhaansiddiqui7861@gmail.com</p>
        </div>
        <div className="footer-section">
          <h4>Follow</h4>
          <p>
            <a href="https://github.com/farhansiddiquiX" target="_blank" rel="noopener noreferrer">
              GitHub - farhansiddiquiX
            </a>
          </p>
          <p>
            <a href="https://linkedin.com/in/farhan-siddiqui7" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
        <div className="footer-section">
          <h4>About OnePDF</h4>
          <p>OnePDF lets you merge multiple PDF files into a single, organized document instantly with a clean and simple interface.</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} OnePDF. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
