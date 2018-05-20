import React from 'react';
import { Table, Divider } from 'antd';

export default class UserInfo extends React.Component {
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'real_name',
      key: 'real_name',
      render: text => <a href="">{text}</a>,
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
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
      dataIndex: 'isadmin',
      key: 'isadmin',
    }, {
      render: (text, record) => (
        <span>
          <a>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record.id)}>删除</a>
          <Divider type="vertical" />
        </span>
      ),
    }];
    return(
      <Table
        rowKey="id"
        columns={columns}
      />
    );
  }
}
