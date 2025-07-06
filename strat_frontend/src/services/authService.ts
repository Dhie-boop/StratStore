// authService.ts - JWT Authentication service for StratStore

// Base URL for the API
const API_URL = 'http://localhost:8000/api';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export interface UserProfile {
  id: number;
  user: AuthUser;
  phone: string;
  address: string;
  city: string;
  country: string;
  created_at: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
}

export interface RefreshResponse {
  access: string;
}

export interface SignupResponse {
  message: string;
}

// Get the stored access token from localStorage
export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

// Get the stored refresh token from localStorage
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

// Store tokens in localStorage
export const storeTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

// Clear tokens from localStorage on logout
export const clearTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// AuthService object to handle all authentication operations
export const AuthService = {
  // Register a new user
  signup: async (userData: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
      }

      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Login with username and password to get JWT tokens
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Store tokens in localStorage
      storeTokens(data.access, data.refresh);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Refresh the access token using the refresh token
  refreshToken: async (): Promise<string> => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        // If refresh fails, clear tokens and force re-login
        clearTokens();
        throw new Error('Session expired. Please login again.');
      }

      const data = await response.json();
      
      // Store the new access token
      localStorage.setItem('access_token', data.access);
      
      return data.access;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  // Logout user by clearing tokens
  logout: async (): Promise<void> => {
    try {
      const accessToken = getAccessToken();
      
      // Call backend logout endpoint if we have a token
      if (accessToken) {
        await fetch(`${API_URL}/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
      // Continue with client-side logout even if backend fails
    } finally {
      // Always clear tokens on client side
      clearTokens();
    }
  },

  // Get the user profile
  getProfile: async (): Promise<UserProfile> => {
    try {
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(`${API_URL}/profile/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      // Handle token expiration
      if (response.status === 401) {
        // Try to refresh the token
        try {
          const newToken = await AuthService.refreshToken();
          
          // Retry the request with the new token
          const retryResponse = await fetch(`${API_URL}/profile/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${newToken}`,
            },
          });
          
          if (!retryResponse.ok) {
            throw new Error('Failed to get profile after token refresh');
          }
          
          return await retryResponse.json();
        } catch (refreshError) {
          // If refresh fails, clear tokens and force re-login
          clearTokens();
          throw new Error('Session expired. Please login again.');
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Update the user profile
  updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        throw new Error('No access token available');
      }

      const response = await fetch(`${API_URL}/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(profileData),
      });

      // Handle token expiration
      if (response.status === 401) {
        // Try to refresh the token
        try {
          const newToken = await AuthService.refreshToken();
          
          // Retry the request with the new token
          const retryResponse = await fetch(`${API_URL}/profile/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`,
            },
            body: JSON.stringify(profileData),
          });
          
          if (!retryResponse.ok) {
            throw new Error('Failed to update profile after token refresh');
          }
          
          return await retryResponse.json();
        } catch (refreshError) {
          // If refresh fails, clear tokens and force re-login
          clearTokens();
          throw new Error('Session expired. Please login again.');
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// Function to handle API calls with authentication and token refresh
export const authenticatedFetch = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = getAccessToken();
  
  // Add auth header if token exists
  const headers = {
    ...options.headers,
    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
  };
  
  // Make the initial request
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  // If unauthorized, try to refresh token and retry
  if (response.status === 401) {
    try {
      // Attempt to refresh the token
      const newToken = await AuthService.refreshToken();
      
      // Retry the request with the new token
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        }
      });
    } catch (error) {
      // If refresh fails, clear tokens and throw error
      clearTokens();
      throw new Error('Session expired. Please login again.');
    }
  }
  
  return response;
};

export default AuthService;
