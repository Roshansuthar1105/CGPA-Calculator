import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SemesterForm from './components/SemesterForm'
import AggregateCalculator from './components/AggregateCalculator'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/semester-form" element={<SemesterForm />} />
          <Route path="/aggregate-cgpa" element={<AggregateCalculator />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
