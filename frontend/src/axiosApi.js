import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://bank-kredit.vercel.app'
});
export default axiosApi;