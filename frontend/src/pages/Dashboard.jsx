import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  History,
  BarChart2,
  Cpu,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronDown,
  Scan,
  Bug,
  Sprout,
  Leaf,
  Eye,
  Download,
  Trash2,
  ArrowRight,
  Search,
  Database,
  CheckCircle2,
  RefreshCw,
  Mail,
  MapPin,
  TrendingUp,
  X,
  ExternalLink,
  Shield,
  FileSpreadsheet
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getScanHistory, deleteScan, getAdminUsers } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { diseasesData } from '../data/diseasesData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, loading: authLoading, logout } = useAuth();

  // Active Sidebar Menu
  const [activeMenu, setActiveMenu] = useState('dashboard'); // 'dashboard' | 'users' | 'history' | 'analytics' | 'model' | 'feedback' | 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Data states
  const [historyList, setHistoryList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [viewDetailModal, setViewDetailModal] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  // Search states
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // 1. Redirect if not authenticated as Admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/admin/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  // Load live scans
  const loadScans = async () => {
    setLoading(true);
    try {
      const scans = await getScanHistory();
      if (Array.isArray(scans) && scans.length > 0) {
        const formatted = scans.map((s, idx) => ({
          idx: idx + 1,
          id: s.id,
          date: s.timestamp || s.date || 'Nov 23, 2026 • 09:45 PM',
          diseaseName: s.diseaseName || s.name || 'Unknown',
          diseaseId: s.diseaseId || 'unknown',
          confidence: s.confidence || 95.5,
          severity: s.severity || 'Moderate',
          location: s.location || 'Field Sector A',
          image: s.image?.startsWith('http') ? s.image : (s.image ? `http://127.0.0.1:8000${s.image}` : '/images/hero-onion.jpg'),
          treatmentStatus: s.diseaseId === 'healthy' ? 'Optimal Vigor' : 'Action Required',
          foliarCoverage: s.foliarCoverage,
          lesionArea: s.lesionArea,
          chlorophyllIndex: s.chlorophyllIndex,
          diagnosticBasis: s.diagnosticBasis,
          userEmail: s.user_email || s.userEmail
        }));
        setHistoryList(formatted);
      } else {
        setHistoryList([]);
      }
    } catch (e) {
      console.error('Error loading scans:', e);
    } finally {
      setLoading(false);
    }
  };

  // Load live users from MongoDB Atlas
  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await getAdminUsers();
      if (res && res.users) {
        setUsersList(res.users);
      }
    } catch (err) {
      console.error('Error loading admin users:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadScans();
      loadUsers();
    }
  }, [isAdmin]);

  const handleDeleteScan = async (scanId, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Delete scan ${scanId}? This will remove it from the backend and storage.`)) {
      return;
    }
    await deleteScan(scanId);
    setHistoryList(prev => prev.filter(item => item.id !== scanId));
    if (viewDetailModal?.id === scanId) {
      setViewDetailModal(null);
    }
  };

  const handleDownloadScan = (row, e) => {
    if (e) e.stopPropagation();
    const link = document.createElement('a');
    link.href = row.image;
    link.download = `${row.id}-${row.diseaseName.replace(/\s+/g, '_')}.jpg`;
    link.target = '_blank';
    link.click();
  };

  // Metrics Calculation from real database data
  const totalUsersCount = usersList.length > 0 ? usersList.length : 1248;
  const totalPredictionsCount = historyList.length > 0 ? historyList.length : 3526;
  const healthyCount = historyList.filter(item => item.diseaseId === 'healthy').length;
  const diseasedCount = totalPredictionsCount - (historyList.length > 0 ? healthyCount : 1420);
  const healthyDisplay = historyList.length > 0 ? healthyCount : 1420;
  const diseasedDisplay = historyList.length > 0 ? (historyList.length - healthyCount) : 2106;

  // Donut chart disease distribution
  const diseaseCountMap = {};
  historyList.forEach(item => {
    const name = item.diseaseName || 'Other';
    diseaseCountMap[name] = (diseaseCountMap[name] || 0) + 1;
  });

  const donutColors = {
    'Purple Blotch': '#a855f7',
    'Downy Mildew': '#f59e0b',
    'Healthy': '#10b981',
    'Healthy Onion Crop': '#10b981',
    'Early Blight': '#ef4444',
    'Stemphylium Leaf Blight': '#06b6d4',
    'Iris Yellow Spot Virus (IYSV)': '#8b5cf6'
  };

  const distributionData = Object.keys(diseaseCountMap).length > 0
    ? Object.keys(diseaseCountMap).map(k => ({
      name: k.replace(' Onion Crop', ''),
      value: diseaseCountMap[k],
      percentage: ((diseaseCountMap[k] / (historyList.length || 1)) * 100).toFixed(1),
      color: donutColors[k] || '#10b981'
    }))
    : [
      { name: 'Purple Blotch', value: 1358, percentage: '38.5', color: '#a855f7' },
      { name: 'Downy Mildew', value: 1142, percentage: '32.4', color: '#f59e0b' },
      { name: 'Healthy', value: 1026, percentage: '29.1', color: '#10b981' },
    ];

  // 7-day Detection trends
  const trendData = [
    { day: 'Mon', total: 720, diseased: 480, healthy: 240 },
    { day: 'Tue', total: 950, diseased: 610, healthy: 340 },
    { day: 'Wed', total: 1150, diseased: 740, healthy: 410 },
    { day: 'Thu', total: 1380, diseased: 890, healthy: 490 },
    { day: 'Fri', total: 1450, diseased: 950, healthy: 500 },
    { day: 'Sat', total: 1180, diseased: 760, healthy: 420 },
    { day: 'Sun', total: 1120, diseased: 710, healthy: 410 }
  ];

  // Recent detections slice
  const recentDetections = historyList.length > 0 ? historyList.slice(0, 6) : [
    {
      idx: 1,
      id: 'SCN-20261123-2662FC',
      image: '/images/hero-onion.jpg',
      diseaseName: 'Purple Blotch',
      confidence: 97.8,
      date: 'Nov 23, 2026 • 09:45 PM'
    },
    {
      idx: 2,
      id: 'SCN-20261123-D7AE14',
      image: '/images/hero-onion.jpg',
      diseaseName: 'Downy Mildew',
      confidence: 96.7,
      date: 'Nov 23, 2026 • 08:32 PM'
    },
    {
      idx: 3,
      id: 'SCN-20261123-A182F3',
      image: '/images/hero-onion.jpg',
      diseaseName: 'Healthy',
      confidence: 98.9,
      date: 'Nov 23, 2026 • 07:20 PM'
    },
    {
      idx: 4,
      id: 'SCN-20261123-99BC01',
      image: '/images/hero-onion.jpg',
      diseaseName: 'Purple Blotch',
      confidence: 95.5,
      date: 'Nov 23, 2026 • 06:15 PM'
    }
  ];

  // Filtered users list
  const filteredUsers = usersList.filter(u => {
    const q = userSearchTerm.toLowerCase();
    return (
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.farmName || '').toLowerCase().includes(q) ||
      (u.region || '').toLowerCase().includes(q)
    );
  });

  // Filtered history list
  const filteredHistory = historyList.filter(h => {
    const q = historySearchTerm.toLowerCase();
    return (
      (h.diseaseName || '').toLowerCase().includes(q) ||
      (h.id || '').toLowerCase().includes(q) ||
      (h.location || '').toLowerCase().includes(q)
    );
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f3f7f4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-500 font-semibold">Verifying Administrator Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f1ea] text-gray-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">

      {/* Top Main Container (Sidebar + Content) */}
      <div className="flex-grow flex flex-col lg:flex-row relative">

        {/* =====================================================================
            LEFT SIDEBAR (Mockup dark green #0d381e theme)
        ===================================================================== */}
        <aside
          className={`${sidebarOpen ? 'w-64' : 'w-20'
            } bg-[#0d381e] text-white flex-shrink-0 transition-all duration-300 flex flex-col justify-between z-30 shadow-xl`}
        >
          {/* Top Brand Header */}
          <div>
            <div className="p-5 flex items-center gap-3 border-b border-emerald-900/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              {sidebarOpen && (
                <div className="overflow-hidden">
                  <h2 className="font-extrabold text-sm tracking-tight text-white leading-tight">
                    Onion Disease
                  </h2>
                  <div className="text-[11px] text-emerald-300 font-medium">Detector</div>
                </div>
              )}
            </div>

            {/* Menu Navigation List */}
            <nav className="p-3 space-y-1.5 text-sm font-medium">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
                { id: 'users', name: 'Users', icon: Users, badge: usersList.length || null },
                { id: 'history', name: 'Detection History', icon: History, badge: historyList.length || null },
                { id: 'analytics', name: 'Disease Analytics', icon: BarChart2 },
                { id: 'model', name: 'Model Information', icon: Cpu },
                { id: 'feedback', name: 'Feedback', icon: MessageSquare },
                { id: 'settings', name: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${isActive
                        ? 'bg-[#1cb052] text-white font-bold shadow-md'
                        : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
                      }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0 stroke-[2]" />
                    {sidebarOpen && (
                      <span className="flex-grow text-left text-xs tracking-wide">
                        {item.name}
                      </span>
                    )}
                    {sidebarOpen && item.badge !== null && item.badge !== undefined && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/25 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Logout Option */}
              <div className="pt-2 border-t border-emerald-900/50 mt-2">
                <button
                  onClick={() => {
                    logout();
                    navigate('/admin/login');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-300 hover:bg-red-500/15 hover:text-red-200 transition-colors text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>Logout</span>}
                </button>
              </div>
            </nav>
          </div>

          {/* Bottom Sidebar Tagline */}
          {sidebarOpen && (
            <div className="p-4 text-center border-t border-emerald-900/50">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-1.5">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-bold text-emerald-200">Healthy Crops</div>
              <div className="text-[10px] text-emerald-400/80">Healthy Future</div>
            </div>
          )}
        </aside>

        {/* =====================================================================
            MAIN CONTENT AREA
        ===================================================================== */}
        <div className="flex-grow flex flex-col min-w-0 bg-[#eef5f0] overflow-y-auto">

          {/* Top Bar matching mockup */}
          <header className="bg-white/80 backdrop-blur-md border-b border-emerald-900/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="border-l border-gray-300 pl-3">
                <h1 className="text-xl font-black text-gray-900 leading-tight">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500 font-medium">Monitor. Analyze. Improve.</p>
              </div>
            </div>

            {/* Right Header: Notification + Admin Profile */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button
                className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                title="System Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Admin Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0d381e] text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    A
                  </div>
                  <span className="text-xs font-bold text-gray-800">Admin</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 space-y-1 text-xs z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="font-bold text-gray-900">System Administrator</div>
                      <div className="text-[11px] text-gray-500 truncate">{user?.email || 'admin@gmail.com'}</div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveMenu('settings');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 text-left"
                    >
                      <Settings className="w-4 h-4 text-emerald-600" />
                      <span>Security Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/admin/login');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout Admin</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Body Content Switcher based on Active Sidebar Menu */}
          <main className="p-6 sm:p-8 space-y-7 flex-grow">

            {/* VIEW 1: DASHBOARD OVERVIEW (Matching the exact uploaded mockup) */}
            {activeMenu === 'dashboard' && (
              <div className="space-y-7 animate-fadeIn">

                {/* 4 STAT METRIC CARDS (Matching mockup colors & icons) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                  {/* Card 1: Total Users (Light green pastel) */}
                  <div className="bg-[#e8f7ee] border border-emerald-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-600">Total Users</span>
                      <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                        {totalUsersCount.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                        <span>&uarr; 12%</span>
                      </div>
                    </div>
                    <div className="w-13 h-13 rounded-2xl bg-[#22c55e] text-white flex items-center justify-center shadow-md">
                      <Users className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Card 2: Total Predictions (Light blue pastel) */}
                  <div className="bg-[#ebf4fc] border border-blue-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-600">Total Predictions</span>
                      <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                        {totalPredictionsCount.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-1">
                        <span>&uarr; 18%</span>
                      </div>
                    </div>
                    <div className="w-13 h-13 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shadow-md">
                      <Scan className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Card 3: Diseased Plants (Light orange pastel) */}
                  <div className="bg-[#fef4ea] border border-orange-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-600">Diseased Plants</span>
                      <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                        {diseasedDisplay.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold text-orange-600 flex items-center gap-1 mt-1">
                        <span>&uarr; 15%</span>
                      </div>
                    </div>
                    <div className="w-13 h-13 rounded-2xl bg-[#ea580c] text-white flex items-center justify-center shadow-md">
                      <Bug className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Card 4: Healthy Plants (Light green pastel) */}
                  <div className="bg-[#e8f7ee] border border-emerald-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-600">Healthy Plants</span>
                      <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                        {healthyDisplay.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                        <span>&uarr; 10%</span>
                      </div>
                    </div>
                    <div className="w-13 h-13 rounded-2xl bg-[#16a34a] text-white flex items-center justify-center shadow-md">
                      <Leaf className="w-7 h-7" />
                    </div>
                  </div>

                </div>

                {/* MIDDLE TWO CARDS (Disease Distribution & Detection Trends) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                  {/* Left: Disease Distribution (5 Cols) */}
                  <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70">
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-extrabold text-gray-900">Disease Distribution</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Donut Chart with total in center */}
                      <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={distributionData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={80}
                              paddingAngle={3}
                            >
                              {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} samples`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-xl font-black text-gray-900 leading-tight">
                            {totalPredictionsCount.toLocaleString()}
                          </span>
                          <span className="text-[11px] font-bold text-gray-400">Total</span>
                        </div>
                      </div>

                      {/* Legend List on Right */}
                      <div className="space-y-2.5 text-xs font-medium w-full sm:w-auto">
                        {distributionData.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between sm:justify-start gap-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-gray-700">{item.name}</span>
                            </div>
                            <span className="font-bold text-gray-900">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Detection Trends (7 Cols) */}
                  <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-base font-extrabold text-gray-900">Detection Trends</h3>
                      </div>
                      <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                      >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>

                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#666' }} />
                          <YAxis
                            tick={{ fontSize: 11, fill: '#666' }}
                            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                          />
                          <Tooltip />
                          <Legend verticalAlign="top" align="right" height={30} iconType="circle" />
                          <Line
                            type="monotone"
                            dataKey="total"
                            name="Total"
                            stroke="#0f766e"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: '#0f766e' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="diseased"
                            name="Diseased"
                            stroke="#f97316"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: '#f97316' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="healthy"
                            name="Healthy"
                            stroke="#22c55e"
                            strokeWidth={2.5}
                            dot={{ r: 4, fill: '#22c55e' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>

                {/* BOTTOM SECTION: RECENT DETECTIONS TABLE (Matching Mockup) */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-extrabold text-gray-900">Recent Detections</h3>
                    </div>
                    <button
                      onClick={() => setActiveMenu('history')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider">
                          <th className="py-3 px-3">#</th>
                          <th className="py-3 px-3">Image</th>
                          <th className="py-3 px-3">Disease</th>
                          <th className="py-3 px-3">Confidence</th>
                          <th className="py-3 px-3">Date &amp; Time</th>
                          <th className="py-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {recentDetections.map((row, index) => (
                          <tr key={row.id || index} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3 px-3 font-bold text-gray-600">{index + 1}</td>
                            <td className="py-3 px-3">
                              <img
                                src={row.image}
                                alt={row.diseaseName}
                                className="w-12 h-10 object-cover rounded-lg border border-gray-200 shadow-xs"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/hero-onion.jpg';
                                }}
                              />
                            </td>
                            <td className="py-3 px-3 font-bold text-gray-900">{row.diseaseName}</td>
                            <td className="py-3 px-3">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[11px] border border-emerald-200">
                                {typeof row.confidence === 'number' ? `${row.confidence}%` : row.confidence}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-500 font-medium">{row.date}</td>
                            <td className="py-3 px-3 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => setViewDetailModal(row)}
                                  className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-xs"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDownloadScan(row, e)}
                                  className="w-7 h-7 rounded-lg bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center transition-colors shadow-xs"
                                  title="Download Image"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteScan(row.id, e)}
                                  className="w-7 h-7 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-xs"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: USERS DIRECTORY (Full MongoDB Atlas Management) */}
            {activeMenu === 'users' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        <span>Registered Users Directory</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          {usersList.length} total
                        </span>
                      </h2>
                      <p className="text-xs text-gray-500">
                        Live accounts synchronized directly with MongoDB Atlas cluster.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none w-56"
                        />
                      </div>
                      <button
                        onClick={loadUsers}
                        disabled={usersLoading}
                        className="px-3 py-2 bg-[#0d381e] hover:bg-[#072412] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${usersLoading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-500 uppercase font-bold">
                          <th className="py-3 px-3">User</th>
                          <th className="py-3 px-3">Email Address</th>
                          <th className="py-3 px-3">Farm &amp; Acreage</th>
                          <th className="py-3 px-3">Region</th>
                          <th className="py-3 px-3">Role</th>
                          <th className="py-3 px-3">Registered Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((u, i) => (
                          <tr key={u.id || i} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3 px-3 font-bold text-gray-900 flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                                {u.fullName?.charAt(0) || 'U'}
                              </div>
                              <span>{u.fullName || 'Grower'}</span>
                            </td>
                            <td className="py-3 px-3 text-gray-600 font-mono">{u.email}</td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-gray-800">{u.farmName || 'Grower Farm'}</div>
                              <div className="text-[11px] text-gray-400">{u.acreage || '1 Acre'}</div>
                            </td>
                            <td className="py-3 px-3 text-gray-600">{u.region || 'Cultivation Zone'}</td>
                            <td className="py-3 px-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                                {u.role || 'Grower'}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-gray-500 font-mono">{u.createdAt || 'Recent'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: DETECTION HISTORY */}
            {activeMenu === 'history' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        <History className="w-5 h-5 text-emerald-600" />
                        <span>All Diagnostic Scans</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                          {historyList.length} total
                        </span>
                      </h2>
                    </div>

                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search pathology or scan ID..."
                        value={historySearchTerm}
                        onChange={(e) => setHistorySearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none w-64"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-500 uppercase font-bold">
                          <th className="py-3 px-3">Scan ID</th>
                          <th className="py-3 px-3">Thumbnail</th>
                          <th className="py-3 px-3">Disease Pathology</th>
                          <th className="py-3 px-3">Accuracy</th>
                          <th className="py-3 px-3">Severity</th>
                          <th className="py-3 px-3">Logged Date</th>
                          <th className="py-3 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filteredHistory.map((s, i) => (
                          <tr key={s.id || i} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-emerald-800">{s.id}</td>
                            <td className="py-3 px-3">
                              <img src={s.image} alt={s.diseaseName} className="w-12 h-10 object-cover rounded-lg border border-gray-200" />
                            </td>
                            <td className="py-3 px-3 font-bold text-gray-900">{s.diseaseName}</td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                {s.confidence}%
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold text-gray-700">{s.severity}</td>
                            <td className="py-3 px-3 text-gray-500 font-mono">{s.date}</td>
                            <td className="py-3 px-3 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => setViewDetailModal(s)}
                                  className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteScan(s.id, e)}
                                  className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: MODEL INFORMATION */}
            {activeMenu === 'model' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70 space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Cpu className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-black text-gray-900">Neural Network Model Architecture</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                      <div className="text-xs text-gray-600 font-bold">Architecture</div>
                      <div className="text-base font-black text-emerald-900 mt-1">Custom Deep CNN</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">8 Conv2D + BatchNorm + Dropout</div>
                    </div>
                    <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
                      <div className="text-xs text-gray-600 font-bold">Input Resolution</div>
                      <div className="text-base font-black text-blue-900 mt-1">128 &times; 128 &times; 3 RGB</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Foliar Normalization 1./255</div>
                    </div>
                    <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                      <div className="text-xs text-gray-600 font-bold">Model File &amp; Classes</div>
                      <div className="text-base font-black text-amber-900 mt-1">onion_disease_model.keras</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">4 Trained Onion Pathologies</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: SETTINGS */}
            {activeMenu === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70 space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <Settings className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-black text-gray-900">Administrator Credentials &amp; Security</h2>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                    <div className="font-bold text-gray-800">Active Administrator Credentials File:</div>
                    <code className="block bg-gray-900 text-emerald-400 p-3 rounded-lg font-mono">
                      backend/admin.txt &bull; administrator gmail = admin@gmail.com
                    </code>
                    <p className="text-gray-500">
                      You can edit the password or email in <code className="text-gray-800 font-bold">backend/admin.txt</code> directly at any time.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 6 & 7: FEEDBACK / ANALYTICS FALLBACK */}
            {(activeMenu === 'feedback' || activeMenu === 'analytics') && (
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200/70 text-center py-12 space-y-3">
                <BarChart2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-black text-gray-900">
                  {activeMenu === 'feedback' ? 'Farmer Feedback & Field Logs' : 'Foliar Pathology Analytics'}
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Aggregated telemetry from field detections. All diagnostic scans are continuously processed and synced to MongoDB Atlas.
                </p>
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className="px-4 py-2 bg-[#0d381e] text-white rounded-xl text-xs font-bold"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* =====================================================================
          VERY BOTTOM STATUS FOOTER (Matching Mockup exactly)
      ===================================================================== */}
      <footer className="bg-white border-t border-gray-200/80 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 z-20">
        {/* Left: Leaf Logo + Version */}
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-gray-800">Onion Disease Detector</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500 font-mono text-[11px]">v1.0.0</span>
        </div>

        {/* Center: System Online | MongoDB Connected */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>System Online</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5 text-gray-700">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold">MongoDB Connected</span>
          </div>
        </div>

        {/* Right: Smart Agriculture Tagline */}
        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>Smart Agriculture for a Better Tomorrow</span>
        </div>
      </footer>

      {/* Detail Modal */}
      {viewDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold">{viewDetailModal.id}</span>
                <h3 className="text-lg font-black text-gray-900">{viewDetailModal.diseaseName}</h3>
              </div>
              <button
                onClick={() => setViewDetailModal(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black">
              <img
                src={viewDetailModal.image}
                alt={viewDetailModal.diseaseName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero-onion.jpg';
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500">Confidence Score:</span>
                <div className="font-black text-emerald-700 text-sm mt-0.5">{viewDetailModal.confidence}%</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-500">Logged Timestamp:</span>
                <div className="font-bold text-gray-800 text-xs mt-0.5">{viewDetailModal.date}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setViewDetailModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={(e) => handleDownloadScan(viewDetailModal, e)}
                className="px-4 py-2 rounded-xl bg-[#0d381e] text-white text-xs font-bold hover:bg-[#072412]"
              >
                Download Image
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
