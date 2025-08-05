import axios from 'axios';

const api = axios.create({
    baseURL: 'https://classroom-backend-2v40.onrender.com',
    withCredentials: true,
})

export default api;