import { useState } from 'react';

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calculate Your Aggregate CGPA</h1>
        <p className="text-gray-600 mt-2">Add all your semesters to calculate your overall CGPA</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={calculateCGPA}>
          <div className="space-y-6 mb-8">
            {semesters.map((semester) => (
              <div key={semester.id} className="bg-gray-50 rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary-700">Semester {semester.id}</h3>
                  {semesters.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                      onClick={() => handleRemoveSemester(semester.id)}
                    >
                      Remove
                    </button>
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
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <button
              type="button"
              className="btn btn-secondary flex items-center justify-center"
              onClick={handleAddSemester}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Semester
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Calculate CGPA
            </button>
          </div>
        </form>

        {cgpa !== null && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Aggregate CGPA: {cgpa}</h2>
              <div className={`inline-block px-4 py-2 rounded-full font-medium ${
                cgpa >= 8.5 ? 'bg-green-100 text-green-800' :
                cgpa >= 7 ? 'bg-blue-100 text-blue-800' :
                cgpa >= 5 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {cgpa >= 8.5 ? 'Excellent' :
                 cgpa >= 7 ? 'Good' :
                 cgpa >= 5 ? 'Average' : 'Poor'}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Scale</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-24 text-sm text-gray-600">Poor</div>
                  <div className="flex-grow h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: cgpa < 5 ? `${(cgpa/10)*100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm text-gray-600">Average</div>
                  <div className="flex-grow h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{ width: cgpa >= 5 && cgpa < 7 ? `${((cgpa-5)/2)*100}%` : (cgpa >= 7 ? '100%' : '0%') }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm text-gray-600">Good</div>
                  <div className="flex-grow h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: cgpa >= 7 && cgpa < 8.5 ? `${((cgpa-7)/1.5)*100}%` : (cgpa >= 8.5 ? '100%' : '0%') }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm text-gray-600">Excellent</div>
                  <div className="flex-grow h-2 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: cgpa >= 8.5 ? `${((cgpa-8.5)/1.5)*100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                This calculation is based on the weighted average of your semester GPAs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AggregateCalculator;
