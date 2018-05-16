/**
 * 2018-05-06 Glassay
 * 评论输入框
 */

import React from 'react';
import { Input, Button } from 'antd';

import styles from './InputArea.less';

const { TextArea } = Input;

class InputArea extends React.Component {
  render() {
    return(
      <div>
        <TextArea placeholder="在此输入评论内容！" autosize={{ minRows: 2, maxRows: 6 }} />
        <Button type="primary" className={styles.register}>发布</Button>
      </div>
    );
  }
}

export default InputArea;
