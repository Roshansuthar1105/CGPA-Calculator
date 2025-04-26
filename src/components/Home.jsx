import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch: '',
    semester: ''
  });

  const branches = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const semesters = [
    'First Year (1st & 2nd Semester)',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.branch && formData.semester) {
      // Navigate to the semester form with branch and semester as URL parameters
      navigate(`/semester-form?branch=${encodeURIComponent(formData.branch)}&semester=${encodeURIComponent(formData.semester)}`);
    } else {
      alert('Please select both branch and semester');
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>CGPA Calculator for Engineering Students</h1>
        <p>Calculate your semester GPA and overall CGPA with ease</p>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Semester GPA</h3>
          <p>Calculate your GPA for individual semesters based on your course grades</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Aggregate CGPA</h3>
          <p>Calculate your overall CGPA across multiple semesters</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Branch Specific</h3>
          <p>Tailored for different engineering branches and their specific courses</p>
        </div>
      </div>

      <div className="form-section">
        <h2>Get Started</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="branch">Select Your Branch:</label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Branch --</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="semester">Select Your Semester:</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester}>{semester}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-btn">Calculate Semester GPA</button>
          </form>
        </div>

        <div className="alternative-option">
          <p>Want to calculate your overall CGPA?</p>
          <Link to="/aggregate-cgpa" className="alt-link">Calculate Aggregate CGPA</Link>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Select Your Branch and Semester</h3>
              <p>Choose your engineering branch and the semester for which you want to calculate the GPA</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Enter Your Grades</h3>
              <p>Input your grades for each subject in the selected semester</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Get Your Results</h3>
              <p>View your calculated GPA and see how you're performing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
