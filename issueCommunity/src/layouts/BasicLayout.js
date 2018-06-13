/**
 * 2018-05-06
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Avatar, Menu, Dropdown, List, Icon } from 'antd';

import styles from './BasicLayout.less';

const { Header, Content, Footer } = Layout;

const listData = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    id: i,
    title: `一位抑郁症患者的独白${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '最爱的，我确信自己又要精神失常了。我感到我们无法再一次经受这样可怕的时刻。我不能够再和它斗争了，我知道我自己毁了你的生活，没有我你就能够工作。我知道你会的。',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class BasicLayout extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'article/getArticles'
    })
  }

  LoginOut = () => {
    console.log('tuichu');
  }

  readDetails = (item) => {
    this.props.dispatch({
      type: 'article/readArticle',
      payload: item
    })
  }

  render() {
    const { articles } = this.props;
    console.log('articles_____', articles);
    const loginIngo = JSON.parse(localStorage.getItem('usersInfo'));
    console.log('loginIngo>>>>>', loginIngo);
    const menu = (
      <Menu>
        <Menu.Item>
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    )
    return(
      <Layout>
        <Header className={styles.header}>
          <Link to="/main"><span className={styles.title}>论题研讨</span></Link>
          <Link to="/main/release"><span className={styles.login}>提问</span></Link>
          <Dropdown onClick={() => this.LoginOut} overlay={menu}>
            <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
          </Dropdown>
          {/* <Menu theme="dark" mode="horizontal">
            <SubMenu
              style={{
                float: 'right',
                right: 20,
                top: 8
              }}
              title={
                <Avatar className={styles.register} size="large" src={loginIngo.avatar} />
              }
            >
              <Menu.Item key="logout">
                <span onClick={this.loginOut}>退出登录</span>
              </Menu.Item>
            </SubMenu>
          </Menu> */}
        </Header>
        {
          articles.data === null || undefined ? null :
          <div>
            <Content className={styles.content}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 6,
                }}
                dataSource={articles.data}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRwvtnOwp0gVJ9tOOWFh7jUcOj7_Q-sbD8cR303orbyJNFF1C6" />}
                      title={<span onClick={() => this.readDetails(item)} className={styles.title1}>{item.title}</span>}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            </Content>
          </div>
        }
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default connect(state => ({
  articles: state.article.articles
}))(BasicLayout);
