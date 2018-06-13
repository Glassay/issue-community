import request from '../utils/request';

export async function releaseComment(params) {
  return request({
    url: '/bbs/comment/addcreator',
    method: 'post',
    data: params
  })
}

export async function getComment(params) {
  return request({
    url: '/bbs/comment/get',
    method: 'post',
    data: params
  })
}
