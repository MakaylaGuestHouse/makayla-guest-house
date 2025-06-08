"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import {
   Home,
   Bed,
   Calendar,
   MessageSquare,
   Mail,
   UserPlus,
   Plus,
   Users
} from 'lucide-react';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import useAuth from '@/hooks/useAuth';
import routes from '@/lib/routes';

const Dashboard = ({ rooms, inquiries, bookings, newsletters }) => {
   const router = useRouter();
   const { user, isAuthenticated, loading } = useAuth();
   const { ref, controls } = useAnimateInView();
   const stats = {
      rooms: rooms?.data,
      bookings: bookings?.data,
      inquiries: inquiries?.data,
      newsletters: newsletters?.data
   };

   const quickActions = [
      {
         title: 'Create Room',
         icon: Plus,
         color: 'bg-amber-700 hover:bg-amber-800',
         onClick: () => router.push('/admin/rooms/create-room')
      },
      {
         title: 'Add User',
         icon: UserPlus,
         color: 'bg-stone-700 hover:bg-stone-800',
         onClick: () => router.push('/admin/users/create')
      },
      {
         title: 'Users',
         icon: Users,
         color: 'bg-yellow-700 hover:bg-yellow-800',
         onClick: () => router.push('/admin/users/')
      }
   ];

   const navigationCards = [
      {
         title: 'Rooms',
         icon: Bed,
         count: rooms.totalPages,
         color: 'border-amber-200 bg-amber-50',
         onClick: () => router.push('/admin/rooms')
      },
      {
         title: 'Bookings',
         icon: Calendar,
         count: bookings.totalPages,
         color: 'border-stone-200 bg-stone-50',
         onClick: () => router.push('/admin/bookings')
      },
      {
         title: 'Inquiries',
         icon: MessageSquare,
         count: inquiries.totalPages,
         color: 'border-blue-200 bg-blue-50',
         onClick: () => router.push('/admin/inquiries')
      },
      {
         title: 'Newsletters',
         icon: Mail,
         count: newsletters.totalPages,
         color: 'border-green-200 bg-green-50',
         onClick: () => router.push('/admin/newsletters')
      }
   ];

   
   if (loading) {
      return (
         <div className="min-h-screen bg-stone-50 p-4 flex items-center justify-center">
            <div className="text-stone-600">Loading dashboard...</div>
         </div>
      );
   }
   
   if (!isAuthenticated && !loading) {
      router.push(routes.admin.signin)
   }

   return (
      <div className="min-h-screen mt-24 bg-stone-50 p-4 md:p-6">
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
                  <Home className="w-8 h-8 text-amber-700" />
                  <h1 className="text-4xl font-serif text-stone-800">Admin Dashboard</h1>
               </div>
               <p className="text-stone-600">Welcome back, {user?.firstName || 'Admin'}</p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <h2 className="text-2xl font-serif text-stone-800 mb-4">Quick Actions</h2>
               <div className="flex flex-wrap gap-4">
                  {quickActions.map((action, index) => (
                     <button
                        key={index}
                        onClick={action.onClick}
                        className={`${action.color} text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2 hover:shadow-md cursor-pointer`}
                     >
                        <action.icon className="w-5 h-5" />
                        {action.title}
                     </button>
                  ))}
               </div>
            </motion.div>

            {/* Navigation Cards */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <h2 className="text-2xl font-serif text-stone-800 mb-4">Overview</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {navigationCards.map((card, index) => (
                     <motion.div
                        key={index}
                        variants={animateVariants.scaleIn}
                        onClick={card.onClick}
                        className={`${card.color} border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow duration-300`}
                     >
                        <div className="flex items-center justify-between mb-4">
                           <card.icon className="w-8 h-8 text-stone-700" />
                           <span className="text-2xl font-bold text-stone-800">{card.count}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-stone-800">{card.title}</h3>
                     </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* Recent Data Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Recent Bookings */}
               <motion.div variants={animateVariants.fadeInRight} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-serif text-stone-800">Recent Bookings</h3>
                     <button
                        onClick={() => router.push('/admin/bookings')}
                        className="text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                     >
                        View All
                     </button>
                  </div>
                  {stats.bookings.length > 0 ? (
                     <div className="space-y-3">
                        {stats.bookings.slice(0, 5).map((booking, index) => (
                           <div key={index} className="flex items-center justify-between p-3 border border-stone-200 rounded-lg">
                              <div>
                                 <p className="font-medium text-stone-800">{booking.fullName || 'Guest Name'}</p>
                                 <p className="text-sm text-stone-600">{booking.roomType || 'Room Type'}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${booking.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                                 booking.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-stone-100 text-stone-800'
                                 }`}>
                                 {booking.bookingStatus || 'pending'}
                              </span>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-stone-500 text-center py-4">No bookings available</p>
                  )}
               </motion.div>

               {/* Recent Rooms */}
               <motion.div variants={animateVariants.fadeInLeft} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-serif text-stone-800">Recent Rooms</h3>
                     <button
                        onClick={() => router.push('/admin/rooms')}
                        className="text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                     >
                        View All
                     </button>
                  </div>
                  {stats.rooms.length > 0 ? (
                     <div className="space-y-3">
                        {stats.rooms.slice(0, 5).map((room, index) => (
                           <div key={index} className="flex items-center justify-between p-3 border border-stone-200 rounded-lg">
                              <div>
                                 <p className="font-medium text-stone-800">{room.name || 'Room Name'}</p>
                                 <p className="text-sm text-stone-600">{room.roomType || 'Room Type'}</p>
                              </div>
                              <span className="text-amber-700 font-semibold">GHS{room.price || '0'}</span>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-stone-500 text-center py-4">No rooms available</p>
                  )}
               </motion.div>

               {/* Recent Inquiries */}
               <motion.div variants={animateVariants.fadeInLeft} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-serif text-stone-800">Recent Inquiries</h3>
                     <button
                        onClick={() => router.push('/admin/inquiries')}
                        className="text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                     >
                        View All
                     </button>
                  </div>
                  {stats.inquiries.length > 0 ? (
                     <div className="space-y-3">
                        {stats.inquiries.slice(0, 5).map((inquiry, index) => (
                           <div key={index} className="p-3 border border-stone-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                 <p className="font-medium text-stone-800">{inquiry.name || 'Guest Name'}</p>
                                 <span className={`px-2 py-1 rounded-full text-xs ${inquiry.isResolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {inquiry.isResolved ? 'Resolved' : 'Pending'}
                                 </span>
                              </div>
                              <p className="text-sm text-stone-600">{inquiry.subject || 'Subject'}</p>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-stone-500 text-center py-4">No inquiries available</p>
                  )}
               </motion.div>

               {/* Newsletter Subscribers */}
               <motion.div variants={animateVariants.fadeInRight} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xl font-serif text-stone-800">Newsletter Subscribers</h3>
                     <button
                        onClick={() => router.push('/admin/newsletters')}
                        className="text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                     >
                        View All
                     </button>
                  </div>
                  {stats.newsletters.length > 0 ? (
                     <div className="space-y-3">
                        {stats.newsletters.slice(0, 5).map((subscriber, index) => (
                           <div key={index} className="p-3 border border-stone-200 rounded-lg">
                              <p className="font-medium text-stone-800">{subscriber.email || 'email@example.com'}</p>
                              <p className="text-sm text-stone-600">
                                 Subscribed: {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleDateString() : 'Recently'}
                              </p>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-stone-500 text-center py-4">No subscribers available</p>
                  )}
               </motion.div>
            </div>
         </motion.div>
      </div>
   );
};

export default Dashboard;