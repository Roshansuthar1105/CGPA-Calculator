import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg text-center py-16 px-4 mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 md:text-5xl">CGPA Calculator for Engineering Students</h1>
        <p className="text-xl text-white max-w-2xl mx-auto">Calculate your semester GPA and overall CGPA with ease</p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-card p-8 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-primary-700 mb-3">Semester GPA</h3>
          <p className="text-gray-600">Calculate your GPA for individual semesters based on your course grades</p>
        </div>
        <div className="bg-white rounded-lg shadow-card p-8 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="text-5xl mb-4">📈</div>
          <h3 className="text-xl font-semibold text-primary-700 mb-3">Aggregate CGPA</h3>
          <p className="text-gray-600">Calculate your overall CGPA across multiple semesters</p>
        </div>
        <div className="bg-white rounded-lg shadow-card p-8 text-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-primary-700 mb-3">Branch Specific</h3>
          <p className="text-gray-600">Tailored for different engineering branches and their specific courses</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Get Started</h2>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Select Your Semester:</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="select-field"
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester}>{semester}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full btn btn-primary py-3">Calculate Semester GPA</button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-2">Want to calculate your overall CGPA?</p>
          <Link to="/aggregate-cgpa" className="text-primary-600 hover:text-primary-800 font-medium">
            Calculate Aggregate CGPA →
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How It Works</h2>
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-800 font-bold text-xl mb-4">1</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">Select Your Branch and Semester</h3>
              <p className="text-gray-600 text-center md:text-left">Choose your engineering branch and the semester for which you want to calculate the GPA</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-800 font-bold text-xl mb-4">2</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">Enter Your Grades</h3>
              <p className="text-gray-600 text-center md:text-left">Input your grades for each subject in the selected semester</p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-800 font-bold text-xl mb-4">3</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center md:text-left">Get Your Results</h3>
              <p className="text-gray-600 text-center md:text-left">View your calculated GPA and see how you're performing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - New Content */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">AS</div>
              <div className="ml-4">
                <h4 className="font-semibold">Aditya Singh</h4>
                <p className="text-sm text-gray-500">Computer Science, 6th Sem</p>
              </div>
            </div>
            <p className="text-gray-600">"This calculator helped me track my progress throughout my degree. The interface is intuitive and the calculations are accurate!"</p>
            <div className="mt-4 flex text-yellow-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-700 font-bold">PK</div>
              <div className="ml-4">
                <h4 className="font-semibold">Priya Kumar</h4>
                <p className="text-sm text-gray-500">Electronics, 4th Sem</p>
              </div>
            </div>
            <p className="text-gray-600">"I love how I can calculate both semester GPA and overall CGPA. It's become an essential tool for planning my academic goals."</p>
            <div className="mt-4 flex text-yellow-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">RJ</div>
              <div className="ml-4">
                <h4 className="font-semibold">Rahul Joshi</h4>
                <p className="text-sm text-gray-500">Mechanical, 7th Sem</p>
              </div>
            </div>
            <p className="text-gray-600">"Simple yet powerful. I can quickly see how different grades would affect my overall CGPA. Highly recommended for all engineering students!"</p>
            <div className="mt-4 flex text-yellow-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
