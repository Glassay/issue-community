import request from '../utils/request';

export async function usersLogin(params) {
  return request({
    url: '/bbs/user/login',
    method: 'post',
    data: params,
  })
}
