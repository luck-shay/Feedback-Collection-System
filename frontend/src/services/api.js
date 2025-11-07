import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const feedbackAPI = {
  // Get all feedback with optional filters
  getAll: (params = {}) => {
    return api.get('/feedback/', { params });
  },

  // Get single feedback by ID
  getById: (id) => {
    return api.get(`/feedback/${id}/`);
  },

  // Create new feedback
  create: (data) => {
    return api.post('/feedback/', data);
  },

  // Update feedback
  update: (id, data) => {
    return api.put(`/feedback/${id}/`, data);
  },

  // Delete feedback
  delete: (id) => {
    return api.delete(`/feedback/${id}/`);
  },
};

export default api;

