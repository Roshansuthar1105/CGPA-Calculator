import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalculator, FaChartLine, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import AnimatedPage from './AnimatedPage';
import SemesterSelector from './SemesterSelector';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Floating animation for the hero section
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // Counter animation for statistics
  const [stats, setStats] = useState({
    users: 0,
    calculations: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users < 5000 ? prev.users + 50 : 5000,
        calculations: prev.calculations < 25000 ? prev.calculations + 250 : 25000,
        satisfaction: prev.satisfaction < 98 ? prev.satisfaction + 1 : 98
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg text-center py-16 px-4 mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background animated elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-red-900"
                style={{
                  width: Math.random() * 50 + 10,
                  height: Math.random() * 50 + 10,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -80 - 40],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 15, // Much slower duration (15-25 seconds)
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 8,
                }}
              />
            ))}
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-white mb-4 md:text-5xl relative z-10"
            animate={floatingAnimation}
          >
            CGPA Calculator for Engineering Students
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Calculate your semester GPA and overall CGPA with ease
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center space-x-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/semester-form" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300 flex items-center">
              Get Started <FaArrowRight className="ml-2" />
            </Link>
            <a href="#how-it-works" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-full font-medium transition-all duration-300">
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Stats Section - New */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">{stats.users.toLocaleString()}+</h3>
            <p className="text-gray-600">Students Using Our Tool</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">{stats.calculations.toLocaleString()}+</h3>
            <p className="text-gray-600">Calculations Performed</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-4xl font-bold text-green-600 mb-2">{stats.satisfaction}%</h3>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-10"
            variants={itemVariants}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-8 text-center"
              variants={itemVariants}
              whileHover={cardVariants.hover}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl mb-6">
                <FaCalculator />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Semester GPA</h3>
              <p className="text-gray-600">Calculate your GPA for individual semesters based on your course grades</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-8 text-center"
              variants={itemVariants}
              whileHover={cardVariants.hover}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 text-2xl mb-6">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Aggregate CGPA</h3>
              <p className="text-gray-600">Calculate your overall CGPA across multiple semesters</p>
            </motion.div>
            <motion.div
              className="bg-white rounded-lg shadow-md p-8 text-center"
              variants={itemVariants}
              whileHover={cardVariants.hover}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-2xl mb-6">
                <FaGraduationCap />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Branch Specific</h3>
              <p className="text-gray-600">Tailored for different engineering branches and their specific courses</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Get Started</h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Select Your Branch:</label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="select-field"
                >
                  <option value="">-- Select Branch --</option>
                  {branches.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <SemesterSelector
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  label="Select Your Semester"
                  options={[
                    { value: "", label: "-- Select Semester --" },
                    ...semesters.map(semester => ({ value: semester, label: semester }))
                  ]}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Calculate Semester GPA
              </motion.button>
            </form>
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-2">Want to calculate your overall CGPA?</p>
            <Link to="/aggregate-cgpa" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              Calculate Aggregate CGPA <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          id="how-it-works"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-10"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            <motion.div
              className="flex flex-col items-center md:items-start"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">1</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">Select Your Branch and Semester</h3>
                <p className="text-gray-600 text-center md:text-left">Choose your engineering branch and the semester for which you want to calculate the GPA</p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center md:items-start"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">2</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">Enter Your Grades</h3>
                <p className="text-gray-600 text-center md:text-left">Input your grades for each subject in the selected semester</p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center md:items-start"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl mb-4">3</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">Get Your Results</h3>
                <p className="text-gray-600 text-center md:text-left">View your calculated GPA and see how you're performing</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="bg-gray-50 rounded-xl p-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                initials: "AS",
                name: "Aditya Singh",
                program: "Computer Science, 6th Sem",
                quote: "This calculator helped me track my progress throughout my degree. The interface is intuitive and the calculations are accurate!",
                rating: 5,
                bgColor: "bg-blue-100",
                textColor: "text-blue-700"
              },
              {
                initials: "PK",
                name: "Priya Kumar",
                program: "Electronics, 4th Sem",
                quote: "I love how I can calculate both semester GPA and overall CGPA. It's become an essential tool for planning my academic goals.",
                rating: 5,
                bgColor: "bg-purple-100",
                textColor: "text-purple-700"
              },
              {
                initials: "RJ",
                name: "Rahul Joshi",
                program: "Mechanical, 7th Sem",
                quote: "Simple yet powerful. I can quickly see how different grades would affect my overall CGPA. Highly recommended for all engineering students!",
                rating: 4,
                bgColor: "bg-green-100",
                textColor: "text-green-700"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center ${testimonial.textColor} font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.program}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.quote}"</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < testimonial.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section - New */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-10 text-center text-white mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your CGPA?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Start using our calculator today and keep track of your academic progress</p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/semester-form" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold shadow-lg transition-all duration-300 inline-flex items-center">
              Get Started Now <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default Home;
