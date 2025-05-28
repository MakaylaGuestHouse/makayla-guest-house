"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import {
   MessageSquare,
   Eye,
   Clock,
   CheckCircle,
   ChevronDown,
   ChevronUp,
   Phone,
   Mail,
   User
} from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const InquiryCard = ({ inquiry, onView }) => {
   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <motion.div
         variants={animateVariants.fadeIn}
         className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden"
      >
         <div className="p-6">
            <div className="flex items-start justify-between mb-4">
               <div className="flex-1">
                  <h3 className="text-xl font-serif text-stone-800 mb-2">{inquiry.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-stone-600 mb-2">
                     <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {inquiry.email} 
                     </span>
                     {inquiry.phone && (
                        <span className="flex items-center gap-1">
                           <Phone className="w-4 h-4" />
                           {inquiry.phone}
                        </span>
                     )}
                     <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {inquiry.receivedAt ? new Date(inquiry.receivedAt).toLocaleDateString() : 'Recently'}
                     </span>
                  </div>
                  <div className="mb-4">
                     <h4 className="font-semibold text-stone-800 mb-1">{inquiry.subject}</h4>
                     <p className="text-stone-600 text-sm line-clamp-2">{inquiry.message}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button
                     onClick={() => onView(inquiry)}
                     className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                     title="View Details"
                  >
                     <Eye className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${inquiry.isResolved
                     ? 'bg-green-100 text-green-800'
                     : 'bg-red-100 text-red-800'
                     }`}>
                     {inquiry.isResolved ? (
                        <>
                           <CheckCircle className="w-3 h-3" />
                           Resolved
                        </>
                     ) : (
                        <>
                           <Clock className="w-3 h-3" />
                           Pending
                        </>
                     )}
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
                           <User className="w-4 h-4 text-stone-500" />
                           <span className="text-stone-600">{inquiry.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Mail className="w-4 h-4 text-stone-500" />
                           <span className="text-stone-600">{inquiry.email}</span>
                        </div>
                        {inquiry.phone && (
                           <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-stone-500" />
                              <span className="text-stone-600">{inquiry.phone}</span>
                           </div>
                        )}
                     </div>
                  </div>

                  <div>
                     <h4 className="font-semibold text-stone-800 mb-2">Subject</h4>
                     <p className="text-stone-700 font-medium">{inquiry.subject}</p>
                  </div>

                  <div>
                     <h4 className="font-semibold text-stone-800 mb-2">Message</h4>
                     <div className="bg-white p-4 rounded-lg border border-stone-200">
                        <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                     <div className="flex items-center gap-4 text-xs text-stone-500">
                        <span>Received: {inquiry.receivedAt ? new Date(inquiry.receivedAt).toLocaleString() : 'Recently'}</span>
                        <span className={`px-2 py-1 rounded-full ${inquiry.isResolved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                           }`}>
                           {inquiry.isResolved ? 'Resolved' : 'Needs Response'}
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <button className="text-xs bg-amber-700 hover:bg-amber-800 text-white px-3 py-1 rounded transition-colors">
                           Reply
                        </button>
                        {!inquiry.isResolved && (
                           <button className="text-xs bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded transition-colors">
                              Mark Resolved
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
};

const Inquiries = ({ inquiries }) => {
   const { ref, controls } = useAnimateInView();

   const { user, loading, isAuthenticated } = useAuth();

   if (loading) {
      return <div>Loading...</div>;
   }

   if (!isAuthenticated) {
      return <div>Please log in</div>;
   }


   const handleView = (inquiry) => {
      // Show detailed view or open inquiry in modal
   };

   if (loading) {
      return (
         <div className="min-h-screen bg-stone-50 p-4 flex items-center justify-center">
            <div className="text-stone-600">Loading inquiries?...</div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-stone-50 p-4 md:p-6">
         <motion.div
            ref={ref}
            // initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
         >
            {/* Header */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="w-8 h-8 text-amber-700" />
                  <h1 className="text-4xl font-serif text-stone-800">Customer Inquiries</h1>
               </div>
               <p className="text-stone-600">View and respond to customer inquiries and messages</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                           <MessageSquare className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">{inquiries?.length}</p>
                           <p className="text-sm text-stone-600">Total Inquiries</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                           <Clock className="w-5 h-5 text-red-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {inquiries?.filter(i => !i.isResolved).length}
                           </p>
                           <p className="text-sm text-stone-600">Pending</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <CheckCircle className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {inquiries?.filter(i => i.isResolved).length}
                           </p>
                           <p className="text-sm text-stone-600">Resolved</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <Clock className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {inquiries?.filter(i => {
                                 const today = new Date();
                                 const inquiryDate = new Date(i.receivedAt);
                                 return today.toDateString() === inquiryDate.toDateString();
                              }).length}
                           </p>
                           <p className="text-sm text-stone-600">Today</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Inquiries List */}
            <motion.div variants={animateVariants.fadeIn}>
               {inquiries?.length > 0 ? (
                  <div className="space-y-4">
                     {inquiries?.map((inquiry, index) => (
                        <InquiryCard
                           key={inquiry._id || index}
                           inquiry={inquiry}
                           onView={handleView}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                     <MessageSquare className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                     <h3 className="text-xl font-serif text-stone-800 mb-2">No Inquiries Found</h3>
                     <p className="text-stone-600">No customer inquiries have been received yet</p>
                  </div>
               )}
            </motion.div>
         </motion.div>
      </div>
   );
};

export default Inquiries;