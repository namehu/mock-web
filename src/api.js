import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = '//mock.com/v1.0/api/';

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
  const url = 'login';
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
  url: 'register',
  data: {
    userName,
    password,
  }
});

// 获取项目列表
export const getProjects = (pageNumber, pageSize, queryParams) => axios({
  url: 'projects',
  params: Object.assign({}, {
    pageNumber,
    pageSize,
  }, queryParams),
});
// 根据id查询项目信息
export const queryProjectById = (id) => axios({
  url: `project/${id}`
});
// 新增项目
export const addProject = (data) => axios({
  url: 'project',
  method: 'post',
  data,
});
// 更新项目
export const updateProject = (data) => axios({
  url: `project/${data.id}`,
  method: 'patch',
  data: {
    name: data.name,
    url: data.url,
    description: data.description,
    protocol: data.protocol,
  },
});

// 删除项目
export const deleteProject = (id) => axios({
  url: `project/${id}`,
  method: 'delete',
});
