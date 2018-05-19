/**
 * 2018-05-19
 * 文章发布
 */

import React from 'react';
import { Link } from 'dva/router';
import { Modal, Layout, Dropdown, Avatar, Menu, Input, Upload, Icon, message, Button } from 'antd';

import styles from './ReleaseIssue.less';

const { Header, Footer, Content } = Layout;
const { TextArea } = Input;
const QINIU_SERVER = 'http://up.qiniu.com';
const data = {
  token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:WqD4xycS4u9j6xdGzkzTm099c3Q=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE3NjY4NTEyMDB9',
}

class ReleaseIssue extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  focus() {
    // 直接使用原生 API 使 text 输入框获得焦点
    this.textInput.focus();
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  render() {
    const _this = this;
    const props = {
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
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
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
          <span className={styles.login}>提问</span>
          <Dropdown overlay={menu}>
            <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <h2 className={styles.headline}>标题</h2>
          <Input
            type="text"
            style={{ marginBottom: 30 }}
            ref={(Input) => { this.textInput = Input }}
          />
          <h2 className={styles.headline}>主要内容</h2>
          <TextArea  style={{ marginBottom: 30 }} autosize={{ minRows: 8, maxRows: 10 }}/>
          <Upload
            action={QINIU_SERVER}
            data={data}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Upload style={{ marginTop: 30 }} {...props}>
            <Icon style={{ fontSize: 30, color: '#EC7700' }} type="video-camera" />
            <span style={{ marginLeft: 10, marginBottom: 20, color: '#EC7700' }}>上传视频</span>
          </Upload>
          <Button style={{ float: 'right', color: 'white', backgroundColor: '#EC7700', borderColor: '#EC7700' }} type="primary">发布</Button>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default ReleaseIssue;
