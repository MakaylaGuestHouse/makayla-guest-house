import { MAP_URL } from '@/lib/routes';
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdOutlineDirections } from 'react-icons/md'

export const AddressCTA = () => {
   const openInNewTab = () => {
      window.open(MAP_URL, '_blank');
   };

   return (
      <div className="bg-white h-28 flex items-end">
         <div className="p-6 text-stone-800">
            <p className="font-serif text-2xl">Makayla Guest House</p>
            <div className="flex items-center text-stone-500">
               <FaMapMarkerAlt className="h-4 w-4 text-amber-400 mr-2" />
               <p className="text-sm text-stone-500">Abesim, Bono Region, Ghana</p>
            </div>
         </div>
         <div className="ml-auto p-6">
            <button
               onClick={openInNewTab}
               className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm flex items-center hover:bg-amber-700 transition-colors shadow-lg cursor-pointer"
            >
               <MdOutlineDirections className="mr-2" />
               Get Directions
            </button>
         </div>
      </div>
   )
}
