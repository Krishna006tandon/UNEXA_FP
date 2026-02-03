import { API_BASE_URL } from '../config/api';
import { getErrorMessage } from './validation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Add auth token if available (but not for login/signup)
    const token = await getAuthToken();
    if (token && !endpoint.includes('/api/auth/login') && !endpoint.includes('/api/auth/signup')) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request with token:', endpoint);
    } else {
      console.log('API Request without token:', endpoint);
    }

    const response = await fetch(url, config);
    
    // Handle different response types for successful requests
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Handle server errors with retry logic
    if (!response.ok) {
      if (response.status >= 500 && response.status <= 599) {
        // Server error - retry once after 1 second
        console.log('Server error, retrying...', response.status);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const retryResponse = await fetch(url, config);
        if (retryResponse.ok) {
          const retryContentType = retryResponse.headers.get('content-type');
          if (retryContentType && retryContentType.includes('application/json')) {
            return await retryResponse.json();
          } else {
            return await retryResponse.text();
          }
        }
      }
      
      // Handle unauthorized error
      if (response.status === 401) {
        await removeAuthToken();
        console.log('User not authorized, token removed');
      }
      
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.response = { status: response.status, data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error(getErrorMessage(error));
  }
};

// Get auth token from storage
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Retrieved token from storage:', token ? 'Token exists' : 'No token found');
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Save auth token to storage
export const saveAuthToken = async (token) => {
  try {
    console.log('Saving token to storage...');
    await AsyncStorage.setItem('authToken', token);
    console.log('Token saved successfully');
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

// Save login response for profile use
export const saveLoginResponse = async (response) => {
  try {
    console.log('Saving login response...');
    await AsyncStorage.setItem('lastLoginResponse', JSON.stringify(response));
    console.log('Login response saved successfully');
  } catch (error) {
    console.error('Error saving login response:', error);
  }
};

// Remove auth token from storage
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

// Specific API methods
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Save token if returned
      if (response.token) {
        await saveAuthToken(response.token);
      }
      
      // Save login response for profile use
      await saveLoginResponse(response);
      
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  signup: async (userData) => {
    try {
      const response = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      // Save token if returned
      if (response.token) {
        await saveAuthToken(response.token);
      }
      
      // Save login response for profile use
      await saveLoginResponse(response);
      
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await removeAuthToken();
      await AsyncStorage.removeItem('lastLoginResponse');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
};

export const postsAPI = {
  getPosts: () => apiRequest('/api/posts'),
  createPost: (postData) => apiRequest('/api/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  }),
  likePost: (postId) => apiRequest(`/api/posts/${postId}/like`, {
    method: 'POST',
  }),
};

export const chatsAPI = {
  getChats: () => apiRequest('/api/chats'),
  getMessages: (chatId) => apiRequest(`/api/chats/${chatId}/messages`),
  sendMessage: (chatId, message) => apiRequest(`/api/chats/${chatId}/messages`, {
    method: 'POST',
    body: JSON.stringify(message),
  }),
};

export const snapsAPI = {
  getSnaps: () => apiRequest('/api/snaps'),
  uploadSnap: (formData) => apiRequest('/api/snaps/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }),
};

export const streamsAPI = {
  getStreams: () => apiRequest('/api/streams'),
  uploadStream: (formData) => apiRequest('/api/streams/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }),
};

export const userAPI = {
  getProfile: () => apiRequest('/api/users/profile'),
  updateProfile: (profileData) => apiRequest('/api/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  getUserPosts: (userId) => apiRequest(`/api/users/${userId}/posts`),
  getUserStats: (userId) => apiRequest(`/api/users/${userId}/stats`),
};
