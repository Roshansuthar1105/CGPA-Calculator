import { motion } from 'framer-motion';

const GradeSelector = ({
  value,
  onChange,
  id,
  name,
  required = false,
  gradeMap
}) => {
  // Grade color mapping
  const gradeColors = {
    'A++': { bg: 'bg-green-600', text: 'text-white' },
    'A+': { bg: 'bg-green-500', text: 'text-white' },
    'A': { bg: 'bg-green-400', text: 'text-white' },
    'B+': { bg: 'bg-blue-500', text: 'text-white' },
    'B': { bg: 'bg-blue-400', text: 'text-white' },
    'C+': { bg: 'bg-yellow-500', text: 'text-white' },
    'C': { bg: 'bg-yellow-400', text: 'text-white' },
    'D+': { bg: 'bg-orange-500', text: 'text-white' },
    'D': { bg: 'bg-orange-400', text: 'text-white' },
    'E+': { bg: 'bg-red-500', text: 'text-white' },
    'E': { bg: 'bg-red-400', text: 'text-white' },
    'F': { bg: 'bg-red-600', text: 'text-white' }
  };

  const handleSelect = (grade) => {
    onChange({ target: { name, value: grade } });
  };

  // Get color for selected grade
  const getGradeColor = (grade) => {
    return gradeColors[grade] || { bg: 'bg-gray-200', text: 'text-gray-700' };
  };

  return (
    <div>
      <div className="mb-2">
        {value ? (
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${getGradeColor(value).bg} ${getGradeColor(value).text}`}>
            <span className="font-bold mr-1">{value}</span>
            <span className="text-xs opacity-90">({gradeMap[value]})</span>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No grade selected</div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {Object.keys(gradeMap).map((grade) => {
          const colorStyle = getGradeColor(grade);
          const isSelected = grade === value;

          return (
            <motion.button
              key={grade}
              type="button"
              className={`flex flex-col items-center justify-center p-2 rounded-md ${colorStyle.bg} ${colorStyle.text} ${
                isSelected ? 'ring-2 ring-offset-2 ring-gray-500' : ''
              }`}
              onClick={() => handleSelect(grade)}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
            >
              <span className="font-bold text-sm">{grade}</span>
              <span className="text-xs">{gradeMap[grade]}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GradeSelector;
