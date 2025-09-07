import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const createIssue = (formData) =>
  API.post('/issues', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getIssues = () => API.get('/issues');
export const deleteIssue = (id) => API.delete(`/issues/${id}`);
