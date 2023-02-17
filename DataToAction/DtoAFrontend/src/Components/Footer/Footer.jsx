import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2023 My Website</p>
      <div className="social-links">
        <a href="https://github.com/my-github-handle" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
        <a href="https://www.facebook.com/my-facebook-handle" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
      </div>
      <p>Contact us at <a href="mailto:info@mywebsite.com">info@mywebsite.com</a></p>
    </footer>
  )
}

export default Footer
