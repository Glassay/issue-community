import request from '../utils/request';

export async function writeArticles(params) {
  console.log('params>>>>>>.', params);
  return request({
    url: '/bbs/art/add',
    method: 'post',
    data: params
  })
}

export async function getAllArticles(params) {
  return request({
    url: '/bbs',
    method: 'get',
    data: params
  })
}
