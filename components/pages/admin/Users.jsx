"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
   Users,
   Plus,
   Shield,
   User,
   Crown
} from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useAppRouter } from '@/hooks/useAppRouter';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import routes from '@/lib/routes';
import { UserCard } from './UserCard';
import { deleteAdminUser } from '@/server/adminUser.action';
import { logger } from '@/utils/log';

const UsersPage = ({ usersData = [] }) => {
   const { navigateTo } = useAppRouter();
   const { ref, controls } = useAnimateInView();
   const [users, setUsers] = useState(usersData);
   const { user: currentUser, isAuthenticated, loading } = useAuth();

   const handleAdd = () => {
      navigateTo(routes.admin.signup)
   };

   const handleEdit = (id) => {
      navigateTo(`${routes.admin.signup}?id=${id}`)
   };

   const handleDelete = async (adminUserId) => {
      try {
         await deleteAdminUser(adminUserId, currentUser?._id)

         const newUsers = users.filter(user => user?._id !== adminUserId)

         setUsers(newUsers)
      } catch (error) {
         logger(error)
      }
   };

   const handleView = (user) => {
      console.log('View user details:', user);
   };

   if (!isAuthenticated && !loading) {
      navigateTo(routes.admin.signin)
   }

   if (loading) {
      return (
         <div className="min-h-screen bg-stone-50 p-4 flex items-center justify-center">
            <div className="text-stone-600">Loading users...</div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-stone-50 p-4 md:p-6 mt-32">
         <motion.div
            ref={ref}
            // initial="hidden"
            animate={controls}
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
         >
            {/* Header */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="flex items-center justify-between">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <Users className="w-8 h-8 text-amber-700" />
                        <h1 className="text-4xl font-serif text-stone-800">Users Management</h1>
                     </div>
                     <p className="text-stone-600">Manage admin users and their permissions</p>
                  </div>
                  <button
                     onClick={handleAdd}
                     className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                     <Plus className="w-5 h-5" />
                     Add User
                  </button>
               </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={animateVariants.fadeIn} className="mb-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                           <Users className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">{users.length}</p>
                           <p className="text-sm text-stone-600">Total Users</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                           <Crown className="w-5 h-5 text-purple-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {users.filter(u => u.isSuperAdmin).length}
                           </p>
                           <p className="text-sm text-stone-600">Super Admins</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                           <Shield className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {users.filter(u => u.role === 'admin' && !u.isSuperAdmin).length}
                           </p>
                           <p className="text-sm text-stone-600">Admins</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                           <User className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-stone-800">
                              {users.filter(u => u.role === 'editor').length}
                           </p>
                           <p className="text-sm text-stone-600">Editors</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Users List */}
            <motion.div variants={animateVariants.fadeIn}>
               {users.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                     {users.map((user, index) => (
                        <UserCard
                           key={user._id || index}
                           user={user}
                           currentUser={currentUser}
                           onView={handleView}
                           onEdit={handleEdit}
                           onDelete={handleDelete}
                           setUsers={setUsers}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                     <Users className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                     <h3 className="text-xl font-serif text-stone-800 mb-2">No Users Found</h3>
                     <p className="text-stone-600 mb-6">Add your first admin user to get started</p>
                     <button
                        onClick={handleAdd}
                        className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
                     >
                        Add New User
                     </button>
                  </div>
               )}
            </motion.div>
         </motion.div>
      </div>
   );
};

export default UsersPage;