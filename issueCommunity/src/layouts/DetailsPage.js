/**
 * 2018-05-06
 * 详细内容页面
 */

import React from 'react';
import { Layout, Divider, Icon, Upload, Menu, Dropdown, Avatar, message } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './DetailsPage.less';
import Comment from '../components/Comment/Comment';
import InputArea from '../components/Comment/InputArea';
import Images from '../components/Images';
import Videos from '../components/Videos';

const { Content, Header, Footer } = Layout;
const QINIU_SERVER = 'http://up.qiniu.com';
const data = {
  token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:WqD4xycS4u9j6xdGzkzTm099c3Q=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE3NjY4NTEyMDB9',
}

class DetailsPage extends React.Component {
  state = {
    imgUrl: null,
    videoUrl: null
  };

  render() {
    const _this = this;
    const props1 = {
      name: 'file',
      action: QINIU_SERVER,
      headers: {
        authorization: 'authorization-text',
      },
      data: data,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log('qqqqqqqqqq', info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          _this.setState({
            imgUrl: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
          })
          console.log('aaaaaaaa', info.file.response.hash);
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    const props2 = {
      name: 'file',
      action: QINIU_SERVER,
      headers: {
        authorization: 'authorization-text',
      },
      data: data,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log('qqqqqqqqqq', info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          _this.setState({
            videoUrl: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
          })
          console.log('aaaaaaaa', info.file.response.hash);
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    const loginIngo = JSON.parse(localStorage.getItem('usersInfo'));
    const { currentData } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/login"><span onClick={this.loginOut}>退出登录</span></Link>
        </Menu.Item>
      </Menu>
    )
    console.log('currentData>>>>>', currentData);
    return(
      currentData === null ? null :
      <Layout>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <Link to="/main/release"><span className={styles.login}>提问</span></Link>
          <Dropdown overlay={menu}>
            <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <h2>{currentData.title}</h2>
          <article>{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}</article>
          <Images />
          <Videos />
          <Divider />
          <div className={styles.inputArea}>
            <InputArea />
          </div>
          <div className="clearfix">
            <Upload {...props1}>
              <Icon style={{ fontSize: 30, color: '#EC7700' }} type="picture" />
              <span style={{ marginLeft: 10, color: '#EC7700' }}>上传图片</span>
            </Upload>
            <Upload {...props2}>
              <Icon style={{ fontSize: 30, color: '#EC7700' }} type="video-camera" />
              <span style={{ marginLeft: 10, marginBottom: 20, color: '#EC7700' }}>上传视频</span>
            </Upload>
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
