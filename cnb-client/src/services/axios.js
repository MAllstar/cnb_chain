import axios from 'axios';
import { message } from 'antd';

import { BASE_URL, TOKEN_KEY } from '../constant/config';

const axiosIns = axios.create({
  baseURL: BASE_URL,
  timeout: 20000
});

// 请求拦截器
axiosIns.interceptors.request.use(function (config) {
  const t = localStorage.getItem(TOKEN_KEY);
  t && (config.headers.common['Authorization'] = t)
  console.log('快看这是个请求拦截器！')
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
});

// 响应拦截器
axiosIns.interceptors.response.use(function (response) {
  if (response.data.code === 1) {
    return Promise.resolve(response.data);
  } else {
    console.log(response)
    return Promise.reject(response);
  }
}, function (error) {
  console.log(error.response)
  // 这里的错误均为网络错误，非具体业务错误
  if (error.response) {
    return Promise.reject(error.response)
  } else {
    // TODO 请求超时会崩溃，而不是通知错误
    return Promise.reject('请求超时, 请刷新重试')
  }
});

export const axios_get = (url, config = {}) => {
  return new Promise(async (resolve) => {
    axiosIns({
      method: 'get',
      url,
      ...config
    }).then(res_data => {
      res_data.msg && message.success(res_data.msg, 1);
      resolve(res_data);
    }).catch(response => {
      if (response && response.status === 401) {
        message.error(response.data.msg, 1);
        let { hash } = window.location;
        hash === '#/Login' || hash === '#/' || hash === '#/Register' || (window.location.href = '/#/Login');
      } else {
        console.log(response)
        message.error(response, 1)
      }
    });
  })
};

export const axios_post = (url, data = {}, config = {}) => {
  return new Promise((resolve) => {
    axiosIns({
      method: 'post',
      url,
      data,
      ...config
    }).then(res_data => {
      res_data.msg && message.success(res_data.msg, 1);
      resolve(res_data);
    }).catch(response => {
      if (response && response.status === 401) {
        message.error(response.data.msg, 1);
        let { hash } = window.location;
        hash === '#/Login' || hash === '#/' || hash === '#/Register' || (window.location.href = '/#/Login');
      } else {
        message.error(response.data.msg, 1)
      }
    });
  })
};
