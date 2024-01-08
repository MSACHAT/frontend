import axios from "axios";
import config from "../config/config";
import apiClient from "./axiosInterceptors";

const loginClient = axios.create({
    baseURL:config.apiUrl,
    timeout: 1000,
    headers:{'Content-Type':'application/json'}
});

export default loginClient