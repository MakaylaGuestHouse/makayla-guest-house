"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
   Mail,
   Eye,
   Clock,
   Users,
   ChevronDown,
   ChevronUp,
   Calendar,
   TrendingUp
} from 'lucide-react';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import useAuth from '@/hooks/useAuth';

const fetchData = async ({ type }) => {
   // This function would fetch real data from your API
   return [];
};

const SubscriberCard = ({ subscriber, onView }) => {
   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <motion.div
         variants={animateVariants.fadeIn}
         className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden"
      >
         <div className="p-6">
            <div className="flex items-start justify-between mb-4">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-amber-100 rounded-lg">
                        <Mail className="w-5 h-5 text-amber-700" />
                     </div>
                     <div>
                        <h3 className="text-lg font-semibold text-stone-800">{subscriber.email || subscriber.eamil}</h3>
                        <p className="text-sm text-stone-600">Newsletter Subscriber</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                     <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Subscribed: {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : 'Recently'}
                     </span>
                     <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleTimeString() : 'Recently'}
                     </span>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button
                     onClick={() => onView(subscriber)}
                     className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                     title="View Details"
                  >
                     <Eye className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                     Active Subscriber
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
                     <h4 className="font-semibold text-stone-800 mb-2">Subscription Details</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                           <span className="text-stone-600">Email:</span> {subscriber.email || subscriber.eamil}
                        </div>
                        <div>
                           <span className="text-stone-600">Subscription Date:</span> {
                              subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric'
                              }) : 'Recently'
                           }
                        </div>
                        <div>
                           <span className="text-stone-600">Status:</span>
                           <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                        </div>
                        <div>
                           <span className="text-stone-600">Source:</span> Website
                        </div>
                     </div>
                  </div>

                  <div>
                     <h4 className="font-semibold text-stone-800 mb-2">Email Activity</h4>
                     <div className="text-sm text-stone-600">
                        <p>This subscriber is actively receiving our newsletter updates. No bounces or unsubscribes recorded.</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                     <div className="text-xs text-stone-500">
                        Subscriber ID: {subscriber._id || 'N/A'}
                     </div>
                     <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>Active since: {
                           subscriber.createdAt ?
                              Math.ceil((new Date() - new Date(subscriber.createdAt)) / (1000 * 60 * 60 * 24)) + ' days' :
                              'Recently'
                        }</span>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </motion.div>
   );
};

const Newsletters = ({ subscribers }) => {
   const { ref, controls } = useAnimateInView();

   const { loading, isAuthenticated } = useAuth();

   if (loading) {
      return <div>Loading...</div>;
   }

   if (!isAuthenticated) {
      return <div>Please log in</div>;
   }


   const handleView = (subscriber) => {};

   if (loading) {
      return (
         <div className="min-h-screen bg-stone-50 p-4 flex items-center justify-center">
            <div className="text-stone-600">Loading newsletter subscribers?...</div>
         </div>
      );
   }

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
                  <Mail className="w-8 h-8 text-amber-700" />
                  <h1 className="text-4xl font-serif text-stone-800">Newsletter Subscribers</h1>
               </div>
               <p className="text-stone-600">Manage newsletter subscriptions and email communications</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <Users className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">{subscribers?.length}</p>
                           <p className="text-sm text-stone-600">Total Subscribers</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <TrendingUp className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {subscribers?.filter(s => {
                                 const subDate = new Date(s.createdAt);
                                 const weekAgo = new Date();
                                 weekAgo.setDate(weekAgo.getDate() - 7);
                                 return subDate > weekAgo;
                              }).length}
                           </p>
                           <p className="text-sm text-stone-600">This Week</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                           <Calendar className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {subscribers?.filter(s => {
                                 const subDate = new Date(s.createdAt);
                                 const monthAgo = new Date();
                                 monthAgo.setMonth(monthAgo.getMonth() - 1);
                                 return subDate > monthAgo;
                              }).length}
                           </p>
                           <p className="text-sm text-stone-600">This Month</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                           <Mail className="w-5 h-5 text-purple-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">{subscribers?.length}</p>
                           <p className="text-sm text-stone-600">Active</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Subscribers List */}
            <motion.div variants={animateVariants.fadeIn}>
               {subscribers?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {subscribers?.map((subscriber, index) => (
                        <SubscriberCard
                           key={subscriber._id || index}
                           subscriber={subscriber}
                           onView={handleView}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                     <Mail className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                     <h3 className="text-xl font-serif text-stone-800 mb-2">No Subscribers Found</h3>
                     <p className="text-stone-600 mb-6">No newsletter subscriptions available at the moment</p>
                     <div className="flex items-center justify-center gap-4">
                        <div className="text-sm text-stone-500">
                           Subscribers will appear here once users sign up for the newsletter
                        </div>
                     </div>
                  </div>
               )}
            </motion.div>
         </motion.div>
      </div>
   );
};

export default Newsletters;