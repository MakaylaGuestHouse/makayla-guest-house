"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
   Eye,
   Edit,
   Trash2,
   Shield,
   User,
   Mail,
   Calendar,
   ChevronDown,
   ChevronUp,
   Crown,
   X,
   AlertTriangle
} from 'lucide-react';
import { animateVariants } from '@/lib/constants/animation';

export const UserCard = ({ user, currentUser, onView, onEdit, onDelete }) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const canEdit = currentUser?.isSuperAdmin;
   const canDelete = currentUser?.isSuperAdmin;

   const getRoleColor = (role, isSuperAdmin) => {
      if (isSuperAdmin) return 'bg-purple-100 text-purple-800';
      switch (role) {
         case 'admin':
            return 'bg-blue-100 text-blue-800';
         case 'editor':
            return 'bg-green-100 text-green-800';
         default:
            return 'bg-stone-100 text-stone-800';
      }
   };

   const getRoleIcon = (role, isSuperAdmin) => {
      if (isSuperAdmin) return Crown;
      switch (role) {
         case 'admin':
            return Shield;
         case 'editor':
            return User;
         default:
            return User;
      }
   };

   const handleDeleteClick = () => {
      setShowDeleteModal(true);
   };

   const handleDeleteConfirm = () => {
      onDelete(user?._id);
      setShowDeleteModal(false);
   };

   const handleDeleteCancel = () => {
      setShowDeleteModal(false);
   };

   const RoleIcon = getRoleIcon(user.role, user.isSuperAdmin);

   return (
      <>
         <motion.div
            variants={animateVariants.fadeIn}
            className={`${user?._id === currentUser?._id ? "bg-slate-100" : "bg-white"}  rounded-lg shadow-sm border border-stone-200 overflow-hidden`}
         >
            <div className="p-6">
               <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                           <User className="w-6 h-6 text-stone-600" />
                        </div>
                        <div>
                           <h3 className="text-xl font-serif text-stone-800">
                              {user.firstName} {user.lastName}
                           </h3>
                           <p className="text-stone-600">{user.email}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getRoleColor(user.role, user.isSuperAdmin)}`}>
                           <RoleIcon className="w-3 h-3" />
                           {user.isSuperAdmin ? 'Super Admin' : user.role}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive
                           ? 'bg-green-100 text-green-800'
                           : 'bg-red-100 text-red-800'
                           }`}>
                           {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <button
                        onClick={() => onView(user)}
                        className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                     >
                        <Eye className="w-5 h-5" />
                     </button>
                     {canEdit && (
                        <button
                           onClick={() => onEdit(user?._id)}
                           className="p-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                           title="Edit User"
                        >
                           <Edit className="w-5 h-5" />
                        </button>
                     )}
                     {(canDelete && user._id !== currentUser?._id) && (
                        <button
                           onClick={handleDeleteClick}
                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                           title="Delete User"
                        >
                           <Trash2 className="w-5 h-5" />
                        </button>
                     )}
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="text-sm text-stone-600">
                     <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                     </span>
                  </div>
                  <button
                     onClick={() => setIsExpanded(!isExpanded)}
                     className="flex items-center gap-1 text-stone-600 hover:text-stone-800 transition-colors cursor-pointer"
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
                        <h4 className="font-semibold text-stone-800 mb-3">User Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <User className="w-4 h-4 text-stone-500" />
                                 <span className="text-sm text-stone-600">Name:</span>
                                 <span className="text-sm font-medium text-stone-800">
                                    {user.firstName} {user.lastName}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Mail className="w-4 h-4 text-stone-500" />
                                 <span className="text-sm text-stone-600">Email:</span>
                                 <span className="text-sm font-medium text-stone-800">{user.email}</span>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <Shield className="w-4 h-4 text-stone-500" />
                                 <span className="text-sm text-stone-600">Role:</span>
                                 <span className="text-sm font-medium text-stone-800">
                                    {user.isSuperAdmin ? 'Super Admin' : user.role}
                                 </span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Calendar className="w-4 h-4 text-stone-500" />
                                 <span className="text-sm text-stone-600">Joined:</span>
                                 <span className="text-sm font-medium text-stone-800">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                        <div className="flex items-center gap-4">
                           {user.isSuperAdmin && (
                              <span className="flex items-center gap-1 text-xs text-purple-600 font-medium">
                                 <Crown className="w-3 h-3" />
                                 Super Admin Privileges
                              </span>
                           )}
                           <span className="text-xs text-stone-500">
                              ID: {user._id || 'N/A'}
                           </span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className={`text-xs px-2 py-1 rounded ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                              {user.isActive ? 'Account Active' : 'Account Inactive'}
                           </span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </motion.div>

         {/* Delete Confirmation Modal */}
         {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
               {/* Backdrop */}
               <div
                  className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                  onClick={handleDeleteCancel}
               />

               {/* Modal */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
               >
                  {/* Close button */}
                  <button
                     onClick={handleDeleteCancel}
                     className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>

                  {/* Modal content */}
                  <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                     </div>

                     <div className="flex-1">
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">
                           Delete User
                        </h3>
                        <p className="text-stone-600 mb-6">
                           Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>? This action cannot be undone.
                        </p>

                        <div className="flex items-center justify-end gap-3">
                           <button
                              onClick={handleDeleteCancel}
                              className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors font-medium cursor-pointer"
                           >
                              Cancel
                           </button>
                           <button
                              onClick={handleDeleteConfirm}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
                           >
                              Delete User
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </>
   );
};