import { InputField } from './InputField';
import { useState, useRef, useEffect } from 'react';

export const DropdownWithInput = ({
   icon,
   label,
   options,
   selected,
   onChange,
   placeholder,
}) => {
   const dropdownRef = useRef(null);
   const [inputValue, setInputValue] = useState(selected || '');
   const [isDropdownVisible, setDropdownVisible] = useState(false);

   const handleInputFocus = () => {
      setDropdownVisible(true);
   };

   const handleInputChange = (value) => {
      setInputValue(value);
      onChange(value);
      setDropdownVisible(true);
   };

   const handleOptionClick = (value) => {
      setInputValue(value);
      onChange(value);
      setDropdownVisible(false);
   };

   // Optional: Hide dropdown when clicking outside
   const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
         setDropdownVisible(false);
      }
   };

   // Listen for outside clicks
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   // Show all options when input is empty, otherwise filter
   const filteredOptions = inputValue.trim() === '' 
      ? options 
      : options.filter((opt) =>
           opt.toLowerCase().includes(inputValue.toLowerCase())
        );

   return (
      <div ref={dropdownRef} className="relative">
         <InputField
            label={label}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            icon={icon}
         />

         {isDropdownVisible && filteredOptions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-52 overflow-y-auto">
               {filteredOptions.map((option, index) => (
                  <li
                     key={index}
                     onClick={() => handleOptionClick(option)}
                     className="px-4 py-2 text-stone-700 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                     {option}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};