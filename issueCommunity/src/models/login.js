import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    users: {
      userName: '111',
      password: '111',
      avatar: 'http://www.gx8899.com/uploads/allimg/160804/3-160P4111639.jpg'
    }
  },

  effects: {
    *adminLogin({ payload }, { select, put, call }) {
      const data = yield select(state => state.login.users);
      if(data.userName === payload.userName && data.password === payload.password) {
        const userInfo = JSON.stringify(data);
        localStorage.setItem('usersInfo', userInfo)
        yield put(routerRedux.push(`/main`))
      } else {
        message.error('账户名或密码错误, 请重新输入！');
      }
    },

    *exit({ payload }, { put, call, select }) {
      yield routerRedux.put(routerRedux.push('/'))
    }
  },

  reducers: {
  }
}
