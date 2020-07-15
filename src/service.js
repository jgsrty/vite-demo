import axios from "axios";
import qs from 'qs'

const service = axios.create({
  baseURL: "https://www.scoregg.com/",
  timeout: 50000, // 请求超时时间
});

service.interceptors.request.use(
  (config) => {
    if(config.method === 'post'){
      config.data = qs.stringify(config.params)
      config.params = '';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error);
    alert("服务器异常");
    return Promise.resolve(false);
  }
);

export default service;
