import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link } from 'dva/router';

import styles from './ManageLayout.less';
import ArticleInfo from '../routes/ArticleInfo';
import UsersInfo from '../routes/UsersInfo';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ManageLayout extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ backgroundColor: 'EC7700' }}
        >
          <div className={styles.logo}>
            <Link to="/manage">
              <h1>社区信息管理</h1>
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="area-chart" /><span>城市综合数据</span></span>}
            >
              <Menu.Item key="1">
                <Link to="/manage/users">用户信息</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/manage/articles">首页信息</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Menu theme="dark" mode="horizontal">
              <SubMenu
                style={{
                  float: 'right',
                  right: 20,
                  top: 8
                }}
                title={
                  <span>
                    <Icon type="user" />
                    管理员
                  </span>
                }
              >
                <Menu.Item key="logout">
                  退出登录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>用户信息</Breadcrumb.Item>
              <Breadcrumb.Item>首页信息</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
              <Switch>
                <Route path="/manage/users" render={() => <UsersInfo />} />
                <Route path="/manage/articles" render={() => <ArticleInfo />} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright ©2018 Created by Glassay
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default ManageLayout;
