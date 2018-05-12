import { routerRedux } from 'dva/router';

export default {
  namespace: 'article',

  state: {
    currentData: null,
  },

  effects: {
    *readArticle({ payload }, { put }) {
      console.log('payload>>>>>', payload);
      yield put(routerRedux.push(`/main/article?id=${payload.id}`))
      yield put({
        type: 'saveCurrent',
        payload: payload,
      })
    }
  },

  reducers: {
    saveCurrent(state, { payload }) {
      return {
        ...state,
        currentData: payload,
      }
    }
  }
}
