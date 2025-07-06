// Authentication service
export const AUTH_TOKEN_KEY = 'access_token';

export const authService = {
  signup: async (email: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/auth/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, data.access);
    return data;
  },

  login: async (username: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem(AUTH_TOKEN_KEY, data.access);
    return data;
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),

  isAuthenticated: () => !!localStorage.getItem(AUTH_TOKEN_KEY),

  getAuthHeaders: () => ({
    'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
  }),
};
