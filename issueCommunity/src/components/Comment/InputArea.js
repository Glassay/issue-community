/**
 * 2018-05-06 Glassay
 * 评论输入框
 */

import React from 'react';
import { Input, Button, Avatar } from 'antd';

import styles from './InputArea.less';

const { TextArea } = Input;

class InputArea extends React.Component {
  render() {
    const avatarInfo = JSON.parse(localStorage.getItem('usersInfo'));
    return(
      <div>
        <Avatar className={styles.avatars} size="large" src={avatarInfo.avatar} />
        <TextArea placeholder="在此输入评论内容！" style={{ marginTop: 10 }} autosize={{ minRows: 2, maxRows: 6 }} />
        <Button type="primary" className={styles.register}>发布</Button>
      </div>
    );
  }
}

export default InputArea;
