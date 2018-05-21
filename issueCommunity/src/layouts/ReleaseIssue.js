/**
 * 2018-05-19
 * 文章发布
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Modal, Form, Layout, Dropdown, Avatar, Menu, Input, Upload, Icon, message, Button } from 'antd';

import styles from './ReleaseIssue.less';

const { Header, Footer, Content } = Layout;
const { TextArea } = Input;
const FormItem = Form.Item;
const QINIU_SERVER = 'http://up.qiniu.com';
const data = {
  token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:WqD4xycS4u9j6xdGzkzTm099c3Q=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE3NjY4NTEyMDB9',
}

class ReleaseIssue extends React.Component {
  componentDidMount() {
    this.textInput.focus();
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    images: null,
    video: null
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({
      fileList
    })
    if(fileList[0].status !== 'uploading') {
      this.setState({
        images: `http://p7knynd79.bkt.clouddn.com/${fileList[0].response.hash}`
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const articleContent = {
          title: values.title,
          content: values.content,
          image1: this.state.images,
          image2: null,
          image3: null,
          video: this.state.video
        }
        console.log('articleContent>>>>>>', articleContent);
        this.props.dispatch({
          type: 'article/writeArticle',
          payload: articleContent
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
            video: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
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
      <Content>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <span className={styles.login}>提问</span>
          <Dropdown overlay={menu}>
            <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <Form onSubmit={this.handleSubmit}>
            <h2 className={styles.headline}>标题</h2>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{
                  required: true,
                  message: '标题不能为空！'
                }],
              })(
                <Input
                  type="text"
                  style={{ marginBottom: 30 }}
                  ref={input => (this.textInput = input)}
                />
              )}
            </FormItem>
            <h2 className={styles.headline}>主要内容</h2>
            <FormItem>
              {getFieldDecorator('content', {
                rules: [{
                  required: true,
                  message: '内容不能为空！'
                }],
              })(
                <TextArea  style={{ marginBottom: 30 }} autosize={{ minRows: 8, maxRows: 10 }}/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('images', {
                rules: []
              })(
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
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('videos', {
                rules: []
              })(
                <Upload
                  {...props}
                  style={{ marginTop: 30 }}
                >
                  <Icon style={{ fontSize: 30, color: '#EC7700' }} type="video-camera" />
                  <span style={{ marginLeft: 10, marginBottom: 20, color: '#EC7700' }}>上传视频</span>
                </Upload>
              )}
            </FormItem>
            <FormItem>
              <Button htmlType="submit" style={{ float: 'right', color: 'white', backgroundColor: '#EC7700', borderColor: '#EC7700' }} type="primary">发布</Button>
            </FormItem>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form>
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Content>
    );
  }
}

ReleaseIssue = Form.create({})(ReleaseIssue);

export default connect(({ article }) => ({ ...article }))(ReleaseIssue);
