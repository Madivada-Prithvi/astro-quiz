import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('nebula_token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<any>(storedToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role || 'user'
          });
        } else {
          localStorage.removeItem('nebula_token');
        }
      } catch (error) {
        localStorage.removeItem('nebula_token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwibmFtZSI6IkNvc21pYyBVc2VyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6OTk5OTk5OTk5OX0.example';
    const mockUser: User = {
      id: '1234567890',
      email,
      name: 'Cosmic User',
      role: email === 'admin@nebula.com' ? 'admin' : 'user'
    };

    localStorage.setItem('nebula_token', mockToken);
    setToken(mockToken);
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - replace with actual API call
    await login(email, password);
    setUser(prev => prev ? { ...prev, name } : null);
  };

  const logout = () => {
    localStorage.removeItem('nebula_token');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};