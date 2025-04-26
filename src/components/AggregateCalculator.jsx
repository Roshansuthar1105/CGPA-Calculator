import { useState } from 'react';
import '../styles/AggregateCalculator.css';

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

  return (
    <div className="aggregate-container">
      <h1>Calculate Your Aggregate CGPA</h1>
      <div className="aggregate-form-container">
        <form onSubmit={calculateCGPA}>
          <div className="semesters-list">
            {semesters.map((semester) => (
              <div key={semester.id} className="semester-item">
                <h3>Semester {semester.id}</h3>
                <div className="semester-inputs">
                  <div className="input-group">
                    <label htmlFor={`sgpa-${semester.id}`}>SGPA:</label>
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
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor={`credits-${semester.id}`}>Credits:</label>
                    <input
                      type="number"
                      id={`credits-${semester.id}`}
                      value={semester.credits}
                      onChange={(e) => handleChange(semester.id, 'credits', e.target.value)}
                      min="1"
                      step="0.5"
                      placeholder="Enter Credits"
                      required
                    />
                  </div>
                  {semesters.length > 1 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveSemester(semester.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="button-group">
            <button type="button" className="add-btn" onClick={handleAddSemester}>
              Add Semester
            </button>
            <button type="submit" className="calculate-btn">
              Calculate CGPA
            </button>
          </div>
        </form>
        
        {cgpa !== null && (
          <div className="result-container">
            <h2>Your Aggregate CGPA: {cgpa}</h2>
            <div className="cgpa-scale">
              <div className="scale-item">
                <div className="scale-label">Poor</div>
                <div className="scale-range" style={{ backgroundColor: cgpa < 5 ? '#ff6b6b' : '#e9ecef' }}></div>
              </div>
              <div className="scale-item">
                <div className="scale-label">Average</div>
                <div className="scale-range" style={{ backgroundColor: cgpa >= 5 && cgpa < 7 ? '#ffd166' : '#e9ecef' }}></div>
              </div>
              <div className="scale-item">
                <div className="scale-label">Good</div>
                <div className="scale-range" style={{ backgroundColor: cgpa >= 7 && cgpa < 8.5 ? '#06d6a0' : '#e9ecef' }}></div>
              </div>
              <div className="scale-item">
                <div className="scale-label">Excellent</div>
                <div className="scale-range" style={{ backgroundColor: cgpa >= 8.5 ? '#118ab2' : '#e9ecef' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AggregateCalculator;
