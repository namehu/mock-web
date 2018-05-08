import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

// 请求前置拦截器
axios.interceptors.request.use((config) => {
  if (config.method === 'post' && Object.keys(config.data || {}).length > 0) {
    Object.assign(config, {
      data: qs.stringify(config.data)
    });
  }
  return config;
});

// 响应前置拦截器
axios.interceptors.response.use((response) => (response.data));

// 登录
export const login = (username, password) => {
  const url = '/api/login';
  return axios({
    method: 'post',
    url,
    data: {
      username,
      password,
    }
  });
};

// // 注册
export const register = (userName, password) => axios({
  method: 'post',
  url: '/api/register',
  data: {
    userName,
    password,
  }
});
