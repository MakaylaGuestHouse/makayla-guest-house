"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { animateVariants } from '@/lib/constants/animation';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Dropdown } from '@/components/ui/forms/DropDown';
import { InputField } from '@/components/ui/forms/InputField';
import { DropdownWithInput } from '@/components/ui/forms/DropdownWithInput';
import {
   X,
   Tag,
   Wifi,
   Plus,
   Home,
   Save,
   Hash,
   Users,
   Upload,
   Maximize,
   ArrowLeft,
   DollarSign,
   CloudUpload,
} from 'lucide-react';
import { validateRoom } from '@/utils/validators';
import { uploadImageToCloud } from '@/lib/uploadImageToCloud';
import { deleteCloudinaryImg } from '@/server/cloudinary.action';
import { ROOM_INITIAL_VALUES } from '@/lib/constants/initialValues';
import { amenityOptions, bathroomOptions, bedQuantityOptions, bedTypeOptions, guestChildOptions, guestOptions, housekeepingOptions, ratingOptions, roomNameOptions, roomSizeOptions, roomTypeOptions, tagOptions } from './constants';
import { createRoom } from '@/server/rooms.action';
import { useAppRouter } from '@/hooks/useAppRouter';
import useAuth from '@/hooks/useAuth';
import routes from '@/lib/routes';

