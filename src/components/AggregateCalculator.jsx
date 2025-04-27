import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from './AnimatedPage';

const AggregateCalculator = () => {
  const [semesters, setSemesters] = useState([
    { id: 1, sgpa: '', credits: '' }
  ]);
  const [cgpa, setCgpa] = useState(null);

  const handleAddSemester = () => {
    const newSemester = {
      id: semesters.length + 1,
      sgpa: '',
      credits: ''
    };
    setSemesters([...semesters, newSemester]);
  };

  const handleRemoveSemester = (id) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(semester => semester.id !== id));
    }
  };

  const handleChange = (id, field, value) => {
    const updatedSemesters = semesters.map(semester => {
      if (semester.id === id) {
        return { ...semester, [field]: value };
      }
      return semester;
    });
    setSemesters(updatedSemesters);
  };

  const calculateCGPA = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    const allFieldsFilled = semesters.every(semester =>
      semester.sgpa !== '' && semester.credits !== ''
    );

    if (!allFieldsFilled) {
      alert('Please fill in all SGPA and credit values');
      return;
    }

    let totalGradePoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      const semesterSGPA = parseFloat(semester.sgpa);
      const semesterCredits = parseFloat(semester.credits);

      if (!isNaN(semesterSGPA) && !isNaN(semesterCredits)) {
        totalGradePoints += semesterSGPA * semesterCredits;
        totalCredits += semesterCredits;
      }
    });

    if (totalCredits > 0) {
      const calculatedCGPA = (totalGradePoints / totalCredits).toFixed(2);
      setCgpa(calculatedCGPA);
    } else {
      setCgpa(0);
    }
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

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Calculate Your Aggregate CGPA</h1>
          <p className="text-gray-600 mt-2">Add all your semesters to calculate your overall CGPA</p>

          <motion.div
            className="mt-4 bg-blue-50 p-4 rounded-lg inline-block border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Tip:</span> Enter the SGPA and total credits for each semester you've completed.
              You can add multiple semesters to calculate your overall CGPA.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
            delay: 0.2
          }}
        >
          <form onSubmit={calculateCGPA}>
            <motion.div
              className="space-y-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {semesters.map((semester, index) => (
                <motion.div
                  key={semester.id}
                  className="bg-gray-50 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-600">Semester {semester.id}</h3>
                    {semesters.length > 1 && (
                      <motion.button
                        type="button"
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                        onClick={() => handleRemoveSemester(semester.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Remove
                      </motion.button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor={`sgpa-${semester.id}`} className="block text-sm font-medium text-gray-700">
                        SGPA:
                      </label>
                      <input
                        type="number"
                        id={`sgpa-${semester.id}`}
                        value={semester.sgpa}
                        onChange={(e) => handleChange(semester.id, 'sgpa', e.target.value)}
                        min="0"
                        max="10"
                        step="0.01"
                        placeholder="Enter SGPA"
                        required
                        className="input-field"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor={`credits-${semester.id}`} className="block text-sm font-medium text-gray-700">
                        Credits:
                      </label>
                      <input
                        type="number"
                        id={`credits-${semester.id}`}
                        value={semester.credits}
                        onChange={(e) => handleChange(semester.id, 'credits', e.target.value)}
                        min="1"
                        step="0.5"
                        placeholder="Enter Credits"
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors duration-300 flex items-center justify-center"
                onClick={handleAddSemester}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Semester
              </motion.button>
              <motion.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate CGPA
              </motion.button>
            </motion.div>
          </form>

          {cgpa !== null && (
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200"
              variants={resultVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Aggregate CGPA: {cgpa}</h2>
                <motion.div
                  className={`inline-block px-6 py-3 rounded-full font-medium ${
                    cgpa >= 8.5 ? 'bg-green-100 text-green-800' :
                    cgpa >= 7 ? 'bg-blue-100 text-blue-800' :
                    cgpa >= 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {cgpa >= 8.5 ? 'Excellent' :
                   cgpa >= 7 ? 'Good' :
                   cgpa >= 5 ? 'Average' : 'Poor'}
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-gray-50 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Scale</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-600">Poor</div>
                      <div className="text-sm font-medium text-gray-600">0 - 5.0</div>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: cgpa < 5 ? `${(cgpa/5)*100}%` : '0%' }}
                        transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-600">Average</div>
                      <div className="text-sm font-medium text-gray-600">5.0 - 7.0</div>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-yellow-500"
                        initial={{ width: 0 }}
                        animate={{ width: cgpa >= 5 && cgpa < 7 ? `${((cgpa-5)/2)*100}%` : (cgpa >= 7 ? '100%' : '0%') }}
                        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-600">Good</div>
                      <div className="text-sm font-medium text-gray-600">7.0 - 8.5</div>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: cgpa >= 7 && cgpa < 8.5 ? `${((cgpa-7)/1.5)*100}%` : (cgpa >= 8.5 ? '100%' : '0%') }}
                        transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-600">Excellent</div>
                      <div className="text-sm font-medium text-gray-600">8.5 - 10.0</div>
                    </div>
                    <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: cgpa >= 8.5 ? `${((cgpa-8.5)/1.5)*100}%` : '0%' }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="text-gray-600">
                  This calculation is based on the weighted average of your semester GPAs.
                </p>
                <motion.div
                  className="mt-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setCgpa(null);
                      // Reset form data if needed
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Calculate Another CGPA
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default AggregateCalculator;
