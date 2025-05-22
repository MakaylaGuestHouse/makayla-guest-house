import { Cross } from 'lucide-react'
import React from 'react'

export const SiteAttraction = ({ textStyle }) => {
   return (
      <div className="mt-4 flex items-start gap-3">
         <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mr-4 shadow-sm">
            <Cross className="h-5 w-5 text-amber-600 opacity-100" />
         </div>
         <div className={textStyle}>
            <p className={`text-stone-800 ${textStyle} font-medium mb-1`}>The Catholic Secretariat</p>
            <p className="text-stone-600 text-sm">Located on the same street as our guest house</p>
         </div>
      </div>
   )
}
