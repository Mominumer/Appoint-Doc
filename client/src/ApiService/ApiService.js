import axios from 'axios';

const api = axios.create({
  baseURL: 'https://doc-appoint-snowy.vercel.app/', 
});

export default api;
