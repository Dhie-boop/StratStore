import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Add axios default configuration
axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface SignupData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  is_staff?: boolean;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'customer';
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  created_at?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authService = {
  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/token/`, { username, password });
    if (response.data.access) {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    return response.data;
  },

  async signup(data: SignupData) {
    const response = await axios.post(`${API_URL}/signup/`, {
      ...data,
      password2: data.password2 || data.password // Ensure password2 is set
    });
    return response.data;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await axios.get(`${API_URL}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // If the response is a 404 with user data in it
      if (response.status === 404 && response.data.user) {
        const userData = response.data.user;
        return {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          role: userData.is_staff ? 'admin' as const : 'customer' as const
        };
      }

      // For successful responses
      return {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        role: response.data.is_staff ? 'admin' as const : 'customer' as const,
        // Include additional profile data
        phone: response.data.phone,
        address: response.data.address,
        city: response.data.city,
        state: response.data.state,
        zip_code: response.data.zip_code,
        country: response.data.country,
        created_at: response.data.created_at
      };
    } catch (error: any) {
      if (error.response?.status === 404 && error.response?.data?.user) {
        // Handle the case where profile doesn't exist but we have user data
        const userData = error.response.data.user;
        return {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          role: userData.is_staff ? 'admin' as const : 'customer' as const
        };
      }
      console.error('Error getting current user:', error);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  async logout() {
    try {
      const token = this.getToken();
      
      // Call backend logout endpoint if we have a token
      if (token) {
        await axios.post(`${API_URL}/logout/`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
      // Continue with client-side logout even if backend fails
    } finally {
      // Always clear tokens on client side
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  },

  async updateProfile(profileData: any) {
    const token = this.getToken();
    if (!token) throw new Error('No authentication token');

    const response = await axios.put(`${API_URL}/profile/`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.getToken()) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await authService.login(username, password);
      const userData = await authService.getCurrentUser();
      
      if (!userData) {
        throw new Error('Failed to get user data');
      }

      setUser(userData);
      setIsAuthenticated(true);
      
      // Redirect based on user role
      const redirectPath = (location.state as any)?.from?.pathname || 
        (userData.role === 'admin' ? '/dashboard' : '/customer/profile');
      navigate(redirectPath);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      await authService.signup(data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const updateProfile = async (profileData: any) => {
    try {
      const updatedProfile = await authService.updateProfile(profileData);
      setUser(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, location, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};
