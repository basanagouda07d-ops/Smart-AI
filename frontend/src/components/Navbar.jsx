import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  Scan,
  Info,
  BarChart3,
  Mail,
  ChevronRight,
  Menu,
  X,
  Home as HomeIcon,
  LogIn,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Disease Detection', path: '/detect', icon: Scan },
    { name: 'About', path: '/about', icon: Info },
    ...(isAdmin ? [{ name: 'Admin Dashboard', path: '/dashboard', icon: BarChart3 }] : []),
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#041009]/85 border-b border-emerald-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Sprout className="w-7 h-7 text-black stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                  Agri<span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v2.0
                </span>
              </div>
              <span className="text-[11px] font-medium text-emerald-400/80 tracking-wide">
                Smart Farming. Better Tomorrow.
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#071d11]/70 border border-emerald-500/20 rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                      ? 'bg-emerald-700/40 text-emerald-300 border border-emerald-400/30 shadow-[0_0_15px_rgba(34,197,94,0.25)] font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-emerald-900/30'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Section: Login & Get Started */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#082214] border border-emerald-500/30 hover:border-emerald-400 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-xs">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col pr-1">
                    <span className="text-xs font-bold text-white leading-tight">
                      {user?.fullName || 'Grower'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      {user?.role || 'Farmer'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#06180e] border border-emerald-500/30 p-2 shadow-2xl space-y-1 animate-fadeIn z-50">
                    <div className="px-3 py-2 border-b border-emerald-500/15">
                      <div className="text-xs font-bold text-white">{user?.farmName}</div>
                      <div className="text-[11px] text-gray-400 truncate">{user?.email}</div>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:bg-emerald-900/40 hover:text-white transition-colors"
                      >
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      to="/detect"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:bg-emerald-900/40 hover:text-white transition-colors"
                    >
                      <Scan className="w-4 h-4 text-emerald-400" />
                      <span>Disease Diagnostic Lab</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 hover:bg-emerald-900/80 hover:text-white transition-all shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Login</span>
                </Link>

                <button
                  onClick={() => navigate('/login')}
                  className="glow-btn flex items-center gap-1.5 px-5 py-2 rounded-full font-bold text-xs text-[#03150b] shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all transform hover:scale-105"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/60 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#05170d] border-b border-emerald-500/20 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-400/30 font-semibold'
                    : 'text-gray-300 hover:bg-emerald-900/40 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 border-t border-emerald-500/20 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-xs text-gray-300 bg-[#071e11] rounded-xl border border-emerald-500/20">
                  <div className="font-bold text-white">{user?.fullName}</div>
                  <div className="text-emerald-400 text-[11px]">{user?.farmName}</div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-bold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="glow-btn py-2.5 rounded-xl text-center text-xs font-bold text-black flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 rounded-xl text-center text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
