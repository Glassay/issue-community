/**
 * 2018-05-06 Glassay
 */

import React from 'react';
import { Layout, Button, Form, Input, Modal, Avatar } from 'antd';
import { Link } from 'dva/router';

import styles from './BasicLayout.less';
import Articles from '../components/Articles';

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    id: i,
    title: `一位抑郁症患者的独白${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。',
  });
}

const RegisterModal = Form.create()(
  class extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
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
    // validateToNextPassword = (rule, value, callback) => {
    //   const form = this.props.form;
    //   if (value && this.state.confirmDirty) {
    //     form.validateFields(['confirm'], { force: true });
    //   }
    //   callback();
    // }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
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
                <div>
                  <Avatar/>
                </div>
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

class BasicLayout extends React.Component {
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

  render() {
    console.log('visible>>>', this.state.visible);
    return(
      <Layout>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <span className={styles.login}>登录</span>
          <Button onClick={this.showModal} type="primary" className={styles.register}>注册</Button>
          <RegisterModal
            visible={this.state.visible}
            wrappedComponentRef={this.saveFormRef}
            onCancel={this.handleCancle}
          />
        </Header>
        <Content className={styles.content}>
          <Articles />
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
