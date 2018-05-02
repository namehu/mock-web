import axios from 'axios';

axios.defaults.withCredentials = true;

// 登录
export const login = (username, password) => {
  const url = '/api/login';
  return axios.post(url, {
    username,
    password,
  });
};

// // 注册
export const register = () => {

};
