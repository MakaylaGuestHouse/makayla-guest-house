"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation'; import {
   Calendar,
   Eye,
   Users,
   Clock,
   CreditCard,
   ChevronDown,
   ChevronUp,
   Phone,
   Mail,
   MapPin
} from 'lucide-react';

const fetchData = async ({ type }) => {
   // This function would fetch real data from your API
   return [];
};

const BookingCard = ({ booking, onView }) => {
   const [isExpanded, setIsExpanded] = useState(false);

   const getStatusColor = (status) => {
      switch (status) {
         case 'confirmed':
            return 'bg-green-100 text-green-800';
         case 'pending':
            return 'bg-yellow-100 text-yellow-800';
         case 'cancelled':
            return 'bg-red-100 text-red-800';
         case 'completed':
            return 'bg-blue-100 text-blue-800';
         default:
            return 'bg-stone-100 text-stone-800';
      }
   };

   const getPaymentStatusColor = (status) => {
      switch (status) {
         case 'paid':
            return 'bg-green-100 text-green-800';
         case 'pending':
            return 'bg-yellow-100 text-yellow-800';
         case 'failed':
            return 'bg-red-100 text-red-800';
         case 'refunded':
            return 'bg-blue-100 text-blue-800';
         default:
            return 'bg-stone-100 text-stone-800';
      }
   };

   return (
      <motion.div
         variants={animateVariants.fadeIn}
         className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden"
      >
         <div className="p-6">
            <div className="flex items-start justify-between mb-4">
               <div className="flex-1">
                  <h3 className="text-xl font-serif text-stone-800 mb-2">{booking.fullName}</h3>
                  <div className="flex items-center gap-4 text-sm text-stone-600 mb-2">
                     <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'Check-in date'}
                     </span>
                     <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {booking.adults} adults, {booking.children} children
                     </span>
                     <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.totalNights} nights
                     </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                     <span className="text-lg font-semibold text-stone-800">{booking.roomType}</span>
                     {booking.totalAmount && (
                        <>
                           <span className="text-stone-400">•</span>
                           <span className="text-lg font-bold text-amber-700">${booking.totalAmount}</span>
                        </>
                     )}
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button
                     onClick={() => onView(booking)}
                     className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                     title="View Details"
                  >
                     <Eye className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                     {booking.bookingStatus || 'pending'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                     Payment: {booking.paymentStatus || 'pending'}
                  </span>
               </div>
               <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 text-stone-600 hover:text-stone-800 transition-colors"
               >
                  <span className="text-sm">Details</span>
                  {isExpanded ? (
                     <ChevronUp className="w-4 h-4" />
                  ) : (
                     <ChevronDown className="w-4 h-4" />
                  )}
               </button>
            </div>
         </div>

         {isExpanded && (
            <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="border-t border-stone-200 px-6 py-4 bg-stone-50"
            >
               <div className="space-y-4">
                  <div>
                     <h4 className="font-semibold text-stone-800 mb-2">Contact Information</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                           <Mail className="w-4 h-4 text-stone-500" />
                           <span className="text-stone-600">{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Phone className="w-4 h-4 text-stone-500" />
                           <span className="text-stone-600">{booking.phoneNumber}</span>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h4 className="font-semibold text-stone-800 mb-2">Booking Details</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                           <span className="text-stone-600">Check-in:</span> {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'Not set'}
                        </div>
                        <div>
                           <span className="text-stone-600">Check-out:</span> {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'Not set'}
                        </div>
                        <div>
                           <span className="text-stone-600">Adults:</span> {booking.adults}
                        </div>
                        <div>
                           <span className="text-stone-600">Children:</span> {booking.children}
                        </div>
                        <div>
                           <span className="text-stone-600">Total Nights:</span> {booking.totalNights}
                        </div>
                        <div>
                           <span className="text-stone-600">Room Type:</span> {booking.roomType}
                        </div>
                     </div>
                  </div>

                  {booking.specialRequests && (
                     <div>
                        <h4 className="font-semibold text-stone-800 mb-2">Special Requests</h4>
                        <p className="text-sm text-stone-600 leading-relaxed">{booking.specialRequests}</p>
                     </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                     <div className="flex items-center gap-4 text-xs text-stone-500">
                        <span>Booking ID: {booking.bookingReference || 'Pending'}</span>
                        <span>Created: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Recently'}</span>
                     </div>
                     {booking.totalAmount && (
                        <div className="text-right">
                           <div className="text-lg font-bold text-amber-700">${booking.totalAmount}</div>
                           <div className="text-xs text-stone-500">Total Amount</div>
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
};

const Bookings = ({ bookings }) => {
   const { ref, controls } = useAnimateInView();

   const handleView = (booking) => {
      // Show detailed view or navigate to booking details
      console.log('View booking details:', booking);
   };

   // if (loading) {
   //    return (
   //       <div className="min-h-screen bg-stone-50 p-4 flex items-center justify-center">
   //          <div className="text-stone-600">Loading bookings?...</div>
   //       </div>
   //    );
   // }

   return (
      <div className="min-h-screen bg-stone-50 p-4 md:p-6">
         <motion.div
            ref={ref}
            //   initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
         >
            {/* Header */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8 text-amber-700" />
                  <h1 className="text-4xl font-serif text-stone-800">Bookings Management</h1>
               </div>
               <p className="text-stone-600">View and manage all guest bookings</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                           <Calendar className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">{bookings?.length}</p>
                           <p className="text-sm text-stone-600">Total Bookings</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <Clock className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {bookings?.filter(b => b.bookingStatus === 'confirmed').length}
                           </p>
                           <p className="text-sm text-stone-600">Confirmed</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                           <Clock className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {bookings?.filter(b => b.bookingStatus === 'pending').length}
                           </p>
                           <p className="text-sm text-stone-600">Pending</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <CreditCard className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {bookings?.filter(b => b.paymentStatus === 'paid').length}
                           </p>
                           <p className="text-sm text-stone-600">Paid</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Bookings List */}
            <motion.div variants={animateVariants.fadeIn}>
               {bookings?.length > 0 ? (
                  <div className="space-y-4">
                     {bookings?.map((booking, index) => (
                        <BookingCard
                           key={booking._id || index}
                           booking={booking}
                           onView={handleView}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                     <Calendar className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                     <h3 className="text-xl font-serif text-stone-800 mb-2">No Bookings Found</h3>
                     <p className="text-stone-600">No bookings have been made yet</p>
                  </div>
               )}
            </motion.div>
         </motion.div>
      </div>
   );
};

export default Bookings;