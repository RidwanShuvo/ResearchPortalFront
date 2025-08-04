// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  PAPERS: `${API_BASE_URL}/api/papers`,
  SUBMIT: `${API_BASE_URL}/api/submit`,
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL; 