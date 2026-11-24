import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Play,
  ShieldCheck,
  Zap,
  Sprout,
  Check,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Leaf,
  LogIn,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HeroSection() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Ambient Glows & Wave Curves */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Subtle organic wavy lines at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#020a05] via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid: Left Copy & Right High-Tech Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column (5 or 6 cols) */}
          <div className="lg:col-span-6 space-y-7 z-10">

            {/* AI Powered Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a2717]/80 border border-emerald-500/30 text-emerald-300 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>AI Powered • 97% Accuracy</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black tracking-tight text-white leading-[1.08]">
              AI-Powered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500">
                Onion Disease
              </span> <br />
              Detection
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl font-normal leading-relaxed">
              Protect your crop, ensure better yield and smarter farming with AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate('/detect')}
                className="glow-btn flex items-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#021308] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              >
                <Upload className="w-5 h-5 stroke-[2.5]" />
                <span>Upload Image & Detect</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Login / Dashboard Button on Home Page */}
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-xs sm:text-sm text-emerald-300 bg-emerald-950/60 border border-emerald-400/40 hover:bg-emerald-900/80 hover:border-emerald-400 transition-all backdrop-blur-md shadow-md"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>My Farm ({user?.fullName?.split(' ')[0]})</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-full font-bold text-xs sm:text-sm text-emerald-300 bg-emerald-950/60 border border-emerald-400/40 hover:bg-emerald-900/80 hover:border-emerald-400 hover:text-white transition-all backdrop-blur-md shadow-md"
                >
                  <LogIn className="w-4 h-4 text-emerald-400" />
                  <span>Farmer Login</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: High-Tech Scanner Graphic (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center">

            {/* Visual Container */}
            <div className="relative w-full max-w-[560px] rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.25)] group">

              {/* Background Onion Plant Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#071e12]">
                <img
                  src="/images/hero-onion.jpg"
                  alt="AI Onion Disease Scanner Visual"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient vignette for aesthetic depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041009] via-transparent to-black/20" />
                <div className="absolute inset-0 bg-emerald-950/15 mix-blend-color" />

                {/* Holographic Scanner Overlay Box */}
                <div className="absolute top-[16%] left-[30%] w-[52%] h-[62%] rounded-xl border border-emerald-400/60 shadow-[0_0_20px_rgba(74,222,128,0.35)] pointer-events-none">

                  {/* High-tech Cyan/Neon Corner Brackets */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-300" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-300" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-300" />

                  {/* Laser Sweeper Line */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_12px_#4ade80] scanner-laser" />

                  {/* Concentric Circular Grid Overlay */}
                  <div className="absolute inset-0 border border-emerald-400/20 rounded-full scale-90 opacity-40 animate-pulse-slow" />
                </div>

                {/* Floating Diagnosis HUD Tag (Early Blight • 97.3%) */}
                <div className="absolute top-[8%] right-[14%] flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#091f13]/90 border border-emerald-400/60 backdrop-blur-md shadow-[0_0_25px_rgba(34,197,94,0.4)] animate-float">
                  <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                    <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      Early Blight
                    </div>
                    <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                      <span>Confidence:</span>
                      <span className="font-bold text-white">97.3%</span>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Feature Card (Smart Agriculture with AI) */}
                <div className="absolute bottom-6 right-5 p-4 rounded-2xl bg-[#05170d]/85 border border-emerald-500/40 backdrop-blur-md shadow-2xl max-w-[210px] space-y-2">
                  <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Sprout className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      Smart Agriculture <br />
                      <span className="text-[10px] font-medium text-emerald-400">with AI</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-[11px] text-gray-200">
                    <li className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">Detect Diseases</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">Get Treatment Tips</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">Increase Yield</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* 4 Bottom Highlight Cards (Directly matching image) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* Card 1: High Accuracy */}
          <div className="glass-panel glass-card-hover rounded-2xl p-5 flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex-shrink-0 p-3">
              <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">High Accuracy</h4>
              <p className="text-xs text-emerald-400/90 font-medium">Up to 97% detection rate</p>
            </div>
          </div>

          {/* Card 2: Real-Time Analysis */}
          <div className="glass-panel glass-card-hover rounded-2xl p-5 flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex-shrink-0 p-3">
              <Zap className="w-7 h-7 stroke-[2.2] fill-emerald-400/20" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">Real-Time Analysis</h4>
              <p className="text-xs text-emerald-400/90 font-medium">Instant results</p>
            </div>
          </div>

          {/* Card 3: Healthy Crops */}
          <div className="glass-panel glass-card-hover rounded-2xl p-5 flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex-shrink-0 p-3">
              <Sprout className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">Healthy Crops</h4>
              <p className="text-xs text-emerald-400/90 font-medium">Better Yield</p>
            </div>
          </div>

          {/* Card 4: Sustainable Farming */}
          <div className="glass-panel glass-card-hover rounded-2xl p-5 flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] flex-shrink-0 p-3">
              <Leaf className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">Sustainable Farming</h4>
              <p className="text-xs text-emerald-400/90 font-medium">Greener Tomorrow</p>
            </div>
          </div>

        </div>

        {/* Decorative Divider with Central Leaf (As in reference image) */}
        <div className="mt-14 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-emerald-500/20" />
          </div>
          <div className="relative bg-[#030e07] px-6 py-1 flex items-center gap-2 text-xs font-semibold text-emerald-400/90 tracking-wider">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Together for a Healthier Harvest</span>
          </div>
        </div>

      </div>
    </section>
  );
}
