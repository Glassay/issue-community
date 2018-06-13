import React from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'dva';

class UserInfo extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'manage/getUsers'
    })
  }

  handleDelete = (ID) => {
    console.log('用户id', ID);
    this.props.dispatch({
      type: 'manage/deleteUsers',
      payload: {
        'id': +ID.ID
      }
    })
  }

  render() {
    const { users } = this.props;
    console.log('用户++++=', users);
    const columns = [{
      title: '姓名',
      dataIndex: 'real_name',
      key: 'real_name',
      render: text => <a href="">{text}</a>,
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => text === 'man' ? <span>男</span> : <span>女</span>
    }, {
      title: '学校',
      dataIndex: 'school',
      key: 'school',
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '权限',
      dataIndex: 'is_admin',
      key: 'is_admin',
      render: text => text ? <span>是</span> : <span>否</span>
    }, {
      render: (text, ID) => (
        <span>
          <a>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(ID)}>删除</a>
          <Divider type="vertical" />
        </span>
      ),
    }];
    return(
      <Table
        rowKey="ID"
        columns={columns}
        dataSource={users.data}
      />
    );
  }
}

export default connect(({ manage }) => ({ ...manage }))(UserInfo);
