// Date Input Component
export const DateInput = ({ label, icon, value, onChange, error }) => {
   return (
      <div className="relative w-full mb-6">
         <label className="block text-stone-600 text-sm mb-2 font-light tracking-wide">
            {label}
         </label>
         <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
               {icon}
            </div>
            <input
               type="date"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className={`w-full pl-12 pr-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-1 transition-all text-stone-800 ${
                  error 
                     ? 'border-red-500 focus:ring-red-400 focus:border-red-400' 
                     : 'border-stone-200 focus:ring-amber-400 focus:border-amber-400'
               }`}
            />
         </div>
         {error && (
            <p className="text-red-500 text-xs mt-1 font-light">{error}</p>
         )}
      </div>
   );
};