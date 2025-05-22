import { useState, useEffect, useRef } from "react";

export const Dropdown = ({ label, selected, options, onChange }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   // Effect to handle clicks outside the dropdown
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      // Add event listener when dropdown is open
      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      }

      // Clean up the event listener
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOpen]);

   return (
      <div className="relative w-full mb-6" ref={dropdownRef}>
         <label className="block text-stone-600 text-sm mb-2 font-light tracking-wide">
            {label}
         </label>
         <div className="relative">
            <button
               type="button"
               onClick={() => setIsOpen(!isOpen)}
               className="w-full bg-white cursor-pointer border border-stone-200 py-3 px-4 text-left text-stone-800 rounded-md flex items-center justify-between transition-all hover:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
               <span>{selected}</span>
               <svg
                  className={`w-4 h-4 text-stone-600 transition-transform ${isOpen ? "rotate-180" : ""
                     }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M19 9l-7 7-7-7"
                  ></path>
               </svg>
            </button>

            {isOpen && (
               <div className="absolute z-10 mt-1 w-full bg-white border border-stone-100 rounded-md shadow-lg max-h-60 overflow-auto">
                  {options.map((option) => (
                     <div
                        key={option}
                        className="px-4 py-3 text-stone-800 hover:bg-amber-100 cursor-pointer transition-colors"
                        onClick={() => {
                           onChange(option);
                           setIsOpen(false);
                        }}
                     >
                        {option}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};