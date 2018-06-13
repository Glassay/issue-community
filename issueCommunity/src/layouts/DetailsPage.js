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
  Form,
  Modal
} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';

import styles from './DetailsPage.less';
// import Comment from '../components/Comment/Comment';
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


const ReplyModal = Form.create()(
  class extends React.Component {
    state = {
      replyFile: null
    };
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const QINIU_SERVER = 'http://up.qiniu.com';
      const data = {
        token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:WqD4xycS4u9j6xdGzkzTm099c3Q=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE3NjY4NTEyMDB9',
      }
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
              replyFile: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
            })
            console.log('aaaaaaaa', info.file.response.hash);
            message.success(`${info.file.name} 上传成功`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
        },
      };
      return (
        <Modal
          // footer={null}
          visible={visible}
          title="回复评论"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          maskStyle={{ opacity: 0.2 }}
        >
          <Form layout="vertical">
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
              {getFieldDecorator('avatar', {
                initialValue: '',
                rules: [{ required: true, message: '请选择头像！'}]
              })(
                <Upload {...props}>
                  <Icon style={{ fontSize: 30, color: '#EC7700' }} type="link" />
                  <span style={{ marginLeft: 10, color: '#EC7700' }}>上传文件</span>
                </Upload>
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)
class DetailsPage extends React.Component {
  state = {
    fileUrl: null,
    videoUrl: null,
    visible: false,
    currentUsers: '',
    articleID: ''
  };
  
  // componentDidMount() {
  //   const loginInfo = JSON.parse(localStorage.getItem('usersInfo'));
  //   console.log('loginInfo++++', loginInfo);
  // }

  showModal = (i, articleId) => {
    console.log('文章id', articleId);
    console.log('回复人》》》', i);
    this.setState({
      visible: true,
      currentUsers: i,
      articleID: articleId
    })
    console.log('currentUsers>>>>>', i);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleCreate = (e) => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      console.log('Received values of form: ', values);
      const replayInfo = {
        art_id: this.state.articleID,
        creator_id: this.state.currentUsers.creator_id,
        creator: this.state.currentUsers.creator,
        rep_content: values.comment,
        file: `http://p7knynd79.bkt.clouddn.com/${values.avatar.file.response.hash}`
      }
      console.log('回复内容++++', replayInfo);
      this.props.dispatch({
        type: 'article/replyComments',
        payload: replayInfo
      })
      form.resetFields();
      this.setState({
        visible: false
      })
    })
  }

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
    const { currentData, comments, articleId } = this.props;
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
          <div>
            <Upload {...props1}>
              <Icon style={{ fontSize: 30, color: '#EC7700' }} type="link" />
              <span style={{ marginLeft: 10, color: '#EC7700' }}>上传文件</span>
            </Upload>
          </div>
          <Divider />
          {
            comments.data.map(item => (
              <div key={item.ID} className={styles.layout}>
                <div className={styles.head1}>
                  <Avatar size="large" src={item.avatar} />
                  <div className={styles.name}>
                    <span>
                      <em>{item.creator}</em>
                      {item.replied === '' ? null : <em>  -----{item.replied} 回复 {item.creator} 说</em>}
                    </span>
                    {/* {item.replied === '' ? <em>{item.creator}</em> : <em>{item.replied} 回复 {item.creator} 说</em>}<em>{item.creator}</em> */}
                    <span>{moment(item.Created).format('LLL')}</span>
                  </div>
                </div>
                <article>{item.content}</article>
                {item.file === '' ? <a style={{ visibility: 'hidden' }} href={item.file} target="view_window">附加文件</a>: <a href={item.file} target="view_window">附加文件</a>}
                <div
                  onClick={() => this.showModal(item, articleId)}
                  style={{
                    float: 'right',
                    color: '#EC7700'
                  }}
                >回复</div>
                <div style={{ clear: 'both' }} />
                {/* <a href={this.props.file} target="view_window">附加文件</a> */}
                <Divider />
                <ReplyModal
                  wrappedComponentRef={this.saveFormRef}
                  // comment={this}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
              </div>
              // <div key={item.ID}>
              //   <Comment
              //     avatar={item.avatar}
              //     creator={item.creator}
              //     Created={moment(item.Created).format('LLL')}
              //     content={item.content}
              //     file={item.file}
              //   />
              // </div>
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
  comments: state.article.comments,
  articleId: state.article.articleId
}))(DetailsPage);
