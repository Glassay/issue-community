import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { usersRegister } from '../services/register';
import { usersLogin } from '../services/login';

export default {
  namespace: 'users',

  state: {
  },

  effects: {
    *adminLogin({ payload }, { select, put, call }) {
      const result = yield call(usersLogin, payload);
      if(result.status === 'success') {
        const usersInfo = JSON.stringify(result);
        localStorage.setItem('usersInfo', usersInfo)
        if(result.isadmin === true) {
          yield put(routerRedux.push('/manage'))
        } else {
          yield put(routerRedux.push('/main'))
        }
      } else {
        message.error('用户名或密码错误, 请重新输入！');
      }
      console.log('loginResult>>>', result);
    },

    *uerRegister({ payload }, { call, put }) {
      const result = yield call(usersRegister, payload);
      console.log('result-=-=-=-=-=', result);
    },

    *exit({ payload }, { put, call, select }) {
      yield routerRedux.put(routerRedux.push('/'))
    }
  },

  reducers: {
  }
}
