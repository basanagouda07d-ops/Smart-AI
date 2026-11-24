import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import Dashboard from './pages/Dashboard';
import DiseaseInfo from './pages/DiseaseInfo';
import AboutContact from './pages/AboutContact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin/login' || location.pathname === '/admin';
  const isDashboard = location.pathname === '/dashboard';
  const isCustomLayout = isAuthPage || isDashboard;

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#030e07] text-gray-100 font-sans relative selection:bg-emerald-500 selection:text-black">
        <ScrollToTop />
        
        {/* Navigation Header - Custom pages (Auth & Admin Dashboard) use their own dedicated layout */}
        {!isCustomLayout && <Navbar />}

        {/* Main Routed Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<DiseaseDetection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diseases" element={<DiseaseInfo />} />
            <Route path="/about" element={<AboutContact />} />
            <Route path="/contact" element={<AboutContact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Persistent Footer */}
        {!isCustomLayout && <Footer />}
      </div>
    </AuthProvider>
  );
}
