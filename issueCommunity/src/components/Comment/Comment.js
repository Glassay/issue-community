/**
 * 2018-05-06
 * 评论组件
 */

import React from 'react';
import { Avatar, Divider } from 'antd';

import styles from './Comment.less';

class Comment extends React.Component {
  render() {
    return(
      <div className={styles.layout}>
        <div className={styles.head}>
          <Avatar size="large" src={this.props.avatar} />
          <div className={styles.name}>
            <em>{this.props.creator}</em>
            <span>{this.props.Created}</span>
          </div>
        </div>
        <article>{this.props.content}</article>
        {this.props.file === '' ? <a style={{ display: 'none' }} href={this.props.file} target="view_window">附加文件</a>: <a href={this.props.file} target="view_window">附加文件</a>}
        {/* <a href={this.props.file} target="view_window">附加文件</a> */}
        <Divider />
      </div>
    );
  }
}

export default Comment;
