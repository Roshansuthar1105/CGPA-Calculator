import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ButtonSelector = ({
  options,
  value,
  onChange,
  label,
  id,
  required = false,
  className = "",
  gridLayout = false, // true for grid, false for dropdown
  maxGridCols = 3,
  theme = "blue" // blue, green, purple
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Theme colors
  const themeColors = {
    blue: {
      primary: "bg-blue-600",
      hover: "hover:bg-blue-700",
      selected: "bg-blue-700",
      text: "text-white",
      border: "border-blue-300",
      light: "bg-blue-50",
      lightHover: "hover:bg-blue-100"
    },
    green: {
      primary: "bg-green-600",
      hover: "hover:bg-green-700",
      selected: "bg-green-700",
      text: "text-white",
      border: "border-green-300",
      light: "bg-green-50",
      lightHover: "hover:bg-green-100"
    },
    purple: {
      primary: "bg-purple-600",
      hover: "hover:bg-purple-700",
      selected: "bg-purple-700",
      text: "text-white",
      border: "border-purple-300",
      light: "bg-purple-50",
      lightHover: "hover:bg-purple-100"
    }
  };

  const colors = themeColors[theme];

  const handleSelect = (optionValue) => {
    onChange({ target: { name: id, value: optionValue } });
    setIsOpen(false);
  };

  // Find the selected option label
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : "Select";

  // Grid layout for options
  if (gridLayout) {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className={`grid grid-cols-2 sm:grid-cols-${maxGridCols} gap-2`}>
          {options.map((option, index) => (
            <motion.button
              key={index}
              type="button"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${option.value === value
                  ? `${colors.selected} ${colors.text} ring-2 ring-offset-2 ring-${theme}-500`
                  : `${colors.light} text-gray-700 ${colors.lightHover} border ${colors.border}`
                }`}
              onClick={() => handleSelect(option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Dropdown with button style
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <motion.button
          type="button"
          className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium ${colors.primary} ${colors.text} ${colors.hover} transition-colors duration-200`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{displayText}</span>
          <motion.svg
            className="ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </motion.svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1">
                {options.map((option, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    className={`w-full text-left px-4 py-2 text-sm ${option.value === value ? `${colors.light} font-medium` : 'text-gray-700'} ${colors.lightHover}`}
                    onClick={() => handleSelect(option.value)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ButtonSelector;
