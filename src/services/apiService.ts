// API Configuration
const API_BASE_URL = 'http://localhost/kulana-api/endpoints';

// API Service
export const apiService = {
  // Login
  async login(username: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get single config
  async getConfig(key: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/get-config.php?key=${key}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get config error:', error);
      throw error;
    }
  },

  // Get all configs
  async getAllConfigs() {
    try {
      const response = await fetch(`${API_BASE_URL}/get-config.php`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get all configs error:', error);
      throw error;
    }
  },

  // Update config
  async updateConfig(key: string, value: unknown) {
    try {
      const response = await fetch(`${API_BASE_URL}/update-config.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update config error:', error);
      throw error;
    }
  },

  // Upload image
  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = getAuthToken();
      // Try no-auth version first for testing
      const response = await fetch(`${API_BASE_URL}/upload-image-no-auth.php`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      // Check if response is OK
      if (!response.ok) {
        const text = await response.text();
        console.error('Upload response error:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Upload image error:', error);
      throw error;
    }
  },
};

// Helper to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('adminToken') !== null;
};

// Helper to get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

// Helper to set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('adminToken', token);
};

// Helper to clear auth token
export const clearAuthToken = (): void => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

// Helper to save user info
export const setUserInfo = (user: { user_id: number; username: string }): void => {
  localStorage.setItem('adminUser', JSON.stringify(user));
};

// Helper to get user info
export const getUserInfo = (): { user_id: number; username: string } | null => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};
