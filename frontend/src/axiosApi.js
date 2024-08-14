import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://calculate-backend.vercel.app/',
});
export default axiosApi;

