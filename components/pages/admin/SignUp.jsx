"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants } from '@/lib/constants/animation';
import { InputField } from '@/components/ui/forms/InputField';
import { createAdminUser } from '@/server/adminUser.action';
import { Dropdown } from '@/components/ui/forms/DropDown';
import { validateSignUpForm } from '@/utils/validators';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Select Role'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const roleOptions = ['admin', 'editor'];
  const router = useRouter();
  const { ref, controls } = useAnimateInView();

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

    // Validate form
    const validationErrors = validateSignUpForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Get current user ID from auth session (admin must be logged in to create users)
      const authData = localStorage.getItem('guesthouse_admin_auth');
      if (!authData) {
        setAuthError('You must be logged in as an admin to create users');
        setIsLoading(false);
        return;
      }

      const { user } = JSON.parse(authData);

      if ((user.role !== 'admin') || !user.isSuperAdmin) {
        setAuthError('Only admins can create new users');
        setIsLoading(false);
        return;
      }

      // Prepare user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      // Call server action
      const result = await createAdminUser(userData, user?._id);

      if (result.error) {
        setAuthError(result.error);
      } else {
        setSuccessMessage('Admin user created successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'Select Role'
        });

        // Redirect after success
        // setTimeout(() => {
        //   router.push('/admin/users');
        // }, 2000);
      }
    } catch (error) {
      setAuthError('Network error. Please try again.');
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
            <h1 className="text-3xl font-serif text-stone-800 mb-2">Create Admin Account</h1>
            <p className="text-stone-600 font-light">Add a new administrator to the system</p>
          </div>

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

            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
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

            <div className="relative">
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
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

            {/* Password Requirements */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-stone-600 font-light">
                Password must contain at least 8 characters with uppercase, lowercase, and numbers.
              </p>
            </div>

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
                  <UserPlus className="w-5 h-5" />
                  Create Admin Account
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
          </div>

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

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4"></div>
            <button
              onClick={() => router.push('/admin/sign-in')}
              className="text-stone-500 text-sm font-light hover:text-amber-600 transition-colors cursor-pointer"
            >
              Back to Sign In
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