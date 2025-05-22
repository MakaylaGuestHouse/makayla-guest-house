import React from 'react'

export const BackgroundCircularPatterns = ({ className }) => {
   return (
      <div className={`absolute pointer-events-none opacity-5 ${className}`}>
         <svg width="400" height="400" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
         </svg>
      </div>
   );
};
