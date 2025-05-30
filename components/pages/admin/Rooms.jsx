"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import {
  Bed,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Wifi,
  Car
} from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from "next/navigation";
import routes from '@/lib/routes';

const RoomCard = ({ room, user, onEdit, onDelete, onView }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const canDelete = user?.isSuperAdmin;
  const canEdit = user?.role === 'admin' || user?.role === 'editor' || user?.isSuperAdmin;

  return (
    <motion.div
      variants={animateVariants.fadeIn}
      className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-serif text-stone-800 mb-2">{room.name}</h3>
            <div className="flex items-center gap-4 text-sm text-stone-600 mb-2">
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                {room.roomType}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {room.maxGuests} guests
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Room {room.roomNumber}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-amber-700" />
              <span className="text-2xl font-bold text-stone-800">{room.price}</span>
              <span className="text-stone-600">/ night</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onView(room)}
              className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </button>
            {canEdit && (
              <button
                onClick={() => onEdit(room)}
                className="p-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                title="Edit Room"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete(room)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Room"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}>
              {room.isAvailable ? 'Available' : 'Unavailable'}
            </span>
            {room.hasBalcony && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Balcony
              </span>
            )}
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
              <h4 className="font-semibold text-stone-800 mb-2">Room Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-stone-600">Size:</span> {room.roomSize}
                </div>
                <div>
                  <span className="text-stone-600">Total Beds:</span> {room.totalBeds}
                </div>
                <div>
                  <span className="text-stone-600">Max Adults:</span> {room.maxAdults}
                </div>
                <div>
                  <span className="text-stone-600">Max Children:</span> {room.maxChildren}
                </div>
                <div>
                  <span className="text-stone-600">Bathroom:</span> {room.bathroomType}
                </div>
                <div>
                  <span className="text-stone-600">Housekeeping:</span> {room.housekeepingFrequency}
                </div>
              </div>
            </div>

            {room.bedTypes && room.bedTypes.length > 0 && (
              <div>
                <h4 className="font-semibold text-stone-800 mb-2">Bed Configuration</h4>
                <div className="flex flex-wrap gap-2">
                  {room.bedTypes.map((bed, index) => (
                    <span key={index} className="px-2 py-1 bg-white border border-stone-200 rounded text-xs">
                      {bed.quantity}x {bed.type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {room.amenities && room.amenities.length > 0 && (
              <div>
                <h4 className="font-semibold text-stone-800 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 6).map((amenity, index) => (
                    <span key={index} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 6 && (
                    <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded text-xs">
                      +{room.amenities.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-stone-800 mb-2">Description</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{room.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span>Rating: {room.rating || 0}/5</span>
                <span>Created: {room.createdAt ? new Date(room.createdAt).toLocaleDateString() : 'Recently'}</span>
              </div>
              <div className="flex items-center gap-2">
                {room.sofaBed && (
                  <span className="text-xs text-green-600">Extra sofa bed</span>
                )}
                {room.extraBedAvailable && (
                  <span className="text-xs text-blue-600">Extra bed available</span>
                )}
                {room.isSmokingAllowed && (
                  <span className="text-xs text-orange-600">Smoking allowed</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const RoomsAdmin = ({ rooms }) => {
  const router = useRouter();
  const { ref, controls } = useAnimateInView();
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated & !loading) {
    router.push(routes.admin.signin)
  }

  const handleEdit = (room) => { };
  const handleDelete = (room) => { };
  const handleView = (room) => { };

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-6 mt-24">
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
            <Bed className="w-8 h-8 text-amber-700" />
            <h1 className="text-4xl font-serif text-stone-800">Rooms Management</h1>
          </div>
          <p className="text-stone-600">Manage all guest rooms and accommodations</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={animateVariants.fadeIn} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Bed className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">{rooms.length}</p>
                  <p className="text-sm text-stone-600">Total Rooms</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">
                    {rooms.filter(r => r.isAvailable).length}
                  </p>
                  <p className="text-sm text-stone-600">Available</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">
                    {rooms.filter(r => !r.isAvailable).length}
                  </p>
                  <p className="text-sm text-stone-600">Occupied</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-800">
                    ${rooms.reduce((sum, r) => sum + (r.price || 0), 0) / (rooms.length || 1)}
                  </p>
                  <p className="text-sm text-stone-600">Avg. Price</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rooms List */}
        <motion.div variants={animateVariants.fadeIn}>
          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {rooms.map((room, index) => (
                <RoomCard
                  key={room._id || index}
                  room={room}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bed className="w-12 h-12 text-stone-400 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-stone-800 mb-2">No Rooms Found</h3>
              <p className="text-stone-600 mb-6">Create your first room to get started</p>
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-lg transition-colors">
                Create New Room
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};