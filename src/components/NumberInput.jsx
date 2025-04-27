import { useState } from 'react';
import { motion } from 'framer-motion';

const NumberInput = ({
  id,
  name,
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  required = false,
  label,
  theme = "blue" // blue, green, purple
}) => {
  const [focused, setFocused] = useState(false);
  
  // Theme colors
  const themeColors = {
    blue: {
      border: "border-blue-300",
      focusBorder: "border-blue-500",
      focusRing: "ring-blue-200",
      text: "text-blue-600",
      bg: "bg-blue-50"
    },
    green: {
      border: "border-green-300",
      focusBorder: "border-green-500",
      focusRing: "ring-green-200",
      text: "text-green-600",
      bg: "bg-green-50"
    },
    purple: {
      border: "border-purple-300",
      focusBorder: "border-purple-500",
      focusRing: "ring-purple-200",
      text: "text-purple-600",
      bg: "bg-purple-50"
    }
  };

  const colors = themeColors[theme];
  
  // Handle increment and decrement
  const handleIncrement = () => {
    const currentValue = parseFloat(value) || 0;
    const stepValue = parseFloat(step) || 1;
    const maxValue = max ? parseFloat(max) : Infinity;
    
    const newValue = Math.min(currentValue + stepValue, maxValue);
    onChange({ target: { name, value: newValue.toString() } });
  };
  
  const handleDecrement = () => {
    const currentValue = parseFloat(value) || 0;
    const stepValue = parseFloat(step) || 1;
    const minValue = min ? parseFloat(min) : -Infinity;
    
    const newValue = Math.max(currentValue - stepValue, minValue);
    onChange({ target: { name, value: newValue.toString() } });
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className={`relative flex items-center rounded-md ${colors.bg} ${focused ? `ring-4 ${colors.focusRing}` : ''}`}>
        <motion.button
          type="button"
          className={`flex-none px-3 py-2 ${colors.text} rounded-l-md border ${colors.border} hover:bg-gray-100`}
          onClick={handleDecrement}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={min && parseFloat(value) <= parseFloat(min)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
          </svg>
        </motion.button>
        
        <input
          type="number"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required={required}
          className={`flex-grow px-3 py-2 text-center border-t border-b ${colors.border} focus:outline-none bg-white`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        
        <motion.button
          type="button"
          className={`flex-none px-3 py-2 ${colors.text} rounded-r-md border ${colors.border} hover:bg-gray-100`}
          onClick={handleIncrement}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={max && parseFloat(value) >= parseFloat(max)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default NumberInput;
