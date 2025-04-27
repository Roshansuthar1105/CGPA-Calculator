import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  label,
  id,
  required = false,
  className = "",
  dropdownIcon = true,
  theme = "blue" // blue, green, purple
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  // Theme colors
  const themeColors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      hoverBg: "hover:bg-blue-100",
      activeBg: "bg-blue-100",
      text: "text-blue-800",
      icon: "text-blue-500"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      hoverBg: "hover:bg-green-100",
      activeBg: "bg-green-100",
      text: "text-green-800",
      icon: "text-green-500"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      hoverBg: "hover:bg-purple-100",
      activeBg: "bg-purple-100",
      text: "text-purple-800",
      icon: "text-purple-500"
    }
  };

  const colors = themeColors[theme];

  // Update internal state when value prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    onChange({ target: { name: id, value: option.value } });
    setIsOpen(false);
  };

  // Find the selected option label
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <motion.div
        className={`relative cursor-pointer border ${colors.border} ${colors.bg} rounded-md px-4 py-2.5 ${isOpen ? 'ring-2 ring-blue-300' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <span className={`block truncate ${selectedValue ? 'font-medium' : 'text-gray-500'}`}>
            {displayText}
          </span>
          {dropdownIcon && (
            <motion.span
              className={`${colors.icon} ml-2`}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-1">
              {options.map((option, index) => (
                <motion.li
                  key={index}
                  className={`cursor-pointer px-4 py-2 text-sm ${option.value === selectedValue ? `${colors.activeBg} font-medium` : 'text-gray-700'} ${colors.hoverBg}`}
                  onClick={() => handleSelect(option)}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {option.label}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
