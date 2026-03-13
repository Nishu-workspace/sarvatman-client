import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// Request interceptor to attach JWT token for admin routes
api.interceptors.request.use(
  (config) => {
    // Only attach token if the request URL starts with /admin
    if (config.url && (config.url.startsWith('/admin') || config.url.startsWith('/upload'))) {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
