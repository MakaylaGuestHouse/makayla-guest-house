import { useState } from 'react';
import { motion } from 'framer-motion';
import { animateVariants } from '@/lib/constants/animation';
import { Calendar, Phone, Users, Mail } from 'lucide-react';
import { Dropdown } from '@/components/ui/forms/DropDown';
import { InputField } from '@/components/ui/forms/InputField';
import { DateInput } from '@/components/ui/forms/DateInput';

export const BookingForm = () => {
   const [adults, setAdults] = useState('2');
   const [children, setChildren] = useState('0');
   const [roomType, setRoomType] = useState('Deluxe Suite');

   const roomOptions = [
      'Deluxe Suite',
      'Premium Room',
      'Executive Suite',
      'Luxury Penthouse'
   ];

   return (
      <motion.div
         variants={animateVariants.fadeInRight}
         initial="hidden"
         animate="visible"
         className="w-full lg:w-1/2"
      >
         <div className="bg-white rounded-lg shadow-xl p-8 lg:p-10">
            <div className="mb-8">
               <p className="font-light text-amber-700 text-sm tracking-wider uppercase mb-2">Rooms & Suites</p>
               <h3 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">Book A Room</h3>
               <div className="w-20 h-px bg-amber-400 mb-6"></div>
               <p className="text-stone-600">Complete the details below to reserve your stay at our luxury guest house.</p>
            </div>

            <div className="space-y-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                     label="Full Name"
                     type="text"
                     placeholder="John Smith"
                     icon={<Users size={18} />}
                  />
                  <InputField
                     label="Email Address"
                     type="email"
                     placeholder="email@example.com"
                     icon={<Mail size={18} />}
                  />
               </div>

               <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+233 595 631 886"
                  icon={<Phone size={18} />}
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DateInput label="Check-in Date" icon={<Calendar size={18} />} />
                  <DateInput label="Check-out Date" icon={<Calendar size={18} />} />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Dropdown
                     label="Number of Adults"
                     selected={adults}
                     options={['1', '2', '3', '4', '5']}
                     onChange={setAdults}
                  />
                  <Dropdown
                     label="Number of Children"
                     selected={children}
                     options={['0', '1', '2', '3', '4']}
                     onChange={setChildren}
                  />
               </div>

               <Dropdown
                  label="Room Type"
                  selected={roomType}
                  options={roomOptions}
                  onChange={setRoomType}
               />

               <div className="pt-4">
                  <button
                     type="button"
                     className="w-full cursor-pointer bg-stone-800 hover:bg-amber-700 text-white py-4 px-6 rounded-md transition-colors duration-300 font-medium text-center tracking-wide"
                  >
                     Check Availability
                  </button>
               </div>
            </div>
         </div>
      </motion.div>

   );
}