"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants } from '@/lib/constants/animation';
import { InputField } from '@/components/ui/forms/InputField';
import { createAdminUser, getAdminUser, updateAdminUser } from '@/server/adminUser.action';
import { Dropdown } from '@/components/ui/forms/DropDown';
import { validateSignUpForm } from '@/utils/validators';

export default function SignUpPage({ userToUpdate, userId }) {
  const [formData, setFormData] = useState(userToUpdate);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(userId ?? false);

  const roleOptions = ['admin', 'editor'];
  const router = useRouter();
  const { ref, controls } = useAnimateInView();

  // Check for edit mode and fetch user data
  useEffect(() => {

    // Get current user from auth
    const authData = localStorage.getItem('guesthouse_admin_auth');
    if (authData) {
      const { user } = JSON.parse(authData);
      setCurrentUser(user);
    }
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear messages
    if (authError) setAuthError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setAuthError('');
    setSuccessMessage('');

    // For update mode, password is optional
    const validationData = isEditMode ?
      { ...formData, password: formData.password || 'd@A1ummypass', confirmPassword: formData.confirmPassword || 'd@A1ummypass' } :
      formData;

    // Validate form
    const validationErrors = validateSignUpForm(validationData, isEditMode);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Check authentication
      const authData = localStorage.getItem('guesthouse_admin_auth');
      if (!authData) {
        setAuthError('You must be logged in as an admin');
        setIsLoading(false);
        return;
      }

      const { user } = JSON.parse(authData);

      if ((user.role !== 'admin') || !user.isSuperAdmin) {
        setAuthError('Only super admins can create/update users');
        setIsLoading(false);
        return;
      }

      // Prepare user data
      const userData = {
        _id: userToUpdate?._id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
        isSuperAdmin: formData.isSuperAdmin
      };

      // Only include password if it's provided
      if (formData.password) {
        userData.password = formData.password;
      }

      let result;
      if (isEditMode) {
        // Update existing user
        result = await updateAdminUser(userData, currentUser?._id);
      } else {
        // Create new user
        result = await createAdminUser(userData, currentUser?._id);
      }

      if (result.error) {
        setAuthError(result.error);
      } else {
        setSuccessMessage(isEditMode ? 'User updated successfully!' : 'Admin user created successfully!');

        // Redirect to users page
        router.push('/admin/users');

      }
    } catch (error) {
      setAuthError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50 flex items-center justify-center p-4 mt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-stone-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animateVariants.fadeIn}
        className="relative w-full max-w-lg"
      >
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
            <h1 className="text-3xl font-serif text-stone-800 mb-2">
              {isEditMode ? 'Update Admin Account' : 'Create Admin Account'}
            </h1>
            <p className="text-stone-600 font-light">
              {isEditMode ? 'Update administrator information' : 'Add a new administrator to the system'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                type="text"
                placeholder="Enter first name"
                icon={<User className="w-5 h-5" />}
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                icon={<User className="w-5 h-5" />}
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
                error={errors.lastName}
              />
            </div>

            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={errors.email}
            />

            <Dropdown
              label="Role"
              selected={formData.role}
              options={roleOptions}
              onChange={(value) => handleInputChange('role', value)}
              error={errors.role}
            />

            {/* Super Admin Dropdown - Only show if user exists and current user is super admin */}
            {isEditMode && currentUser?.isSuperAdmin && (
              <Dropdown
                label="Super Admin Status"
                selected={formData.isSuperAdmin ? 'Yes' : 'No'}
                options={['Yes', 'No']}
                onChange={(value) => handleInputChange('isSuperAdmin', value === 'Yes')}
                error={errors.isSuperAdmin}
              />
            )}

            {!isEditMode && (
              <div className="relative">
                <InputField
                  label={isEditMode ? "New Password (Optional)" : "Password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={isEditMode ? "Leave blank to keep current password" : "Create a strong password"}
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-9 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )
            }

            {!isEditMode && (
              <div className="relative">
                <InputField
                  label={isEditMode ? "Confirm New Password" : "Confirm Password"}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={isEditMode ? "Confirm new password" : "Confirm your password"}
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.confirmPassword}
                  onChange={(value) => handleInputChange('confirmPassword', value)}
                  error={errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-9 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {/* Password Requirements */}
            {(!isEditMode || formData.password) && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-stone-600 font-light">
                  Password must contain at least 8 characters with uppercase, lowercase, and numbers.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-stone-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-stone-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isEditMode ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {isEditMode ? 'Update Admin Account' : 'Create Admin Account'}
                </>
              )}
            </button>

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-2 text-green-600"
              >
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{successMessage}</span>
              </motion.div>
            )}

            {/* Auth Error */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-center gap-2 text-red-600"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{authError}</span>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4"></div>
            <button
              onClick={() => router.push('/admin/users')}
              className="text-stone-500 text-sm font-light hover:text-amber-600 transition-colors cursor-pointer"
            >
              {isEditMode ? 'Back to Users' : 'Back to Users'}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400 opacity-50"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400 opacity-50"></div>
      </motion.div>
    </div>
  );
}