/**
 * 2018-05-06 Glassay
 */

import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'dva/router';

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
  render() {
    return(
      <Layout>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <span className={styles.login}>登录</span>
          <Button type="primary" className={styles.register}>注册</Button>
        </Header>
        <Content className={styles.content}>
          <Articles />
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default BasicLayout;