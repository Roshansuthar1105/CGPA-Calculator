import { motion } from 'framer-motion';

const BranchSelector = ({
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

  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="mb-3">
        {value ? (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-medium">
            {value}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No branch selected</div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((option, index) => (
          <motion.button
            key={index}
            type="button"
            className={`px-4 py-3 rounded-md text-center ${
              option.value === value
                ? 'bg-purple-600 text-white font-medium'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
            }`}
            onClick={() => handleSelect(option.value)}
            whileHover={{ scale: 1.03, transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.3 } }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BranchSelector;
