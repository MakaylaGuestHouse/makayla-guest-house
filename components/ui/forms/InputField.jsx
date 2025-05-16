// Input Field Component
export const InputField = ({ label, type, placeholder, icon }) => {
   return (
      <div className="relative w-full mb-6">
         <label className="block text-stone-600 text-sm mb-2 font-light tracking-wide uppercase">
            {label}
         </label>
         <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
               {icon}
            </div>
            <input
               type={type}
               className="w-full text-gray-600 placeholder:text-gray-400 pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all"
               placeholder={placeholder}
            />
         </div>
      </div>
   );
};