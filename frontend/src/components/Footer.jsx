import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Leaf, Mail, Phone, MapPin, Heart, ShieldAlert, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { isAdmin } = useAuth();
  return (
    <footer className="relative bg-[#020904] border-t border-emerald-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-500/15">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.35)]">
                <Sprout className="w-6 h-6 text-black stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Agri<span className="text-emerald-400">AI</span>
                </span>
                <p className="text-xs text-emerald-400/80 font-medium">Smart Farming. Better Tomorrow.</p>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Empowering onion growers worldwide with computer vision and deep learning diagnostics. Real-time pathogen identification, organic bio-control protocols, and precision agronomy.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400/90 font-medium">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Dedicated to Sustainable Crop Protection</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home / Landing</Link>
              </li>
              <li>
                <Link to="/detect" className="hover:text-emerald-400 transition-colors">Disease Detection</Link>
              </li>
              <li>
                <Link to="/diseases" className="hover:text-emerald-400 transition-colors">Disease Encyclopedia</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/dashboard" className="hover:text-emerald-400 transition-colors text-emerald-400 font-bold">Admin Dashboard</Link>
                </li>
              )}
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">About & Research</Link>
              </li>
            </ul>
          </div>

          {/* Onion Pathologies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Detected Pathologies</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/diseases#early_blight" className="hover:text-emerald-400 transition-colors">Early Blight (Alternaria)</Link>
              </li>
              <li>
                <Link to="/diseases#purple_blotch" className="hover:text-emerald-400 transition-colors">Purple Blotch (A. porri)</Link>
              </li>
              <li>
                <Link to="/diseases#stemphylium_blight" className="hover:text-emerald-400 transition-colors">Stemphylium Leaf Blight</Link>
              </li>
              <li>
                <Link to="/diseases#downy_mildew" className="hover:text-emerald-400 transition-colors">Downy Mildew</Link>
              </li>
              <li>
                <Link to="/diseases#healthy" className="hover:text-emerald-400 transition-colors">Healthy Foliage Baselines</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Farmer Helpline</h4>
            <div className="space-y-2.5 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+1 (800) AGRI-AI-HELP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>support@agriai.farm</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Agricultural Tech Park, Hubli</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} AgriAI Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Built for smarter, sustainable onion farming</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
            <div className="flex items-center gap-2 text-emerald-400/80">
              <ShieldAlert className="w-4 h-4" />
              <span>AI Accuracy &bull; 97.3%</span>
            </div>

            {/* Admin Login Button at Most Bottom of Desktop Page */}
            <Link
              to="/admin/login"
              id="admin-login-footer-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 transition-all text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)] group"
              title="Restricted Administrator Access Gateway"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
