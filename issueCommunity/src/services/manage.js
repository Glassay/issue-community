import request from '../utils/request';

export async function userManage(params) {
  return request({
    url: '/bbs/art/deleteuser',
    method: 'post',
    data: params
  })
}

export async function articleManage(params) {
  return request({
    url: '/bbs/art/deleteart',
    method: 'post',
    data: params
  })
}

export async function getArticle(params) {
  return request({
    url: '/bbs/art/get',
    method: 'get',
    data: params
  })
}

export async function getUser(params) {
  return request({
    url: '/bbs/user/get',
    method: 'get',
    data: params
  })
}
