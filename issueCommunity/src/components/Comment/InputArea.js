/**
 * 2018-05-06 Glassay
 * 评论输入框
 */

import React from 'react';
import { Input, Button, Icon, Upload, message } from 'antd';

import styles from './InputArea.less';

const { TextArea } = Input;
const QINIU_SERVER = 'http://up.qiniu.com';
const data = {
  token: '1YmDMnP5QmFBcYxOsxWVhY1vBN1ZyJUnEKpDXaRR:czKU8bBCYhcg4NOjayYvKW-86rg=:eyJzY29wZSI6ImltYWdlIiwiZGVhZGxpbmUiOjE1MjYxOTU3Njl9',
}
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class InputArea extends React.Component {
  render() {
    return(
      <div>
        <TextArea placeholder="在此输入评论内容！" autosize={{ minRows: 2, maxRows: 6 }} />
        <Upload
          {...props}
          action={QINIU_SERVER}
          data={data}
        >
          <Icon style={{ fontSize: 30, marginTop: 10 }} type="picture" />
        </Upload>
        <Button type="primary" className={styles.register}>发布</Button>
      </div>
    );
  }
}

export default InputArea;
