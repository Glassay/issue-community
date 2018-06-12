import { routerRedux } from 'dva/router';
// import { message } from 'antd';

import { writeArticles, getAllArticles } from '../services/articles';

export default {
  namespace: 'article',

  state: {
    currentData: '',
    articles: ''
  },

  effects: {
    *getArticles({ payload }, { put, call }) {
      const res = yield call(getAllArticles)
      yield put({
        type: 'saveArticles',
        payload: res
      })
    },

    *readArticle({ payload }, { put }) {
      console.log('payload>>>>>', payload);
      yield put(routerRedux.push(`/main/article?id=${payload.id}`))
      yield put({
        type: 'saveCurrent',
        payload: payload,
      })
    },

    *writeArticle({ payload }, { call, put }) {
      const result = yield call(writeArticles, payload);
      console.log('result-=-=-=-=-=', result);
    },
  },

  reducers: {
    saveCurrent(state, { payload }) {
      return {
        ...state,
        currentData: payload
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
