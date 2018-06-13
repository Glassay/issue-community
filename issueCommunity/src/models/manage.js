import { message } from 'antd';

import { userManage, articleManage, getArticle, getUser } from '../services/manage';

export default {
  namespace: 'manage',

  state: {
    users: [],
    articles: []
  },

  effects: {
    *deleteUsers({ payload }, { call, put }) {
      const res = yield call(userManage, payload);
      console.log('userRes++++', res);
      const reRes = yield call(getUser);
      yield put({
        type: 'saveUsers',
        payload: reRes
      })
    },

    *deleteArticles({ payload }, { call, put }) {
      const res = yield call(articleManage, payload);
      console.log('articleRes++++', res);
      const reRes = yield call(getArticle);
      yield put({
        type: 'saveArticles',
        payload: reRes
      })
    },

    *getUsers({ payload }, { call, put }) {
      const res = yield call(getUser);
      yield put({
        type: 'saveUsers',
        payload: res
      })
    },

    *getArticles({ payload }, { call, put }) {
      const res = yield call(getArticle);
      yield put({
        type: 'saveArticles',
        payload: res
      })
    }
  },

  reducers: {
    saveUsers(state, { payload }) {
      return {
        ...state,
        users: payload
      }
    },

    saveArticles(state, { payload }) {
      return {
        ...state,
        articles: payload
      }
    }
  }
}
