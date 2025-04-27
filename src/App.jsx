import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './components/Home'
import SemesterForm from './components/SemesterForm'
import AggregateCalculator from './components/AggregateCalculator'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/semester-form" element={<SemesterForm />} />
        <Route path="/aggregate-cgpa" element={<AggregateCalculator />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <AnimatedRoutes />
      </div>
      <Footer />
    </Router>
  )
}

export default App
