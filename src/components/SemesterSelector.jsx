import { motion } from 'framer-motion';

const SemesterSelector = ({
  options,
  value,
  onChange,
  label,
  id,
  required = false,
  className = ""
}) => {
  const handleSelect = (optionValue) => {
    onChange({ target: { name: id, value: optionValue } });
  };

  // Find the selected option label
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : "Select Semester";

  // Filter out the empty option
  const realOptions = options.filter(option => option.value !== "");

  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="mb-3">
        {value ? (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
            {displayText}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No semester selected</div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="max-h-60 overflow-y-auto">
          {realOptions.map((option, index) => (
            <motion.button
              key={index}
              type="button"
              className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 last:border-b-0 ${
                option.value === value
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleSelect(option.value)}
              whileHover={{ x: 5, transition: { duration: 0.4 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.3 } }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterSelector;
