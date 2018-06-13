import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { releaseComment, getComment } from '../services/comment';

export default {
  namespace: 'comment',

  state: {
    currentComments: []
  },

  effects: {
    *releaseComments({ payload }, { call, put }) {
      const res = yield call(releaseComment, payload);
      console.log('res+++++', res);
      const refreshRes = yield call(getComment);
      yield put({
        type: 'updateComment',
        payload: refreshRes
      })
    }
  },

  reducers: {
    updateComment(state, { payload }) {
      return {
        ...state,
        currentComments: payload
      }
    }
  }
}
