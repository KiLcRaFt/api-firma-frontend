import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5095',
});

export default api;
