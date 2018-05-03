import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

// 请求拦截器。做一些前置处理
function handlerAxiosRequest(config) {
  const localConfig = Object.assign({}, {
    method: 'get',
  }, config);
  if (localConfig.method === 'post' && Object.keys(localConfig.data || {}).length > 0) {
    Object.assign(localConfig, {
      data: qs.stringify(localConfig.data)
    });
  }
  return axios(localConfig).then(({
    data
  }) => (data));
}

// 登录
export const login = (username, password) => {
  const url = '/api/login';
  return handlerAxiosRequest({
    method: 'post',
    url,
    data: {
      username,
      password,
    }
  });
};

// // 注册
export const register = (userName, password) => {
  return handlerAxiosRequest({
    method: 'post',
    url: '/api/register',
    data: {
      userName,
      password,
    }
  })
};
