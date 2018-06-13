import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { writeArticles, getAllArticles, replyComment } from '../services/articles';
import { getComment, releaseComment } from '../services/comment';

export default {
  namespace: 'article',

  state: {
    currentData: '',
    articles: '',
    articleId: '',
    comments: []
  },

  effects: {
    *getArticles({ payload }, { put, call }) {
      const res = yield call(getAllArticles)
      yield put({
        type: 'saveArticles',
        payload: res
      })
    },

    *releaseComments({ payload }, { call, put }) {
      const res = yield call(releaseComment, payload);
      console.log('评论返回值', res);
    },

    *readArticle({ payload }, { call, put }) {
      console.log('readArticle+++++++', payload);
      // const id = +payload.ID;
      yield put({
        type: 'saveArticleId',
        payload: payload.ID
      })
      const id = {
        'id': +payload.ID
      }
      console.log('iddddddddd', id);
      const commentData = yield call(getComment, id);
      console.log('commentData+++', commentData);
      yield put({
        type: 'saveComment',
        payload: commentData
      })
      yield put(routerRedux.push(`/main/article`))
      yield put({
        type: 'saveCurrent',
        payload: payload,
      })
    },

    *writeArticle({ payload }, { call }) {
      const result = yield call(writeArticles, payload);
      console.log('result-=-=-=-=-=', result);
      if(result.status === 'success') {
        message.success('发表成功！')
      } else {
        message.error('发表失败！');
      }
    },

    *replyComments({ payload }, { call }) {
      const res = yield call(replyComment, payload);
      console.log('回复状态++++', res);
    }
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
    },

    saveArticleId(state, { payload }) {
      return {
        ...state,
        articleId: payload
      }
    },

    saveComment(state, { payload }) {
      return {
        ...state,
        comments: payload
      }
    }
  }
}
