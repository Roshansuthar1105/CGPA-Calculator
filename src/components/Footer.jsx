import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CGPA Calculator</h3>
            <p>A simple tool to calculate your semester GPA and overall CGPA for engineering students.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/semester-form">Semester GPA</a></li>
              <li><a href="/aggregate-cgpa">Aggregate CGPA</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@cgpacalculator.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CGPA Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
