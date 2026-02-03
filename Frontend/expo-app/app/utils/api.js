import { API_BASE_URL } from '../config/api';
import { getErrorMessage } from './validation';

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

    // Add auth token if available
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    
    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
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
    // For React Native, you'd use AsyncStorage
    // For now, return null or implement storage logic
    return null; // TODO: Implement AsyncStorage
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Specific API methods
export const authAPI = {
  login: (credentials) => apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  signup: (userData) => apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
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
