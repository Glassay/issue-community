import React from 'react';
import { connect } from 'dva';
import { Layout, Form, Icon, Input, Button, Modal, Upload, Avatar, message } from 'antd';

import styles from './LoginLayout.less';

const FormItem = Form.Item;
const { Content } = Layout;

const RegisterModal = Form.create()(
  class extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      imgUrl: null
    };
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      console.log('form>>>>>', form);
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不一致, 请重新输入！');
      } else {
        callback();
      }
    }
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
              imgUrl: `http://p7knynd79.bkt.clouddn.com/${info.file.response.hash}`
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
          visible={visible}
          title="用户信息注册"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          maskStyle={{ opacity: 0.2 }}
        >
          <Form layout="vertical">
            <FormItem label="用户名" hasFeedback>
              {getFieldDecorator('userName', {
                initialValue: this.props.name,
                rules: [{
                  required: true,
                  type: 'email',
                  message: '用户名格式为邮箱！',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="密码" hasFeedback>
              {getFieldDecorator('password', {
                initialValue: this.props.studentNumber,
                rules: [{
                  required: true,
                  message: '请输入密码！',
                }]
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem label="确认密码" hasFeedback>
              {getFieldDecorator('rePassword', {
                initialValue: this.props.studentNumber,
                rules: [{
                  required: true,
                  message: '两次密码输入不一致, 请重新输入！'
                }, {
                  validator: this.compareToFirstPassword,
                }]
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem label="头像" hasFeedback>
              {getFieldDecorator('avatar', {
                initialValue: this.props.club,
                rules: [{ required: true, message: '请选择头像！'}]
              })(
                <Upload {...props}>
                  <Avatar
                    style={{ border: '1px solid #E4EDDB'}}
                    size="large"
                    src={this.state.imgUrl}
                  />
                </Upload>
              )}
            </FormItem>
            <FormItem label="昵称" hasFeedback>
              {getFieldDecorator('nickname', {
                initialValue: this.props.class,
                rules: [{ required: true, message: '请输入昵称！'}]
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

class LoginLayout extends React.Component {
  state = {
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
    console.log('show modal');
    console.log('visible+++++', this.state.visible);
  }

  handleCancle = () => {
    this.setState({
      visible: false,
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'login/adminLogin',
          payload: values,
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className={styles.layout}>
        <h1 style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 40, color: '#EC7700' }}>论题研讨</h1>
        <Content className={styles.bgimage}>
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名！' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <a style={{ color: '#EC7700' }} onClick={this.showModal} >注册用户</a>
              <Button type="primary" htmlType="submit" className={styles.formButton}>
                登录
              </Button>
              <RegisterModal
                visible={this.state.visible}
                wrappedComponentRef={this.saveFormRef}
                onCancel={this.handleCancle}
              />
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}
LoginLayout = Form.create({})(LoginLayout);

export default connect(({ login }) => ({ ...login }))(LoginLayout);
