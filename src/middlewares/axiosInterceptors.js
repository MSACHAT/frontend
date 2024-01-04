import axios from "axios";
import {Toast} from "@douyinfe/semi-ui";
import config from "../config/config";

const apiClient = axios.create({
    baseURL:config.apiUrl,
    timeout: 1000,
    headers:{'Content-Type':'application/json'}
});
apiClient.interceptors.request.use((config) => {
    console.log('请求拦截器');
    const tokenTest = 'eyJhbGciOiJIUzM4NCJ9.eyJVc2VySWQiOjIsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAzODM2MDM2LCJleHAiOjE3MDQ0NDA4MzZ9.l7t8ToSgwlc12Hc2SDC6fNxFa6_TCLbL6AtlzaoURzhc7egfgi0xsua8X-PVprL7';
    localStorage.setItem('token',tokenTest);
    const token = localStorage.getItem('token');
    // 将 Token 添加到请求头中
    if (token) {
        console.log(token)
        config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJVc2VySWQiOjIsInN1YiI6ImFkbWluIiwiaWF0IjoxNzAzODM5MjEzLCJleHAiOjE3MDQ0NDQwMTN9.iWghs7FuE-ypReLxJtDYI83jbauAnByPysmteRevK2IQ2mFRuVNJfh1X_Mdbs7SM';

    }
    console.log(config.headers['Authorization'])
    console.log(config.data)
    return config;
})

apiClient.interceptors.response.use((response) => {
    console.log('响应拦截器');
    console.log('请求成功')
    return response;
}, (error) => {
    if(error.response.data.errorMessage!=null) {
        Toast.error(error.response.data.errorMessage)
    }else{
        const errorStatus=error.response.status;
        switch (errorStatus) {
            case 400:
                Toast.error('请求错误');
                break;
            case 401:
                Toast.error('未授权');
                break;
            case 403:
                Toast.error('禁止访问');
                break;
            case 404:
                Toast.error('找不到资源');
                break;
            case 405:
                Toast.error('方法不允许');
                break;
            case 408:
                Toast.error('请求超时');
                break;
            case 413:1
                Toast.error('有效负载太大');
                break;
            case 414:
                Toast.error('URL太长');
                break;
            case 429:
                Toast.error('太多请求');
                break;
            case 500:
                Toast.error('内部服务器错误');
                break;
            case 501:
                Toast.error('未实现');
                break;
            case 502:
                Toast.error('网关错误');
                break;
            case 503:
                Toast.error('服务不可用');
                break;
            case 504:
                Toast.error('网关超时');
                break;
            case 505:
                Toast.error('HTTP版本不受支持');
                break;
            default:
                console.error('其他错误状态码:', error.response.status);
        }
    }
    return Promise.reject(error.response.status);
});

export default apiClient;
