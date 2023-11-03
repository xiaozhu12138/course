import axios from 'axios';
import store from '@/store';

 const instance = axios.create({
    baseURL: 'https://www.chengzier.cn:8000/api',
    timeout: 5000,
  });

  instance.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${store.state.token}`
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  export default instance;