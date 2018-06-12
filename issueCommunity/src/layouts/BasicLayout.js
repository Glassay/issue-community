/**
 * 2018-05-06
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Avatar, Menu, Dropdown } from 'antd';

import styles from './BasicLayout.less';
import Articles from '../components/Articles';

const { Header, Content, Footer } = Layout;

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    id: i,
    title: `一位抑郁症患者的独白${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。',
  });
}

class BasicLayout extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'article/getArticles'
    })
  }
  render() {
    const { articles } = this.props;
    console.log('articles_____', articles);
    const loginIngo = JSON.parse(localStorage.getItem('usersInfo'));
    console.log('loginIngo>>>>>', loginIngo);
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/login"><span>退出登录</span></Link>
        </Menu.Item>
      </Menu>
    )
    return(
      <Layout>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <Link to="/main/release"><span className={styles.login}>提问</span></Link>
          <Dropdown overlay={menu}>
            <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <Articles listData={articles.data} />
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default connect(state => ({
  articles: state.article.articles
}))(BasicLayout);