const CreateRoomPage = () => {
   const [formData, setFormData] = useState(ROOM_INITIAL_VALUES);
   const [errors, setErrors] = useState({});
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { files, uploadError, handleFileSelect, removeFile, clearFiles } = useFileUpload(8);
   const { goBack, navigateTo } = useAppRouter();
   const { isAuthenticated, loading } = useAuth();

   if (!isAuthenticated && !loading) {
      navigateTo(routes.admin.signin)
   }

   const handleInputChange = (field, value) => {
      setFormData(prev => {
         const newData = { ...prev, [field]: value };

         // Handle bed configuration logic
         if (field === 'totalBeds') {
            const totalBeds = parseInt(value) || 0;
            const currentBedTypes = newData.bedTypes.length;

            if (totalBeds > 1 && currentBedTypes === 1) {
               // Show toggle for same config
            } else if (totalBeds <= 1) {
               newData.sameConfigForRemainingBeds = false;
            }
         }

         // Handle guest capacity validation
         if (field === 'maxGuests') {
            const maxGuests = parseInt(value) || 0;
            if (parseInt(newData.maxAdults) > maxGuests) {
               newData.maxAdults = value;
            }
            if (parseInt(newData.maxChildren) > maxGuests) {
               newData.maxChildren = Math.max(0, maxGuests - parseInt(newData.maxAdults)).toString();
            }
         }

         if (field === 'maxAdults') {
            const maxAdults = parseInt(value) || 0;
            const maxGuests = parseInt(newData.maxGuests) || 0;
            const remainingCapacity = Math.max(0, maxGuests - maxAdults);
            if (parseInt(newData.maxChildren) > remainingCapacity) {
               newData.maxChildren = remainingCapacity.toString();
            }
         }

         return newData;
      });

      if (errors[field]) {
         setErrors(prev => ({ ...prev, [field]: '' }));
      }
   };

   const handleArrayChange = (field, index, value) => {
      setFormData(prev => ({
         ...prev,
         [field]: prev[field].map((item, i) => i === index ? value : item)
      }));
   };

   const addArrayItem = (field) => {
      setFormData(prev => ({
         ...prev,
         [field]: [...prev[field], field === 'bedTypes' ? { type: '', quantity: '' } : '']
      }));
   };

   const removeArrayItem = (field, index) => {
      if (formData[field].length > 1) {
         setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
         }));
      }
   };

   const handleBedTypeChange = (index, key, value) => {
      setFormData(prev => ({
         ...prev,
         bedTypes: prev.bedTypes.map((bed, i) =>
            i === index ? { ...bed, [key]: value } : bed
         )
      }));
   };

   const handleSameConfigToggle = () => {
      const newValue = !formData.sameConfigForRemainingBeds;
      setFormData(prev => {
         const newData = { ...prev, sameConfigForRemainingBeds: newValue };

         if (newValue && prev.bedTypes[0]?.type && prev.bedTypes[0]?.quantity) {
            // Apply first bed config to all remaining beds
            const totalBeds = parseInt(prev.totalBeds) || 0;
            const firstBedQuantity = parseInt(prev.bedTypes[0].quantity) || 0;
            const remainingBeds = totalBeds - firstBedQuantity;

            if (remainingBeds > 0) {
               newData.bedTypes = [
                  prev.bedTypes[0],
                  { type: prev.bedTypes[0].type, quantity: remainingBeds.toString() }
               ];
            }
         }

         return newData;
      });
   };

   const uploadImages = async () => {
      const res = await uploadImageToCloud(files)

      if (res.success) {
         setFormData(prev => ({ ...prev, images: res.images }));
      } else {
         setErrors(prev => ({ ...prev, images: res.error || 'Failed to upload images' }));
      }
   };

   const deleteImgFromCloud = async (file, index) => {
      // Find the image in formData that matches the file name
      const foundImage = formData.images.find((image) => image.originalName === file.name);

      if (foundImage) {
         await deleteCloudinaryImg(foundImage.image_id);

         // Remove from local state
         removeFile(index);

         // Update formData.images to remove the found image
         setFormData(prev => ({
            ...prev,
            images: prev.images.filter((image) => image.originalName !== file.name)
         }));
      } else {
         removeFile(index);
      }
   };

   const handleSubmit = async () => {
      const validation = validateRoom(formData);

      if (!validation.isValid) {
         setErrors(validation.errors);
         return;
      }

      setIsSubmitting(true);

      try {

         await createRoom(formData)

      } catch (error) {
         console.error('Submission error:', error);
         setErrors({ submit: 'Failed to create room. Please try again.' });
      } finally {
         setIsSubmitting(false);
      }
   };

   const totalBeds = parseInt(formData.totalBeds) || 0;
   const showSameConfigToggle = totalBeds > 1 && formData.bedTypes[0]?.type && formData.bedTypes[0]?.quantity;

   return (
      <div className="min-h-screen bg-stone-50 mt-24">
         {/* Page Header */}
         <div className="bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <button onClick={goBack} className="p-2 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer">
                        <ArrowLeft size={20} className="text-stone-600" />
                     </button>
                     <div>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-800">Create New Room</h1>
                        <p className="text-stone-600 mt-1">Add a new room to your luxury guest house</p>
                     </div>
                  </div>
                  <div className="w-20 h-px bg-amber-400"></div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <motion.div className="space-y-8">

               {/* Basic Information */}
               <motion.div
                  variants={animateVariants.fadeIn}
                  className="bg-white rounded-2xl shadow-sm border border-stone-200"
               >
                  <div className="bg-stone-800 px-6 sm:px-8 py-6 rounded-t-2xl">
                     <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center">
                        <Home className="mr-3" size={24} />
                        Basic Information
                     </h2>
                     <div className="w-16 h-px bg-amber-400 mt-3"></div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DropdownWithInput
                           label="Room Name"
                           selected={formData.name}
                           options={roomNameOptions}
                           onChange={(value) => handleInputChange('name', value)}
                           placeholder="Enter custom room name"
                           icon={<Home size={18} />}
                           error={errors.name}
                        />

                        <InputField
                           label="Room Number"
                           type="text"
                           placeholder="101"
                           value={formData.roomNumber}
                           onChange={(value) => handleInputChange('roomNumber', value)}
                           error={errors.roomNumber}
                           icon={<Hash size={18} />}
                        />
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Dropdown
                           label="Room Type"
                           selected={formData.roomType}
                           options={roomTypeOptions}
                           error={errors.roomType}
                           onChange={(value) => handleInputChange('roomType', value)}
                        />

                        <InputField
                           label="Price per Night ($)"
                           type="number"
                           placeholder="299"
                           value={formData.price}
                           onChange={(value) => handleInputChange('price', value)}
                           error={errors.price}
                           icon={<DollarSign size={18} />}
                        />
                     </div>

                     <div className="space-y-3">
                        <label className="block text-sm font-medium text-stone-700">
                           Room Description
                        </label>
                        <textarea
                           className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none text-stone-700"
                           rows="4"
                           placeholder="Describe the room's features, ambiance, and unique qualities..."
                           value={formData.description}
                           onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        {errors.description && (
                           <p className="text-red-500 text-xs mt-1 font-light">{errors.description}</p>
                        )}
                     </div>
                  </div>
               </motion.div>

               {/* Room Images */}
               <motion.div
                  variants={animateVariants.fadeIn}
                  className="bg-white rounded-2xl shadow-sm border border-stone-200"
               >
                  <div className="bg-amber-700 px-6 sm:px-8 py-6 rounded-t-2xl">
                     <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center">
                        <Upload className="mr-3" size={24} />
                        Room Images (Max 8)
                     </h2>
                     <div className="w-16 h-px bg-white/30 mt-3"></div>
                  </div>

                  <div className="p-6 sm:p-8">
                     {uploadError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                           {uploadError}
                        </div>
                     )}

                     {errors.images && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                           {errors.images}
                        </div>
                     )}

                     <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors cursor-pointer">
                        <input
                           type="file"
                           multiple
                           accept="image/*"
                           onChange={(e) => handleFileSelect(e.target.files)}
                           className="hidden"
                           id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                           <Upload size={48} className="mx-auto text-stone-400 mb-4" />
                           <p className="text-stone-600 font-medium">Click to upload room images</p>
                           <p className="text-stone-400 text-sm mt-1">PNG, JPG up to 10MB each (Max 8 images)</p>
                        </label>
                     </div>

                     {files.length > 0 && (
                        <div className="mt-6">
                           <div className="flex items-center justify-between mb-4">
                              <p className="text-sm text-stone-600">{files.length}/8 image(s) selected</p>
                              <button
                                 type="button"
                                 onClick={clearFiles}
                                 className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                              >
                                 Clear All
                              </button>
                           </div>
                           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                              {files.map((file, index) => (
                                 <div key={index} className="relative">
                                    <img
                                       src={file.preview}
                                       alt={`Preview ${index + 1}`}
                                       className="w-full h-24 object-cover rounded-lg border border-stone-200"
                                    />
                                    <button
                                       type="button"
                                       onClick={() => deleteImgFromCloud(file, index)}
                                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 transition-colors"
                                    >
                                       <X size={14} />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                                       {file.name}
                                    </div>
                                 </div>
                              ))}
                           </div>

                           {/* Action Button */}
                           <motion.div
                              variants={animateVariants.fadeIn}
                              className="flex flex-col sm:flex-row justify-end gap-4 pt-6"
                           >
                              <button
                                 type="button"
                                 onClick={uploadImages}
                                 disabled={isSubmitting}
                                 className="px-8 py-3 bg-stone-800 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                 <CloudUpload className="mr-2" size={18} />
                                 {isSubmitting ? 'Uploading...' : "Upload image(s)"}
                              </button>
                           </motion.div>
                        </div>
                     )}
                  </div>
               </motion.div>

               {/* Room Details */}
               <motion.div
                  variants={animateVariants.fadeIn}
                  className="bg-white rounded-2xl shadow-sm border border-stone-200"
               >
                  <div className="bg-stone-800 px-6 sm:px-8 py-6 rounded-t-2xl">
                     <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center">
                        <Maximize className="mr-3" size={24} />
                        Room Details
                     </h2>
                     <div className="w-16 h-px bg-amber-400 mt-3"></div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <DropdownWithInput
                           label="Room Size"
                           selected={formData.roomSize}
                           options={roomSizeOptions}
                           onChange={(value) => handleInputChange('roomSize', value)}
                           placeholder="Enter custom size"
                           icon={<Maximize size={18} />}
                           error={errors.roomSize}
                        />

                        <Dropdown
                           label="Total Beds"
                           selected={formData.totalBeds}
                           options={bedQuantityOptions}
                           onChange={(value) => handleInputChange('totalBeds', value)}
                           error={errors.totalBeds}
                        />
                     </div>

                     {/* Bed Types */}
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <label className="block text-sm font-medium text-stone-700">
                              Bed Configuration
                           </label>
                           <button
                              type="button"
                              onClick={() => addArrayItem('bedTypes')}
                              className="flex items-center text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer"
                           >
                              <Plus size={16} className="mr-1" />
                              Add Bed Type
                           </button>
                        </div>

                        {showSameConfigToggle && (
                           <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                              <span className="text-stone-700 font-medium">Apply same configuration to remaining beds</span>
                              <button
                                 type="button"
                                 onClick={handleSameConfigToggle}
                                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.sameConfigForRemainingBeds ? 'bg-amber-600' : 'bg-stone-300'
                                    }`}
                              >
                                 <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.sameConfigForRemainingBeds ? 'translate-x-6' : 'translate-x-1'
                                       }`}
                                 />
                              </button>
                           </div>
                        )}

                        {formData.bedTypes.map((bed, index) => (
                           <div key={index} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                              <div className="flex-1">
                                 <Dropdown
                                    label="Bed Type"
                                    selected={bed.type}
                                    options={bedTypeOptions}
                                    onChange={(value) => handleBedTypeChange(index, 'type', value)}
                                 />
                              </div>
                              <div className="flex-1">
                                 <Dropdown
                                    label="Quantity"
                                    selected={bed.quantity}
                                    options={bedQuantityOptions}
                                    onChange={(value) => handleBedTypeChange(index, 'quantity', value)}
                                 />
                              </div>
                              {formData.bedTypes.length > 1 && (
                                 <button
                                    type="button"
                                    onClick={() => removeArrayItem('bedTypes', index)}
                                    className=" p-2 text-red-500 bg-red-100 rounded-lg transition-colors cursor-pointer"
                                 >
                                    <X size={16} />
                                 </button>
                              )}
                           </div>
                        ))}

                        {errors.bedTypes && (
                           <div className="-mt-10 mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                              {errors.bedTypes}
                           </div>
                        )}

                        {errors.bedConfiguration && (
                           <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                              {errors.bedConfiguration}
                           </div>
                        )}
                     </div>

                     <Dropdown
                        label="Room Rating"
                        selected={formData.rating}
                        options={ratingOptions}
                        error={errors.roomRating}
                        onChange={(value) => handleInputChange('rating', value)}
                     />

                     {/* Bed Options */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-200">
                           <span className="text-stone-700 font-medium">Sofa Bed Available</span>
                           <button
                              type="button"
                              onClick={() => handleInputChange('sofaBed', !formData.sofaBed)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.sofaBed ? 'bg-amber-600' : 'bg-stone-300'
                                 }`}
                           >
                              <span
                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.sofaBed ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                              />
                           </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-200">
                           <span className="text-stone-700 font-medium">Extra Bed Available</span>
                           <button
                              type="button"
                              onClick={() => handleInputChange('extraBedAvailable', !formData.extraBedAvailable)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.extraBedAvailable ? 'bg-amber-600' : 'bg-stone-300'
                                 }`}
                           >
                              <span
                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.extraBedAvailable ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                              />
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Guest Information */}
               <motion.div
                  variants={animateVariants.fadeIn}
                  className="bg-white rounded-2xl shadow-sm border border-stone-200"
               >
                  <div className="bg-amber-700 px-6 sm:px-8 py-6 rounded-t-2xl">
                     <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center">
                        <Users className="mr-3" size={24} />
                        Guest Capacity
                     </h2>
                     <div className="w-16 h-px bg-white/30 mt-3"></div>
                  </div>

                  <div className="p-6 sm:p-8">
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <Dropdown
                           label="Maximum Guests"
                           selected={formData.maxGuests}
                           options={guestOptions}
                           error={errors.maxGuests}
                           onChange={(value) => handleInputChange('maxGuests', value)}
                        />

                        <Dropdown
                           label="Maximum Adults"
                           selected={formData.maxAdults}
                           options={guestOptions}
                           error={errors.maxAdults}
                           onChange={(value) => handleInputChange('maxAdults', value)}
                        />

                        <Dropdown
                           label="Maximum Children"
                           selected={formData.maxChildren}
                           options={guestChildOptions}
                           error={errors.maxChildren}
                           onChange={(value) => handleInputChange('maxChildren', value)}
                        />
                     </div>
                     {errors.guestCapacity && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                           {errors.guestCapacity}
                        </div>
                     )}
                  </div>
               </motion.div>

               {/* Facilities & Amenities */}
               <motion.div
                  variants={animateVariants.fadeIn}
                  className="bg-white rounded-2xl shadow-sm border border-stone-200"
               >
                  <div className="bg-stone-800 px-6 sm:px-8 py-6 rounded-t-2xl">
                     <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center">
                        <Wifi className="mr-3" size={24} />
                        Facilities & Amenities
                     </h2>
                     <div className="w-16 h-px bg-amber-400 mt-3"></div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Dropdown
                           label="Bathroom Type"
                           selected={formData.bathroomType}
                           options={bathroomOptions}
                           error={errors.bathroomType}
                           onChange={(value) => handleInputChange('bathroomType', value)}
                        />

                        <Dropdown
                           label="Housekeeping Frequency"
                           selected={formData.housekeepingFrequency}
                           options={housekeepingOptions}
                           error={errors.housekeepingFrequency}
                           onChange={(value) => handleInputChange('housekeepingFrequency', value)}
                        />
                     </div>

                     {/* Additional Options */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-200">
                           <span className="text-stone-700 font-medium">Balcony Available</span>
                           <button
                              type="button"
                              onClick={() => handleInputChange('hasBalcony', !formData.hasBalcony)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.hasBalcony ? 'bg-amber-600' : 'bg-stone-300'
                                 }`}
                           >
                              <span
                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.hasBalcony ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                              />
                           </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-200">
                           <span className="text-stone-700 font-medium">Smoking Allowed</span>
                           <button
                              type="button"
                              onClick={() => handleInputChange('isSmokingAllowed', !formData.isSmokingAllowed)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.isSmokingAllowed ? 'bg-amber-600' : 'bg-stone-300'
                                 }`}
                           >
                              <span
                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isSmokingAllowed ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                              />
                           </button>
                        </div>
                     </div>

                     {/* Amenities */}
                     <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <label className="block text-sm font-medium text-stone-700">
                              Room Amenities
                           </label>
                           <button
                              type="button"
                              onClick={() => addArrayItem('amenities')}
                              className="flex items-center text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer"
                           >
                              <Plus size={16} className="mr-1" />
                              Add Amenity
                           </button>
                        </div>

                        {formData.amenities.map((amenity, index) => (
                           <div key={index} className="flex items-center gap-4">
                              <div className="flex-1">
                                 <DropdownWithInput
                                    label=""
                                    selected={amenity}
                                    options={amenityOptions}
                                    onChange={(value) => handleArrayChange('amenities', index, value)}
                                    placeholder="e.g., WiFi, Air Conditioning, Smart TV..."
                                    icon={<Wifi size={18} />}
                                    error={errors.amenities}
                                 />
                              </div>
                              {formData.amenities.length > 1 && (
                                 <button
                                    type="button"
                                    onClick={() => removeArrayItem('amenities', index)}
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                 >
                                    <X size={16} />
                                 </button>
                              )}
                           </div>
                        ))}
                     </div>

                     {/* Tags */}
                     {/* <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <label className="block text-sm font-medium text-stone-700">
                              Room Tags
                           </label>
                           <button
                              type="button"
                              onClick={() => addArrayItem('tags')}
                              className="flex items-center text-sm text-amber-600 hover:text-amber-700 font-medium cursor-pointer"
                           >
                              <Plus size={16} className="mr-1" />
                              Add Tag
                           </button>
                        </div>

                        {formData.tags.map((tag, index) => (
                           <div key={index} className="flex items-center gap-4">
                              <div className="flex-1">
                                 <DropdownWithInput
                                    label=""
                                    selected={tag}
                                    options={tagOptions}
                                    onChange={(value) => handleArrayChange('tags', index, value)}
                                    placeholder="e.g., Ocean View, Pet Friendly, Business Center..."
                                    icon={<Tag size={18} />}
                                 />
                              </div>
                              {formData.tags.length > 1 && (
                                 <button
                                    type="button"
                                    onClick={() => removeArrayItem('tags', index)}
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                                 >
                                    <X size={16} />
                                 </button>
                              )}
                           </div>
                        ))}
                     </div> */}
                  </div>
               </motion.div>

               {/* Action Button */}
               <motion.div
                  variants={animateVariants.fadeIn}
                  className="flex flex-col sm:flex-row justify-end gap-4 pt-6"
               >
                  <button
                     type="button"
                     onClick={handleSubmit}
                     disabled={isSubmitting}
                     className="px-8 py-3 bg-stone-800 text-white rounded-lg hover:bg-amber-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Save className="mr-2" size={18} />
                     {isSubmitting ? 'Creating...' : 'Create Room'}
                  </button>
               </motion.div>
            </motion.div>
         </div>
      </div>
   );
};

export default CreateRoomPage;