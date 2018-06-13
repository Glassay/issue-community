import axios from 'axios';
import qs from 'qs';
import HttpStatus from 'http-status-codes';
import NProgress from 'nprogress';

import '../../node_modules/nprogress/nprogress.css';

// import '../assets/nprogress.css';
// import {
//   baseURL,
//   requestTimeOut
// }                 from './config'

axios.defaults.baseURL = "http://192.168.0.111:8081";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

// 添加一个请求拦截器，用于设置请求过渡状态
axios.interceptors.request.use((config) => {
  // 请求开始，蓝色过渡滚动条开始出现
  NProgress.start();
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // 请求结束，蓝色过渡滚动条消失
  NProgress.done();
  return response;
}, (error) => {
  // 请求结束，蓝色过渡滚动条消失
  // 即使出现异常，也要调用关闭方法，否则一直处于加载状态很奇怪
  NProgress.done();
  return Promise.reject(error);
});

const fetch = (options) => {
  let {
    method,
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${data ? `?${qs.stringify(data)}` : ''}`)
    case 'delete':
      return axios.delete(url, { data })
    case 'head':
      return axios.head(url, data)
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    console.log('options: ', options, 'response: ', response);
    if (response.status === HttpStatus.OK) {
      return response.data
    }
    throw { response } // eslint-disable-line
  }).catch((error) => {
    const { response } = error;
    console.log('request error: ', error);
    let message, status
    if (response) {
      status = response.status
      const { data, statusText } = response
      message = data.message || statusText || HttpStatus.getStatusText(status)
    } else {
      status = 600
      message = 'Network Error'
    }
    throw { status, message } // eslint-disable-line
  })
}

export const setToken = function (authToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
}
