import { useState } from 'react';
import { motion } from 'framer-motion';
import { animateVariants } from '@/lib/constants/animation';
import { Calendar, Phone, Users, Mail } from 'lucide-react';
import { Dropdown } from '@/components/ui/forms/DropDown';
import { InputField } from '@/components/ui/forms/InputField';
import { DateInput } from '@/components/ui/forms/DateInput';
import { validateBooking } from '@/utils/validators';
import { createBooking } from '@/server/booking.action';
import { sendEmail } from '@/lib/sendEmail';

export const BookingForm = ({ roomId }) => {
   const [adults, setAdults] = useState('');
   const [children, setChildren] = useState('');
   const [roomType, setRoomType] = useState('');

   const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phoneNumber: '',
      checkInDate: '',
      checkOutDate: ''
   });

   const [errors, setErrors] = useState({});

   const handleInputChange = (field, value) => {
      setFormData(prev => ({
         ...prev,
         [field]: value
      }));

      // Clear error when user starts typing
      if (errors[field]) {
         setErrors(prev => ({
            ...prev,
            [field]: ''
         }));
      }
   };

   const roomOptions = [
      'Deluxe Suite',
      'Premium Room',
      'Executive Suite',
      'Luxury Penthouse'
   ];

   const handleSubmit = async () => {
      const newFormData = {
         ...formData,
         adults,
         children,
         roomType,
         roomId: roomId ?? null
      };


      if (validateBooking(newFormData, setErrors)) {
         await sendEmail(newFormData, '/api/mail/booking');
         // await createBooking(newnewFormData, roomId);
      } else {
         console.log('Form has errors:', errors);
      }
   };

   return (
      <motion.div
         variants={animateVariants.fadeInRight}
         initial="hidden"
         animate="visible"
         className="w-full"
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
                     value={formData.fullName}
                     onChange={(value) => handleInputChange('fullName', value)}
                     error={errors.fullName}
                  />
                  <InputField
                     label="Email"
                     type="email"
                     placeholder="email@example.com"
                     icon={<Mail size={18} />}
                     value={formData.email}
                     onChange={(value) => handleInputChange('email', value)}
                     error={errors.email}
                  />
               </div>

               <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="0595 631 886"
                  icon={<Phone size={18} />}
                  value={formData.phoneNumber}
                  onChange={(value) => handleInputChange('phoneNumber', value)}
                  error={errors.phoneNumber}
               />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DateInput
                     label="Check-in Date"
                     icon={<Calendar size={18} />}
                     value={formData.checkInDate}
                     onChange={(value) => handleInputChange('checkInDate', value)}
                     error={errors.checkInDate}
                  />
                  <DateInput
                     label="Check-out Date"
                     icon={<Calendar size={18} />}
                     value={formData.checkOutDate}
                     onChange={(value) => handleInputChange('checkOutDate', value)}
                     error={errors.checkOutDate}
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Dropdown
                     label="Number of Adults"
                     selected={adults}
                     options={['1', '2', '3', '4', '5']}
                     onChange={setAdults}
                     error={errors.adults}
                  />
                  <Dropdown
                     label="Number of Children"
                     selected={children}
                     options={['0', '1', '2', '3', '4']}
                     onChange={setChildren}
                     error={errors.children}
                  />
               </div>

               <Dropdown
                  label="Room Type"
                  selected={roomType}
                  options={roomOptions}
                  onChange={setRoomType}
                  error={errors.roomType}
               />

               <div className="pt-4">
                  <button
                     type="button"
                     onClick={handleSubmit}
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