/**
 * 2018-05-06
 * 详细内容页面
 */

import React from 'react';
import {
  Layout,
  Divider,
  Icon,
  Upload,
  Menu,
  Dropdown,
  Avatar,
  message,
  Button,
  Input,
  Form
} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';

import styles from './DetailsPage.less';
import Comment from '../components/Comment/Comment';
// import InputArea from '../components/Comment/InputArea';
import Images from '../components/Images';
import Videos from '../components/Videos';

const { Content, Header, Footer } = Layout;
const { TextArea } = Input;
const FormItem = Form.Item;
const QINIU_SERVER = 'http://up.qiniu.com';
const data = {
  token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:WqD4xycS4u9j6xdGzkzTm099c3Q=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE3NjY4NTEyMDB9',
}

class DetailsPage extends React.Component {
  state = {
    fileUrl: null,
    videoUrl: null
  };
  
  // componentDidMount() {
  //   const loginInfo = JSON.parse(localStorage.getItem('usersInfo'));
  //   console.log('loginInfo++++', loginInfo);
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const commentContent = {
          art_id: values.ID,
          content: values.comment,
          file: this.state.fileUrl,
        }
        // console.log('commentComtent++++', commentContent);
        console.log('articleContent>>>>>>', commentContent);
        this.props.dispatch({
          type: 'comment/releaseComments',
          payload: commentContent
        })
      }
    });
  }

  render() {
    const loginInfo = JSON.parse(localStorage.getItem('usersInfo'));
    console.log('loginInfo++++', loginInfo);
    const { currentData, comments } = this.props;
    console.log('评论哈哈++++', comments);
    console.log('currentDa+++', currentData);
    const { getFieldDecorator } = this.props.form;
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
            fileUrl: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
          })
          console.log('aaaaaaaa', info.file.response.hash);
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    // const props2 = {
    //   name: 'file',
    //   action: QINIU_SERVER,
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   data: data,
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log('qqqqqqqqqq', info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       _this.setState({
    //         videoUrl: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
    //       })
    //       console.log('aaaaaaaa', info.file.response.hash);
    //       message.success(`${info.file.name} 上传成功`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} 上传失败`);
    //     }
    //   },
    // };
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
            <Avatar className={styles.register} size="large" src={loginInfo.avatar} />
          </Dropdown>
        </Header>
        <Content className={styles.content}>
          <h2>{currentData.title}</h2>
          <article>{currentData.content}</article>
          <Images image={currentData.image1} />
          <Videos video={currentData.video} />
          {/* { currentData.imag1 === undefined ? null : <Images image={currentData.image1} />}
          { currentData.video === undefined ? null : <Videos video={currentData.video} />} */}
          <Divider />
          {/* <div className={styles.inputArea}>
            <InputArea />
          </div> */}
          <Avatar className={styles.avatars} size="large" src={loginInfo.avatar} />
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('ID', {
                initialValue: currentData.ID
              })(
                <div style={{ display: 'none' }}>{currentData.ID}</div>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('comment', {
                rules: [{
                  required: true,
                  message: '评论不能为空！'
                }],
              })(
                <TextArea placeholder="在此输入评论内容！" style={{ marginTop: 10 }} autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
            <FormItem>
              <Button htmlType="submit" type="primary" className={styles.register1}>发布</Button>
            </FormItem>
          </Form>
          {/* <div>
            <Avatar className={styles.avatars} size="large" src={loginInfo.avatar} />
            <TextArea placeholder="在此输入评论内容！" style={{ marginTop: 10 }} autosize={{ minRows: 2, maxRows: 6 }} />
            <Button type="primary" className={styles.register1}>发布</Button>
          </div> */}
          <div>
            <Upload {...props1}>
              <Icon style={{ fontSize: 30, color: '#EC7700' }} type="link" />
              <span style={{ marginLeft: 10, color: '#EC7700' }}>上传文件</span>
            </Upload>
            {/* <Upload {...props2}>
              <Icon style={{ fontSize: 30, color: '#EC7700' }} type="video-camera" />
              <span style={{ marginLeft: 10, marginBottom: 20, color: '#EC7700' }}>上传视频</span>
            </Upload> */}
          </div>
          {
            comments.data.map(item => (
              <div key={item.ID}>
                <Comment
                  avatar={item.avatar}
                  creator={item.creator}
                  Created={moment(item.Created).format('LLL')}
                  content={item.content}
                  file={item.file}
                />
              </div>
            ))
          }
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

DetailsPage = Form.create({})(DetailsPage);

export default connect(state => ({
  currentData: state.article.currentData,
  comments: state.article.comments
}))(DetailsPage);
