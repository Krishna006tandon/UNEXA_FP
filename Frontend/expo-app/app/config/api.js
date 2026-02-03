export const API_BASE_URL = 'https://unexa-fp.onrender.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  
  // User endpoints
  GET_PROFILE: `${API_BASE_URL}/api/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
  
  // Feed endpoints
  GET_POSTS: `${API_BASE_URL}/api/posts`,
  CREATE_POST: `${API_BASE_URL}/api/posts`,
  LIKE_POST: `${API_BASE_URL}/api/posts/like`,
  
  // Chat endpoints
  GET_CHATS: `${API_BASE_URL}/api/chats`,
  GET_MESSAGES: `${API_BASE_URL}/api/messages`,
  
  // Snap endpoints
  GET_SNAPS: `${API_BASE_URL}/api/snaps`,
  UPLOAD_SNAP: `${API_BASE_URL}/api/snaps/upload`,
  
  // Stream endpoints
  GET_STREAMS: `${API_BASE_URL}/api/streams`,
};
