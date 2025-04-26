import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SemesterForm.css';

// Subject data for different branches and semesters
const subjectData = {
  'First Year (1st & 2nd Semester)': {
    subjects: {
      'maths': 'Mathematics',
      'phyche': 'Physics/Chemistry',
      'cshv': 'Communication Skills/Human Values',
      'ppsbme': 'Programming/Problem Solving/Basic Mechanical Engineering',
      'beebce': 'Basic Electrical/Electronics/Civil Engineering',
      'phychelab': 'Physics/Chemistry Lab',
      'lhvlab': 'Language/Human Values Lab',
      'cpmplab': 'Computer Programming/Manufacturing Practice Lab',
      'beebcelab': 'Basic Electrical/Electronics/Civil Engineering Lab',
      'caegcamdlab': 'Computer Aided Engineering Graphics/CAD Lab',
      'deca': 'Design Engineering/Creative Arts'
    },
    credits: {
      'maths': 4.0,
      'phyche': 4.0,
      'cshv': 2.0,
      'ppsbme': 2.0,
      'beebce': 2.0,
      'phychelab': 1.0,
      'lhvlab': 1.0,
      'cpmplab': 1.5,
      'beebcelab': 1.0,
      'caegcamdlab': 1.5,
      'deca': 0.5
    }
  },
  // Add more semesters with their subjects and credits here
  '3rd Semester': {
    subjects: {
      'subject1': 'Mathematics III',
      'subject2': 'Data Structures',
      'subject3': 'Digital Electronics',
      'subject4': 'Object Oriented Programming',
      'subject5': 'Computer Organization',
      'subject6': 'Data Structures Lab',
      'subject7': 'Digital Electronics Lab',
      'subject8': 'OOP Lab'
    },
    credits: {
      'subject1': 4.0,
      'subject2': 3.0,
      'subject3': 3.0,
      'subject4': 3.0,
      'subject5': 3.0,
      'subject6': 1.5,
      'subject7': 1.5,
      'subject8': 1.5
    }
  },
  '4th Semester': {
    subjects: {
      'subject1': 'Mathematics IV',
      'subject2': 'Database Management Systems',
      'subject3': 'Operating Systems',
      'subject4': 'Computer Networks',
      'subject5': 'Theory of Computation',
      'subject6': 'DBMS Lab',
      'subject7': 'OS Lab',
      'subject8': 'Networks Lab'
    },
    credits: {
      'subject1': 4.0,
      'subject2': 3.0,
      'subject3': 3.0,
      'subject4': 3.0,
      'subject5': 3.0,
      'subject6': 1.5,
      'subject7': 1.5,
      'subject8': 1.5
    }
  }
  // Add more semesters as needed
};

const SemesterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const branch = queryParams.get('branch');
  const semester = queryParams.get('semester');

  const [formData, setFormData] = useState({});
  const [sgpa, setSgpa] = useState(null);

  // Grade mapping
  const gradeMap = {
    'A++': 10.0,
    'A+': 9.0,
    'A': 8.5,
    'B+': 8.0,
    'B': 7.5,
    'C+': 7.0,
    'C': 6.5,
    'D+': 6.0,
    'D': 5.5,
    'E+': 5.0,
    'E': 5.0,
    'F': 0.0
  };

  // Initialize form data based on selected semester
  useEffect(() => {
    if (semester && subjectData[semester]) {
      const initialFormData = {};
      Object.keys(subjectData[semester].subjects).forEach(key => {
        initialFormData[key] = '';
      });
      setFormData(initialFormData);
    }
  }, [semester]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateSGPA = () => {
    if (!semester || !subjectData[semester]) return 0;

    let totalGradePoints = 0;
    let totalCreditHours = 0;

    Object.keys(subjectData[semester].subjects).forEach(subject => {
      const grade = gradeMap[formData[subject]] || 0;
      const credit = subjectData[semester].credits[subject] || 0;
      totalGradePoints += grade * credit;
      totalCreditHours += credit;
    });

    return totalCreditHours > 0 ? (totalGradePoints / totalCreditHours).toFixed(2) : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = Object.keys(formData).every(key => formData[key] !== '');

    if (!allFieldsFilled) {
      alert('Please select grades for all subjects');
      return;
    }

    const calculatedSGPA = calculateSGPA();
    setSgpa(calculatedSGPA);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!semester || !subjectData[semester]) {
    return (
      <div className="error-container">
        <h2>Error: Invalid semester selected</h2>
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="semester-form-container">
      <h1>CGPA Calculator</h1>
      <h2>{branch} - {semester}</h2>

      <form onSubmit={handleSubmit}>
        <div className="subjects-container">
          {Object.keys(subjectData[semester].subjects).map((subject, index) => (
            <div key={index} className="subject-item">
              <label htmlFor={subject}>{subjectData[semester].subjects[subject]}:</label>
              <select
                id={subject}
                name={subject}
                value={formData[subject] || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select Grade</option>
                {Object.keys(gradeMap).map((grade, idx) => (
                  <option key={idx} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="button-group">
          <button type="button" onClick={handleBack} className="back-btn">Back</button>
          <button type="submit" className="calculate-btn">Calculate SGPA</button>
        </div>
      </form>

      {sgpa !== null && (
        <div className="result-container">
          <h2>Your SGPA: {sgpa}</h2>
          <div className="grade-info">
            <p>Grade Performance:
              {sgpa >= 9.0 ? 'Outstanding' :
               sgpa >= 8.0 ? 'Excellent' :
               sgpa >= 7.0 ? 'Very Good' :
               sgpa >= 6.0 ? 'Good' :
               sgpa >= 5.0 ? 'Average' : 'Poor'}
            </p>
          </div>
          <div className="action-buttons">
            <button
              type="button"
              className="action-btn"
              onClick={() => navigate('/aggregate-cgpa')}
            >
              Calculate Overall CGPA
            </button>
            <button
              type="button"
              className="action-btn reset-btn"
              onClick={() => {
                setSgpa(null);
                // Reset form data
                const initialFormData = {};
                Object.keys(subjectData[semester].subjects).forEach(key => {
                  initialFormData[key] = '';
                });
                setFormData(initialFormData);
              }}
            >
              Reset Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterForm;
