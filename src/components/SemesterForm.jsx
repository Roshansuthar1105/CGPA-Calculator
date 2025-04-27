import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedPage from './AnimatedPage';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // State for semester selection when accessed directly
  const [selectedSemester, setSelectedSemester] = useState(semester);
  const [selectedBranch, setSelectedBranch] = useState(branch || 'Computer Science');

  // Available semesters for selection
  const availableSemesters = Object.keys(subjectData);

  // Handle semester selection
  const handleSemesterSelect = (e) => {
    setSelectedSemester(e.target.value);

    // Initialize form data for the selected semester
    if (e.target.value && subjectData[e.target.value]) {
      const initialFormData = {};
      Object.keys(subjectData[e.target.value].subjects).forEach(key => {
        initialFormData[key] = '';
      });
      setFormData(initialFormData);
    }
  };

  // If no semester is selected or accessed directly from navbar
  if (!semester || !subjectData[semester]) {
    return (
      <AnimatedPage>
        <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-lg shadow-lg">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Semester GPA Calculator</h1>
            <p className="text-gray-600 mb-8">Please select a semester to calculate your GPA</p>
          </motion.div>

          <motion.div
            className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Branch:
                </label>
                <select
                  id="branch"
                  className="select-field"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Semester:
                </label>
                <select
                  id="semester"
                  className="select-field"
                  value={selectedSemester || ''}
                  onChange={handleSemesterSelect}
                >
                  <option value="">-- Select Semester --</option>
                  {availableSemesters.map((sem, index) => (
                    <option key={index} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              {selectedSemester && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate(`/semester-form?branch=${encodeURIComponent(selectedBranch)}&semester=${encodeURIComponent(selectedSemester)}`);
                    }}
                  >
                    Continue to GPA Calculator
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CGPA Calculator</h1>
          <h2 className="text-xl font-semibold text-blue-600">{branch} - {semester}</h2>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          variants={formCardVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={handleSubmit}>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.keys(subjectData[semester].subjects).map((subject, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                >
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
                  <div className="mt-1 text-xs text-gray-500 flex items-center">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    Credits: {subjectData[semester].credits[subject]}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                type="button"
                onClick={handleBack}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate SGPA
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {sgpa !== null && (
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 text-center"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your SGPA: {sgpa}</h2>

              <motion.div
                className="w-full h-4 bg-gray-200 rounded-full mb-4 overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <motion.div
                  className={`h-full rounded-full ${
                    sgpa >= 9.0 ? 'bg-green-600' :
                    sgpa >= 8.0 ? 'bg-green-500' :
                    sgpa >= 7.0 ? 'bg-blue-500' :
                    sgpa >= 6.0 ? 'bg-yellow-500' :
                    sgpa >= 5.0 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(sgpa/10)*100}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                ></motion.div>
              </motion.div>

              <motion.div
                className="inline-block px-6 py-3 rounded-full bg-gray-100"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
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
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/aggregate-cgpa')}
              >
                Calculate Overall CGPA
              </motion.button>
              <motion.button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default SemesterForm;
