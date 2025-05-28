"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { animateVariants } from '@/lib/constants/animation';
import { InputField } from '@/components/ui/forms/InputField';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { motion } from 'framer-motion';
import { validateSignInForm } from '@/utils/validators';
import { setAuthSession } from '@/lib/authSession';
import { loginAdminUser } from '@/server/adminUser.action';

export const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const router = useRouter();
  const { ref, controls } = useAnimateInView();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear auth error
    if (authError) setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    // Validate form
    const validationErrors = validateSignInForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await loginAdminUser(formData.email, formData.password);

      // Set auth session
      setAuthSession(result);

      // Redirect to admin dashboard
      router.push('/dashboard');

    } catch (error) {
      setAuthError(`${error.message}. Please try again.`);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50 flex items-center justify-center p-4">
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
        className="relative w-full max-w-md"
      >
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
            <h1 className="text-3xl font-serif text-stone-800 mb-2">Welcome Back</h1>
            <p className="text-stone-600 font-light">Access your luxury guest house dashboard</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={errors.email}
            />

            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Auth Error */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 mt-6 mb-6 flex items-center gap-2 text-red-600"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{authError}</span>
            </motion.div>
          )}


          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-4"></div>
            <p className="text-stone-500 text-sm font-light">
              Need access? Contact your administrator
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400 opacity-50"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400 opacity-50"></div>
      </motion.div>
    </div>
  );
}