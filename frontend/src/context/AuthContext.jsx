import React, { createContext, useContext, useState, useEffect } from 'react';
import { isValidGmail } from '../utils/validators';
import { authLogin, authAdminLogin, authRegister, authGoogle, authGetMe } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize stored session and verify JWT with backend on mount
  useEffect(() => {
    async function verifyStoredSession() {
      const token = localStorage.getItem('agriai_jwt_token');
      const cachedSession = localStorage.getItem('agriai_active_session');

      if (token) {
        try {
          // Verify JWT with backend /api/auth/me
          const verifiedUser = await authGetMe();
          if (verifiedUser && verifiedUser.email) {
            const fullUser = {
              ...verifiedUser,
              token
            };
            setUser(fullUser);
            localStorage.setItem('agriai_active_session', JSON.stringify(fullUser));
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('JWT session expired or invalid on backend:', err.message);
          localStorage.removeItem('agriai_jwt_token');
          localStorage.removeItem('agriai_active_session');
        }
      }

      // Fallback to valid cached session if offline
      if (cachedSession) {
        try {
          const parsed = JSON.parse(cachedSession);
          if (parsed && parsed.email && isValidGmail(parsed.email)) {
            setUser(parsed);
          } else {
            localStorage.removeItem('agriai_active_session');
          }
        } catch (e) {
          localStorage.removeItem('agriai_active_session');
        }
      }

      setLoading(false);
    }

    verifyStoredSession();
  }, []);

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    if (!isValidGmail(cleanEmail)) {
      return { 
        success: false, 
        error: 'Authentication requires a valid Gmail account (e.g. yourname@gmail.com).' 
      };
    }

    if (!password || password.length < 6) {
      return { 
        success: false, 
        error: 'Please enter your password (minimum 6 characters).' 
      };
    }

    // Call Backend JWT Login Endpoint
    try {
      const response = await authLogin(cleanEmail, password);
      if (response && response.token && response.user) {
        localStorage.setItem('agriai_jwt_token', response.token);
        localStorage.setItem('agriai_active_session', JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, user: response.user };
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Login failed. Please check your credentials.';
      return { success: false, error: msg };
    }

    return { success: false, error: 'Authentication could not be established with backend.' };
  };

  const register = async (userData) => {
    const cleanEmail = userData.email.trim().toLowerCase();

    if (!isValidGmail(cleanEmail)) {
      return { 
        success: false, 
        error: 'Please use a valid Gmail address (@gmail.com) for authentication.' 
      };
    }

    if (!userData.fullName || userData.fullName.trim().length < 2) {
      return { success: false, error: 'Please enter your real full name.' };
    }

    if (!userData.password || userData.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Call Backend JWT Registration Endpoint
    try {
      const response = await authRegister({
        fullName: userData.fullName.trim(),
        email: cleanEmail,
        password: userData.password,
        farmName: userData.farmName?.trim() || 'Grower Farm',
        acreage: userData.acreage?.trim() || '1 Acre',
        region: userData.region?.trim() || 'Onion Cultivation Sector'
      });

      if (response && response.token && response.user) {
        localStorage.setItem('agriai_jwt_token', response.token);
        localStorage.setItem('agriai_active_session', JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, user: response.user };
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Registration failed. Please try again.';
      return { success: false, error: msg };
    }

    return { success: false, error: 'Unable to register account with backend.' };
  };

  const loginWithGoogle = async (googleUserPayload) => {
    let email = googleUserPayload?.email?.trim().toLowerCase();
    let name = googleUserPayload?.name?.trim() || 'Google User';

    if (!email || !isValidGmail(email)) {
      return { 
        success: false, 
        error: 'Google authentication failed: Account must have a valid @gmail.com address.' 
      };
    }

    // Call Backend JWT Google Auth Endpoint
    try {
      const response = await authGoogle({
        email,
        fullName: name,
        authProvider: 'google',
        farmName: googleUserPayload?.farmName || `${name.split(' ')[0]}'s Farm`
      });

      if (response && response.token && response.user) {
        localStorage.setItem('agriai_jwt_token', response.token);
        localStorage.setItem('agriai_active_session', JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, user: response.user };
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Google OAuth failed with backend.';
      return { success: false, error: msg };
    }

    return { success: false, error: 'Google authentication could not be completed.' };
  };

  const logout = () => {
    localStorage.removeItem('agriai_jwt_token');
    localStorage.removeItem('agriai_active_session');
    setUser(null);
  };

  const adminLogin = async (email, password) => {
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      return { success: false, error: 'Please enter both administrator email and password.' };
    }

    try {
      const response = await authAdminLogin(cleanEmail, password);
      if (response && response.token && response.user) {
        localStorage.setItem('agriai_jwt_token', response.token);
        localStorage.setItem('agriai_active_session', JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, user: response.user };
      }
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Administrator authentication failed.';
      return { success: false, error: msg };
    }

    return { success: false, error: 'Administrator authentication could not be completed.' };
  };

  const isAdmin = !!(user && (
    (user.role || '').toLowerCase() === 'admin' || 
    (user.role || '').toLowerCase() === 'administrator'
  ));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        loading,
        login,
        adminLogin,
        register,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
