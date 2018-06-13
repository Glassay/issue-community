import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';

class ArticleInfo extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'manage/getArticles'
    })
  }

  handleDelete = (ID) => {
    this.props.dispatch({
      type: 'manage/deleteArticles',
      payload: {
        'id': +ID.ID
      }
    })
    console.log('ID++++++', ID);
  }

  render() {
    const { articles } = this.props;
    console.log('wenzhang', articles);
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '图片',
      dataIndex: 'image1',
      key: 'image1',
    }, {
      title: '视频',
      dataIndex: 'video',
      key: 'video',
    }, {
      title: '时间',
      dataIndex: 'Created',
      key: 'Created',
    }, {
      render: (text, ID) => (
        <span>
          <a onClick={() => this.handleDelete(ID)}>删除</a>
        </span>
      ),
    }];
    return(
      <Table
        rowKey="ID"
        columns={columns}
        dataSource={articles.data}
        // loading={loading}
      />
    );
  }
}

export default connect(({ manage }) => ({ ...manage }))(ArticleInfo);
