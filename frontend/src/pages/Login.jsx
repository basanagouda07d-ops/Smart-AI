import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Sprout,
  AlertCircle,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isValidGmail } from '../utils/validators';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, isAuthenticated, isAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot password OTP modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Google OAuth modal state
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Regular user login redirects to Home ('/'), only admin redirects to '/dashboard'
  const fromPath = location.state?.from?.pathname;
  const redirectTarget = (fromPath && fromPath !== '/dashboard') ? fromPath : (isAdmin ? '/dashboard' : '/');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTarget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!isValidGmail(cleanEmail)) {
      setErrorMessage('Authentication requires a valid Gmail account (ending in @gmail.com).');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(cleanEmail, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(redirectTarget, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidGmail(googleEmail)) {
      setErrorMessage('Google Sign-In requires an active @gmail.com address.');
      return;
    }

    setIsSubmitting(true);
    const result = await loginWithGoogle({
      email: googleEmail.trim().toLowerCase(),
      name: googleName.trim() || googleEmail.split('@')[0]
    });
    setIsSubmitting(false);

    if (result.success) {
      setGoogleModalOpen(false);
      navigate(redirectTarget, { replace: true });
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#07130b] text-gray-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Simple Header */}
      <header className="relative z-10 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Onion Disease <span className="text-emerald-400">Detector</span>
          </span>
        </Link>

        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-emerald-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content: Clean Centered Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-[#0c1f13] border border-emerald-500/20 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm mb-3">
              <LogIn className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Sign in to manage your scans and crops
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-500/25 bg-[#07170c] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-emerald-500/25 bg-[#07170c] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-xs text-gray-400 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-600 bg-[#07170c] accent-emerald-600"
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>

          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-emerald-500/15" />
            <span className="relative bg-[#0c1f13] px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => setGoogleModalOpen(true)}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 sm:py-3 rounded-xl border border-emerald-500/25 hover:border-emerald-400/50 bg-[#07170c] hover:bg-[#0a2012] text-gray-200 text-xs sm:text-sm font-semibold transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer Switcher */}
          <div className="text-center text-xs text-gray-400 pt-2 border-t border-emerald-500/10">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-400 font-bold hover:underline">
              Create an account
            </Link>
          </div>

        </div>
      </main>

      {/* Simple Clean Footer */}
      <footer className="relative z-10 py-5 text-center text-xs text-gray-500">
        © 2026 Onion Disease Detector. All rights reserved.
      </footer>

      {/* Google Modal */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0c1f13] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-emerald-500/30 text-gray-200">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <h3 className="font-bold text-white text-sm">Google One-Click Sign-In</h3>
              </div>
              <button onClick={() => setGoogleModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>

            <p className="text-xs text-gray-400">Sign in instantly using your personal or enterprise Google / Gmail account.</p>

            <form onSubmit={handleGoogleSubmit} className="space-y-3">
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-gray-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-500/30 bg-[#07170c] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-gray-300">Gmail Address *</label>
                <input
                  type="email"
                  required
                  placeholder="grower@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-500/30 bg-[#07170c] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setGoogleModalOpen(false)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white">
                  {isSubmitting ? 'Signing in...' : 'Sign in with Google'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password OTP Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        initialEmail={email}
        onPasswordResetSuccess={(resetEmail, newPwd) => {
          setEmail(resetEmail);
          setPassword(newPwd);
        }}
      />

    </div>
  );
}
