import request from '../utils/request';

export async function usersRegister(params) {
  return request({
    url: '/bbs/user/register',
    method: 'post',
    data: params
  })
}
