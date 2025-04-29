import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-2xl font-bold">CGPA Calculator</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-all duration-200">
              Home
            </Link>
            <Link to="/semester-form" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-all duration-200">
              Semester GPA
            </Link>
            <Link to="/aggregate-cgpa" className="text-white hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-all duration-200">
              Aggregate CGPA
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-purple-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/semester-form"
              className="text-white hover:bg-gray-700 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Semester GPA
            </Link>
            <Link
              to="/aggregate-cgpa"
              className="text-white hover:bg-gray-700 hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Aggregate CGPA
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
