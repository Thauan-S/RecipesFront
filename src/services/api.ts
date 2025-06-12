import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

api.defaults.headers.common['Accept-Language'] = navigator.language || 'en-US';

export default api;
