import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import {
  authRequestPasswordResetOtp,
  authVerifyPasswordResetOtp,
  authResetPassword
} from '../services/api';
import { isValidGmail } from '../utils/validators';

export default function ForgotPasswordModal({ isOpen, onClose, initialEmail = '', onPasswordResetSuccess }) {
  // Steps: 'request' | 'verify' | 'reset' | 'success'
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');

  // Resend cooldown timer
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep('request');
      setEmail(initialEmail || '');
      setOtp('');
      setResetToken('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setInfoMessage('');
      setDevOtpHint('');
      setCountdown(0);
    }
  }, [isOpen, initialEmail]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  // Step 1: Send OTP to registered Gmail
  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please enter your registered Gmail address.');
      return;
    }

    if (!isValidGmail(cleanEmail)) {
      setErrorMessage('A valid Gmail address (ending in @gmail.com) is required.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authRequestPasswordResetOtp(cleanEmail);
      setIsLoading(false);
      if (res.success) {
        setStep('verify');
        setCountdown(60);
        setInfoMessage(res.message || `Verification code sent to ${cleanEmail}.`);
        if (res.devOtp) {
          setDevOtpHint(res.devOtp);
        }
      } else {
        setErrorMessage(res.message || 'Unable to dispatch verification code. Please try again.');
      }
    } catch (err) {
      setIsLoading(false);
      const detail = err.response?.data?.detail || err.message || 'Failed to send OTP code.';
      setErrorMessage(detail);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authVerifyPasswordResetOtp(email.trim().toLowerCase(), cleanOtp);
      setIsLoading(false);
      if (res.success && res.resetToken) {
        setResetToken(res.resetToken);
        setStep('reset');
        setInfoMessage('Code verified! Please enter your new password.');
      } else {
        setErrorMessage(res.message || 'Invalid verification code.');
      }
    } catch (err) {
      setIsLoading(false);
      const detail = err.response?.data?.detail || err.message || 'Invalid verification code.';
      setErrorMessage(detail);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authResetPassword(email.trim().toLowerCase(), resetToken, newPassword);
      setIsLoading(false);
      if (res.success) {
        setStep('success');
        if (onPasswordResetSuccess) {
          onPasswordResetSuccess(email.trim().toLowerCase(), newPassword);
        }
      } else {
        setErrorMessage(res.message || 'Password update failed.');
      }
    } catch (err) {
      setIsLoading(false);
      const detail = err.response?.data?.detail || err.message || 'Failed to update password.';
      setErrorMessage(detail);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-[#0c0620]/95 backdrop-blur-2xl text-gray-100 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(147,51,234,0.35)] border border-purple-500/40 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-purple-950/60 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#140b2e] border-2 border-purple-500/60 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            {step === 'success' ? (
              <CheckCircle2 className="w-7 h-7 stroke-[2.4] text-emerald-400" />
            ) : step === 'reset' ? (
              <KeyRound className="w-7 h-7 stroke-[2.4]" />
            ) : (
              <ShieldCheck className="w-7 h-7 stroke-[2.4]" />
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {step === 'request' && 'Reset Password'}
            {step === 'verify' && 'Verify 6-Digit OTP'}
            {step === 'reset' && 'Create New Password'}
            {step === 'success' && 'Password Updated!'}
          </h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            {step === 'request' && 'Enter your registered Gmail to receive an instant verification code.'}
            {step === 'verify' && `We dispatched a 6-digit code to ${email}`}
            {step === 'reset' && 'Choose a secure new password for your account.'}
            {step === 'success' && 'Your account credentials have been successfully updated.'}
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {infoMessage && step !== 'success' && (
          <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-purple-400" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Dev OTP Helper Badge */}
        {devOtpHint && step === 'verify' && (
          <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-400/40 text-purple-200 text-xs flex items-center justify-between">
            <span>Development Code:</span>
            <button
              type="button"
              onClick={() => setOtp(devOtpHint)}
              className="font-mono font-bold px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white cursor-pointer shadow-sm"
              title="Click to auto-fill"
            >
              {devOtpHint} (Auto-Fill)
            </button>
          </div>
        )}

        {/* STEP 1: Request OTP Form */}
        {step === 'request' && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Registered Gmail Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-purple-400/80 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="grower@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-purple-500/30 bg-[#160d30]/90 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#a855f7] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending code...</span>
                </div>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Verify OTP Form */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 text-center">
                Enter 6-Digit Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full py-3 px-4 rounded-xl border-2 border-purple-400 text-center text-2xl font-mono font-bold tracking-[0.5em] text-white placeholder-gray-500 focus:outline-none focus:border-purple-300 transition-all bg-purple-950/30 shadow-inner"
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <button
                type="button"
                onClick={() => setStep('request')}
                className="text-gray-400 hover:text-purple-300 hover:underline"
              >
                Change Email
              </button>
              
              <button
                type="button"
                disabled={countdown > 0 || isLoading}
                onClick={handleRequestOtp}
                className="text-purple-400 font-semibold hover:underline flex items-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#a855f7] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Proceed</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: Reset Password Form */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400/80 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-purple-500/30 bg-[#160d30]/90 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400/80 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-purple-500/30 bg-[#160d30]/90 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-300 p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#a855f7] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating password...</span>
                </div>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: Success View */}
        {step === 'success' && (
          <div className="space-y-4 pt-2 text-center">
            <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-200 space-y-1">
              <p className="font-bold text-emerald-400 text-sm">Password Reset Successful!</p>
              <p className="text-gray-300">
                You can now log in using your newly set password and registered Gmail address.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#a855f7] hover:brightness-110 text-white font-bold text-sm shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
