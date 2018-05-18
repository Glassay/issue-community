/**
 * 2018-05-06 Glassay
 * 详细内容页面
 */

import React from 'react';
import { Layout, Divider, Icon, Upload, Modal, Menu, Dropdown, Avatar } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './DetailsPage.less';
import Comment from '../components/Comment/Comment';
import InputArea from '../components/Comment/InputArea';

const { Content, Header, Footer } = Layout;
const QINIU_SERVER = 'http://up.qiniu.com';
const data = {
  token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:WqD4xycS4u9j6xdGzkzTm099c3Q=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE3NjY4NTEyMDB9',
}

class DetailsPage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imgUrl: null,
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({
    fileList,
    imgUrl: fileList[0].thumbUrl,
  })

  render() {
    console.log('file>>>>>', this.state.fileList);
    console.log('url>>>>>', this.state.previewImage);
    console.log('imgUrl>>>>>', this.state.imgUrl);
    console.log('adasd', this.props.params)
    const loginIngo = JSON.parse(localStorage.getItem('usersInfo'));
    const { currentData } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
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
          <span className={styles.login}>提问</span>
          <Dropdown overlay={menu}>
            <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <h2>{currentData.title}</h2>
          <article>{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}{currentData.description}</article>
          <Divider />
          <div className={styles.inputArea}>
            <InputArea />
          </div>
          <div className="clearfix">
            <Upload
              action={QINIU_SERVER}
              data={data}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
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
