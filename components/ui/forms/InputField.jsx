export const InputField = ({ label, type, placeholder, icon, value, onChange, onFocus, error }) => {
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
               type={type}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               onFocus={onFocus}
               className={`w-full text-gray-600 placeholder:text-gray-400 pl-12 pr-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-1 transition-all ${
                  error 
                     ? 'border-red-500 focus:ring-red-400 focus:border-red-400' 
                     : 'border-stone-200 focus:ring-amber-400 focus:border-amber-400'
               }`}
               placeholder={placeholder}
            />
         </div>
         {error && (
            <p className="text-red-500 text-xs mt-1 font-light">{error}</p>
         )}
      </div>
   );
};