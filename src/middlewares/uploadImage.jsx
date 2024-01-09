import axios from "axios";
import config from "../config/config";

const upload = axios.create(
    {
        baseURL: config.apiUrl,
        timeout: 1000 * 60,

    }
);
upload.interceptors.request.use((config) => {
    console.log('请求拦截器');
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type']='multipart/form-data';
        console.log(token)


    }
    return config;
})
export default upload;