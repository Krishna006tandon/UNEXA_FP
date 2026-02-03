export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred';
  }
};

export const handleError = (error, showAlert = true) => {
  const message = getErrorMessage(error);
  console.error('Error:', error);
  
  if (showAlert) {
    // For React Native, you'd use Alert
    alert(message);
  }
  
  return message;
};
