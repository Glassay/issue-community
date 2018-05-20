import React from 'react';
import { Table } from 'antd';

export default class ArtcleInfo extends React.Component {
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="">{text}</a>,
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
    }, {
      title: '视频',
      dataIndex: 'video',
      key: 'video',
    }, {
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleDelete(record.id)}>删除</a>
        </span>
      ),
    }];
    return(
      <Table
        rowKey="id"
        columns={columns}
        // dataSource={data}
        // loading={loading}
      />
    );
  }
}
