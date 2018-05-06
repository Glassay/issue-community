/**
 * 2018-05-06 Glassay
 * 评论输入框
 */

import React from 'react';
import { Input, Button, Icon } from 'antd';

import styles from './InputArea.less';

const { TextArea } = Input;

class InputArea extends React.Component {
  render() {
    return(
      <div>
        <TextArea placeholder="在此输入评论内容！" autosize={{ minRows: 2, maxRows: 6 }} />
        <Input placeholder="上传图片" className={styles.upload} />
        <Input placeholder="上传视频" className={styles.upload} />
        <Button className={styles.button}>发布</Button>
      </div>
    );
  }
}

export default InputArea;
