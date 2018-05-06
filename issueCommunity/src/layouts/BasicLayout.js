/**
 * 2018-05-06 Glassay
 */

import React from 'react';
import { Layout, Icon, Button } from 'antd';

import styles from './BasicLayout.less';
import SingleArticle from '../components/SingleArticle';

const { Header, Content, Footer } = Layout;

class BasicLayout extends React.Component {
  render() {
    return(
      <Layout>
        <Header className={styles.header}>
          <span className={styles.title}>论题研讨</span>
          <span className={styles.login}>登录</span>
          <Button type="primary" className={styles.register}>注册</Button>
        </Header>
        <Content className={styles.content}>
          <SingleArticle />
        </Content>
        <Footer className={styles.footer}>Ant Design ©2016 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
