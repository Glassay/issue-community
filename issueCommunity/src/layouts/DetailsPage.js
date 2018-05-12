/**
 * 2018-05-06 Glassay
 * 详细内容页面
 */

import React from 'react';
import { Layout, Button, Divider } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './DetailsPage.less';
import Comment from '../components/Comment/Comment';
import InputArea from '../components/Comment/InputArea';

const { Content, Header, Footer } = Layout;

class DetailsPage extends React.Component {
  render() {
    const { currentData } = this.props;
    console.log('adasd', this.props.params)
    return(
      <Layout>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <span className={styles.login}>登录</span>
          <Button type="primary" className={styles.register}>注册</Button>
        </Header>
        <Content className={styles.content}>
          <h2>{currentData.title}</h2>
          <article>{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}</article>
          <Divider />
          <div className={styles.inputArea}>
            <InputArea />
          </div>
          <Comment />
          <Comment />
          <Comment />
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default connect(({ article }) => ({ ...article }))(DetailsPage);
