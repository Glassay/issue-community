import React from 'react';
import { Modal } from 'antd';

import styles from './Images.less';

class Images extends React.Component {
  state = {
    visible: false,
    i: null
  }

  showModal = (i) => {
    this.setState({
      visible: true,
      i: i
    });
    console.log('show');
    console.log('index>>>>', i);
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return(
      <div className={styles.layout}>
        <div>
          <img onClick={this.showModal} style={{ padding: 10 }} height="150px" width="150" src={this.props.image} alt="" />
        </div>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="70%"
          footer={null}
        >
          <img src={this.props.image} height="100%" width="100%" alt="" />
        </Modal>
      </div>
    );
  }
}

export default Images;
