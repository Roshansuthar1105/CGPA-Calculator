import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error: Invalid semester selected</h2>
        <button
          onClick={handleBack}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CGPA Calculator</h1>
        <h2 className="text-xl font-semibold text-primary-600">{branch} - {semester}</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.keys(subjectData[semester].subjects).map((subject, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <label htmlFor={subject} className="block text-sm font-medium text-gray-700 mb-2">
                  {subjectData[semester].subjects[subject]}:
                </label>
                <select
                  id={subject}
                  name={subject}
                  value={formData[subject] || ''}
                  onChange={handleChange}
                  required
                  className="select-field"
                >
                  <option value="">Select Grade</option>
                  {Object.keys(gradeMap).map((grade, idx) => (
                    <option key={idx} value={grade}>{grade}</option>
                  ))}
                </select>
                <div className="mt-1 text-xs text-gray-500">
                  Credits: {subjectData[semester].credits[subject]}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Calculate SGPA
            </button>
          </div>
        </form>
      </div>

      {sgpa !== null && (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your SGPA: {sgpa}</h2>
            <div className="inline-block px-4 py-2 rounded-full bg-gray-100">
              <p className="font-medium">
                Grade Performance: {' '}
                <span className={`font-bold ${
                  sgpa >= 9.0 ? 'text-green-600' :
                  sgpa >= 8.0 ? 'text-green-500' :
                  sgpa >= 7.0 ? 'text-blue-500' :
                  sgpa >= 6.0 ? 'text-yellow-500' :
                  sgpa >= 5.0 ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {sgpa >= 9.0 ? 'Outstanding' :
                   sgpa >= 8.0 ? 'Excellent' :
                   sgpa >= 7.0 ? 'Very Good' :
                   sgpa >= 6.0 ? 'Good' :
                   sgpa >= 5.0 ? 'Average' : 'Poor'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/aggregate-cgpa')}
            >
              Calculate Overall CGPA
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
