import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Home,
  Leaf,
  Sprout,
  AlertCircle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin, isAuthenticated, isAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Forgot password OTP modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPwd = password.trim();

    if (!cleanEmail) {
      setError('Please provide the administrator email.');
      return;
    }

    if (!cleanPwd) {
      setError('Please provide the administrator password.');
      return;
    }

    setLoading(true);

    try {
      const res = await adminLogin(cleanEmail, cleanPwd);
      if (res && res.success) {
        setSuccess('Administrator authentication verified. Launching Dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 300);
      } else {
        setError(res?.error || 'Invalid administrator credentials. Access denied.');
      }
    } catch (err) {
      setError('Authentication server error. Please ensure backend is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background Image of Lush Green Onion Crop with blur overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-onion.jpg')`,
        }}
      />
      {/* Dark & Emerald Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#021307]/90 via-[#041d0e]/85 to-[#020d06]/92 backdrop-blur-[6px]" />

      {/* Main Container - Centered Single Admin Login Card */}
      <div className="relative z-10 w-full max-w-[430px] mx-auto px-4">
        <div className="w-full bg-white text-gray-800 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-8 border border-white/20 transition-all">

          {/* Header: Leaf Logo & Title */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md mb-2">
              <Sprout className="w-8 h-8 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
              Onion Disease Detector
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Smart Agriculture &bull; AI Powered
            </p>
          </div>

          {/* Dark Green Pill Banner: Admin Login / Secure Access */}
          <div className="mb-5 bg-[#0e4424] text-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-md">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 flex-shrink-0">
              <Shield className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-sm tracking-wide">Admin Login</div>
              <div className="text-[11px] text-emerald-200/90 font-medium">Secure Access for Administrators</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin Email"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-[#f5f8f5] border border-gray-200 focus:border-emerald-600 focus:bg-white rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 bg-[#f5f8f5] border border-gray-200 focus:border-emerald-600 focus:bg-white rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs text-gray-600 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                />
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-emerald-700 font-semibold hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#0e4424] hover:bg-[#09331a] active:scale-[0.99] text-white font-bold rounded-xl shadow-[0_10px_25px_rgba(14,68,36,0.35)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 stroke-[2.4]" />
                    <span>Login</span>
                  </>
                )}
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 tracking-wider">
                OR
              </span>
            </div>

            {/* Back to Home Button */}
            <Link
              to="/"
              className="w-full py-3 px-4 bg-white hover:bg-[#f0f7f2] text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 text-xs"
            >
              <Home className="w-4 h-4 text-emerald-700" />
              <span>Back to Home</span>
            </Link>
          </form>

          {/* Bottom Disclaimer */}
          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Only authorized personnel can access this area</span>
          </div>

        </div>
      </div>

      {/* Forgot Password OTP Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        initialEmail={email}
        onPasswordResetSuccess={(resetEmail, newPwd) => {
          setEmail(resetEmail);
          setPassword(newPwd);
          setSuccess('Password reset successfully! You can now sign in.');
        }}
      />
    </div>
  );
}
