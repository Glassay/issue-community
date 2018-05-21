import React from 'react';
import { connect } from 'dva';
import { Layout, Form, Icon, Input, Button, Modal, Upload, Avatar, message, Radio } from 'antd';

import styles from './LoginLayout.less';

const FormItem = Form.Item;
const { Content } = Layout;

const RegisterModal = Form.create()(
  class extends React.Component {
    state = {
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
          okText="注册"
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
                  message: '请输入长度不小于6位密码！',
                  min: 6
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
                  message: '两次密码输入不一致, 请重新输入！',
                  min: 6
                }, {
                  validator: this.compareToFirstPassword,
                }]
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem label="姓名" hasFeedback>
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{
                  required: true,
                  max: 16,
                  message: '请输入你的真实姓名！'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('sex', {
                initialValue: 'man',
              })(
                <Radio.Group>
                  <Radio value="man">男</Radio>
                  <Radio value="woman">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="学校" hasFeedback>
              {getFieldDecorator('school', {
                initialValue: this.props.school,
                rules: [{
                  required: true,
                  message: '请输入所在学校！'
                }]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="头像">
              {getFieldDecorator('avatar', {
                initialValue: '',
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
                initialValue: this.props.nickname,
                rules: [{
                  required: true,
                  max: 16,
                  message: '请输入昵称！'
                }]
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

  handleCreate = (e) => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if(err) {
        return false;
      }
      const registerInfo = {
        nickname: values.nickname,
        name: values.userName,
        password: values.password,
        confirm_password: values.rePassword,
        sex: values.sex,
        real_name: values.name,
        school: values.school,
        avatar: `http://p7knynd79.bkt.clouddn.com/${values.avatar.file.response.hash}`
      }
      console.log('values>>>>>', registerInfo);
      console.log('Received values of form: ', values);
      this.props.dispatch({
        type: 'users/uerRegister',
        payload: registerInfo
      })
      message.success('注册成功！');
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
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'users/adminLogin',
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
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入用户名！' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  min: 6,
                  message: '请输入长度不小于6位的密码！'
                }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <a style={{ color: '#EC7700' }} onClick={this.showModal} >注册用户</a>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#EC7700', borderColor: '#EC7700'}} className={styles.formButton}>
                登录
              </Button>
              <RegisterModal
                visible={this.state.visible}
                wrappedComponentRef={this.saveFormRef}
                onCancel={this.handleCancle}
                onCreate={this.handleCreate}
              />
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}
LoginLayout = Form.create({})(LoginLayout);

export default connect(({ users }) => ({ ...users}))(LoginLayout);
